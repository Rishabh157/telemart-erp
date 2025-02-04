// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { ProductGroupListResponse } from 'src/models/ProductGroup.model'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

import {
    useDeleteProductGroupMutation,
    useGetProductGroupQuery,
} from 'src/services/ProductGroupService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import ProductGroupListing from './ProductGroupListing'
// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'

const ProductGroupListingWrapper = () => {
    useUnmountCleanup()
    const productGroupState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [deleteProductGroup] = useDeleteProductGroupMutation()
    const { page, rowsPerPage, searchValue } = productGroupState
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const { userData } = useSelector((state: RootState) => state?.auth)

    const navigate = useNavigate()

    const { items } = useGetCustomListingData<ProductGroupListResponse>({
        useEndPointHook: useGetProductGroupQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['groupName'],
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
        }),
    })
    const handleDelete = () => {
        setShowDropdown(false)
        deleteProductGroup(currentId).then((res: any) => {
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
                        UserModuleNameTypes.ACTION_PRODUCT_GROUP_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_PRODUCT_GROUP_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/configurations/product-group/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Product Group',
                            text: 'Do you want to delete',
                            showCancelButton: true,
                            next: (res: any) => {
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
            field: 'groupName',
            headerName: 'Group Name ',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCT_GROUP_LIST_PRODUCT_GROUP_NAME,
            renderCell: (row: ProductGroupListResponse) => {
                return <span> {row?.groupName} </span>
            },
        },
        {
            field: 'productGroupCode',
            headerName: 'Product Group Code',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCT_GROUP_LIST_PRODUCT_GROUP_CODE,
            renderCell: (row: ProductGroupListResponse) => {
                return <span> {row?.productGroupCode} </span>
            },
        },
        {
            field: 'dealerSalePrice',
            headerName: 'Dealer Sale Price ',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCT_GROUP_LIST_DEALER_SALE_PRICE,
            renderCell: (row: ProductGroupListResponse) => {
                return <span> {row?.dealerSalePrice} </span>
            },
        },
        {
            field: 'sgst',
            headerName: 'State GST',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCT_GROUP_LIST_SATE_GST,
            renderCell: (row: ProductGroupListResponse) => {
                return <span> {row?.sgst} </span>
            },
        },
        {
            field: 'cgst',
            headerName: 'Central GST ',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCT_GROUP_LIST_CENTER_GST,
            renderCell: (row: ProductGroupListResponse) => {
                return <span> {row?.cgst} </span>
            },
        },
        {
            field: 'igst',
            headerName: 'Integrated GST',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCT_GROUP_LIST_INTEGRATED_GST,
            renderCell: (row: ProductGroupListResponse) => {
                return <span> {row?.igst} </span>
            },
        },
        {
            field: 'utgst',
            headerName: 'Union Territory GST',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PRODUCT_GROUP_LIST_UNION_TERRITORY,
            renderCell: (row: ProductGroupListResponse) => {
                return <span> {row?.utgst} </span>
            },
        },
    ]

    return (
        <ProductGroupListing
            columns={columns}
            rows={items}
            setShowDropdown={setShowDropdown}
        />
    )
}

export default ProductGroupListingWrapper
