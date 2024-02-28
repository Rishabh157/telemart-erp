import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { AppDispatch, RootState } from 'src/redux/store'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import InitialCallTwoListing from './InitialCallTwoListing'

import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { InitialCallerTwoListResponse } from 'src/models/configurationModel/InitialCallerTwo.model'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/configuration/initialCallerTwoSlice'
import {
    useDeactiveInitialCallerTwoMutation,
    useDeleteinitialCallerTwoMutation,
    useGetinitialCallerTwoQuery,
} from 'src/services/configurations/InitialCallerTwoServices'


import { Chip } from '@mui/material'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const InitialCallTwoListingWrapper = () => {
    const navigate = useNavigate()
    const [deleteTape] = useDeleteinitialCallerTwoMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const initialCallTwoState: any = useSelector(
        (state: RootState) => state.initialCallerTwo
    )

    const { page, rowsPerPage, searchValue, items, isActive } =
        initialCallTwoState

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const [deactiveInitialCallerTwo] = useDeactiveInitialCallerTwoMutation()
    const { data, isFetching, isLoading } = useGetinitialCallerTwoQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['tapeName', 'schemeLabel'],
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
            headerName: 'Initial Call Two',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.IC_TWO_LIST_INITIAL_CALL_ONE,
            renderCell: (row: InitialCallerTwoListResponse) => (
                <span> {row.initialCallName} </span>
            ),
        },
        {
            field: 'callType',
            headerName: 'Call Type',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.IC_TWO_LIST_CALL_TYPE,
            renderCell: (row: InitialCallerTwoListResponse) => (
                <span> {row.callType} </span>
            ),
        },
        {
            field: 'initialCallOneLabel',
            headerName: 'Initial Call One',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.IC_TWO_LIST_INITIAL_CALL_ONE,
            renderCell: (row: InitialCallerTwoListResponse) => (
                <span> {row.initialCallOneLabel} </span>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.IC_TWO_LIST_STATUS,
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
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_IC_TWO_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_IC_TWO_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`${row?._id}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Initial Call-Two',
                            text: 'Do you want to delete Initial Call-Two?',
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
        deactiveInitialCallerTwo(rowId).then((res: any) => {
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
        deleteTape(currentId).then((res: any) => {
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
            <>
                <div className="h-full">
                    <InitialCallTwoListing
                        columns={columns}
                        rows={items}
                        setShowDropdown={setShowDropdown}
                    />
                </div>
            </>
        </>
    )
}

export default InitialCallTwoListingWrapper
