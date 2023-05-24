import React, { useEffect, useState } from 'react'
import MediaLayout from '../../MediaLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { array, object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import { setChannelGroups } from 'src/redux/slices/media/channelGroupSlice'
import { GetAllChannelGroupResponse } from 'src/models/ChannelGroup.model'
import { ChannelCategoryListResponse } from 'src/models/ChannelCategory.model'
import AddSlotManagement from './AddSlotManagement'
import { useAddSlotMutation } from 'src/services/media/SlotManagementServices'
import { useGetAllChannelCategoryQuery } from 'src/services/media/ChannelCategoriesServices'
import { useGetAllChannelQuery } from 'src/services/media/ChannelManagementServices'
import { setChannelMgt } from 'src/redux/slices/media/channelManagementSlice'
import { ChannelManagementListResponse } from 'src/models/Channel.model'
import { useGetAllTapeMangementQuery } from 'src/services/media/TapeManagementServices'
import { setSelectedTapManagement } from 'src/redux/slices/media/tapeManagementSlice'
import { TapeManagementListResponse } from 'src/models/tapeManagement.model'
import moment from 'moment'
export type FormInitialValues = {
    slotName: string
    channelGroup: string
    startDateTime: string
    type: string
    days: string[]
    tapeName: string
    channelName: string
    endDateTime: string
    channelTrp: string
    remarks: string
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
    // const {
    //     isLoading: isLanguageLoading,
    //     isFetching: isLanguageFetching,
    //     data: languageDataApi,
    // } = useGetAllLanguageQuery('')

    const {
        isLoading: isCategoryLoading,
        isFetching: isCategoryFetching,
        data: categoryDataApi,
    } = useGetAllChannelCategoryQuery('')

    const {
        isLoading: isChannelMgtLoading,
        isFetching: isChannelMgtFetching,
        data: ChannelMgtDataApi,
    } = useGetAllChannelQuery('')

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
    } = useGetAllChannelGroupQuery('')

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setChannelGroups(channelGroupsData?.data || []))
        }
    }, [isLoading, isFetching, channelGroupsData, dispatch])

    const {
        isLoading: isTapeMgtLoading,
        isFetching: isTapeMgtFetching,
        data: TapeMgtdata,
    } = useGetAllTapeMangementQuery('')

    useEffect(() => {
        if (!isTapeMgtLoading && !isTapeMgtFetching) {
            dispatch(setSelectedTapManagement(TapeMgtdata.data || []))
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
        slotName: '',
        channelGroup: '',
        startDateTime: '',
        type: '',
        days: [''],
        tapeName: '',
        channelName: '',
        endDateTime: '',
        channelTrp: '',
        remarks: '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        slotName: string().required('Required'),
        channelGroup: string().required('Required'),
        startDateTime: string().required('Required'),
        type: string().required('Required'),
        days: array().of(string().required('Required')),

        tapeName: string().required('Required'),
        channelName: string().required('Required'),
        endDateTime: string().required('Required'),
        channelTrp: string().required('Required'),
        remarks: string().required('Required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddSlotManagementApi({
                slotName: values.slotName,
                channelGroup: values.channelGroup,
                startDateTime: values.startDateTime,
                type: values.type,
                days: values.days,
                tapeName: values.tapeName,
                channelName: values.channelName,
                endDateTime: values.endDateTime,
                channelTrp: values.channelTrp,
                remarks: values.remarks,
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
        </MediaLayout>
    )
}

export default AddSlotManagementWrapper
