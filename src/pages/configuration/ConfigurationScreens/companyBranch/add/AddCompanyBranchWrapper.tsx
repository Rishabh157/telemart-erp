/// ==============================================
// Filename:AddCompanyBranchWrapper.tsx
// Type: Add Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import AddCompanyBranch from './AddCompanyBranch'

import { useAddCompanyBranchMutation } from 'src/services/CompanyBranchService'
import { showToast } from 'src/utils'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    branchName: string
}

const AddCompanyBranchWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [addCompanyBranch] = useAddCompanyBranchMutation()
    // Form Initial Values
    const initialValues: FormInitialValues = {
        branchName: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        branchName: string().required('Branch name is required'),
    })
    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        addCompanyBranch({
            branchName: values.branchName,
            companyId: userData?.companyId || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Added successfully!')
                    navigate('/configurations/company-branch')
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
                    <AddCompanyBranch
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddCompanyBranchWrapper
