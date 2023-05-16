import React, { useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import AddLanguage from './AddLanguage'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { useAddLanguageMutation } from 'src/services/LanguageService'
import { showToast } from 'src/utils'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'

type Props = {}

export type FormInitialValues = {
    languageName: string
}

const AddLanguageWrapper = (props: Props) => {
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [addLanguage] = useAddLanguageMutation()
    // Form Initial Values
    const initialValues: FormInitialValues = {
        languageName: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        languageName: string().required('Language Name is required'),
    })
    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        addLanguage({
            languageName: values.languageName,
            companyId: userData?.companyId || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Langugae added successfully!')
                    navigate('/configurations/language')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
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
                        <AddLanguage
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default AddLanguageWrapper
