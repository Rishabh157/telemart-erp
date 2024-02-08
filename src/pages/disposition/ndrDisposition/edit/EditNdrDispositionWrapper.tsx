import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import {
    useGetNdrdispositionByIdQuery,
    useUpdateNdrDispositionMutation,
} from 'src/services/configurations/NdrDisositionServices'
import { useNavigate, useParams } from 'react-router-dom'
import DispositionLayout from '../../DispositionLayout'
import { setSelectedDispositionOne } from 'src/redux/slices/configuration/ndrDispositionSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import EditNdrDisposition from './EditNdrDisposition'

export type FormInitialValues = {
    dispositionName: string
    priority: string
    smsType: string
    emailType: string
    rtoAttempt: string
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
        rtoAttempt: selectedDispositionOne?.rtoAttempt,
    }

    useEffect(() => {
        if (!isLoading && !isFetching)
            dispatch(setSelectedDispositionOne(data?.data))
    }, [data, dispatch, isFetching, isLoading])

    const validationSchema = object({
        dispositionName: string().required('Required'),
        priority: string().required('Required'),
        smsType: string().required('Required'),
        emailType: string().required('Required'),
        rtoAttempt: string().required('Required'),
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
        <>
            <DispositionLayout>
                {' '}
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
            </DispositionLayout>
        </>
    )
}

export default EditNdrDispositionWrapper
