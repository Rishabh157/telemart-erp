/// ==============================================
// Filename:AddDispositionComplaintWrapper.tsx
// Type: Add Component
// Last Updated: FEB 26, 2024
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { object, string } from 'yup'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'

import { useAdddispositionComplaintMutation } from 'src/services/configurations/DispositionComplaintServices'
import AddDispositionComplaint from './AddDispositionComplaintOne'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
export type FormInitialValues = {
    dispositionName: string
    priority: string
    emailType: string
    smsType: string
}

const AddDispositionComplaintWrappper = () => {
    const navigate = useNavigate()
    const [addDispositionCompalint] = useAdddispositionComplaintMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        dispositionName: '',
        priority: '',
        emailType: '',
        smsType: '',
    }

    const validationSchema = object({
        dispositionName: string().required('Disposition Name is required'),
        priority: string().required('Priority is required'),
        emailType: string().required('Email Type is required'),
        smsType: string().required('SMS Type is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addDispositionCompalint({
                dispositionName: values.dispositionName,
                priority: values.priority,
                emailType: values.emailType,
                smsType: values.smsType,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/dispositions/disposition-complaint')
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddDispositionComplaint
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddDispositionComplaintWrappper
