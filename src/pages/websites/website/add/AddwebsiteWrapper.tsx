import React, { useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import AddWebsite from './AddWebsite'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useAddWebsiteMutation } from 'src/services/websites/WebsiteServices'
import WebsiteLayout from '../../WebsiteLayout'

type Props = {}

export type FormInitialValues = {
    websiteName: string
}

const AddWebsiteWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addWebsite] = useAddWebsiteMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        websiteName: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        websiteName: string().required('Website Name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addWebsite({
                websiteName: values.websiteName,
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Website added successfully!')
                        navigate('/website/Website')
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
        <WebsiteLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddWebsite
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </WebsiteLayout>
    )
}

export default AddWebsiteWrapper
