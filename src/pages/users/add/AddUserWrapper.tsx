// |-- Built-in Dependencies --|
import { useRef, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { boolean, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useAddNewUserMutation } from 'src/services/UserServices'
import { showToast } from 'src/utils'
import AddUser from './AddUser'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { RootState } from 'src/redux/store'
import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'
import { getHierarchyByDeptWithRole } from 'src/utils/GetHierarchyByDept'

// |-- Types --|
type Props = {}

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

const AddUserWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addNewUser] = useAddNewUserMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const ref = useRef<any>(null)
    const initialValues: FormInitialValues = {
        firstName: '',
        lastName: '',
        userName: '',
        mobile: '',
        email: '',
        branchId: '',
        password: '',
        userDepartment: '',
        userRole: '',
        companyId: userData?.companyId || '',
        allowedIps: [
            {
                allowedIp: '',
            },
        ],
        isAgent: false,

        callCenterId: '',
        floorManagerId: '',
        teamLeadId: '',
        mySenior: null,
    }

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
        firstName: string().required('First name is required'),
        lastName: string().required('Last name is required'),
        userName: string().required('User name is required'),
        email: string().email().required('User email is required'),
        userRole: string().required('User role is required'),
        mySenior: string().when(['userRole'], (userRole, schema) => {
            return getSeniorValid(userRole, schema)
                ? schema.required('Senior is required')
                : schema.notRequired()
        }),
        isAgent: boolean(),
        teamLeadId: string().when(['isAgent'], (isAgent, schema) => {
            return isAgent[0]
                ? schema.required('Team lead is required')
                : schema.notRequired()
        }),
        floorManagerId: string().when(['isAgent'], (isAgent, schema) => {
            return isAgent[0]
                ? schema.required('Floor manager is required')
                : schema.notRequired()
        }),
        callCenterId: string().when(
            'userDepartment',
            (userDepartment: any, schema: any) => {
                return userDepartment.includes('SALES_DEPARTMENT')
                    ? schema.required(
                          'Call center is required for Sales department'
                      )
                    : schema.notRequired()
            }
        ),

        branchId: string().required('Branch name is required'),
        userDepartment: string().required('User department is required'),
        password: string().required('Password is required'),
        // mobile:string().required('Mobile number is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        let newAllowedIp = values?.allowedIps.map((ele) => {
            return ele.allowedIp
        })

        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addNewUser({
                firstName: values.firstName || '',
                lastName: values.lastName || '',
                userName: values.userName || '',
                mobile: values.mobile || '',
                email: values.email || '',
                branchId: values.branchId || '',
                password: values.password || '',
                userDepartment: values.userDepartment || '',
                userRole: values.userRole || '',
                companyId: values.companyId || '',
                allowedIp: newAllowedIp[0]?.length ? newAllowedIp : [],
                isAgent: values.isAgent,
                mySenior: values.mySenior || null,

                callCenterId: values.callCenterId || null,
                floorManagerId: values.floorManagerId || null,
                teamLeadId: values.teamLeadId || null,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'User added successfully!')
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
                innerRef={ref as any}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <AddUser
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

export default AddUserWrapper
