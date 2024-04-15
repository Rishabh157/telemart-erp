import React, { useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import DispositionOneListing from './DispositionOneListing'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import { Chip } from '@mui/material'
import {
    useGetdispositionOneQuery,
    useDeletedispositionOneMutation,
    useDeactiveDispositionOneMutation,
} from 'src/services/configurations/DispositiononeServices'
import { DispositionOneListResponse } from 'src/models/configurationModel/DisposiionOne.model'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'

const DispositionOneListingWrapper = () => {
    useUnmountCleanup()

    // state
    const [currentId, setCurrentId] = useState('')
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue, isActive } = listingPaginationState

    // initiate method
    const navigate = useNavigate()
    const [deleteDisposition] = useDeletedispositionOneMutation()
    const [deactiveDispositionOne] = useDeactiveDispositionOneMutation()

    // pagination api
    const { items } = useGetCustomListingData<DispositionOneListResponse[]>({
        useEndPointHook: useGetdispositionOneQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['dispositionName', 'dispositionDisplayName'],
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
                        UserModuleNameTypes.ACTION_DISPOSITION_ONE_EDIT
                    )}
                    // isDelete={isAuthorized(
                    //     UserModuleNameTypes.ACTION_DISPOSITION_ONE_DELETE
                    // )}
                    handleOnAction={() => {
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`${row?._id}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Disposition-one',
                            text: 'Do you want to delete Disposition-One?',
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
            name: UserModuleNameTypes.DISPOSITION_ONE_LIST_DISPOSITION_ONE_NAME,
            extraClasses: 'capitalize',
            renderCell: (row: DispositionOneListResponse) => (
                <span> {row.dispositionDisplayName} </span>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.DISPOSITION_ONE_LIST_STATUS,

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
        deactiveDispositionOne(rowId).then((res: any) => {
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
            <DispositionOneListing columns={columns} rows={items} />
        </div>
    )
}

export default DispositionOneListingWrapper
