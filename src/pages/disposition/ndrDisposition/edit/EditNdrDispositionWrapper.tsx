import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string, array } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import {
    useGetNdrdispositionByIdQuery,
    useUpdateNdrDispositionMutation,
} from 'src/services/configurations/NdrDisositionServices'
import { useNavigate, useParams } from 'react-router-dom'
import { setSelectedDispositionOne } from 'src/redux/slices/configuration/ndrDispositionSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import EditNdrDisposition from './EditNdrDisposition'

export type FormInitialValues = {
    dispositionName: string
    priority: string
    smsType: string
    emailType: string
    rtoAttempt: string[]
}

const EditNdrDispositionWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [editDispositionOne] = useUpdateNdrDispositionMutation()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState(false)

    const { selectedDispositionOne }: any = useSelector(
        (state: RootState) => state?.ndrDisposition
    )

    const { data, isLoading, isFetching } = useGetNdrdispositionByIdQuery(Id)
    const initialValues: FormInitialValues = {
        dispositionName: selectedDispositionOne?.ndrDisposition || '',
        priority: selectedDispositionOne?.priority,
        smsType: selectedDispositionOne?.smsType,
        emailType: selectedDispositionOne?.emailType,
        rtoAttempt: selectedDispositionOne?.rtoAttempt || [],
    }

    useEffect(() => {
        if (!isLoading && !isFetching)
            dispatch(setSelectedDispositionOne(data?.data))
    }, [data, dispatch, isFetching, isLoading])

    const validationSchema = object({
        dispositionName: string().required('NDR Disposition is required'),
        priority: string().required('Priority is required'),
        smsType: string().required('SMS Type is required'),
        emailType: string().required('Email Type is required'),
        rtoAttempt: array()
            .of(string())
            .test(
                'at-least-one-selected',
                'At least one value must be selected',
                function (value: any) {
                    return value.length > 0
                }
            )
            .nullable()
            .default([]),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            editDispositionOne({
                body: {
                    ndrDisposition: values?.dispositionName,
                    priority: values?.priority,
                    smsType: values?.smsType,
                    emailType: values?.emailType,
                    rtoAttempt: values?.rtoAttempt,
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/dispositions/ndr-disposition')
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

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <EditNdrDisposition
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default EditNdrDispositionWrapper
