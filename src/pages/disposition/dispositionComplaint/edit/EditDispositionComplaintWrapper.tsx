/// ==============================================
// Filename:EditDispositionComplaintWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { Formik } from 'formik'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import AddDispositionOne from './EditDispositionComplaint'

import {
    useGetdispositionComplaintByIdQuery,
    useUpdatedispositionComplaintMutation,
} from 'src/services/configurations/DispositionComplaintServices'

// |-- Redux --|
import { setSelectedDispositionComplaint } from 'src/redux/slices/configuration/dispositionComplaintSlice'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Types --|
export type FormInitialValues = {
    dispositionName: string
    priority: string
    emailType: string
    smsType: string
}
const EditDispositionComplaintWrappper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [editDispositionComplaint] = useUpdatedispositionComplaintMutation()
    const params = useParams()
    const Id = params.id
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const { selectedDispositionCompalint }: any = useSelector(
        (state: RootState) => state.dispositionComplaint
    )

    const { data, isLoading, isFetching } =
        useGetdispositionComplaintByIdQuery(Id)

    const initialValues: FormInitialValues = {
        dispositionName: selectedDispositionCompalint?.dispositionName || '',
        priority: selectedDispositionCompalint?.priority || '',
        emailType: selectedDispositionCompalint?.emailType || '',
        smsType: selectedDispositionCompalint?.smsType || '',
    }

    const validationSchema = object({
        dispositionName: string().required('Disposition Name is required'),
        priority: string().required('Priority is required'),
        emailType: string().required('Email Type is required'),
        smsType: string().required('SMS Type is required'),
    })
    useEffect(() => {
        if (!isLoading && !isFetching)
            dispatch(setSelectedDispositionComplaint(data?.data || []))
    }, [data, dispatch, isFetching, isLoading])

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            editDispositionComplaint({
                body: {
                    dispositionName: values.dispositionName,
                    priority: values.priority,
                    emailType: values.emailType,
                    smsType: values.smsType,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
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
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddDispositionOne
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default EditDispositionComplaintWrappper
