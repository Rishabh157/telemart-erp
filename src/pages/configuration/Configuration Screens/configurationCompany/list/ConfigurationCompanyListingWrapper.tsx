
/// ==============================================
// Filename:ConfigurationCompanyListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ConfigurationCompanyListResponse } from 'src/models/ConfigurationCompany.model'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import ConfigurationCompanyListing from './ConfigurationCompanyListing'
import {
    useDeleteCompanyMutation,
    useGetCompaniesQuery,
} from 'src/services/CompanyServices'

import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/companySlice'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'

const ConfigurationCompanyListingWrapper = () => {
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const [deleteCompany] = useDeleteCompanyMutation()

    const columns: columnTypes[] = [
        {
            field: 'companyName',
            headerName: 'Company Name ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ConfigurationCompanyListResponse) => {
                return <span> {row.companyName} </span>
            },
        },
        {
            field: 'websiteUrl',
            headerName: 'Website URL ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ConfigurationCompanyListResponse) => {
                return <span> {row.websiteUrl} </span>
            },
        },
        {
            field: 'address',
            headerName: 'Address ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ConfigurationCompanyListResponse) => {
                return <span> {row.address} </span>
            },
        },
        {
            field: 'gstNo',
            headerName: 'GST no.',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ConfigurationCompanyListResponse) => {
                return <span> {row.gstNo} </span>
            },
        },
        {
            field: 'phoneNo',
            headerName: 'Phone no.',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ConfigurationCompanyListResponse) => {
                return <span> {row.phoneNo} </span>
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit
                    isDelete
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
            align: 'end',
        },
    ]
    const { page, rowsPerPage, items, searchValue }: any = useSelector(
        (state: RootState) => state.company
    )
    const dispatch = useDispatch<AppDispatch>()
    const { data, isFetching, isLoading } = useGetCompaniesQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['companyName', 'phoneNo'],
        page: page,
        filterBy: [],
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

    return (
        <>
            <ConfigurationLayout>
                <ConfigurationCompanyListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </ConfigurationLayout>
        </>
    )
}

export default ConfigurationCompanyListingWrapper
