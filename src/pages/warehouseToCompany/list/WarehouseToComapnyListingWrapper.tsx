// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Chip } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

import { OutwardRequestWarehouseToCompanyListResponse } from 'src/models'
import { showToast } from 'src/utils'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import WarehouseToComapnyListing from './WarehouseToComapnyListing'

import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import {
    useDeleteWarehouseToComapnyMutation,
    useGetPaginationWarehouseToComapnyByGroupQuery,
    useUpdateWarehouseToComapnyApprovalMutation,
} from 'src/services/WarehouseToComapnyService'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const WarehouseToComapnyListingWrapper = () => {
    useUnmountCleanup()


    const WarehouseToComapnyState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = WarehouseToComapnyState
    const navigate = useNavigate()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [deleteWarehouseToComapny] = useDeleteWarehouseToComapnyMutation()
    const [updateWarehouseToComapny] =
        useUpdateWarehouseToComapnyApprovalMutation()
    const { userData }: any = useSelector((state: RootState) => state.auth)

    const { items } = useGetCustomListingData({
        useEndPointHook: useGetPaginationWarehouseToComapnyByGroupQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['wtcNumber'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
                },
                {
                    fieldName: '',
                    value: [],
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
        deleteWarehouseToComapny(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', ' deleted successfully!')
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

    const handleFirstComplete = (
        _id: string,
        value: boolean,
        message: string
    ) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        updateWarehouseToComapny({
            body: {
                firstApproved: value,
                type: 'FIRST',
                firstApprovedById: userData?.userId,
                firstApprovedAt: currentDate,
                firstApprovedActionBy: userData?.userName,
            },
            id: _id,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', ` ${message} is successfully!`)
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    const handleSecondComplete = (
        _id: string,
        value: boolean,
        message: string
    ) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        updateWarehouseToComapny({
            body: {
                secondApproved: value,
                type: 'SECOND',
                secondApprovedById: userData?.userId,
                secondApprovedAt: currentDate,
                secondApprovedActionBy: userData?.userName,
            },
            id: _id,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', ` ${message} is successfully!`)
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            extraClasses: 'min-w-[100px]',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) =>
                row?.firstApproved === null &&
                row?.secondApproved === null && (
                    <ActionPopup
                        isEdit={isAuthorized(
                            UserModuleNameTypes.ACTION_WAREHOUSE_TO_COMPANY_TRANSFER_EDIT
                        )}
                        isDelete={isAuthorized(
                            UserModuleNameTypes.ACTION_WAREHOUSE_TO_COMPANY_TRANSFER_DELETE
                        )}
                        handleEditActionButton={() => {
                            navigate(`/warehouse-to-company/edit/${row?._id}`)
                        }}
                        handleDeleteActionButton={() => {
                            showConfirmationDialog({
                                title: 'Delete WarehouseToComapny',
                                text: 'Do you want to delete WarehouseToComapny?',
                                showCancelButton: true,
                                next: (res: any) => {
                                    return res.isConfirmed
                                        ? handleDelete()
                                        : setShowDropdown(false)
                                },
                            })
                        }}
                        handleOnAction={() => {
                            setShowDropdown(!showDropdown)
                            setCurrentId(row?._id)
                        }}
                    />
                ),
        },
        {
            field: 'wtcNumber',
            headerName: 'WTC Number',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_COMPANY_TRANSFER_LIST_WAREHOUSE_TO_COMPANY_NUMBER,
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => (
                <span> {row?._id} </span>
            ),
        },
        {
            field: 'fromWarehouseLabel',
            headerName: 'From Warehouse',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.8_0.8_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_COMPANY_TRANSFER_LIST_FROM_WAREHOUSE,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => (
                <span> {row?.fromWarehouseLabel} </span>
            ),
        },
        {
            field: 'toCompanyLabel',
            headerName: 'Company Name',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.8_0.8_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_COMPANY_TRANSFER_LIST_COMPANY_NAME,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => (
                <span> {row?.toCompanyLabel} </span>
            ),
        },
        {
            field: 'toWarehouseLabel',
            headerName: 'To Warehouse',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.8_0.8_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_COMPANY_TRANSFER_LIST_TO_WAREHOUSE,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => (
                <span> {row?.toWarehouseLabel} </span>
            ),
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_COMPANY_TRANSFER_LIST_FIRST_APPROVAL,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => {
                return (
                    <div className="w-full">
                        {row?.documents?.map((item, ind) => {
                            return (
                                <div
                                    key={ind}
                                    className="grid grid-cols-3 border border-slate-400 mb-1 rounded text-center"
                                >
                                    <div className="col-span-2 border-r-[1px] border-slate-400 py-1 px-2">
                                        {item?.productSalesOrder?.groupName}
                                    </div>
                                    <div className="col-span-1 py-1 px-2">
                                        {item?.productSalesOrder?.quantity}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            },
        },
        // First Approval
        {
            field: 'firstApproved',
            headerName: 'First Approval',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.0_1.0_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_COMPANY_TRANSFER_LIST_FIRST_APPROVAL,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => {
                return (
                    <div className="z-0">
                        {row?.firstApproved === null ? (
                            <Chip onClick={() => {
                                // here only admin and user who has rights can approve the request
                                if (isAuthorized(UserModuleNameTypes.ACTION_WAREHOUSE_TO_COMPANY_TRANSFER_LIST_FIRST_APPROVAL)) {
                                    showConfirmationDialog({
                                        title: 'First Approve',
                                        text: 'Do you want to Approve ?',
                                        showCancelButton: true,
                                        showDenyButton: true,
                                        denyButtonText: 'Reject',
                                        next: (res) => {
                                            if (res.isConfirmed) {
                                                return handleFirstComplete(
                                                    row?._id,
                                                    res?.isConfirmed,
                                                    'Approval'
                                                )
                                            }
                                            if (res.isDenied) {
                                                return handleFirstComplete(
                                                    row?._id,
                                                    !res.isDenied,
                                                    'Rejected'
                                                )
                                            }
                                        },
                                    })
                                } else {
                                    showToast('error', "You don't have permission to approve the request")
                                }
                            }}
                                label="First Pending"
                                color="warning"
                                variant="outlined"
                                size="small"
                                clickable={true}
                            />
                        ) : (
                            <Chip
                                label={row?.firstApproved === true ? "First Approved" : "First Rejected"}
                                color={row?.firstApproved === true ? "success" : "error"}
                                variant="outlined"
                                size="small"
                                clickable={false}
                            />
                        )}
                    </div>
                )
            },
        },
        {
            field: 'firstApprovedActionBy',
            headerName: 'First Approved By',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_COMPANY_TRANSFER_LIST_FIRST_APPROVED_BY,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => {
                return <div>
                    <div className="font-medium">
                        {row?.firstApprovedActionBy}
                    </div>
                    <div className="text-[12px] text-slate-500 font-medium">
                        {row?.firstApprovedAt}
                    </div>
                </div>
            },
        },
        // Second Approval
        {
            field: 'secondApproved',
            headerName: 'Second Approval',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.0_1.0_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_COMPANY_TRANSFER_LIST_SECOND_APPROVAL,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => {
                return (
                    <div className="z-0">
                        {row?.secondApproved === null ? (
                            <Chip onClick={() => {
                                if (isAuthorized(UserModuleNameTypes.ACTION_WAREHOUSE_TO_COMPANY_TRANSFER_LIST_SECOND_APPROVAL)) {
                                    if (row?.firstApproved) {
                                        showConfirmationDialog({
                                            title: 'Second Approval',
                                            text: 'Do you want to Approve ?',
                                            showCancelButton: true,
                                            showDenyButton: true,
                                            denyButtonText: 'Reject',
                                            next: (res) => {
                                                if (res.isConfirmed) {
                                                    return handleSecondComplete(
                                                        row?._id,
                                                        res?.isConfirmed,
                                                        'Approval'
                                                    )
                                                }
                                                if (res.isDenied) {
                                                    return handleSecondComplete(
                                                        row?._id,
                                                        !res.isDenied,
                                                        'Rejected'
                                                    )
                                                }
                                            },
                                        })
                                    } else {
                                        showToast('error', `First approval is still ${row?.firstApproved === null ? 'pending' : 'rejected'}`)
                                    }
                                } else {
                                    showToast('error', "You don't have permission to approve the request")
                                }
                            }}
                                label="Second Pending"
                                color="warning"
                                variant="outlined"
                                size="small"
                                clickable={true}
                            />
                        ) : (
                            <Chip
                                label={row?.secondApproved === true ? "Second Approved" : "Second Rejected"}
                                color={row?.secondApproved === true ? "success" : "error"}
                                variant="outlined"
                                size="small"
                                clickable={false}
                            />
                        )}
                    </div>
                )
            },
        },
        {
            field: 'secondApprovedActionBy',
            headerName: 'Second Approved By',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_COMPANY_TRANSFER_LIST_SECOND_APPROVED_BY,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => {
                return <div>
                    <div className="font-medium">
                        {row?.secondApprovedActionBy}
                    </div>
                    <div className="text-[12px] text-slate-500 font-medium">
                        {row?.secondApprovedAt}
                    </div>
                </div>
            },
        },
        {
            field: 'createdAt',
            headerName: 'Inserted Date',
            extraClasses: 'min-w-[170px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_COMPANY_TRANSFER_LIST_INSERTED_DATE,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.createdAt)} </span>
            },
        },
        {
            field: 'updatedAt',
            headerName: 'Updated Date',
            extraClasses: 'min-w-[170px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_COMPANY_TRANSFER_LIST_UPDATE_DATE,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.updatedAt)} </span>
            },
        },
    ]

    return (
        <SideNavLayout>
            <WarehouseToComapnyListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </SideNavLayout>
    )
}

export default WarehouseToComapnyListingWrapper
