// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import AddDispositionOne from './EditDispositionComplaint'

import {
    useGetdispositionComplaintByIdQuery,
    useUpdatedispositionComplaintMutation,
} from 'src/services/configurations/DispositionComplaintServices'

// |-- Redux --|
import { useNavigate, useParams } from 'react-router-dom'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

// |-- Types --|
export type FormInitialValues = {
    dispositionName: string
    priority: string
    emailType: string
    smsType: string
}
const EditDispositionComplaintWrappper = () => {
    const navigate = useNavigate()
    const [editDispositionComplaint] = useUpdatedispositionComplaintMutation()
    const params = useParams()
    const Id = params.id
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const { items: selectedDispositionCompalint } =
        useGetDataByIdCustomQuery<any>({
            useEndPointHook: useGetdispositionComplaintByIdQuery(Id),
        })
    const initialValues: FormInitialValues = {
        dispositionName: selectedDispositionCompalint?.displayName || '',
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
