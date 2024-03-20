// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import AddCustomerCareApprovedForm from './AddCustomerCareApprovedForm'

// import { showToast } from '../../../../utils'

// |-- Redux --|
// import { useHouseArrestDealerApprovalMutation } from '../../../../services/HouseArrestServices'

import { useCustomerCareFirstApprovalMutation } from 'src/services/HouseArrestServices'
import { showToast } from 'src/utils'

// |-- Types --|
type Props = {
    complainId: string
    handleClose: () => void
}

export type FormInitialValues = {
    id: string
    settledAmount: string
    ccRemark: string
}

const AddCustomerCareApprovedFormWrapper = ({
    complainId,
    handleClose,
}: Props) => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [customerCareApproval] = useCustomerCareFirstApprovalMutation()

    // Form Initial Values
    const initialValues: FormInitialValues = {
        id: complainId || '',
        settledAmount: '',
        ccRemark: '',
    }

    const validationSchema = object({
        settledAmount: string().required('Please enter setteled amount'),
        ccRemark: string().required('Please enter remark'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)

        const formatedValues = {
            id: complainId || '',
            settledAmount: values?.settledAmount || 0,
            ccRemark: values?.ccRemark,
        }

        setTimeout(() => {
            customerCareApproval(formatedValues).then((res: any) => {
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
                    <AddCustomerCareApprovedForm
                        formikProps={formikProps}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}

export default AddCustomerCareApprovedFormWrapper
