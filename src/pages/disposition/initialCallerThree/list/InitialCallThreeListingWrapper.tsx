import React, { useState } from 'react'
import { Chip } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { InitialCallerThreeListResponse } from 'src/models/configurationModel/InitialCallerThree.model'
import { RootState } from 'src/redux/store'
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
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const InitialCallThreeListingWrapper = () => {
    useUnmountCleanup()

    // state
    const [currentId, setCurrentId] = useState('')
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue, isActive } = listingPaginationState

    // initiate method
    const navigate = useNavigate()
    const [deleteIniticallthree] = useDeleteInitialCallerThreeMutation()
    const [deactiveInitialCallerThree] = useDeactiveInitialCallerThreeMutation()

    // pagination api
    const { items } = useGetCustomListingData<any[]>({
        useEndPointHook: useGetInitialCallerThreeQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['initailCallName', 'initialCallDisplayName'],
            page: page,
            filterBy: [
                {
                    fieldName: 'isActive',
                    value:
                        isActive === ''
                            ? ''
                            : isActive === 'ACTIVE'
                            ? true
                            : false,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const columns: columnTypes[] = [
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
                    // isDelete={isAuthorized(
                    //     UserModuleNameTypes.ACTION_IC_THREE_DELETE
                    // )}
                    handleOnAction={() => {
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
                                return res.isConfirmed ? handleDelete() : null
                            },
                        })
                    }}
                />
            ),
        },
        {
            field: 'initialCallDisplayName',
            headerName: 'Initial Call Three',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'capitalize',
            name: UserModuleNameTypes.IC_THREE_LIST_INITIAL_CALL_THREE,
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row?.initialCallDisplayName} </span>
            ),
        },
        {
            field: 'callType',
            headerName: 'Call Type',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.IC_THREE_LIST_CALL_TYPE,
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row?.callType} </span>
            ),
        },
        {
            field: 'initialCallOneDisplayLabel',
            headerName: 'Initial Call One',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'capitalize',
            name: UserModuleNameTypes.IC_THREE_LIST_INITIAL_CALL_ONE,
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row?.initialCallOneDisplayLabel} </span>
            ),
        },
        {
            field: 'initialCallTwoDisplayLabel',
            headerName: 'Initial Call Two',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'capitalize',
            name: UserModuleNameTypes.IC_THREE_LIST_INITIAL_CALL_TWO,
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row?.initialCallTwoDisplayLabel} </span>
            ),
        },
        {
            field: 'cancelFlag',
            headerName: 'cancel flag',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.IC_THREE_LIST_INITIAL_CANCEL_FLAG,
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row?.cancelFlag ? 'Yes' : 'No'} </span>
            ),
        },
        {
            field: 'isPnd',
            headerName: 'Pnd',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.IC_THREE_LIST_INITIAL_CANCEL_PND,
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row?.isPnd ? 'Yes' : 'No'} </span>
            ),
        },
        {
            field: 'returnType',
            headerName: 'Return Type',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.IC_THREE_LIST_INITIAL_RETURN_TYPE,
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span>{row?.returnType?.join(' , ')}</span>
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
                        {row?.isActive ? (
                            <Chip
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Deactive ',
                                        text: `Do you want to ${
                                            row?.isActive ? 'Deactive' : 'Active'
                                        }`,
                                        showCancelButton: true,
                                        next: (res) => {
                                            return res.isConfirmed
                                                ? handleDeactive(row?._id)
                                                : null
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
                                            row?.isActive ? 'Deactive' : 'Active'
                                        }`,
                                        showCancelButton: true,
                                        next: (res) => {
                                            return res.isConfirmed
                                                ? handleDeactive(row?._id)
                                                : null
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
    ]

    const handleDeactive = (rowId: string) => {
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

    return <InitialCallThreeListing columns={columns} rows={items} />
}

export default InitialCallThreeListingWrapper
