// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import AddProductReplacementCustomerInfoForm from './AddProductReplacementCustomerInfoForm'
import { showToast } from 'src/utils'

// |-- Redux --|
import { useAddProductReplacementCustomerInfoMutation } from 'src/services/ProductReplacementServices'

// |-- Types --|
type Props = {
    moneybackRequestId: any
    customerMobileNum: string
    handleClose: () => void
}

export type FormInitialValues = {
    id: string
    customerNumber: string
    alternateNumber: string
    productGroupId: string
    replacedSchemeId: string
    replacedSchemeLabel: string
    ccRemark: string
}

const AddProductReplacementCustomerInfoFormWrapper = ({
    moneybackRequestId,
    customerMobileNum,
    handleClose,
}: Props) => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addCustomerInfo] = useAddProductReplacementCustomerInfoMutation()

    // Form Initial Values
    const initialValues: FormInitialValues = {
        id: moneybackRequestId || '',
        customerNumber: customerMobileNum,
        alternateNumber: '',
        productGroupId: '',
        replacedSchemeId: '',
        replacedSchemeLabel: '',
        ccRemark: '',
    }

    const validationSchema = object({
        customerNumber: string()
            .min(10)
            .max(10)
            .required('Please enter mobile number'),
        alternateNumber: string()
            .min(10)
            .max(10)
            .required('Please enter mobile number'),
        productGroupId: string().required('Please select product group'),
        replacedSchemeId: string().required('Please select replace scheme'),
        replacedSchemeLabel: string(),
        ccRemark: string().required('Please enter remark'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)

        const formatedValues = {
            id: moneybackRequestId,
            customerNumber: values?.customerNumber,
            alternateNumber: values?.alternateNumber,
            productGroupId: values?.productGroupId,
            replacedSchemeId: values?.replacedSchemeId,
            replacedSchemeLabel: values?.replacedSchemeLabel,
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
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddProductReplacementCustomerInfoForm
                        formikProps={formikProps}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}

export default AddProductReplacementCustomerInfoFormWrapper
