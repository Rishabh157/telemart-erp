// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import AddCompetitor from './Addcompetitor'
import { showToast } from 'src/utils'

// |-- Redux --|
import { useGetAllChannelQuery } from 'src/services/media/ChannelManagementServices'
import { RootState, AppDispatch } from 'src/redux/store'
import { useAddcompetitorMutation } from 'src/services/media/CompetitorManagementServices'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useGetAllLanguageQuery } from 'src/services/LanguageService'
import { useCustomOptions } from 'src/hooks/useCustomOptions'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    competitorName: string
    productName: string
    channelNameId: string
    schemePrice: string
    ytLink: string
    websiteLink: string
    date: string | null
    startTime: string
    endTime: string
    mobileNumber: string
    languageId: string
    productCategory: string
    images: {
        image: ''
    }[]
}

const AddCompetitorWrapper = (props: Props) => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    // Initiate Method
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [addCompetitor] = useAddcompetitorMutation()

    // Hook
    const { options: languageOptions } = useCustomOptions({
        useEndPointHook: useGetAllLanguageQuery(''),
        keyName: 'languageName',
        value: '_id',
    })

    const { options: channelNameOptions } = useCustomOptions({
        useEndPointHook: useGetAllChannelQuery(userData?.companyId),
        keyName: 'channelName',
        value: '_id',
    })

    const initialValues: FormInitialValues = {
        competitorName: '',
        productName: '',
        websiteLink: '',
        ytLink: '',
        schemePrice: '',
        channelNameId: '',
        startTime: '',
        endTime: '',
        date: '',
        mobileNumber: '',
        languageId: '',
        productCategory: '',
        images: [
            {
                image: '',
            },
        ],
    }

    // Form Validation Schema
    const validationSchema = object({
        competitorName: string().required('Required'),
        productName: string().required('Required'),
        websiteLink: string(),
        ytLink: string().url('Invalid URL'),
        channelNameId: string().required('Required'),
        startTime: string().required('Required'),
        endTime: string().required('Required'),
        date: string().required('Required'),
        languageId: string().required('Language is required'),
        mobileNumber: string()
            .required('Required')
            .min(10, 'Number should be 10 digits')
            .max(10, 'maximum 10 digit')
            .required('Required'),

        productCategory: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addCompetitor({
                competitorName: values.competitorName || '',
                productCategory: values.productCategory || '',
                companyId: userData?.companyId || '',
                date: values.date || '',
                productName: values.productName || '',
                channelNameId: values.channelNameId || '',
                schemePrice: values.schemePrice || '',
                websiteLink: values.websiteLink || '',
                ytLink: values.ytLink || '',
                mobileNumber: values.mobileNumber || '',
                startTime: values.startTime || '',
                endTime: values.endTime || '',
                languageId: values.languageId || '',
                image: values?.images?.map((ele) => ele?.image) || [],
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Compititor added successfully!')
                        navigate('/media/competitor')
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
        languageOptions,
        channelNameOptions,
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddCompetitor
                        dropdownOptions={dropdownOptions}
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddCompetitorWrapper
