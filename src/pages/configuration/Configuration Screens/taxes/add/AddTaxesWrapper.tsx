import React, { useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import AddTaxes from './AddTaxes'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { useNavigate } from 'react-router-dom'
import { showToast } from 'src/utils'
import { useAddTaxesMutation } from 'src/services/TaxesService'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

type Props = {}

export type FormInitialValues = {
    taxName: string
}

const AddTaxesWrapper = (props: Props) => {
    // Form Initial Values
    const [apiStatus, setApiStatus] = useState<boolean>(false)
   const dispatch= useDispatch()
    const [addTaxes] = useAddTaxesMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const navigate = useNavigate()

    const initialValues: FormInitialValues = {
        taxName: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        taxName: string().required('Tax Name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        setTimeout(() => {
            addTaxes({
                taxName: values.taxName,
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Taxes added successfully!')
                        navigate('/configurations/taxes')
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
                        <AddTaxes
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default AddTaxesWrapper
