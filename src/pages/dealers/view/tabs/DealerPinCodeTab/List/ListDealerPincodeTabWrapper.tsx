import React, { useEffect, useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { DealersPincodeListResponse } from 'src/models/DealerPinCode.model'
import DealerPincodeListing from './DealerPincodeListing'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/dealerPincodeSlice'
import { AppDispatch } from 'src/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    useDeleteDealerPincodeMutation,
    useGetDealerPincodeQuery,
} from 'src/services/DealerPincodeService'
import { RootState } from 'src/redux/store'
import { showToast } from 'src/utils'

import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

const ListDealerPincodeTabWrapper = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const params = useParams()
    const dealerId: any = params.dealerId
    const dealerPincodeState: any = useSelector(
        (state: RootState) => state.dealerPincode
    )
    const { page, rowsPerPage, items, searchValue } = dealerPincodeState

    const dispatch = useDispatch<AppDispatch>()
    const [deleteDealerPincode] = useDeleteDealerPincodeMutation()

    const { data, isFetching, isLoading } = useGetDealerPincodeQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['pincode'],
        page: page,
        filterBy: [
            {
                fieldName: 'dealerId',
                value: dealerId,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    const columns: columnTypes[] = [
        {
            field: 'Pincode',
            headerName: 'Pincode',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DealersPincodeListResponse) => (
                <span> {row.pincode} </span>
            ),
        },

        {
            field: 'estTime',
            headerName: 'Estimated Time (in Min.)',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: DealersPincodeListResponse) => {
                return <span> {row.estTime} </span>
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                    }}
                >
                    <button
                        onClick={() => {
                            showConfirmationDialog({
                                title: 'Delete Pincode',
                                text: 'Do you want to Delete',
                                showCancelButton: true,
                                next: (res: any) => {
                                    return res.isConfirmed
                                        ? handleDeletePincode(
                                              row._id,
                                              row.pincode
                                          )
                                        : setShowDropdown(false)
                                },
                            })
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Delete
                    </button>
                </ActionPopup>
            ),
            align: 'end',
        },
    ]

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data, dispatch])

    const handleDeletePincode = (id: string, pincode: string) => {
        setShowDropdown(false)
        deleteDealerPincode({ id, pincode }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Pincode deleted successfully!')
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
            <DealerPincodeListing columns={columns} rows={items} />
        </>
    )
}

export default ListDealerPincodeTabWrapper
