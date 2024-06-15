// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import AddCountryDialog from './AddCountryDialog'
import { showToast } from 'src/utils'
import { useAddCountryMutation } from 'src/services/CountryService'

// |-- Types --|
type Props = {
    onClose: () => void
}

export type FormInitialValues = {
    countryName: string
}
const AddCountryWrapper = ({ onClose }: Props) => {
    const [addCountry] = useAddCountryMutation()
    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        countryName: '',
    }
    const validationSchema = object({
        countryName: string().required('Country Name is required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addCountry({
                countryName: values.countryName,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        onClose()
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
                    <AddCountryDialog
                        onClose={onClose}
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddCountryWrapper
