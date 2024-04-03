/// ==============================================
// Filename:UsersListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
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
import {
    getDepartmentLabel,
    //getUserRoleLabel,
} from 'src/utils/GetHierarchyByDept'

import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/NewUserSlice'
import { Chip } from '@mui/material'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import { UsersListResponse } from 'src/models'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import ChangePasswordWrapper from '../ChangePassword/ChangePasswordWrapper'

const UsersListingWrapper = () => {
    const userState: any = useSelector((state: RootState) => state.newUser)
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items, page, rowsPerPage, searchValue, isActive } = userState
    const [showDropdown, setShowDropdown] = useState(false)
    const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
        useState<boolean>(false)
    const [currentId, setCurrentId] = useState('')
    const navigate = useNavigate()
    const [deactiveUser] = useDeactiveUserMutation()
    const dispatch = useDispatch<AppDispatch>()
    const { data, isFetching, isLoading } = useGetNewUsersQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['userName', 'mobile', 'email', 'userRole', 'userDepartment'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
            },
            {
                fieldName: 'isActive',
                value:
                    isActive === '' ? '' : isActive === 'ACTIVE' ? true : false,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data])

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
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
                    // handleDeleteActionButton={() => {
                    //     showConfirmationDialog({
                    //         title: 'Delete User',
                    //         text: 'Do you want to delete User?',
                    //         showCancelButton: true,
                    //         next: (res: any) => {
                    //             return res.isConfirmed
                    //                 ? handleDelete()
                    //                 : setShowDropdown(false)
                    //         },
                    //     })
                    // }}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                />
            ),
            
        },
        {
            field: 'userName',
            headerName: 'User Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.USER_LIST_USER_NAME,
            renderCell: (row: UsersListResponse) => (
                <span> {row.userName}</span>
            ),
        },
        {
            field: 'firstName',
            headerName: 'Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'capitalize',
            name: UserModuleNameTypes.USER_LIST_NAME,
            renderCell: (row: UsersListResponse) => (
                <span> {row.firstName?.concat(' ', row?.lastName)}</span>
            ),
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.USER_LIST_EMAIL,
            renderCell: (row: UsersListResponse) => {
                return <span> {row.email} </span>
            },
        },
        {
            field: 'mobile',
            headerName: 'Mobile no.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.USER_LIST_MOBILE_NUMBER,
        },
        {
            field: 'branchLabel',
            headerName: 'Branch Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.USER_LIST_BRANCH_NAME,
        },
        {
            field: 'isAgennt',
            headerName: 'Agent',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: UsersListResponse) => {
                return row?.isAgent ? <FaCheck color="#438a47" /> : null
            },
        },
        {
            field: 'userDepartment',
            headerName: 'User Department',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.USER_LIST_USER_DEPARTMENT,
            renderCell: (row: UsersListResponse) => {
                return <span> {getDepartmentLabel(row.userDepartment)} </span>
            },
        },
        {
            field: 'userRole',
            headerName: 'User Role',
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
                                        text: `Do you want to ${row.isActive ? 'Deactive' : 'Active'
                                            }`,
                                        showCancelButton: true,
                                        next: (res) => {
                                            return res.isConfirmed
                                                ? handleDeactive(row?._id)
                                                : setShowDropdown(false)
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
                                        text: `Do you want to ${row.isActive ? 'Deactive' : 'Active'
                                            }`,
                                        showCancelButton: true,
                                        next: (res) => {
                                            return res.isConfirmed
                                                ? handleDeactive(row?._id)
                                                : setShowDropdown(false)
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
        setShowDropdown(false)
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
            <UsersListing
                columns={columns}
                rows={items}
                setShowDropdown={() => { }}
            />

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
