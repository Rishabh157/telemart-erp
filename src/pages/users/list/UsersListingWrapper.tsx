import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import {
    useGetNewUsersQuery,
    useDeactiveUserMutation,
} from 'src/services/UserServices'
import UsersListing from './UsersListing'
import { getDepartmentLabel } from 'src/utils/GetHierarchyByDept'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import useGetCustomListingData from '../../../hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { Chip } from '@mui/material'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import { UsersListResponse } from 'src/models'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import ChangePasswordWrapper from '../ChangePassword/ChangePasswordWrapper'

const UsersListingWrapper = () => {
    useUnmountCleanup()

    // state
    const [currentId, setCurrentId] = useState('')
    const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
        useState<boolean>(false)

    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue, isActive } = listingPaginationState
    const { userData } = useSelector((state: RootState) => state?.auth)

    const navigate = useNavigate()
    const [deactiveUser] = useDeactiveUserMutation()

    // pagination api
    const { items } = useGetCustomListingData<UsersListResponse[]>({
        useEndPointHook: useGetNewUsersQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: [
                'userName',
                'mobile',
                'email',
                'userRole',
                'userDepartment',
            ],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
                },
                {
                    fieldName: 'isActive',
                    value:
                        isActive === ''
                            ? ''
                            : isActive === 'ACTIVE'
                            ? true
                            : false,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.8_0.8_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(UserModuleNameTypes.ACTION_USER_EDIT)}
                    //isDelete
                    handleEditActionButton={() => {
                        navigate(`/users/${row?._id}`)
                    }}
                    isCustomBtn
                    customBtnText="Change Password"
                    handleCustomActionButton={() => {
                        setChangePasswordDialogOpen(true)
                        setCurrentId(row?._id)
                    }}
                    handleOnAction={() => {
                        setCurrentId(row?._id)
                    }}
                />
            ),
        },
        {
            field: 'userName',
            headerName: 'User Name',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.USER_LIST_USER_NAME,
            renderCell: (row: UsersListResponse) => (
                <span> {row.userName}</span>
            ),
        },
        {
            field: 'firstName',
            headerName: 'Name',
            extraClasses: 'min-w-[150px] capitalize',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.USER_LIST_NAME,
            renderCell: (row: UsersListResponse) => (
                <span> {row.firstName?.concat(' ', row?.lastName)}</span>
            ),
        },
        {
            field: 'email',
            headerName: 'Email',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.USER_LIST_EMAIL,
            renderCell: (row: UsersListResponse) => {
                return <span> {row.email} </span>
            },
        },
        {
            field: 'mobile',
            headerName: 'Mobile no.',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.USER_LIST_MOBILE_NUMBER,
        },
        {
            field: 'branchLabel',
            headerName: 'Branch Name',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.USER_LIST_BRANCH_NAME,
        },
        {
            field: 'isAgennt',
            headerName: 'Agent',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: UsersListResponse) => {
                return row?.isAgent ? <FaCheck color="#438a47" /> : null
            },
        },
        {
            field: 'userDepartment',
            headerName: 'User Department',
            extraClasses: 'min-w-[200px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.USER_LIST_USER_DEPARTMENT,
            renderCell: (row: UsersListResponse) => {
                return <span> {getDepartmentLabel(row.userDepartment)} </span>
            },
        },
        {
            field: 'userRole',
            headerName: 'User Role',
            extraClasses: 'min-w-[200px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.USER_LIST_USER_ROLE,
            renderCell: (row: UsersListResponse) =>
                row?.userRole !== 'ADMIN' ? (
                    <span
                        className="underline text-primary-main"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                            navigate(`/configurations/user-access`, {
                                state: {
                                    dept: row?.userDepartment,
                                    userRole: row?.userRole,
                                    userId: row?._id,
                                },
                            })
                        }
                    >
                        {row.userRole.replaceAll('_', ' ')}
                    </span>
                ) : (
                    <span>-</span>
                ),
        },
        {
            field: 'status',
            headerName: 'Status',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.USER_LIST_STATUS,
            renderCell: (row: any) => {
                return (
                    <span className="block w-full text-left px-2 py-1 cursor-pointer">
                        {row.isActive ? (
                            <Chip
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Deactive User',
                                        text: `Do you want to ${
                                            row.isActive ? 'Deactive' : 'Active'
                                        }`,
                                        showCancelButton: true,
                                        next: (res) => {
                                            return res.isConfirmed
                                                ? handleDeactive(row?._id)
                                                : null
                                        },
                                    })
                                }}
                                className="cursor-pointer"
                                label="Active"
                                color="success"
                                variant="outlined"
                                size="small"
                            />
                        ) : (
                            <Chip
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Deactive Scheme',
                                        text: `Do you want to ${
                                            row.isActive ? 'Deactive' : 'Active'
                                        }`,
                                        showCancelButton: true,
                                        next: (res) => {
                                            return res.isConfirmed
                                                ? handleDeactive(row?._id)
                                                : null
                                        },
                                    })
                                }}
                                className="cursor-pointer"
                                label="Deactive"
                                color="error"
                                variant="outlined"
                                size="small"
                            />
                        )}
                    </span>
                )
            },
        },
    ]

    const handleDeactive = (rowId: string) => {
        deactiveUser(rowId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Status changed successfully!')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast(
                    'error',
                    'Something went wrong, Please try again later'
                )
            }
        })
    }

    return (
        <SideNavLayout>
            <UsersListing columns={columns} rows={items} />

            {/* Usre Change Password */}
            <DialogLogBox
                maxWidth="sm"
                isOpen={changePasswordDialogOpen}
                handleClose={() => {
                    setChangePasswordDialogOpen(false)
                }}
                component={
                    <ChangePasswordWrapper
                        userId={currentId}
                        onClose={() => setChangePasswordDialogOpen(false)}
                    />
                }
            />
        </SideNavLayout>
    )
}

export default UsersListingWrapper
