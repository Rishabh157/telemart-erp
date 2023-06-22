/// ==============================================
// Filename:AssetsRequestWrapper.tsx
// Type: List Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import AsstesLayout from '../../AssetsLayout'
import AssetsRequestListing from './AssetsRequestListing'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import {
    useGetAssetsRequestQuery,
    useDeleteAssetsRequestMutation,
} from 'src/services/assets/AssetsRequestServcies'
import {
    setIsTableLoading,
    setTotalItems,
    setItems,
} from 'src/redux/slices/assets/assetsRequestSlice'
import { AssetsRequestListResponse } from 'src/models'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'

const AssetsRequestWrapper = () => {
    const navigate = useNavigate()
    const assetsRequest = useSelector((state: RootState) => state.assetsRequest)
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const [deleteAsset] = useDeleteAssetsRequestMutation()
    const columns: columnTypes[] = [
        {
            field: 'assetName',
            headerName: 'Asset Name',
            flex: 'flex-[1.8_1.8_0%]',
            renderCell: (row: AssetsRequestListResponse) => (
                <span>{row?.assetName}</span>
            ),
        },
        {
            field: 'assetCategory',
            headerName: 'Asset Category',
            flex: 'flex-[1.8_1.8_0%]',
            renderCell: (row: AssetsRequestListResponse) => (
                <span>{row?.assetcategorieLabel}</span>
            ),
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            flex: 'flex-[1.8_1.8_0%]',
            renderCell: (row: AssetsRequestListResponse) => (
                <span>{row?.quantity}</span>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[1.8_1.8_0%]',
            renderCell: (row: AssetsRequestListResponse) => (
                <span>{row?.price}</span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                >
                    <>
                        <button
                            onClick={() => {
                                navigate(
                                    `/assets/assets-management/${currentId}`
                                )
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                showConfirmationDialog({
                                    title: 'Delete Asset',
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
                    </>
                </ActionPopup>
            ),
            align: 'end',
        },
    ]

    const { page, rowsPerPage, searchValue, items } = assetsRequest

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetAssetsRequestQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['assetName'],
        page: page,
        filterBy: [
            {
                fieldName: '',
                value: [],
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
        deleteAsset(currentId).then((res) => {
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
            <AsstesLayout>
                <AssetsRequestListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </AsstesLayout>
        </>
    )
}

export default AssetsRequestWrapper
