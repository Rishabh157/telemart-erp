import React, { useEffect, useState } from 'react'
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
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

const ProductCategoryListingWrapper = () => {
    const productCategoryState: any = useSelector(
        (state: RootState) => state.productCategory
    )
    const [deleteProductCategory] = useDeleteProductCategoryMutation()
    const { page, rowsPerPage, searchValue, items } = productCategoryState
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const { userData } = useSelector((state: RootState) => state?.auth)
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
                <ActionPopup
                    isEdit
                    isDelete
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(
                            `/configurations/product-category/${currentId}`
                        )
                    }}
                    handleDeleteActionButton={() => {
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
                />
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
