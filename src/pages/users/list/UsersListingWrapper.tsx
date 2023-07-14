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

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetNewUsersQuery } from 'src/services/UserServices'
import UsersListing from './UsersListing'
import {
    getDepartmentLabel,
    //getUserRoleLabel,
} from 'src/utils/GetHierarchyByDept'
import { getAllowedAuthorizedColumns } from 'src/userAccess/getAuthorizedModules'
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
} from 'src/models/userAccess/UserAccess.model'
//import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
//import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/NewUserSlice'

const UsersListingWrapper = () => {
    const userState: any = useSelector((state: RootState) => state.newUser)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    const { items, page, rowsPerPage, searchValue } = userState
    const [showDropdown, setShowDropdown] = useState(false)
    //const [currentId, setCurrentId] = useState('')
    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()
    const { data, isFetching, isLoading } = useGetNewUsersQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['firstName', 'mobile', 'lastName'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
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
            field: 'UserName',
            headerName: 'User Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => (
                <span>
                    {' '}
                    {row.firstName} {row.lastName}{' '}
                </span>
            ),
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: any) => {
                return <span> {row.email} </span>
            },
        },
        {
            field: 'mobile',
            headerName: 'Mobile no.',
            flex: 'flex-[1_1_0%]',
        },
        {
            field: 'userDepartment',
            headerName: 'User Department',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => {
                return <span> {getDepartmentLabel(row.userDepartment)} </span>
            },
        },
        // {
        //     field: 'userRole',
        //     headerName: 'User Role',
        //     flex: 'flex-[1_1_0%]',
        //     renderCell: (row: any) => {
        //         return (
        //             <span>
        //                 {' '}
        //                 {getUserRoleLabel(
        //                     row.userRole,
        //                     row.userDepartment
        //                 )}{' '}
        //             </span>
        //         )
        //     },
        // },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.8_0.8_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit
                    //isDelete
                    handleEditActionButton={() => {
                        navigate(`/users/${row?._id}`)
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
                        //setCurrentId(row?._id)
                    }}
                />
            ),
            align: 'end',
        },
    ]

    // const handleDelete = () => {
    //     setShowDropdown(false)
    //     deleteUser(currentId).then((res) => {
    //         if ('data' in res) {
    //             if (res?.data?.status) {
    //                 showToast('success', 'User deleted successfully!')
    //             } else {
    //                 showToast('error', res?.data?.message)
    //             }
    //         } else {
    //             showToast(
    //                 'error',
    //                 'Something went wrong, Please try again later'
    //             )
    //         }
    //     })
    // }

    return (
        <SideNavLayout>
            <UsersListing
                columns={getAllowedAuthorizedColumns(
                    checkUserAccess,
                    columns,
                    UserModuleNameTypes.user,
                    UserModuleActionTypes.List
                )}
                rows={items}
                setShowDropdown={() => {}}
            />
        </SideNavLayout>
    )
}

export default UsersListingWrapper
