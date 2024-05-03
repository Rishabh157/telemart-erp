// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import EditCompanyBranch from './EditCompanyBranch'

import {
    useGetCompanyBranchByIdQuery,
    useUpdateCompanyBranchMutation,
} from 'src/services/CompanyBranchService'
import { showToast } from 'src/utils'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    branchName: string
    branchCode: string
    company: string
}

const EditCompanyBranchWrapper = (props: Props) => {
    const params = useParams()
    const Id = params.id
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetCompanyBranchByIdQuery(Id),
    })
    const [updateCompanyBranch] = useUpdateCompanyBranchMutation()
    // Form Initial Values
    const initialValues: FormInitialValues = {
        branchName: selectedItem?.branchName,
        branchCode: selectedItem?.branchCode,
        company: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        branchName: string().required('Branch name is required'),
        branchCode: string().required('Branch code is required'),
    })
    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        updateCompanyBranch({
            body: {
                branchName: values.branchName,
                branchCode: values.branchCode,
                companyId: userData?.companyId || '',
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

    return (
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
    )
}

export default EditCompanyBranchWrapper
