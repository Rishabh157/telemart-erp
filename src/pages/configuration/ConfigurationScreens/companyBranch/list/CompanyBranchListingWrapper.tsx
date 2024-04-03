/// ==============================================
// Filename:CompanyBranchListingWrapper.tsx
// Type: List Component
// Last Updated: SEPTEMBER 11, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { CompanyBranchListResponse } from 'src/models/CompanyBranch.model'

import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/companyBranchSlice'
import {
    useDeleteCompanyBranchMutation,
    useGetCompanyBranchQuery,
} from 'src/services/CompanyBranchService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import CompanyBranch from './CompanyBranch'
// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

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

    const columns: columnTypes[] = [
        
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_COMPANY_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_COMPANY_DELETE
                    )}
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
            
        },
        {
            field: 'companyLabel',
            headerName: 'Company Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.COMPANY_BRANCH_LIST_COMAPNY_NAME,
            renderCell: (row: CompanyBranchListResponse) => (
                <span> {row.companyLabel} </span>
            ),
        },
        {
            field: 'branchName',
            headerName: 'Branch Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.COMPANY_BRANCH_LIST_BRANCH_NAME,
            renderCell: (row: CompanyBranchListResponse) => (
                <span> {row.branchName} </span>
            ),
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
            <CompanyBranch
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </>
    )
}

export default CompanyBranchListingWrapper
