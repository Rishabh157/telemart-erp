/// ==============================================
// Filename:ListDealerSchemeTabWrapper.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { DealersSchemeListResponse } from 'src/models/DealerScheme.model'
import DealerSchemeListing from './DealerSchemeListing'
import {
    useGetDealerSchemeQuery,
    useDeleteDealerSchemeMutation,
    useDeactiveDealerSchemeMutation,
} from 'src/services/DealerSchemeService'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/dealerSchemeSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'

const ListDealerSchemeTabWrapper = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')

    const params = useParams()
    const dealerId: any = params.dealerId
    const dealerSchemeState: any = useSelector(
        (state: RootState) => state.dealerScheme
    )
    const { page, rowsPerPage, items, searchValue } = dealerSchemeState

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { data, isFetching, isLoading } = useGetDealerSchemeQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['schemeName', 'price'],
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
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: DealersSchemeListResponse) => (
                <span> {row.schemeName} </span>
            ),
        },

        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[0.25_0.25_0%]',
            renderCell: (row: DealersSchemeListResponse) => {
                return <span> {row.price} </span>
            },
        },
        {
            field: 'details',
            headerName: 'Available Pincode',
            flex: 'flex-[2_2_0%]',
            renderCell: (row: DealersSchemeListResponse) => (
                <Stack direction="row" spacing={1}>
                    {row?.pincodes?.map((ele, index) => {
                        if (index < 6) {
                            return (
                                <Chip
                                    key={index}
                                    label={ele}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                />
                            )
                        }
                        if (index === 10) {
                            return (
                                <Chip
                                    key={index}
                                    label={'...'}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                />
                            )
                        } else {
                            return null
                        }
                    })}
                </Stack>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: DealersSchemeListResponse) => {
                return (
                    <span className="block w-full text-left px-2 py-1 cursor-pointer">
                        {row.isActive ? (
                            <Chip
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Deactive Scheme',
                                        text: `Do you want to ${
                                            row.isActive ? 'Deactive' : 'Active'
                                        }`,
                                        showCancelButton: true,
                                        next: (res) => {
                                            return res.isConfirmed
                                                ? handleDeactive(row?._id)
                                                : setShowDropdown(false)
                                        },
                                    })
                                }}
                                className="cursor-pointer"
                                label="Active"
                                color="success"
                                variant="outlined"
                                size="small"
                            />
                        ) : (
                            <Chip
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Deactive Scheme',
                                        text: `Do you want to ${
                                            row.isActive ? 'Deactive' : 'Active'
                                        }`,
                                        showCancelButton: true,
                                        next: (res) => {
                                            return res.isConfirmed
                                                ? handleDeactive(row?._id)
                                                : setShowDropdown(false)
                                        },
                                    })
                                }}
                                className="cursor-pointer"
                                label="Deactive"
                                color="error"
                                variant="outlined"
                                size="small"
                            />
                        )}
                    </span>
                )
            },
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.25_0.25_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    moduleName={UserModuleNameTypes.dealer}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                >
                    <>
                        <button
                            onClick={() => {
                                navigate(
                                    `/dealers/${dealerId}/scheme/edit/${row?._id}`
                                )
                            }}
                            className="block w-full text-left px-2 py-1  hover:bg-gray-100"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                showConfirmationDialog({
                                    title: 'Delete Scheme',
                                    text: 'Do you want to delete',
                                    showCancelButton: true,
                                    next: (res) => {
                                        return res.isConfirmed
                                            ? handleDelete()
                                            : setShowDropdown(false)
                                    },
                                })
                            }}
                            className="block w-full text-left px-2 py-1  hover:bg-gray-100"
                        >
                            Delete
                        </button>
                    </>
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
    const [deleteDealerSchemeCall] = useDeleteDealerSchemeMutation()
    const [deactiveDealerScheme] = useDeactiveDealerSchemeMutation()

    const handleDelete = () => {
        setShowDropdown(false)
        deleteDealerSchemeCall(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Scheme deleted successfully!')
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

    const handleDeactive = (rowId: string) => {
        setShowDropdown(false)
        deactiveDealerScheme(rowId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Status changed successfully!')
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
            <DealerSchemeListing columns={columns} rows={items} />
        </>
    )
}

export default ListDealerSchemeTabWrapper
