import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { RootState } from 'src/redux/store'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import InitialCallTwoListing from './InitialCallTwoListing'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { InitialCallerTwoListResponse } from 'src/models/configurationModel/InitialCallerTwo.model'
import {
    useDeactiveInitialCallerTwoMutation,
    useDeleteinitialCallerTwoMutation,
    useGetinitialCallerTwoQuery,
} from 'src/services/configurations/InitialCallerTwoServices'
import { Chip } from '@mui/material'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'

const InitialCallTwoListingWrapper = () => {
    useUnmountCleanup()

    // state
    const [currentId, setCurrentId] = useState('')
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue, isActive } = listingPaginationState

    // initiate method
    const navigate = useNavigate()
    const [deactiveInitialCallerTwo] = useDeactiveInitialCallerTwoMutation()
    const [deleteDisposition] = useDeleteinitialCallerTwoMutation()

    // pagination api
    const { items } = useGetCustomListingData<any[]>({
        useEndPointHook: useGetinitialCallerTwoQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['initialCallName', 'initialCallDisplayName'],
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
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_IC_TWO_EDIT
                    )}
                    // isDelete={isAuthorized(
                    //     UserModuleNameTypes.ACTION_IC_TWO_DELETE
                    // )}
                    handleOnAction={() => {
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
                                return res.isConfirmed ? handleDelete() : null
                            },
                        })
                    }}
                />
            ),
        },
        {
            field: 'initialCallDisplayName',
            headerName: 'Initial Call Two',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'capitalize',
            name: UserModuleNameTypes.IC_TWO_LIST_INITIAL_CALL_ONE,
            renderCell: (row: InitialCallerTwoListResponse) => (
                <span> {row.initialCallDisplayName} </span>
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
            field: 'initialCallOneDisplayLabel',
            headerName: 'Initial Call One',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'capitalize',
            name: UserModuleNameTypes.IC_TWO_LIST_INITIAL_CALL_ONE,
            renderCell: (row: InitialCallerTwoListResponse) => (
                <span> {row.initialCallOneDisplayLabel} </span>
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
                                            row.isActive ? 'Deactive' : 'Active'
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
        deleteDisposition(currentId).then((res: any) => {
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
        <div className="h-full">
            <InitialCallTwoListing columns={columns} rows={items} />
        </div>
    )
}

export default InitialCallTwoListingWrapper
