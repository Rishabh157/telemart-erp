// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object } from 'yup'

// |-- Internal Dependencies --|
import AddCustomerInfoForm from './AddCustomerInfoForm'
import { showToast } from 'src/utils'

// |-- Redux --|
import { useAddCustomerInfoMutation } from 'src/services/MoneybackServices'

// |-- Types --|
type Props = {
    moneybackRequestId: any
    handleClose: () => void
}

export type FormInitialValues = {
    id: string
    customerNumber: string
    alternateNumber: string
    bankName: string
    accountNumber: string
    ifscCode: string
    ccRemark: string
}

const AddCustomerInfoFormWrapper = ({
    moneybackRequestId,
    handleClose,
}: Props) => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addCustomerInfo] = useAddCustomerInfoMutation()

    // Form Initial Values
    const initialValues: FormInitialValues = {
        id: moneybackRequestId || '',
        customerNumber: '',
        alternateNumber: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        ccRemark: '',
    }

    const validationSchema = object({})

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)

        const formatedValues = {
            id: moneybackRequestId,
            customerNumber: values?.customerNumber,
            alternateNumber: values?.alternateNumber,
            bankName: values?.bankName,
            accountNumber: values?.accountNumber,
            ifscCode: values?.ifscCode,
            ccRemark: values?.ccRemark,
        }

        setTimeout(() => {
            addCustomerInfo(formatedValues).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        handleClose()
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
                    <AddCustomerInfoForm
                        formikProps={formikProps}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}

export default AddCustomerInfoFormWrapper
