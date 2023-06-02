import React, { useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import AddAttribute from './AddAttribute'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { useAddAttributesMutation } from 'src/services/AttributeService'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

type Props = {}

export type FormInitialValues = {
    attributeName: string
}

const AddAttributeWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addAttribute] = useAddAttributesMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        attributeName: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        attributeName: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addAttribute({
                attributeName: values.attributeName,
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/configurations/attributes')
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
        <ConfigurationLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddAttribute
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default AddAttributeWrapper
