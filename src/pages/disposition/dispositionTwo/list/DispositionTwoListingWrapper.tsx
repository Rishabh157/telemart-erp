import React, { useState } from 'react'
import { Chip } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { DispositionTwoListResponse } from 'src/models/configurationModel/DispositionTwo.model'
import { RootState } from 'src/redux/store'
import {
    useDeactiveDispositionTwoMutation,
    useDeletedispositionTwoMutation,
    useGetdispositionTwoQuery,
} from 'src/services/configurations/DispositionTwoServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import DispositionTwoListing from './DispositionTwoListing'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const DispositionTwoListingWrapper = () => {
    useUnmountCleanup()

    // state
    const [currentId, setCurrentId] = useState('')
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue, isActive } = listingPaginationState

    // initiate method
    const navigate = useNavigate()
    const [deleteDispositonTwo] = useDeletedispositionTwoMutation()
    const [deactiveUser] = useDeactiveDispositionTwoMutation()

    // pagination api
    const { items } = useGetCustomListingData<DispositionTwoListResponse[]>({
        useEndPointHook: useGetdispositionTwoQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: [
                'dispositionName',
                'dispositionOneId',
                'dispositionDisplayName',
            ],
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
                        UserModuleNameTypes.ACTION_DISPOSITION_TWO_EDIT
                    )}
                    // isDelete={isAuthorized(
                    //     UserModuleNameTypes.ACTION_DISPOSITION_TWO_DELETE
                    // )}
                    handleOnAction={() => {
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`edit/${row?._id}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Disposition-Two',
                            text: 'Do you want to delete Disposition-Two?',
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
            field: 'dispositionDisplayName',
            headerName: 'Disposition Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DISPOSITION_TWO_LIST_DISPOSITION_NAME,
            extraClasses: 'capitalize',
            renderCell: (row: DispositionTwoListResponse) => (
                <span> {row?.dispositionDisplayName} </span>
            ),
        },
        {
            field: 'dispostionOneDisplayLabel',
            headerName: 'Disposition One Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DISPOSITION_TWO_LIST_DISPOSITION_ONE_NAME,
            extraClasses: 'capitalize',
            renderCell: (row: DispositionTwoListResponse) => (
                <span> {row?.dispostionOneDisplayLabel} </span>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.DISPOSITION_TWO_LIST_STATUS,
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
        deactiveUser(rowId).then((res: any) => {
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
        deleteDispositonTwo(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        'Disposition Two deleted successfully!'
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
        <div className="h-full">
            <DispositionTwoListing columns={columns} rows={items} />
        </div>
    )
}

export default DispositionTwoListingWrapper
