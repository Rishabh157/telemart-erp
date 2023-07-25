/// ==============================================
// Filename:AddSlotManagementWrapper.tsx
// Type: Add Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { array, boolean, number, object, string } from 'yup'
import { Formik, FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import { GetAllChannelGroupResponse } from 'src/models/ChannelGroup.model'
import { ChannelCategoryListResponse } from 'src/models/ChannelCategory.model'
import AddSlotManagement from './AddSlotManagement'
import { useAddSlotMutation } from 'src/services/media/SlotDefinitionServices'
import { useGetAllChannelCategoryQuery } from 'src/services/media/ChannelCategoriesServices'
import { useGetAllChannelQuery } from 'src/services/media/ChannelManagementServices'
import { ChannelManagementListResponse } from 'src/models/Channel.model'
import { useGetAllTapeMangementQuery } from 'src/services/media/TapeManagementServices'
import { TapeManagementListResponse } from 'src/models/tapeManagement.model'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setSelectedTapManagement } from 'src/redux/slices/media/tapeManagementSlice'
import { setChannelGroups } from 'src/redux/slices/media/channelGroupSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { setChannelMgt } from 'src/redux/slices/media/channelManagementSlice'

// |-- Types --|
export type FormInitialValues = {
    slotName: string
    channelGroup: string
    type: string
    slotPrice: number
    slotDay: string[]
    slotStartTime: string
    slotEndTime: string
    slotStartDate: string
    slotContinueStatus: boolean
    tapeName: string
    channelName: string
    channelTrp: string
    remarks: string
    runYoutubeLink: string
    companyId: string
}
export const regIndiaPhone = RegExp(/^[0]?[6789]\d{9}$/)

const AddSlotManagementWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [channelCategoryData, setChannelCategoryData] = useState([])

    const { userData } = useSelector((state: RootState) => state?.auth)
    const { channelgroup }: any = useSelector(
        (state: RootState) => state?.channelGroup
    )
    const { tapeMangement }: any = useSelector(
        (state: RootState) => state.tapeManagement
    )

    const { channelMgt }: any = useSelector(
        (state: RootState) => state?.channelManagement
    )

    const [AddSlotManagementApi] = useAddSlotMutation()

    const {
        isLoading: isCategoryLoading,
        isFetching: isCategoryFetching,
        data: categoryDataApi,
    } = useGetAllChannelCategoryQuery(userData?.companyId)

    const {
        isLoading: isChannelMgtLoading,
        isFetching: isChannelMgtFetching,
        data: ChannelMgtDataApi,
    } = useGetAllChannelQuery(userData?.companyId)

    useEffect(() => {
        if (!isChannelMgtLoading && !isChannelMgtFetching) {
            dispatch(setChannelMgt(ChannelMgtDataApi?.data || []))
        }
    }, [isChannelMgtLoading, isChannelMgtFetching, ChannelMgtDataApi, dispatch])

    const {
        isLoading,
        isFetching,
        data: channelGroupsData,
    } = useGetAllChannelGroupQuery(userData?.companyId)

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setChannelGroups(channelGroupsData?.data || []))
        }
    }, [isLoading, isFetching, channelGroupsData, dispatch])

    const {
        isLoading: isTapeMgtLoading,
        isFetching: isTapeMgtFetching,
        data: TapeMgtdata,
    } = useGetAllTapeMangementQuery(userData?.companyId)

    useEffect(() => {
        if (!isTapeMgtLoading && !isTapeMgtFetching) {
            dispatch(setSelectedTapManagement(TapeMgtdata?.data || []))
        }
    }, [isTapeMgtLoading, isTapeMgtFetching, TapeMgtdata, dispatch])

    useEffect(() => {
        if (!isCategoryLoading && !isCategoryFetching) {
            setChannelCategoryData(categoryDataApi?.data)
        }
    }, [isCategoryLoading, isCategoryFetching, categoryDataApi])

    const initialValues: FormInitialValues = {
        slotName: '',
        channelGroup: '',
        type: '',
        slotPrice: 0,
        slotDay: [''],
        slotStartTime: '',
        slotStartDate: '',
        slotEndTime: '',
        slotContinueStatus: true,
        tapeName: '',
        channelName: '',
        channelTrp: '',
        remarks: '',
        runYoutubeLink: '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        slotName: string().required('Required'),
        channelGroup: string().required('Required'),
        type: string().required('Required'),
        slotPrice: number().required('Required'),
        slotStartDate: string().required('Required'),
        slotDay: array().of(string()).required('Required'),
        slotStartTime: string().required('Required'),
        slotEndTime: string().required('Required'),
        slotContinueStatus: boolean().required('Required'),
        tapeName: string().required('Required'),
        channelName: string().required('Required'),
        channelTrp: string(),
        remarks: string(),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        AddSlotManagementApi({
            slotName: values.slotName,
            channelGroupId: values.channelGroup,
            type: values.type,
            tapeNameId: values.tapeName,
            channelNameId: values.channelName,
            channelTrp: values.channelTrp,
            remarks: values.remarks,
            slotPrice: values.slotPrice,
            slotDay: values.slotDay,
            slotStartTime: values.slotStartTime,
            slotStartDate: values.slotStartDate,
            slotEndTime: values.slotEndTime,
            slotContinueStatus: values.slotContinueStatus,
           
            companyId: values.companyId || '',
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Slot Added successfully!')
                    navigate('/media/slot')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }

    const dropdownOptions = {
        channelGroupOptions: channelgroup?.map(
            (channelGroup: GetAllChannelGroupResponse) => {
                return {
                    label: channelGroup.groupName,
                    value: channelGroup._id,
                }
            }
        ),

        channelMgtOptions: channelMgt?.map(
            (channelMgt: ChannelManagementListResponse) => {
                return {
                    label: channelMgt.channelName,
                    value: channelMgt._id,
                }
            }
        ),

        categoryOption: channelCategoryData?.map(
            (category: ChannelCategoryListResponse) => {
                return {
                    label: category.channelCategory,
                    value: category._id,
                }
            }
        ),

        tapeMangementOptions: tapeMangement?.map(
            (tapeMangement: TapeManagementListResponse) => {
                return {
                    label: tapeMangement.tapeName,
                    value: tapeMangement._id,
                }
            }
        ),
        // paymentOptions: [
        //     { label: 'checque', value: 'CHECQUE' },
        //     { label: 'netBanking', value: 'NETBANKING' },
        //     { label: 'cash', value: 'CASH' },
        //     { label: 'creditCard', value: 'CREDITCARD' },
        //     { label: 'debitCard', value: 'DEBITCARD' },
        // ],
    }
    return (
        <>
            {/* // <MediaLayout> */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <AddSlotManagement
                            dropdownOptions={dropdownOptions}
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
            {/* </MediaLayout> */}
        </>
    )
}

export default AddSlotManagementWrapper
