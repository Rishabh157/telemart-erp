import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useAddNdrDispositionMutation } from 'src/services/configurations/NdrDisositionServices'
import { useNavigate } from 'react-router-dom'

import { setFieldCustomized } from 'src/redux/slices/authSlice'
import AddNdrDisposition from './AddNdrDisposition'

export type FormInitialValues = {
    ndrDisposition: string
    priority: string
    smsType: string
    emailType: string
    rtoAttempt: string
}
const AddNdrDispositionWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [addDisposition] = useAddNdrDispositionMutation()
    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        ndrDisposition: '',
        priority: '',
        smsType: '',
        emailType: '',
        rtoAttempt: '',
    }
    const validationSchema = object({
        ndrDisposition: string().required('Required'),
        priority: string().required('Required'),
        smsType: string().required('Required'),
        emailType: string().required('Required'),
        rtoAttempt: string().required('Required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addDisposition({
                ndrDisposition: values.ndrDisposition,
                priority: values.priority,
                smsType: values.smsType,
                emailType: values.emailType,
                rtoAttempt: values.rtoAttempt,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
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
            <>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmitHandler}
                >
                    {(formikProps) => {
                        return (
                            <AddNdrDisposition
                                apiStatus={apiStatus}
                                formikProps={formikProps}
                            />
                        )
                    }}
                </Formik>
            </>
        </>
    )
}

export default AddNdrDispositionWrapper
