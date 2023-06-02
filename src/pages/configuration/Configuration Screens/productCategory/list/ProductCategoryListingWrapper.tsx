import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ProductCategoryListResponse } from 'src/models/ProductCategory.model'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/productCategorySlice'
import { AppDispatch, RootState } from 'src/redux/store'
import ProductCategoryListing from './ProductCategoryListing'
import {
    useDeleteProductCategoryMutation,
    useGetProductCategoryQuery,
} from 'src/services/ProductCategoryServices'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'

const ProductCategoryListingWrapper = () => {
    const productCategoryState: any = useSelector(
        (state: RootState) => state.productCategory
    )
    const [deleteProductCategory] = useDeleteProductCategoryMutation()
    const { page, rowsPerPage, searchValue, items } = productCategoryState
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const columns: columnTypes[] = [
        {
            field: 'categoryCode',
            headerName: 'Category Code',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: ProductCategoryListResponse) => (
                <span> {row.categoryCode} </span>
            ),
        },
        {
            field: 'categoryName',
            headerName: 'Category Name ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductCategoryListResponse) => {
                return <span> {row.categoryName} </span>
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
                                        `/configurations/product-category/${currentId}`
                                    )
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Delete Product-category',
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
    const { data, isFetching, isLoading } = useGetProductCategoryQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['categoryCode'],
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
        deleteProductCategory(currentId).then((res: any) => {
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
                <ProductCategoryListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </ConfigurationLayout>
        </>
    )
}

export default ProductCategoryListingWrapper
