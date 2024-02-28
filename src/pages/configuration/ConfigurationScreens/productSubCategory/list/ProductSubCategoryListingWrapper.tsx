/// ==============================================
// Filename:ProductSubCategoryListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ProductSubCategoryListResponse } from 'src/models/ProductSubCategory.model'

// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/redux/slices/vendorSlice";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import {
    useDeleteProductSubCategoryMutation,
    useGetProductSubCategoryQuery,
} from 'src/services/ProductSubCategoryService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import ProductSubCategoryListing from './ProductSubCategoryListing'
// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/productSubCategorySlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'

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
            name: UserModuleNameTypes.PRODUCT_SUB_CATEGORY_LIST_PRODUCT_SUB_CATEGORY_CODE,

            renderCell: (row: ProductSubCategoryListResponse) => (
                <span> {row.subCategoryCode} </span>
            ),
        },
        {
            field: 'subCategoryName',
            headerName: 'Sub Category Name ',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCT_SUB_CATEGORY_LIST_PRODUCT_SUB_CATEGORY_NAME,
            renderCell: (row: ProductSubCategoryListResponse) => {
                return <span> {row.subCategoryName} </span>
            },
        },
        {
            field: 'parentCategoryLabel',
            headerName: 'Parent Category ',
            flex: 'flex-[1.5_1.5_0%]',
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
            
                <ProductSubCategoryListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
           
        </>
    )
}

export default ProductSubCategoryListingWrapper
