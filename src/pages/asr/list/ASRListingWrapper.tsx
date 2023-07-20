/// ==============================================
// Filename:ASRListingWrapper.tsx
// Type: ASR List Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
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
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/ASRSlice'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { getAllowedAuthorizedColumns } from 'src/userAccess/getAuthorizedModules'
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
} from 'src/models/userAccess/UserAccess.model'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'

const ASRListingWrapper = () => {
    const navigate = useNavigate()
    const AsrState: any = useSelector((state: RootState) => state.asr)
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )

    const [deleteAsr] = useDeleteAsrMutation()
    const [updateAsrStatus] = useUpdateAsrStatusMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const columns: columnTypes[] = [
        {
            field: 'productName',
            headerName: 'Item Name',
            flex: 'flex-[3_3_0%]',
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
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    moduleName={UserModuleNameTypes.asr}
                    isEdit
                    isDelete
                    handleEditActionButton={() => {
                        navigate(`/asr/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete ARS',
                            text: 'Do you want to delete',
                            showCancelButton: true,
                            next: (res) => {
                                return res.isConfirmed
                                    ? handleDelete()
                                    : setShowDropdown(false)
                            },
                        })
                    }}
                    handleOnAction={() => {
                        // e.stopPropagation()
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                />
            ),
            align: 'end',
        },
    ]
    const { page, rowsPerPage, searchValue, items } = AsrState
    const { userData } = useSelector((state: RootState) => state?.auth)

    const dispatch = useDispatch<AppDispatch>()
    // // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetAsrQuery({
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
        setShowDropdown(false)
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
        <>
            <SideNavLayout>
                <ASRListing
                    columns={getAllowedAuthorizedColumns(
                        checkUserAccess,
                        columns,
                        UserModuleNameTypes.asr,
                        UserModuleActionTypes.List
                    )}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </SideNavLayout>
        </>
    )
}

export default ASRListingWrapper
