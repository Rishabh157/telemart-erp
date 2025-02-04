// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { CompanyBranchListResponse } from 'src/models/CompanyBranch.model'

import {
    useDeleteCompanyBranchMutation,
    useGetCompanyBranchQuery,
} from 'src/services/CompanyBranchService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import CompanyBranch from './CompanyBranch'
// |-- Redux --|
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'

const CompanyBranchListingWrapper = () => {
    useUnmountCleanup()
    const navigate = useNavigate()
    const companyBranchState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { userData } = useSelector((state: RootState) => state.auth)
    const { page, rowsPerPage, searchValue } = companyBranchState

    const [deleteCompanyBranch] = useDeleteCompanyBranchMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)

    const { items } = useGetCustomListingData<CompanyBranchListResponse>({
        useEndPointHook: useGetCompanyBranchQuery({
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
        }),
    })

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
        {
            field: 'branchCode',
            headerName: 'Branch Code',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.COMPANY_BRANCH_LIST_BRANCH_CODE,
            renderCell: (row: CompanyBranchListResponse) => (
                <span> {row.branchCode} </span>
            ),
        },
    ]
    return (
        <CompanyBranch
            columns={columns}
            rows={items}
            setShowDropdown={setShowDropdown}
        />
    )
}

export default CompanyBranchListingWrapper
