/// ==============================================
// Filename:EditCompanyBranchWrapper.tsx
// Type: Edit Component
// Last Updated: SEPTEMBER 11, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import EditCompanyBranch from './EditCompanyBranch'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { showToast } from 'src/utils'
import {
    useGetCompanyBranchByIdQuery,
    useUpdateCompanyBranchMutation
} from 'src/services/CompanyBranchService'
import { setSelectedItem } from 'src/redux/slices/companyBranchSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    branchName: string
    company: string
}

const EditCompanyBranchWrapper = (props: Props) => {
    const params = useParams()
    const Id = params.id
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.companybranch
    )
    console.log('selectedItem', selectedItem)

    const { data, isLoading, isFetching } = useGetCompanyBranchByIdQuery(Id)
    const [updateCompanyBranch] = useUpdateCompanyBranchMutation()
    // Form Initial Values
    const initialValues: FormInitialValues = {
        branchName: selectedItem?.branchName,
        company: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        branchName: string().required('Required'),
    })
    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        console.log('update ,', )
        console.log('update ,', )
        updateCompanyBranch({
            body: {
                branchName: values.branchName,
                company: userData?.companyId || '',
            },
            id: Id || '',
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Updated successfully!')
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
    useEffect(() => {
        dispatch(setSelectedItem(data?.data[0]))
    }, [dispatch, data, isLoading, isFetching])
    return (
        <ConfigurationLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditCompanyBranch
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default EditCompanyBranchWrapper
