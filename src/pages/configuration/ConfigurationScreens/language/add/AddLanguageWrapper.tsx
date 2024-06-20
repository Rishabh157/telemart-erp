// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import AddLanguage from './AddLanguage'

import { useAddLanguageMutation } from 'src/services/LanguageService'
import { showToast } from 'src/utils'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    languageName: string
}

const AddLanguageWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [addLanguage] = useAddLanguageMutation()
    // Form Initial Values
    const initialValues: FormInitialValues = {
        languageName: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        languageName: string().required('Language is required'),
    })
    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        addLanguage({
            languageName: values.languageName,
            companyId: userData?.companyId || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Added successfully!')
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
    )
}

export default AddLanguageWrapper
