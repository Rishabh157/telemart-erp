/// ==============================================
// Filename:CompanyBranchListingWrapper.tsx
// Type: List Component
// Last Updated: SEPTEMBER 11, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { CompanyBranchListResponse } from 'src/models/CompanyBranch.model'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import CompanyBranch from './CompanyBranch'
import {
    useGetCompanyBranchQuery,
    useDeleteCompanyBranchMutation,
} from 'src/services/CompanyBranchService'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/companyBranchSlice'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { getAllowedAuthorizedColumns } from 'src/userAccess/getAuthorizedModules'
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
} from 'src/models/userAccess/UserAccess.model'
// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'

const CompanyBranchListingWrapper = () => {
    const navigate = useNavigate()
    const companyBranchState: any = useSelector(
        (state: RootState) => state.companybranch
    )
    const { userData } = useSelector((state: RootState) => state.auth)
    const { page, rowsPerPage, items, searchValue } = companyBranchState

    const [deleteCompanyBranch] = useDeleteCompanyBranchMutation()
    const dispatch = useDispatch<AppDispatch>()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    const columns: columnTypes[] = [
        {
            field: 'companyLabel',
            headerName: 'Company Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: CompanyBranchListResponse) => (
                <span> {row.companyLabel} </span>
            ),
        },
        {
            field: 'branchName',
            headerName: 'Branch Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: CompanyBranchListResponse) => (
                <span> {row.branchName} </span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    moduleName={UserModuleNameTypes.companyBranch}
                    isEdit
                    isDelete
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/configurations/company-branch/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Branch',
                            text: 'Do you want to delete',
                            showCancelButton: true,
                            next: (res) => {
                                return res.isConfirmed
                                    ? handleDelete()
                                    : setShowDropdown(false)
                            },
                        })
                    }}
                />
            ),
            align: 'end',
        },
    ]
    const { data, isFetching, isLoading } = useGetCompanyBranchQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['branchName'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId,
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

    const handleDelete = () => {
        setShowDropdown(false)
        deleteCompanyBranch(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Deleted successfully!')
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
        <>
            <ConfigurationLayout>
                <CompanyBranch
                    columns={getAllowedAuthorizedColumns(
                        checkUserAccess,
                        columns,
                        UserModuleNameTypes.companyBranch,
                        UserModuleActionTypes.List
                    )}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </ConfigurationLayout>
        </>
    )
}

export default CompanyBranchListingWrapper
