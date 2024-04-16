// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Chip, Stack } from '@mui/material'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ASRListResponse } from 'src/models/ASR.model'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ASRListing from './ASRListing'
import { showToast } from 'src/utils'
import {
    useDeleteAsrMutation,
    useGetAsrQuery,
    useUpdateAsrStatusMutation,
} from 'src/services/AsrService'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const ASRListingWrapper = () => {
    useUnmountCleanup()
    // state
    const [currentId, setCurrentId] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = listingPaginationState
    const { userData } = useSelector((state: RootState) => state?.auth)

    // initiate method
    const navigate = useNavigate()
    const [deleteAsr] = useDeleteAsrMutation()
    const [updateAsrStatus] = useUpdateAsrStatusMutation()

    // pagination api
    const { items } = useGetCustomListingData<any[]>({
        useEndPointHook: useGetAsrQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['asrDetails.productName'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
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
                    isEdit={isAuthorized(UserModuleNameTypes.ACTION_ASR_EDIT)}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_ASR_DELETE
                    )}
                    handleEditActionButton={() => {
                        navigate(`/asr/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete ARS',
                            text: 'Do you want to delete',
                            showCancelButton: true,
                            next: (res) => {
                                return res.isConfirmed ? handleDelete() : null
                            },
                        })
                    }}
                    handleOnAction={() => {
                        setCurrentId(row?._id)
                    }}
                />
            ),
        },
        {
            field: 'productName',
            headerName: 'Item Name',
            flex: 'flex-[3_3_0%]',
            name: UserModuleNameTypes.ASR_LIST_NAME,
            renderCell: (row: ASRListResponse) => (
                <span>
                    {' '}
                    <Stack direction="row" spacing={1}>
                        {row?.asrDetails?.map((ele, index) => {
                            if (index < 4) {
                                return (
                                    <Chip
                                        key={index}
                                        label={ele?.productName}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                    />
                                )
                            }
                            if (index === 5) {
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
                    </Stack>{' '}
                </span>
            ),
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            flex: 'flex-[1.8_1.8_0%]',
            name: UserModuleNameTypes.ASR_LIST_QUANTITY,
            renderCell: (row: ASRListResponse) => (
                <span>
                    {' '}
                    <Stack direction="row" spacing={1}>
                        {row?.asrDetails?.map((ele, index) => {
                            if (index < 4) {
                                return (
                                    <Chip
                                        key={index}
                                        label={ele?.quantity}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                    />
                                )
                            }
                            if (index === 5) {
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
                    </Stack>{' '}
                </span>
            ),
        },
        {
            field: 'completed',
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASR_LIST_STATUS,
            renderCell: (row: ASRListResponse) => (
                <span>
                    {' '}
                    <Stack direction="row" spacing={1}>
                        {row?.completed === true ? (
                            <Chip
                                label="Completed"
                                color="success"
                                variant="outlined"
                                size="small"
                            />
                        ) : (
                            <button
                                id="btn"
                                disabled={isDisabled}
                                className="cursor-pointer"
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Complete ASR',
                                        text: 'Do you want to Complete ASR ?',
                                        showCancelButton: true,
                                        next: (res) => {
                                            return res.isConfirmed
                                                ? handleComplete(row?._id)
                                                : false
                                        },
                                    })
                                }}
                            >
                                <Chip
                                    label="Not Completed"
                                    color="error"
                                    variant="outlined"
                                    size="small"
                                    clickable={true}
                                />
                            </button>
                        )}
                    </Stack>{' '}
                </span>
            ),
        },
    ]

    const handleComplete = (id: string) => {
        updateAsrStatus(id).then((res) => {
            setIsDisabled(true)
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Status Updated successfully!')
                    setIsDisabled(false)
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
        deleteAsr(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Asr deleted successfully!')
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
        <SideNavLayout>
            <ASRListing columns={columns} rows={items} />
        </SideNavLayout>
    )
}

export default ASRListingWrapper
