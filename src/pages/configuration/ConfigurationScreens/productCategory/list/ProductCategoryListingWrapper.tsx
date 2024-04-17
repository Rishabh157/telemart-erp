/// ==============================================
// Filename:ProductCategoryListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { ProductCategoryListResponse } from 'src/models/ProductCategory.model'

import {
    useDeleteProductCategoryMutation,
    useGetProductCategoryQuery,
} from 'src/services/ProductCategoryServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import ProductCategoryListing from './ProductCategoryListing'
// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const ProductCategoryListingWrapper = () => {
    useUnmountCleanup()

    const productCategoryState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [deleteProductCategory] = useDeleteProductCategoryMutation()
    const { page, rowsPerPage, searchValue } = productCategoryState
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const { userData } = useSelector((state: RootState) => state?.auth)

    const navigate = useNavigate()

    const { items } = useGetCustomListingData<ProductCategoryListResponse>({
        useEndPointHook: useGetProductCategoryQuery({
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
    })

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
    
    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_PRODUCT_CATEGORY_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_PRODUCT_CATEGORY_DELETE
                    )}
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
                            title: 'Delete Product category',
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
            field: 'categoryCode',
            headerName: 'Category Code',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.PRODUCT_CATEGORY_LIST_PRODUCT_CATEGORY_CODE,
            renderCell: (row: ProductCategoryListResponse) => (
                <span> {row.categoryCode} </span>
            ),
        },
        {
            field: 'categoryName',
            headerName: 'Category Name ',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCT_CATEGORY_LIST_PRODUCT_CATEGORY_NAME,
            renderCell: (row: ProductCategoryListResponse) => {
                return <span> {row.categoryName} </span>
            },
        },
    ]
    return (
        <>
            <ProductCategoryListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </>
    )
}

export default ProductCategoryListingWrapper
