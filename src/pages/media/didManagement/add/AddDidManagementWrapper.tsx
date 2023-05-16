import React, { useState } from 'react'
import MediaLayout from '../../MediaLayout'
import { useAddDidMutation } from 'src/services/media/DidManagementServices'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import AddDidManagements from './AddDidManagement'

export type FormInitialValues = {
    didNumber: string
    companyId: string
}

const AddDidManagementWrapper = () => {
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [AddDidManagement] = useAddDidMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        didNumber: '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        didNumber: string().required('Did Number is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddDidManagement({
                didNumber: values.didNumber,
                companyId: values.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Did Number added successfully!')
                        navigate('/media/did')
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
        <MediaLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <AddDidManagements
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </MediaLayout>
    )
}

export default AddDidManagementWrapper
