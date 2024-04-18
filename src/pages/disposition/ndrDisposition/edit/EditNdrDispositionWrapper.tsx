import { Formik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import {
    useGetNdrdispositionByIdQuery,
    useUpdateNdrDispositionMutation,
} from 'src/services/configurations/NdrDisositionServices'
import { showToast } from 'src/utils'
import { array, object, string } from 'yup'
import EditNdrDisposition from './EditNdrDisposition'

export type FormInitialValues = {
    dispositionName: string
    priority: string
    smsType: string
    emailType: string
    subDispositions: string[]
    rtoAttempt: string
}

const EditNdrDispositionWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [editDispositionOne] = useUpdateNdrDispositionMutation()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState(false)

    const { items: selectedDispositionOne } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetNdrdispositionByIdQuery(Id),
    })

    const initialValues: FormInitialValues = {
        dispositionName: selectedDispositionOne?.displayName || '',
        priority: selectedDispositionOne?.priority,
        smsType: selectedDispositionOne?.smsType,
        emailType: selectedDispositionOne?.emailType,
        subDispositions: selectedDispositionOne?.subDispositions || [],
        rtoAttempt: selectedDispositionOne?.rtoAttempt,
    }

    const validationSchema = object({
        dispositionName: string().required('NDR Disposition is required'),
        priority: string().required('Priority is required'),
        smsType: string().required('SMS Type is required'),
        emailType: string().required('Email Type is required'),
        subDispositions: array()
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
        rtoAttempt: string().required('RTO Attempt is required'),
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
                    subDispositions: values.subDispositions,
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
