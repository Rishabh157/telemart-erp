import React, { useEffect, useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { DealersSchemeListResponse } from 'src/models/DealerScheme.model'
import DealerSchemeListing from './DealerSchemeListing'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/dealerSchemeSlice'
import { AppDispatch } from 'src/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
    useGetDealerSchemeQuery,
    useDeleteDealerSchemeMutation,
    useDeactiveDealerSchemeMutation,
} from 'src/services/DealerSchemeService'
import { RootState } from 'src/redux/store'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'

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
        params: ["schemeName", "price"],
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
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DealersSchemeListResponse) => (
                <span> {row.schemeName} </span>
            ),
        },
        
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: DealersSchemeListResponse) => {
                return <span> {row.price} </span>
            },
        },
        {
            field:"details",
            headerName:"Available Pincode",
            flex:'flex-[2_2_0%]',
            renderCell:(row:DealersSchemeListResponse)=>(
                <Stack direction="row" spacing={1}>
                {row?.details?.pincodes?.map((ele, index) => {
                    if (index < 6) {
                        return (
                            <Chip
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
            )
        },
        {
            field: 'isActive',
            headerName: 'Status',
            flex: 'flex-[0.25_0.25_0%]',
            renderCell: (row: DealersSchemeListResponse) => {
                return (
                    <span>
                        {' '}
                        {row.isActive ? (
                            <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                        ) : (
                            <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                        )}{' '}
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
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                >
                    <>
                        <button
                            onClick={() => {
                                navigate(`/scheme/${currentId}`)
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
                        <button
                            onClick={() => {
                                showConfirmationDialog({
                                    title: 'Deactive Scheme',
                                    text: 'Do you want to Deactive',
                                    showCancelButton: true,
                                    next: (res) => {
                                        return res.isConfirmed
                                            ? handleDeactive()
                                            : setShowDropdown(false)
                                    },
                                })
                            }}
                            className="block w-full text-left px-2 py-1  hover:bg-gray-100"
                        >
                            {row.isActive ? 'Deactive' : 'Active'}
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

    const handleDeactive = () => {
        setShowDropdown(false)
        deactiveDealerScheme(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Scheme Deactive successfully!')
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
