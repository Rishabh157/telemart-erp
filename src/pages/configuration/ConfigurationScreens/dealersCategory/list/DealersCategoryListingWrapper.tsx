// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { DealersCategoryListResponse } from 'src/models/DealersCategory.model'

import {
    useDeleteDealerCategoryMutation,
    useGetDealerCategoryQuery,
} from 'src/services/DealerCategoryService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import DealersCategoryListing from './DealersCategoryListing'
// |-- Redux --|
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'

const DealersCategoryListingWrapper = () => {
    useUnmountCleanup()

    const navigate = useNavigate()
    const [deleteDealersCategory] = useDeleteDealerCategoryMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const dealersCategoryState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue } = dealersCategoryState
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items } = useGetCustomListingData<DealersCategoryListResponse>({
        useEndPointHook: useGetDealerCategoryQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['dealersCategory'],
            page: page,
            filterBy: [
                {
                    fieldName: '',
                    value: [],
                },
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
        deleteDealersCategory(currentId).then((res) => {
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
                        UserModuleNameTypes.ACTION_DEALERS_CATEGORY_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_DEALERS_CATEGORY_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(
                            `/configurations/dealers-category/${currentId}`
                        )
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete dealers category',
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
            field: 'dealersCategory',
            headerName: 'Dealers Category',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALERS_CATEGORY_LIST_DEALERS_CATEGORY,
            renderCell: (row: DealersCategoryListResponse) => (
                <span> {row.dealersCategory} </span>
            ),
        },
        {
            field: 'investAmount',
            headerName: 'Invest Amount',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALERS_CATEGORY_LIST_INVEST_AMOUNT,
            renderCell: (row: DealersCategoryListResponse) => (
                <span> {row.investAmount} </span>
            ),
        },
        {
            field: 'numberOfOrders',
            headerName: 'Number Of Orders',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALERS_CATEGORY_LIST_NUMBER_OF_ORDERS,
            renderCell: (row: DealersCategoryListResponse) => (
                <span> {row.numberOfOrders} </span>
            ),
        },
        {
            field: 'deliveryPercentage',
            headerName: 'Delivery Percentage',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALERS_CATEGORY_LIST_DELIVERY_PERCENTAGE,
            renderCell: (row: DealersCategoryListResponse) => (
                <span> {row.deliveryPercentage} </span>
            ),
        },
    ]
    return (
        <>
            <DealersCategoryListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </>
    )
}

export default DealersCategoryListingWrapper
