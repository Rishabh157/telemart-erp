import React, { useEffect, useState } from 'react'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import AsstesLayout from '../../AssetsLayout'
import AssetsCategoryListing from './AssetsCategoryListing'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'

import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { useNavigate } from 'react-router-dom'
import { showToast } from 'src/utils'
import {
    useDeleteAssetsCategoryMutation,
    useGetAssetsCategoryQuery,
} from 'src/services/assets/AssetsCategoryService'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/assets/assetsCategorySlice'
import { AssetsCategoryListResponse } from 'src/models'

const AssetsCategoryWrapper = () => {
    const navigate = useNavigate()
    const [deleteAssetCategory] = useDeleteAssetsCategoryMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const { userData } = useSelector((state: RootState) => state?.auth)

    const columns: columnTypes[] = [
        {
            field: 'assetCategoryName',
            headerName: 'Category Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: AssetsCategoryListResponse) => (
                <span className="capitalize"> {row.assetCategoryName} </span>
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
                            navigate(`/assets/assets-category/${currentId}`)
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            showConfirmationDialog({
                                title: 'Delete Asset Category',
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
    const assetCategoryState: any = useSelector(
        (state: RootState) => state.assetsCategory
    )

    const { page, rowsPerPage, items, searchValue } = assetCategoryState

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetAssetsCategoryQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['assetCategoryName'],
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
        deleteAssetCategory(currentId).then((res) => {
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
                <AssetsCategoryListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </AsstesLayout>
        </>
    )
}

export default AssetsCategoryWrapper
