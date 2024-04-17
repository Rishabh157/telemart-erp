/// ==============================================
// Filename:ProductWrapper.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useState } from 'react'
// import { useDispatch, useSelector } from "react--ux";

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { ProductsListResponse } from 'src/models/Products.model'

import {
    useDeleteProductMutation,
    useGetProductQuery,
} from 'src/services/ProductService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import ProductsListing from './ProductsListing'
// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const ProductsListingWrapper = () => {

    useUnmountCleanup()
    const productState: any = useSelector((state: RootState) => state.listingPagination)
    const { page, rowsPerPage, searchValue } = productState
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const navigate = useNavigate()
    const [deleteProduct] = useDeleteProductMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items } = useGetCustomListingData<ProductsListResponse>({
        useEndPointHook: useGetProductQuery({
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
    })

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
    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_PRODUCTS_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_PRODUCTS_DELETE
                    )}
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

        },
        {
            field: 'productCode',
            headerName: 'Product Code ',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCTS_LIST_PRODUCT_CODE,
            renderCell: (row: ProductsListResponse) => {
                return <span> {row.productCode} </span>
            },
        },
        {
            field: 'productName',
            headerName: 'Product Name ',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCTS_LIST_PRODUCT_NAME,
            renderCell: (row: ProductsListResponse) => {
                return <span> {row.productName} </span>
            },
        },
        {
            field: 'productCategoryLabel',
            headerName: 'Category  ',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCTS_LIST_CATEGORY,
            renderCell: (row: ProductsListResponse) => {
                return <span> {row.productCategoryLabel} </span>
            },
        },
        {
            field: 'productSubCategoryLabel',
            headerName: 'Sub Category  ',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCTS_LIST_SUB_CATEGORY,
            renderCell: (row: ProductsListResponse) => {
                return <span> {row.productSubCategoryLabel} </span>
            },
        },
        {
            field: 'productGroupLabel ',
            headerName: 'Product Group',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCTS_LIST_PRODUCT_GROUP,
            renderCell: (row: ProductsListResponse) => {
                return <span> {row.productGroupLabel} </span>
            },
        },
    ]
    return (
        <>
            <ProductsListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </>
    )
}

export default ProductsListingWrapper
