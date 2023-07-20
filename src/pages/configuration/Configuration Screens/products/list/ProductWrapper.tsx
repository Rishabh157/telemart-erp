/// ==============================================
// Filename:ProductWrapper.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from "react--ux";

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ProductsListResponse } from 'src/models/Products.model'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import ProductsListing from './ProductsListing'
import {
    useDeleteProductMutation,
    useGetProductQuery,
} from 'src/services/ProductService'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { getAllowedAuthorizedColumns } from 'src/userAccess/getAuthorizedModules'
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
} from 'src/models/userAccess/UserAccess.model'
// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/productSlice'

const ProductsListingWrapper = () => {
    const productState: any = useSelector((state: RootState) => state.products)
    const { page, rowsPerPage, searchValue, items } = productState
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [deleteProduct] = useDeleteProductMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )

    const columns: columnTypes[] = [
        {
            field: 'productCode',
            headerName: 'Product Code ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductsListResponse) => {
                return <span> {row.productCode} </span>
            },
        },
        {
            field: 'productName',
            headerName: 'Product Name ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductsListResponse) => {
                return <span> {row.productName} </span>
            },
        },
        {
            field: 'productCategoryLabel',
            headerName: 'Category  ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductsListResponse) => {
                return <span> {row.productCategoryLabel} </span>
            },
        },
        {
            field: 'productSubCategoryLabel',
            headerName: 'Sub Category  ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductsListResponse) => {
                return <span> {row.productSubCategoryLabel} </span>
            },
        },
        {
            field: 'productGroupLabel ',
            headerName: 'Product Group',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductsListResponse) => {
                return <span> {row.productGroupLabel} </span>
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    moduleName={UserModuleNameTypes.product}
                    isEdit
                    isDelete
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/configurations/product/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete product',
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
    const { data, isFetching, isLoading } = useGetProductQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['productName', 'productWeight', 'description'],
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
        deleteProduct(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Product deleted successfully!')
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
                <ProductsListing
                    columns={getAllowedAuthorizedColumns(
                        checkUserAccess,
                        columns,
                        UserModuleNameTypes.product,
                        UserModuleActionTypes.List
                    )}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </ConfigurationLayout>
        </>
    )
}

export default ProductsListingWrapper
