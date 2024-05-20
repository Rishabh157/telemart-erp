// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ProductSubCategoryListResponse } from 'src/models/ProductSubCategory.model'

import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import {
    useDeleteProductSubCategoryMutation,
    useGetProductSubCategoryQuery,
} from 'src/services/ProductSubCategoryService'
import { showToast } from 'src/utils'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import ProductSubCategoryListing from './ProductSubCategoryListing'
// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'

const ProductSubCategoryListingWrapper = () => {
    useUnmountCleanup()
    const navigate = useNavigate()
    const [deleteProductSubCategory] = useDeleteProductSubCategoryMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const productSubCategoryState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { page, rowsPerPage, searchValue } = productSubCategoryState

    const { items } = useGetCustomListingData<ProductSubCategoryListResponse>({
        useEndPointHook: useGetProductSubCategoryQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: [
                'subCategoryName',
                'subCategoryCode',
                'parentCategoryLabel',
            ],
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
        }),
    })
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
    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_PRODUCT_SUB_CATEGORY_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_PRODUCT_SUB_CATEGORY_DELETE
                    )}
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
        },
        {
            field: 'subCategoryCode',
            headerName: 'Sub Category Code',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.PRODUCT_SUB_CATEGORY_LIST_PRODUCT_SUB_CATEGORY_CODE,
            extraClasses: 'min-w-[200px]',
            renderCell: (row: ProductSubCategoryListResponse) => (
                <span> {row.subCategoryCode} </span>
            ),
        },
        {
            field: 'subCategoryName',
            headerName: 'Sub Category Name ',
            flex: 'flex-[1.5_1.5_0%]',
            extraClasses: 'min-w-[200px]',
            name: UserModuleNameTypes.PRODUCT_SUB_CATEGORY_LIST_PRODUCT_SUB_CATEGORY_NAME,
            renderCell: (row: ProductSubCategoryListResponse) => {
                return <span> {row.subCategoryName} </span>
            },
        },
        {
            field: 'parentCategoryLabel',
            headerName: 'Parent Category ',
            flex: 'flex-[1.5_1.5_0%]',
            extraClasses: 'min-w-[200px]',
            name: UserModuleNameTypes.PRODUCT_SUB_CATEGORY_LIST_PARENT_CATEGORY,
            renderCell: (row: ProductSubCategoryListResponse) => {
                return <span> {row.parentCategoryLabel} </span>
            },
        },
        {
            field: 'hsnCode',
            headerName: 'HSN Code ',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCT_SUB_CATEGORY_LIST_HSN_CODE,
            renderCell: (row: ProductSubCategoryListResponse) => {
                return <span> {row.hsnCode} </span>
            },
        },
    ]
    return (
        <ProductSubCategoryListing
            columns={columns}
            rows={items}
            setShowDropdown={setShowDropdown}
        />
    )
}

export default ProductSubCategoryListingWrapper
