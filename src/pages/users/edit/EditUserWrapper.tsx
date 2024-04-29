// |-- Built-in Dependencies --|
import { useRef, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { boolean, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import {
    useGetUserByIdQuery,
    useUpdateNewUserMutation,
} from 'src/services/UserServices'
import { showToast } from 'src/utils'
import EditUser from './EditUser'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'
import { getHierarchyByDeptWithRole } from 'src/utils/GetHierarchyByDept'

// |-- Types --|
type Props = {}

interface UserData {
    firstName: string
    lastName: string
    userName: string
    mobile: string
    email: string
    userDepartment: string
    userRole: string
    companyId: string
    branchId: string
    password?: string
    allowedIp: string[]
    isAgent: boolean
    callCenterId: string | null
    floorManagerId: string | null
    teamLeadId: string | null
    mySenior: string | null
}
export type FormInitialValues = {
    firstName: string
    lastName: string
    userName: string
    mobile: string
    email: string
    branchId: string
    password: string
    userDepartment: string
    userRole: string
    companyId: string
    allowedIps: { allowedIp: string }[]
    isAgent: boolean
    callCenterId: string
    floorManagerId: string
    teamLeadId: string
    mySenior: string | null
}

export const regIndiaPhone = RegExp(/^[0]?[6789]\d{9}$/)

const EditUserWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id: any = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateNewUser] = useUpdateNewUserMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetUserByIdQuery(Id),
    })

    let allowedIps: any = []

    selectedItem?.allowedIp?.map((val: any) => {
        return allowedIps.push({ allowedIp: val })
    })
    const initialValues: FormInitialValues = {
        firstName: selectedItem?.firstName || '',
        lastName: selectedItem?.lastName || '',
        userName: selectedItem?.userName || '',
        mobile: selectedItem?.mobile || '',
        email: selectedItem?.email || '',
        branchId: selectedItem?.branchId || '',
        password: '',
        userDepartment: selectedItem?.userDepartment || '',
        userRole: selectedItem?.userRole || '',
        allowedIps: allowedIps || [],
        companyId: userData?.companyId || '',
        isAgent: selectedItem?.isAgent,
        callCenterId: selectedItem?.callCenterId,
        floorManagerId: selectedItem?.floorManagerId,
        teamLeadId: selectedItem?.teamLeadId,
        mySenior: selectedItem?.mySenior,
    }
    const ref = useRef<any>(null)
    const getSeniorValid = (userRole: any, schema: any) => {
        const position = getHierarchyByDeptWithRole({
            department: ref?.current?.values?.userDepartment as any,
        })

        if (userRole[0] === position) {
            return false
        }
        return true
    }

    // Form Validation Schema
    const validationSchema = object({
        firstName: string().required('First Name is required'),
        lastName: string().required('Last Name is required'),
        userName: string().required('User Name is required'),
        userRole: string().required('User Role is required'),
        // mobile: string().required('Mobile number is required'),
        email: string().required('Email is required'),
        isAgent: boolean(),
        teamLeadId: string().when(['isAgent'], (isAgent, schema) => {
            return isAgent[0]
                ? schema.required('Team Lead ID is required')
                : schema.notRequired()
        }),
        mySenior: string().when(['userRole'], (userRole, schema) => {
            return getSeniorValid(userRole, schema)
                ? schema.required('Senior is required')
                : schema.notRequired()
        }),
        floorManagerId: string().when(['isAgent'], (isAgent, schema) => {
            return isAgent[0]
                ? schema.required('Floor Manager is required')
                : schema.notRequired()
        }),
        callCenterId: string().when(
            'userDepartment',
            (userDepartment: any, schema: any) => {
                return userDepartment.includes('SALES_DEPARTMENT')
                    ? schema.required(
                          'Call center is required for sales department'
                      )
                    : schema.notRequired()
            }
        ),
        branchId: string().required('branch name is required'),
        userDepartment: string().required('User Department is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        let newAllowedIp = values?.allowedIps.map((ele) => {
            return ele.allowedIp
        })
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            const userDataToSend: UserData = {
                firstName: values.firstName || '',
                lastName: values.lastName || '',
                userName: values.userName || '',
                mobile: values.mobile || '',
                email: values.email || '',
                branchId: values.branchId || '',
                userDepartment: values.userDepartment || '',
                userRole: values.userRole || '',
                companyId: values.companyId || '',
                allowedIp: newAllowedIp[0]?.length ? newAllowedIp : [],
                isAgent: values.isAgent || false,
                callCenterId: values.callCenterId || null,
                floorManagerId: values.floorManagerId || null,
                teamLeadId: values.teamLeadId || null,
                mySenior: values?.mySenior,
            }

            if (values?.password) {
                userDataToSend.password = values.password // Corrected line
            }

            updateNewUser({
                body: userDataToSend,
                id: Id,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'User Updated successfully!')
                        navigate('/users')
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
    const { options } = useCustomOptions({
        useEndPointHook: useGetAllCallCenterMasterQuery(userData?.companyId, {
            skip: !userData?.companyId,
        }),
        keyName: 'callCenterName',
        value: '_id',
    })

    const dropDownOption = {
        callCenterOptions: options,
    }
    return (
        <SideNavLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
                innerRef={ref as any}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <EditUser
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                            dropDownOption={dropDownOption}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default EditUserWrapper
