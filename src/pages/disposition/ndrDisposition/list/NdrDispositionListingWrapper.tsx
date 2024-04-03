import React, { useEffect, useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import { Chip } from '@mui/material'
import {
    useGetNdrdispositionQuery,
    useDeleteNdrDispositionMutation,
    useDeactiveNdrDispositionMutation,
} from 'src/services/configurations/NdrDisositionServices'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/configuration/ndrDispositionSlice'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import NdrDispositionListing from './NdrDispositionListing'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import { NdrDispositionListResponseType } from 'src/models/configurationModel/NdrDisposition.model'

const NdrDispositionListingWrapper = () => {
    const navigate = useNavigate()
    const [deleteTape] = useDeleteNdrDispositionMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')

    const ndrDispositionState: any = useSelector(
        (state: RootState) => state.ndrDisposition
    )

    const { page, rowsPerPage, searchValue, items } = ndrDispositionState

    const dispatch = useDispatch<AppDispatch>()
    const [deactiveDispositionOne] = useDeactiveNdrDispositionMutation()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetNdrdispositionQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['ndrDisposition'],
        page: page,
        filterBy: [],
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
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: NdrDispositionListResponseType) => (
                <ActionPopup
                    // moduleName={UserModuleNameTypes.ndrDisposition}
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_NDR_DISPOSITION_EDIT
                    )}
                    // isDelete={isAuthorized(
                    //     UserModuleNameTypes.ACTION_NDR_DISPOSITION_DELETE
                    // )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`${row?._id}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete NDR Disposition',
                            text: 'Do you want to delete NDR Disposition?',
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
            
        },
        {
            field: 'ndrDisposition',
            headerName: 'Disposition Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.NDR_DISPOSITION_LIST_DISPOSITION_NAME,
            renderCell: (row: NdrDispositionListResponseType) => (
                <span> {row?.ndrDisposition} </span>
            ),
        },
        {
            field: 'emailType',
            headerName: 'Email type',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.NDR_DISPOSITION_LIST_EMAIL_TYPE,
            renderCell: (row: NdrDispositionListResponseType) => (
                <span> {row?.emailType?.replaceAll('_', ' ')}</span>
            ),
        },
        {
            field: 'smsType',
            headerName: 'Sms Type',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.NDR_DISPOSITION_LIST_SMS_TYPE,
            renderCell: (row: NdrDispositionListResponseType) => (
                <span> {row?.smsType?.replaceAll('_', ' ')} </span>
            ),
        },
        {
            field: 'rtoAttempt',
            headerName: 'Rto Attempt',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.NDR_DISPOSITION_LIST_RTO_ATTEMPT,
            renderCell: (row: NdrDispositionListResponseType) => (
                <span> {row?.rtoAttempt} </span>
            ),
        },
        {
            field: 'subDispositions',
            headerName: 'Sub Disposition',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.NDR_DISPOSITION_LIST_SUB_DISPOSITION,
            renderCell: (row: NdrDispositionListResponseType) => (
                <span> {row?.subDispositions?.join(' , ')} </span>
            ),
        },
        {
            field: 'priority',
            headerName: 'Priority',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.NDR_DISPOSITION_LIST_PRIORITY,
            renderCell: (row: NdrDispositionListResponseType) => (
                <span> {row?.priority} </span>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.NDR_DISPOSITION_LIST_STATUS,
            renderCell: (row: NdrDispositionListResponseType) => {
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
    ]

    const handleDeactive = (rowId: string) => {
        setShowDropdown(false)
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
        <div className="h-full">
            <NdrDispositionListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </div>
    )
}

export default NdrDispositionListingWrapper
