import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ItemListResponse } from 'src/models/Item.model'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/redux/slices/vendorSlice";
// import { AppDispatch, Rootweight } from "src/redux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import ItemListing from './ItemListing'
import {
    useDeleteItemsMutation,
    useGetItemsQuery,
} from 'src/services/ItemService'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/itemSlice'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { useNavigate } from 'react-router-dom'
import { showToast } from 'src/utils'

const ItemListingWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const itemState: any = useSelector((state: RootState) => state.item)
    const { page, rowsPerPage, searchValue, items } = itemState
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const [deleteItem] = useDeleteItemsMutation()

    const columns: columnTypes[] = [
        {
            field: 'itemCode',
            headerName: 'Item Code',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ItemListResponse) => {
                return <span> {row.itemCode} </span>
            },
        },
        {
            field: 'itemName',
            headerName: 'Item Name',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ItemListResponse) => {
                return <span className="capitalize"> {row.itemName} </span>
            },
        },

        {
            field: 'weight',
            headerName: 'Weight (in gms.)',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ItemListResponse) => {
                return <span> {row.itemWeight} </span>
            },
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowDropdown(!showDropdown)
                            setCurrentId(row?._id)
                        }}
                        className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full"
                    >
                        {' '}
                        <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{' '}
                    </button>
                    {showDropdown && currentId === row?._id && (
                        <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <button
                                onClick={() => {
                                    navigate(
                                        `/configurations/item/${currentId}`
                                    )
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
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
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ),
            align: 'end',
        },
    ]
    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetItemsQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['itemName', 'itemWeight', 'itemCode'],
        page: page,
        filterBy: [
            {
                fieldName: '',
                value: [],
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
                    showToast('success', 'Item deleted successfully!')
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
                <ItemListing columns={columns} rows={items} setShowDropdown={setShowDropdown}/>
            </ConfigurationLayout>
        </>
    )
}

export default ItemListingWrapper
