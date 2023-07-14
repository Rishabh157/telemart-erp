/// ==============================================
// Filename:ProductSubCategoryListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ProductSubCategoryListResponse } from 'src/models/ProductSubCategory.model'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/redux/slices/vendorSlice";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import ProductSubCategoryListing from './ProductSubCategoryListing'
import {
    useDeleteProductSubCategoryMutation,
    useGetProductSubCategoryQuery,
} from 'src/services/ProductSubCategoryService'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/productSubCategorySlice'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'

const ProductSubCategoryListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [deleteProductSubCategory] = useDeleteProductSubCategoryMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const productSubCategoryState: any = useSelector(
        (state: RootState) => state.productSubCategory
    )
    const { userData } = useSelector((state: RootState) => state?.auth)

    const columns: columnTypes[] = [
        {
            field: 'subCategoryCode',
            headerName: 'Sub Category Code',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: ProductSubCategoryListResponse) => (
                <span> {row.subCategoryCode} </span>
            ),
        },
        {
            field: 'subCategoryName',
            headerName: 'Sub Category Name ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductSubCategoryListResponse) => {
                return <span> {row.subCategoryName} </span>
            },
        },
        {
            field: 'parentCategory',
            headerName: 'Parent Category ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductSubCategoryListResponse) => {
                return <span> {row.parentCategoryLabel} </span>
            },
        },
        {
            field: 'hsnCode',
            headerName: 'HSN Code ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductSubCategoryListResponse) => {
                return <span> {row.hsnCode} </span>
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    moduleName={UserModuleNameTypes.productSubCategory}
                    isEdit
                    isDelete
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(
                            `/configurations/product-sub-category/${currentId}`
                        )
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete product sub category',
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
    const { page, rowsPerPage, searchValue, items } = productSubCategoryState
    // const { userData } = useSelector((state: RootState) => state?.auth)

    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetProductSubCategoryQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['subCategoryName', 'subCategoryCode', 'parentCategoryLabel'],
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
        deleteProductSubCategory(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        'Product sub category deleted successfully!'
                    )
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
                <ProductSubCategoryListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </ConfigurationLayout>
        </>
    )
}

export default ProductSubCategoryListingWrapper
