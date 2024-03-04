import React, { useEffect, useState } from 'react'
import { Chip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { InitialCallerThreeListResponse } from 'src/models/configurationModel/InitialCallerThree.model'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/configuration/initialCallerThreeSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    useDeactiveInitialCallerThreeMutation,
    useDeleteInitialCallerThreeMutation,
    useGetInitialCallerThreeQuery,
} from 'src/services/configurations/InitialCallerThreeServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import InitialCallThreeListing from './InitialCallThreeListing'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const InitialCallThreeListingWrapper = () => {
    const navigate = useNavigate()
    const [deleteIniticallthree] = useDeleteInitialCallerThreeMutation()
    const [deactiveInitialCallerThree] = useDeactiveInitialCallerThreeMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const initialCallThreeState: any = useSelector(
        (state: RootState) => state.initialCallerThree
    )

    const { page, rowsPerPage, searchValue, items, isActive } =
        initialCallThreeState

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetInitialCallerThreeQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['initailCallName'],
        page: page,
        filterBy: [
            {
                fieldName: 'isActive',
                value:
                    isActive === '' ? '' : isActive === 'ACTIVE' ? true : false,
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

    const columns: columnTypes[] = [
        {
            field: 'initialCallName',
            headerName: 'Initial Call Three',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.IC_THREE_LIST_INITIAL_CALL_THREE,
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row.initialCallName} </span>
            ),
        },
        {
            field: 'callType',
            headerName: 'Call Type',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.IC_THREE_LIST_CALL_TYPE,
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row.callType} </span>
            ),
        },
        {
            field: 'initialCallOneLabel',
            headerName: 'Initial Call One',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.IC_THREE_LIST_INITIAL_CALL_ONE,
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row.initialCallOneLabel} </span>
            ),
        },
        {
            field: 'initialCallTwoLabel',
            headerName: 'Initial Call Two',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.IC_THREE_LIST_INITIAL_CALL_TWO,
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row.initialCallTwoLabel} </span>
            ),
        },
        {
            field: 'cancelFlag',
            headerName: 'cancel flag',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.IC_THREE_LIST_INITIAL_CANCEL_FLAG,
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row.cancelFlag ? 'Yes' : 'No'} </span>
            ),
        },
        {
            field: 'isPnd',
            headerName: 'Pnd',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.IC_THREE_LIST_INITIAL_CANCEL_PND,
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row.isPnd ? 'Yes' : 'No'} </span>
            ),
        },
        {
            field: 'returnType',
            headerName: 'Return Type',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.IC_THREE_LIST_INITIAL_RETURN_TYPE,
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span>{row?.returnType?.[0]}</span>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.IC_THREE_LIST_STATUS,
            renderCell: (row: any) => {
                return (
                    <span className="block w-full text-left px-2 py-1 cursor-pointer">
                        {row.isActive ? (
                            <Chip
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Deactive ',
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
                                        title: 'Deactive ',
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
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isView={isAuthorized(
                        UserModuleNameTypes.ACTION_IC_THREE_VIEW
                    )}
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_IC_THREE_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_IC_THREE_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleViewActionButton={() => {
                        navigate(`view/${row?._id}`)
                    }}
                    handleEditActionButton={() => {
                        navigate(`${row?._id}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete InitialCaller-Three',
                            text: 'Do you want to delete InitialCaller-Three?',
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
            align: 'end',
        },
    ]

    const handleDeactive = (rowId: string) => {
        setShowDropdown(false)
        deactiveInitialCallerThree(rowId).then((res: any) => {
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

    const handleDelete = () => {
        setShowDropdown(false)
        deleteIniticallthree(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        'Initiacall-Three deleted successfully!'
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
        <InitialCallThreeListing
            columns={columns}
            rows={items}
            setShowDropdown={setShowDropdown}
        />
    )
}

export default InitialCallThreeListingWrapper
