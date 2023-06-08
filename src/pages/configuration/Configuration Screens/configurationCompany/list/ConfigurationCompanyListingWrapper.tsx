import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
// import { useDispatch, useSelector } from "react--ux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ConfigurationCompanyListResponse } from 'src/models/ConfigurationCompany.model'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/-ux/slices/vendorSlice";
// import { AppDispatch, Rootaddress } from "src/-ux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import ConfigurationCompanyListing from './ConfigurationCompanyListing'
import { useDispatch, useSelector } from 'react-redux'
import {
    useDeleteCompanyMutation,
    useGetCompaniesQuery,
} from 'src/services/CompanyServices'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/companySlice'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

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
                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowDropdown(!showDropdown)
                            setCurrentId(row?._id)
                        }}
                        className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full"
                    >
                        {' '}
                        <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{' '}
                    </button>
                    {showDropdown && currentId === row?._id && (
                        <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <button
                                onClick={() => {
                                    navigate(
                                        `/configurations/company/${currentId}`
                                    )
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
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
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ),
            align: 'end',
        },
    ]
    const { page, rowsPerPage, items, searchValue }: any = useSelector(
        (state: RootState) => state.company
    )
    const { userData } = useSelector((state: RootState) => state?.auth)

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetCompaniesQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['companyName', 'phoneNo'],
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
