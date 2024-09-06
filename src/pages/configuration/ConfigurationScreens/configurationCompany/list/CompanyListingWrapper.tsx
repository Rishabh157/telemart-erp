// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ConfigurationCompanyListResponse } from 'src/models/ConfigurationCompany.model'

import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import {
    useDeleteCompanyMutation,
    useGetCompaniesQuery,
} from 'src/services/CompanyServices'
import ConfigurationCompanyListing from './CompanyListing'

import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const ConfigurationCompanyListingWrapper = () => {
    useUnmountCleanup()
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const [deleteCompany] = useDeleteCompanyMutation()

    const { page, rowsPerPage, searchValue }: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { items } = useGetCustomListingData<ConfigurationCompanyListResponse>(
        {
            useEndPointHook: useGetCompaniesQuery({
                limit: rowsPerPage,
                searchValue: searchValue,
                params: ['companyName', 'phoneNo'],
                page: page,
                filterBy: [],
                dateFilter: {},
                orderBy: 'createdAt',
                orderByValue: -1,
                isPaginationRequired: true,
            }),
        }
    )
    const handleDelete = () => {
        setShowDropdown(false)
        deleteCompany(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Company deleted successfully!')
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
                        // e.stopPropagation()
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/configurations/company/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Company',
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
            field: 'companyName',
            headerName: 'Company Name ',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.COMPANY_LIST_COMAPNY_NAME,
            renderCell: (row: ConfigurationCompanyListResponse) => {
                return <span> {row.companyName} </span>
            },
        },
        {
            field: 'companyCode',
            headerName: 'Company Code',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.COMPANY_LIST_COMAPNY_CODE,
            renderCell: (row: ConfigurationCompanyListResponse) => {
                return <span> {row.companyCode} </span>
            },
        },
        {
            field: 'websiteUrl',
            headerName: 'Website URL ',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.COMPANY_LIST_WEBSITE_URL,
            renderCell: (row: ConfigurationCompanyListResponse) => {
                return <span> {row.websiteUrl} </span>
            },
        },
        {
            field: 'address',
            headerName: 'Address ',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.COMPANY_LIST_ADDRESS,
            renderCell: (row: ConfigurationCompanyListResponse) => {
                return <span> {row.address} </span>
            },
        },
        {
            field: 'gstNo',
            headerName: 'GST no.',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.COMPANY_LIST_GST_NO,
            renderCell: (row: ConfigurationCompanyListResponse) => {
                return <span> {row.gstNo} </span>
            },
        },
        {
            field: 'phoneNo',
            headerName: 'Phone no.',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.COMPANY_LIST_PHONE_NO,
            renderCell: (row: ConfigurationCompanyListResponse) => {
                return <span> {row.phoneNo} </span>
            },
        },
    ]
    return (
        <>
            <ConfigurationCompanyListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </>
    )
}

export default ConfigurationCompanyListingWrapper
