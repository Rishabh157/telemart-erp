// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import AddAccountApprovedForm from './AddAccountApprovedForm'
import { showToast } from 'src/utils'

// |-- Redux --|
import { useAddAccountApprovalMutation } from 'src/services/MoneybackServices'

// |-- Types --|
type Props = {
    moneybackRequestId: any
    complaintNumber: string
    handleClose: () => void
}

export type FormInitialValues = {
    id: string
    accountRemark: string
    accountApproval: boolean
    settledAmount: string
    amountInWords: string
    complaintNumber: string
}

const AddAccountApprovedFormWrapper = ({
    moneybackRequestId,
    complaintNumber,
    handleClose,
}: Props) => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addAccountApprovalInfo] = useAddAccountApprovalMutation()

    // Form Initial Values
    const initialValues: FormInitialValues = {
        id: moneybackRequestId || '',
        accountApproval: false,
        settledAmount: '',
        accountRemark: '',
        amountInWords: '',
        complaintNumber: complaintNumber,
    }

    const validationSchema = object({
        // settledAmount: string().required('Please enter settled amount'),
        // amountInWords: string().required('Please enter amount in words'),
        accountRemark: string().required('Please enter remark'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)

        const formatedValues = {
            id: moneybackRequestId || '',
            accountApproval: values?.accountApproval,
            settledAmount: values?.settledAmount,
            accountRemark: values?.accountRemark,
            amountInWords: values?.amountInWords,
            complaintNumber: values?.complaintNumber,
        }

        setTimeout(() => {
            addAccountApprovalInfo(formatedValues).then((res: any) => {
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
                    <AddAccountApprovedForm
                        formikProps={formikProps}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}

export default AddAccountApprovedFormWrapper
