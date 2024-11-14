// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { DealersListResponse } from 'src/models/Dealer.model'
import {
    useApproveDealerStatusMutation,
    useChangeDealerStatusMutation,
    useDeleteDealerMutation,
    useGetDealersQuery,
} from 'src/services/DealerServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import DealersListing from './DealersListing'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { FaCheck } from 'react-icons/fa'

// |-- Redux --|
import { Chip } from '@mui/material'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import ChangePasswordWrapper from '../ChangePassword/ChangePasswordWrapper'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const DealersListingWrapper = () => {
    useUnmountCleanup()
    const dealerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [currentId, setCurrentId] = useState('')
    const [dealerCode, setDealerCode] = useState('')

    const [showDropdown, setShowDropdown] = useState(false)
    const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false)
    const navigate = useNavigate()
    const [deletedealer] = useDeleteDealerMutation()
    const [approveDealer] = useApproveDealerStatusMutation()
    const [changeStatusActiveDeactive] = useChangeDealerStatusMutation()

    const { page, rowsPerPage, searchValue } = dealerState

    const handleDeactive = (rowId: string) => {
        setShowDropdown(false)
        changeStatusActiveDeactive(rowId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Status changed successfully!')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', res?.error?.data?.message)
            }
        })
    }

    const handleApproval = (rowId: string) => {
        setShowDropdown(false)
        approveDealer(rowId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Approvaled successfully!')
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

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            extraClasses: 'text-xs min-w-[100px]',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                        setDealerCode(row?.dealerCode)
                    }}
                    isView={isAuthorized(
                        UserModuleNameTypes.ACTION_DEALER_VIEW
                    )}
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_DEALER_EDIT
                    )}
                    // isDelete={isAuthorized(
                    //     UserModuleNameTypes.ACTION_DEALER_DELETE
                    // )}
                    isCustomBtn={isAuthorized(
                        UserModuleNameTypes.ACTION_DEALER_CHANGE_PASSWORD
                    )}
                    customBtnText="Change Password"
                    handleCustomActionButton={() => {
                        setChangePasswordDialogOpen(true)
                    }}
                    handleViewActionButton={() => {
                        navigate(`${currentId}/general-information`)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/dealers/edit-dealer/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Attribute',
                            text: 'Do you want to delete',
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
            field: 'dealerCode',
            headerName: 'Dealer Code',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_LIST_VENDOR_CODE,
            renderCell: (row: DealersListResponse) => (
                <span
                    className="text-primary-main cursor-pointer"
                    onClick={() => {
                        navigate(`${row?._id}/general-information`)
                    }}
                >
                    {row?.dealerCode}
                </span>
            ),
        },
        {
            field: 'firmName',
            headerName: 'Firm Name',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.DEALER_LIST_FIRM_NAME,
            renderCell: (row: DealersListResponse) => {
                return <span> {row.firmName} </span>
            },
        },
        {
            field: 'firstName',
            headerName: 'Name',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.DEALER_LIST_NAME,
            renderCell: (row: DealersListResponse) => (
                <span> {row.firstName.concat(' ', row?.lastName)} </span>
            ),
        },
        {
            field: 'billingAddress',
            headerName: 'Phone',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_LIST_PHONE,
            renderCell: (row: any) => {
                return <span> {row.billingAddress.phone} </span>
            },
        },
        {
            field: 'billingAddressStateName',
            headerName: 'State',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.DEALER_LIST_STATE,
            renderCell: (row: DealersListResponse) => {
                return <span> {row.billingAddressStateName} </span>
            },
        },
        {
            field: 'billingAddressDistrictName',
            headerName: 'District',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.DEALER_LIST_DISTRICT,
            renderCell: (row: DealersListResponse) => {
                return <span> {row.billingAddressDistrictName} </span>
            },
        },
        {
            field: 'document',
            headerName: 'GST Verified',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_LIST_IS_GST_VEEIFIED,
            renderCell: (row: DealersListResponse) => {
                return row?.document.gstNumber ? <FaCheck color="#438a47" /> : null
            },
        },
        {
            field: 'isApproved',
            headerName: 'Approval',
            extraClasses: 'text-xs min-w-[170px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.DEALER_LIST_APPROVAL,
            renderCell: (row: any) => {
                return (
                    <span className="block w-full text-left px-2 py-1 cursor-pointer">
                        {isAuthorized(
                            UserModuleNameTypes.ACTION_DEALER_APPROVAL
                        ) ? (
                            row.isApproved ? (
                                <Chip
                                    className="cursor-pointer"
                                    label="Approved"
                                    color="success"
                                    variant="outlined"
                                    size="small"
                                />
                            ) : (
                                <Chip
                                    onClick={() => {
                                        showConfirmationDialog({
                                            title: 'Approved',
                                            text: `Do you want to ${row.isApproved
                                                ? 'Pending this dealer'
                                                : 'Approval this dealer'
                                                }`,
                                            showCancelButton: true,
                                            next: (res) => {
                                                return res.isConfirmed
                                                    ? handleApproval(row?._id)
                                                    : setShowDropdown(false)
                                            },
                                        })
                                    }}
                                    className="cursor-pointer"
                                    label="Pending"
                                    color="error"
                                    variant="outlined"
                                    size="small"
                                />
                            )
                        ) : (
                            <Chip
                                className="cursor-pointer"
                                label={row.isActive ? 'Approved' : 'Pending'}
                                color={row.isActive ? 'success' : 'error'}
                                variant="outlined"
                                size="small"
                            />
                        )}
                    </span>
                )
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.DEALER_LIST_STATUS,
            renderCell: (row: any) => {
                return (
                    <span className="block w-full text-left px-2 py-1 cursor-pointer">
                        {isAuthorized(
                            UserModuleNameTypes.ACTION_DEALER_ACTIVATE_DEACTIVATE
                        ) ? (
                            row.isActive ? (
                                <Chip
                                    onClick={() => {
                                        showConfirmationDialog({
                                            title: 'Deactive User',
                                            text: `Do you want to ${row.isActive
                                                ? 'Deactive'
                                                : 'Active'
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
                                            title: 'Deactive Scheme',
                                            text: `Do you want to ${row.isActive
                                                ? 'Deactive'
                                                : 'Active'
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
                            )
                        ) : (
                            <Chip
                                className="cursor-pointer"
                                label={row.isActive ? 'Active' : 'Deactive'}
                                color={row.isActive ? 'success' : 'error'}
                                variant="outlined"
                                size="small"
                            />
                        )}
                    </span>
                )
            },
        },
    ]

    const { items } = useGetCustomListingData({
        useEndPointHook: useGetDealersQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['firstName', 'firmName', 'dealerCode'],
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

    const handleDelete = () => {
        setShowDropdown(false)
        deletedealer(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'dealer deleted successfully!')
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
            <DealersListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />

            <DialogLogBox
                maxWidth="sm"
                isOpen={changePasswordDialogOpen}
                handleClose={() => {
                    setChangePasswordDialogOpen(false)
                }}
                component={
                    <ChangePasswordWrapper
                        dealerId={dealerCode}
                        onClose={() => setChangePasswordDialogOpen(false)}
                    />
                }
            />
        </SideNavLayout>
    )
}

export default DealersListingWrapper
