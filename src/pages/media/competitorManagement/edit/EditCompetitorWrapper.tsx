// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import EditCompetitor from './EditCompetitor'
import { showToast } from 'src/utils'

// |-- Redux --|
import { useGetAllChannelQuery } from 'src/services/media/ChannelManagementServices'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import {
    useGetCompetitorByIdQuery,
    useUpdatecompetitorMutation,
} from 'src/services/media/CompetitorManagementServices'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetAllLanguageQuery } from 'src/services/LanguageService'
import { RootState, AppDispatch } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    competitorName: string
    companyName: string
    productName: string
    websiteLink: string
    schemePrice: string
    channelNameId: string
    startTime: string
    endTime: string
    mobileNumber: string
    date: string
    ytLink: string
    languageId: string
    productCategory: string
    images: [
        {
            image: ''
        }
    ]
}

const EditCompetitorWrapper = (props: Props) => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const params = useParams()
    const id = params.id

    // Initiate Method
    const [editCompetitors] = useUpdatecompetitorMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    // Hook
    const { items } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetCompetitorByIdQuery(id || ''),
    })

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
        competitorName: items?.competitorName || '',
        companyName: items?.channelNameId || '',
        productName: items?.productName || '',
        websiteLink: items?.websiteLink || '',
        ytLink: items?.ytLink || '',
        schemePrice: items?.schemePrice || '',
        channelNameId: items?.channelNameId || '',
        startTime: items?.startTime || '',
        endTime: items?.endTime || '',
        mobileNumber: items?.mobileNumber || '',
        date: items?.date || '',
        languageId: items?.languageId ? items?.languageId : '',
        productCategory: items?.productCategory,
        images:
            items?.image?.map((ele: any) => {
                return {
                    image: ele?.image,
                }
            }) || [],
    }

    // Form Validation Schema
    const validationSchema = object({
        competitorName: string().required('Required'),
        companyName: string().required('Required'),
        productName: string().required('Required'),
        websiteLink: string(),
        ytLink: string().url('Invalid URL'),
        schemePrice: string(),
        channelNameId: string().required('Required'),
        startTime: string().required('Required'),
        endTime: string().required('Required'),
        mobileNumber: string()
            .required('Required')
            .min(10, 'Number should be 10 digits')
            .max(10, 'maximum 10 digit')
            .required('Required'),
        date: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            editCompetitors({
                body: {
                    competitorName: values.competitorName,
                    productName: values.productName,
                    websiteLink: values.websiteLink,
                    ytLink: values.ytLink,
                    productCategory: values.productCategory,
                    schemePrice: values.schemePrice,
                    channelNameId: values.channelNameId || '',
                    startTime: values.startTime,
                    endTime: values.endTime,
                    date: values.date,
                    image: values.images?.map((ele) => ele?.image) || [],
                    mobileNumber: values.mobileNumber,
                    languageId: values.languageId,
                    companyId: userData?.companyId || '',
                },
                id: id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Competitor updated successfully!')
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
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <EditCompetitor
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        dropdownOptions={dropdownOptions}
                    />
                )
            }}
        </Formik>
    )
}

export default EditCompetitorWrapper
