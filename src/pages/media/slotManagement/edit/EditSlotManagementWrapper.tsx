/// ==============================================
// Filename:EditSlotManagementWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { Formik, FormikProps } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'
// import { showToast } from 'src/utils'

// |-- Internal Dependencies --|
import MediaLayout from '../../MediaLayout'
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import { GetAllChannelGroupResponse } from 'src/models/ChannelGroup.model'
import { ChannelCategoryListResponse } from 'src/models/ChannelCategory.model'
import { showToast } from 'src/utils'
import {
    useGetSlotMangementByIdQuery,
    useUpdateSlotMutation,
} from 'src/services/media/SlotManagementServices'
import { useGetAllChannelCategoryQuery } from 'src/services/media/ChannelCategoriesServices'
import { useGetAllChannelQuery } from 'src/services/media/ChannelManagementServices'
import { setChannelMgt } from 'src/redux/slices/media/channelManagementSlice'
import { ChannelManagementListResponse } from 'src/models/Channel.model'
import { useGetAllTapeMangementQuery } from 'src/services/media/TapeManagementServices'
import { TapeManagementListResponse } from 'src/models/tapeManagement.model'
import EditSlotManagement from './EditSlotManagement'

// |-- Redux --|
import { setSelectedItems } from 'src/redux/slices/media/slotManagementSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { setChannelGroups } from 'src/redux/slices/media/channelGroupSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedTapManagement } from 'src/redux/slices/media/tapeManagementSlice'

// |-- Types --|
export type FormInitialValues = {
    slotName: string
    channelGroupId: string
    slotStartTime: string
    slotDate: string
    slotEndTime: string
    type: string
    tapeNameId: string
    channelNameId: string
    channelTrp: string
    remarks: string
    companyId: string
    runYoutubeLink: string
    runStatus: boolean
    run: boolean
    slotRunImage: string
    slotRunVideo: string
    showOk: boolean
    reasonNotShow: string | null
    runStartTime: string
    runEndTime: string
    runRemark: string
}

export const regIndiaPhone = RegExp(/^[0]?[6789]\d{9}$/)

const EditSlotManagementWrapper = () => {
    const navigate = useNavigate()
    const params = useParams()
    const Id = params.id
    const dispatch = useDispatch<AppDispatch>()
    const [updateSlot] = useUpdateSlotMutation()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [channelCategoryData, setChannelCategoryData] = useState([])
    const { selectedItems }: any = useSelector(
        (state: RootState) => state?.slotManagement
    )

    // const [editSlotMangementApi] = useUpdateSlotMutation()

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

    const {
        data: dataSmApi,
        isLoading: smisLoading,
        isFetching: smisFetching,
    } = useGetSlotMangementByIdQuery(Id || '')

    useEffect(() => {
        if (!smisLoading && !smisFetching) {
            dispatch(setSelectedItems(dataSmApi?.data || []))
        }
    }, [smisLoading, smisFetching, dataSmApi, dispatch])
    // const {
    //     isLoading: isLanguageLoading,
    //     isFetching: isLanguageFetching,
    //     data: languageDataApi,
    // } = useGetAllLanguageQuery('')

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

    // const {
    //     isLoading: isCountryLoading,
    //     isFetching: isCountryFetching,
    //     data: countryDataApi,
    // } = useGetAllCountryQuery('')

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

    // useEffect(() => {
    //     if (!isCountryLoading && !isCountryFetching) {
    //         setCountryData(countryDataApi?.data)
    //     }
    // }, [isCountryLoading, isCountryFetching, countryDataApi])

    // useEffect(() => {
    //     if (!isLanguageLoading && !isLanguageFetching) {
    //         setlanguageData(languageDataApi?.data)
    //     }
    // }, [isLanguageLoading, isLanguageFetching, languageDataApi])

    useEffect(() => {
        if (!isCategoryLoading && !isCategoryFetching) {
            setChannelCategoryData(categoryDataApi?.data)
        }
    }, [isCategoryLoading, isCategoryFetching, categoryDataApi])

    const initialValues: FormInitialValues = {
        slotName: selectedItems?.slotName || '',
        channelGroupId: selectedItems?.channelGroupId || '',
        slotStartTime: selectedItems?.slotStartTime || '',
        type: selectedItems?.type || '',
        tapeNameId: selectedItems?.tapeNameId || '',
        channelNameId: selectedItems?.channelNameId || '',
        slotDate: selectedItems?.slotDate || '',
        slotEndTime: selectedItems?.slotEndTime || '',
        channelTrp: selectedItems?.channelTrp || '',
        remarks: selectedItems?.remarks || '',
        runYoutubeLink: selectedItems?.runYoutubeLink || '',
        runStatus: selectedItems?.runStatus,
        run: selectedItems?.run,
        showOk: false,
        reasonNotShow: null,
        slotRunImage: '',
        slotRunVideo: '',
        runStartTime: selectedItems?.runStartTime || '',
        runEndTime: selectedItems?.runEndTime || '',
        runRemark: selectedItems?.runRemark || '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        slotName: string().required('Required'),
        channelGroupId: string().required('Required'),
        slotStartTime: string().required('Required'),
        slotEndTime: string().required('Required'),
        type: string().required('Required'),
        tapeNameId: string().required('Required'),
        channelNameId: string().required('Required'),
        slotDate: string().required('Required'),
        channelTrp: string().required('Required'),
        remarks: string(),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            updateSlot({
                body: {
                    slotName: values?.slotName,
                    channelGroupId: values?.channelGroupId,
                    type: values?.type,
                    tapeNameId: values?.tapeNameId,
                    channelNameId: values?.channelNameId,
                    channelTrp: values?.channelTrp,
                    remarks: values?.remarks,
                    slotDate: values?.slotDate,
                    slotStartTime: values?.slotStartTime,
                    slotEndTime: values?.slotEndTime,
                    runYoutubeLink: values?.runYoutubeLink,
                    runStatus: values?.runStatus,
                    run: values?.run,
                    slotRunImage: values?.slotRunImage,
                    slotRunVideo: values?.slotRunVideo,
                    showOk: values?.showOk,
                    reasonNotShow: values?.reasonNotShow,
                    runStartTime: values?.runStartTime,
                    runEndTime: values?.runEndTime,
                    runRemark: values?.runRemark,
                    companyId: values?.companyId,
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Slot Updated successfully!')
                        navigate('/media/slot')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                setApiStatus(false)
            })
        }, 1000)
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

        // countryOption: countryData?.map((country: CountryListResponse) => {
        //     return {
        //         label: country.countryName,
        //         value: country._id,
        //     }
        // }),
        // languageOption: languageData?.map((language: LanguageListResponse) => {
        //     return {
        //         label: language.languageName,
        //         value: language._id,
        //     }
        // }),
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
        <MediaLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <EditSlotManagement
                            dropdownOptions={dropdownOptions}
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </MediaLayout>
    )
}

export default EditSlotManagementWrapper
