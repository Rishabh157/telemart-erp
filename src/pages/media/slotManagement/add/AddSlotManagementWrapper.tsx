import React, { useEffect, useState } from 'react'
import MediaLayout from '../../MediaLayout'
import { useAddChannelMutation } from 'src/services/media/ChannelManagementServices'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import { setChannelGroups } from 'src/redux/slices/media/channelGroupSlice'
import { GetAllChannelGroupResponse } from 'src/models/ChannelGroup.model'
import { useGetAllCountryQuery } from 'src/services/CountryService'
import { CountryListResponse } from 'src/models/Country.model'
import { useGetAllLanguageQuery } from 'src/services/LanguageService'
import { LanguageListResponse } from 'src/models'
import { useGetAllChannelCategoryQuery } from 'src/services/media/ChannelCategoryService'
import { ChannelCategoryListResponse } from 'src/models/ChannelCategory.model'
import AddSlotManagement from './AddSlotManagement'
import { useAddSlotMutation } from 'src/services/media/SlotManagementServices'
export type FormInitialValues = {
    slotName: string
    channelGroup: string
    startDateTime: string
    type: string
    days:string[]
    tapeName: String
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
    const [countryData, setCountryData] = useState([])
    const [languageData, setlanguageData] = useState([])
    const [channelCategoryData, setChannelCategoryData] = useState([])

    const { userData } = useSelector((state: RootState) => state?.auth)
    const { channelgroup }: any = useSelector(
        (state: RootState) => state?.channelGroup
    )
    const [AddSlotManagementApi] = useAddSlotMutation()
    const {
        isLoading: isLanguageLoading,
        isFetching: isLanguageFetching,
        data: languageDataApi,
    } = useGetAllLanguageQuery('')
    const {
        isLoading: isCategoryLoading,
        isFetching: isCategoryFetching,
        data: categoryDataApi,
    } = useGetAllChannelCategoryQuery('')
    const {
        isLoading: isCountryLoading,
        isFetching: isCountryFetching,
        data: countryDataApi,
    } = useGetAllCountryQuery('')

    const {
        isLoading,
        isFetching,
        data: channelGroupsData,
    } = useGetAllChannelGroupQuery('')

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setChannelGroups(channelGroupsData.data || []))
        }
    }, [isLoading, isFetching, channelGroupsData, dispatch])
    useEffect(() => {
        if (!isCountryLoading && !isCountryFetching) {
            setCountryData(countryDataApi?.data)
        }
    }, [isCountryLoading, isCountryFetching, countryDataApi])
    useEffect(() => {
        if (!isLanguageLoading && !isLanguageFetching) {
            setlanguageData(languageDataApi?.data)
        }
    }, [isLanguageLoading, isLanguageFetching, languageDataApi])
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
        days: [""],
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
      channelGroup: string(),
      startDateTime: string(),
      type:  string(),
      days: string(),
      tapeName: string().required('Required'),
      channelName: string().required('Required'),
      endDateTime: string(),
      channelTrp: string(),        
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
                        showToast('success', 'Channel added successfully!')
                        navigate('/media/channel')
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
        countryOption: countryData?.map((country: CountryListResponse) => {
            return {
                label: country.countryName,
                value: country._id,
            }
        }),
        languageOption: languageData?.map((language: LanguageListResponse) => {
            return {
                label: language.languageName,
                value: language._id,
            }
        }),
        categoryOption: channelCategoryData?.map(
            (category: ChannelCategoryListResponse) => {
                return {
                    label: category.channelCategory,
                    value: category._id,
                }
            }
        ),
        paymentOptions: [
            { label: 'checque', value: 'CHECQUE' },
            { label: 'netBanking', value: 'NETBANKING' },
            { label: 'cash', value: 'CASH' },
            { label: 'creditCard', value: 'CREDITCARD' },
            { label: 'debitCard', value: 'DEBITCARD' },
        ],
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
                        />
                    )
                }}
            </Formik>
        </MediaLayout>
    )
}

export default AddSlotManagementWrapper
