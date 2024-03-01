/// ==============================================
// Filename:ItemListingWrapper.tsx
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
import { ItemListResponse } from 'src/models/Item.model'

import ActionPopup from 'src/components/utilsComponent/ActionPopup'

import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/itemSlice'
import {
    useDeleteItemsMutation,
    useGetItemsQuery,
} from 'src/services/ItemService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import ItemListing from './ItemListing'
// |-- Redux --|
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const ItemListingWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const itemState: any = useSelector((state: RootState) => state.item)
    const { page, rowsPerPage, searchValue, items } = itemState
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const [deleteItem] = useDeleteItemsMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const columns: columnTypes[] = [
        {
            field: 'itemCode',
            headerName: 'Item Code',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.ITEMS_LIST_ITEMS_CODE,
            renderCell: (row: ItemListResponse) => {
                return <span> {row.itemCode} </span>
            },
        },
        {
            field: 'itemName',
            headerName: 'Item Name',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.ITEMS_LIST_ITEMS_NAME,
            renderCell: (row: ItemListResponse) => {
                return <span className="capitalize"> {row.itemName} </span>
            },
        },

        {
            field: 'itemWeight',
            headerName: 'Weight (in gms.)',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.ITEMS_LIST_WEIGHT,
            renderCell: (row: ItemListResponse) => {
                return <span> {row.itemWeight} </span>
            },
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(UserModuleNameTypes.ACTION_ITEMS_EDIT)}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_ITEMS_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/configurations/item/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Item',
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

    const { data, isFetching, isLoading } = useGetItemsQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['itemName', 'itemWeight', 'itemCode'],
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
        deleteItem(currentId).then((res) => {
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
            <ItemListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </>
    )
}

export default ItemListingWrapper
