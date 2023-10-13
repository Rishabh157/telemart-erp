/// ==============================================
// Filename:OutwardWarehouseToComapnyListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Chip, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { GroupByWarehouseToComapnyResponseTypes } from 'src/models/WarehouseToComapny.model'
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
} from 'src/models/userAccess/UserAccess.model'
import {
    useDeleteWarehouseToComapnyMutation,
    useGetPaginationWarehouseToComapnyByGroupQuery,
    useUpdateWarehouseToComapnyApprovalMutation,
} from 'src/services/WarehouseToComapnyService'
import { getAllowedAuthorizedColumns } from 'src/userAccess/getAuthorizedModules'
import { showToast } from 'src/utils'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import WarehouseToComapnyListing from './OutwardWarehouseToComapnyListing'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/WarehouseToComapnySlice'
import { AppDispatch, RootState } from 'src/redux/store'

const OutwardWarehouseToComapnyListingWrapper = () => {
    const columns: columnTypes[] = [
        {
            field: 'wtcNumber',
            headerName: 'WTC Number',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: GroupByWarehouseToComapnyResponseTypes) => (
                <span> {row?._id} </span> // this is a wtNumber we have to transform in _id
            ),
        },
        {
            field: 'fromWarehouseLabel',
            headerName: 'From Warehouse',
            flex: 'flex-[0.8_0.8_0%]',
            align: 'center',
            renderCell: (row: GroupByWarehouseToComapnyResponseTypes) => (
                <span> {row?.fromWarehouseLabel} </span>
            ),
        },
        {
            field: 'toWarehouseLabel',
            headerName: 'To Warehouse',
            flex: 'flex-[0.8_0.8_0%]',
            align: 'center',
            renderCell: (row: GroupByWarehouseToComapnyResponseTypes) => (
                <span> {row?.toWarehouseLabel} </span>
            ),
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
            flex: 'flex-[1.5_1.5_0%]',
            align: 'center',
            renderCell: (row: GroupByWarehouseToComapnyResponseTypes) => {
                return (
                    <div className="w-full">
                        {row?.documents?.map((item) => {
                            return (
                                <div className="grid grid-cols-3 border border-slate-400 mb-1 rounded text-center">
                                    <div className="col-span-2 border-r-[1px] border-slate-400 py-1 px-2">
                                        {item?.productSalesOrder?.groupName}
                                    </div>
                                    <div className="col-span-1 py-1 px-2">
                                        {item?.productSalesOrder?.quantity}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            },
        },
        {
            field: 'firstApprovedActionStatus',
            headerName: 'First Status',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: GroupByWarehouseToComapnyResponseTypes) => {
                return (
                    <span>
                        {row?.firstApproved
                            ? 'Done'
                            : row?.firstApproved === null
                            ? 'Pending'
                            : 'Rejected'}
                    </span>
                )
            },
        },
        {
            field: 'firstApprovedActionBy',
            headerName: 'First Approved By',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: GroupByWarehouseToComapnyResponseTypes) => {
                return <span> {row?.firstApprovedActionBy} </span>
            },
        },
        {
            field: 'firstApprovedAt',
            headerName: 'First Approved Date',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: GroupByWarehouseToComapnyResponseTypes) => {
                return <span> {row?.firstApprovedAt} </span>
            },
        },
        {
            field: 'secondApprovedActionByStatus',
            headerName: 'Second Status',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: GroupByWarehouseToComapnyResponseTypes) => {
                return (
                    <span>
                        {' '}
                        {row?.secondApproved
                            ? 'Done'
                            : row?.secondApproved === null
                            ? 'Pending'
                            : 'Rejected'}
                    </span>
                )
            },
        },
        {
            field: 'secondApprovedActionBy',
            headerName: 'Second Approved By',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: GroupByWarehouseToComapnyResponseTypes) => {
                return <span> {row?.secondApprovedActionBy} </span>
            },
        },
        {
            field: 'secondApprovedAt',
            headerName: 'Second Approved Date',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: GroupByWarehouseToComapnyResponseTypes) => {
                return <span> {row?.secondApprovedAt} </span>
            },
        },
        {
            field: 'createdAt',
            headerName: 'Inserted Date',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: GroupByWarehouseToComapnyResponseTypes) => {
                return <span> {formatedDateTimeIntoIst(row?.createdAt)} </span>
            },
        },
        {
            field: 'updatedAt',
            headerName: 'Updated Date',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: GroupByWarehouseToComapnyResponseTypes) => {
                return <span> {formatedDateTimeIntoIst(row?.updatedAt)} </span>
            },
        },
        {
            field: 'Approved',
            headerName: 'Approval',
            flex: 'flex-[1.0_1.0_0%]',
            align: 'center',
            renderCell: (row: GroupByWarehouseToComapnyResponseTypes) => {
                return (
                    <div>
                        {!row?.firstApproved ? (
                            <Stack direction="row" spacing={1}>
                                {row?.firstApproved === null ? (
                                    <button
                                        id="btn"
                                        className=" overflow-hidden cursor-pointer z-0"
                                        onClick={() => {
                                            showConfirmationDialog({
                                                title: 'First Approve',
                                                text: 'Do you want to Approve ?',
                                                showCancelButton: true,
                                                showDenyButton: true,
                                                denyButtonText: 'Reject',
                                                next: (res) => {
                                                    if (res.isConfirmed) {
                                                        return handleFirstComplete(
                                                            row?._id,
                                                            res?.isConfirmed,
                                                            'Approval'
                                                        )
                                                    }
                                                    if (res.isDenied) {
                                                        return handleFirstComplete(
                                                            row?._id,
                                                            !res.isDenied,
                                                            'Rejected'
                                                        )
                                                    }
                                                },
                                            })
                                        }}
                                    >
                                        <Chip
                                            label="First Pending"
                                            color="warning"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                ) : (
                                    <button
                                        id="btn"
                                        disabled={true}
                                        className="cursor-pointer"
                                    >
                                        <Chip
                                            label="First Rejected"
                                            color="error"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                )}
                            </Stack>
                        ) : (
                            <Stack direction="row" spacing={1}>
                                {row?.secondApproved === null ? (
                                    <button
                                        id="btn"
                                        className=" overflow-hidden cursor-pointer z-0"
                                        onClick={() => {
                                            showConfirmationDialog({
                                                title: 'Account Approval',
                                                text: 'Do you want to Approve ?',
                                                showCancelButton: true,
                                                showDenyButton: true,
                                                denyButtonText: 'Reject',
                                                next: (res) => {
                                                    if (res.isConfirmed) {
                                                        return handleAccComplete(
                                                            row?._id,
                                                            res?.isConfirmed,
                                                            'Approval'
                                                        )
                                                    }
                                                    if (res.isDenied) {
                                                        return handleAccComplete(
                                                            row?._id,
                                                            !res.isDenied,
                                                            'Rejected'
                                                        )
                                                    }
                                                },
                                            })
                                        }}
                                    >
                                        <Chip
                                            label="ACC Pending "
                                            color="warning"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                ) : row?.secondApproved ? (
                                    <button
                                        id="btn"
                                        disabled={true}
                                        className="cursor-pointer"
                                    >
                                        <Chip
                                            label="Acc  Approved"
                                            color="success"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                ) : (
                                    <button
                                        id="btn"
                                        disabled={true}
                                        className="cursor-pointer"
                                    >
                                        <Chip
                                            label=" Acc Rejected"
                                            color="error"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                )}
                            </Stack>
                        )}
                    </div>
                )
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: GroupByWarehouseToComapnyResponseTypes) =>
                row?.firstApproved === null &&
                row?.secondApproved === null && (
                    <ActionPopup
                        moduleName={UserModuleNameTypes.warehouseToComapny}
                        isEdit
                        isDelete
                        handleEditActionButton={() => {
                            navigate(`/warehouse-to-company/edit/${row?._id}`)
                        }}
                        handleDeleteActionButton={() => {
                            showConfirmationDialog({
                                title: 'Delete WarehouseToComapny',
                                text: 'Do you want to delete WarehouseToComapny?',
                                showCancelButton: true,
                                next: (res: any) => {
                                    return res.isConfirmed
                                        ? handleDelete()
                                        : setShowDropdown(false)
                                },
                            })
                        }}
                        handleOnAction={() => {
                            setShowDropdown(!showDropdown)
                            setCurrentId(row?._id)
                        }}
                    />
                ),
            align: 'end',
        },
    ]

    const WarehouseToComapnyState: any = useSelector(
        (state: RootState) => state.warehouseToComapny
    )
    const dispatch = useDispatch<AppDispatch>()
    const { page, rowsPerPage, searchValue, items } = WarehouseToComapnyState
    const navigate = useNavigate()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [deleteWarehouseToComapny] = useDeleteWarehouseToComapnyMutation()
    const [updateWarehouseToComapny] =
        useUpdateWarehouseToComapnyApprovalMutation()
    const { userData }: any = useSelector((state: RootState) => state.auth)
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    const params = useParams()
    const warehouseId = params.id

    const { data, isFetching, isLoading } =
        useGetPaginationWarehouseToComapnyByGroupQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['wtcNumber'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
                },
              
                {
                    fieldName: 'fromWarehouseId',
                    value: warehouseId,
                },
                {
                    fieldName: 'firstApproved',
                    value: true,
                },
                {
                    fieldName: 'secondApproved',
                    value: true,
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
    }, [isLoading, isFetching, data, dispatch])

    const handleDelete = () => {
        setShowDropdown(false)
        deleteWarehouseToComapny(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', ' deleted successfully!')
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

    const handleFirstComplete = (
        _id: string,
        value: boolean,
        message: string
    ) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        updateWarehouseToComapny({
            body: {
                firstApproved: value,
                type: 'FIRST',
                firstApprovedById: userData?.userId,
                firstApprovedAt: currentDate,
                firstApprovedActionBy: userData?.userName,
            },
            id: _id,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', ` ${message} is successfully!`)
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    const handleAccComplete = (
        _id: string,
        value: boolean,
        message: string
    ) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        updateWarehouseToComapny({
            body: {
                secondApproved: value,
                type: 'SECOND',
                secondApprovedById: userData?.userId,
                secondApprovedAt: currentDate,
                secondApprovedActionBy: userData?.userName,
            },
            id: _id,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', ` ${message} is successfully!`)
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    return (
        <>
                <WarehouseToComapnyListing
                    columns={getAllowedAuthorizedColumns(
                        checkUserAccess,
                        columns,
                        UserModuleNameTypes.warehouseToComapny,
                        UserModuleActionTypes.List
                    )}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
        </>
    )
}

export default OutwardWarehouseToComapnyListingWrapper
