/// ==============================================
// Filename:ListDealerCategoryWrapper.tsx
// Type: List Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { DealersCategoryListResponse } from 'src/models/DealersCategory.model'

import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/dealersCategorySlice'
import {
    useDeleteDealerCategoryMutation,
    useGetDealerCategoryQuery,
} from 'src/services/DealerCategoryService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import DealersCategoryListing from './DealersCategoryListing'
// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const DealersCategoryListingWrapper = () => {
    const navigate = useNavigate()
    const [deleteDealersCategory] = useDeleteDealerCategoryMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const dealersCategoryState: any = useSelector(
        (state: RootState) => state.dealersCategory
    )

    const columns: columnTypes[] = [
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
            align: 'end',
        },
    ]
    const { page, rowsPerPage, searchValue, items } = dealersCategoryState
    const { userData } = useSelector((state: RootState) => state?.auth)
    const dispatch = useDispatch<AppDispatch>()
    // // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetDealerCategoryQuery({
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
    return (
        <>
            <ConfigurationLayout>
                <DealersCategoryListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </ConfigurationLayout>
        </>
    )
}

export default DealersCategoryListingWrapper
