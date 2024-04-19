
// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Chip, Stack } from '@mui/material'
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { DealerToDealerListResponseTypes } from 'src/models/DealerToDealer.model'
import {
    useApprovealDealerToDealerOrderMutation,
    useGetDealerToDealerOrderQuery
} from 'src/services/DealerToDealerOrderService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import DealerToDealerOrderListing from './DealerToDealerOrderListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const DealerToDealerOrderListingWrapper = () => {
    useUnmountCleanup()
    const salesOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = salesOrderState
    const [, setShowDropdown] = useState(false)
    const [updateDealerToDealerRequest] =
        useApprovealDealerToDealerOrderMutation()
    const { userData }: any = useSelector((state: RootState) => state.auth)
    const { items } = useGetCustomListingData({
        useEndPointHook: useGetDealerToDealerOrderQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['dtdNumber', 'fromDealerLabel', 'toDealerLabel'],
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

  

    const handleFirstComplete = (
        _id: string,
        value: boolean,
        message: string
    ) => {
        updateDealerToDealerRequest({
            id: _id,
            status: value,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        `Distributor Head ${message} is successfully!`
                    )
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
            field: '_id',
            headerName: 'Dealer To Dealer Number',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_TO_DEALER_LIST_D_To_D_NUMBER,
            renderCell: (row: DealerToDealerListResponseTypes) => (
                <span> {row?._id} </span>
            ),
        },
        {
            field: 'fromDealerLabelLabel',
            headerName: 'From Dealer',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_TO_DEALER_LIST_DEALER_FROM_DEALER,
            align: 'center',
            renderCell: (row: DealerToDealerListResponseTypes) => (
                <>
                    {row?.documents?.[0]?.fromDealerLabelLabel ? (
                        <span>
                            {row?.documents?.[0]?.fromDealerLabelLabel || '-'}
                        </span>
                    ) : (
                        '-'
                    )}
                </>
            ),
        },
        {
            field: 'toDealerLabelLabel',
            headerName: 'To Dealer',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_TO_DEALER_LIST_TO_DEALER,
            align: 'center',
            renderCell: (row: DealerToDealerListResponseTypes) => (
                <>
                    {row?.documents?.[0]?.toDealerLabelLabel ? (
                        <span>
                            {row?.documents?.[0]?.toDealerLabelLabel || '-'}
                        </span>
                    ) : (
                        '-'
                    )}
                </>
            ),
        },
        {
            field: 'requestCreatedByLabel',
            headerName: 'Request Created By',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_TO_DEALER_LIST_REQUEST_CREATED_BY,
            align: 'center',
            renderCell: (row: DealerToDealerListResponseTypes) => {
                return <span> {row?.requestCreatedByLabel} </span>
            },
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.DEALER_TO_DEALER_LIST_ITEM_AND_QUANTITY,
            align: 'center',
            renderCell: (row: DealerToDealerListResponseTypes) => {
                return (
                    <div className="w-full">
                        {row?.documents?.map((item, ind) => {
                            return (
                                <div
                                    key={ind}
                                    className="grid grid-cols-3 border border-slate-400 mb-1 rounded text-center"
                                >
                                    <div className="col-span-2 border-r-[1px] border-slate-400 py-1 px-2">
                                        {item?.productDetails?.groupName}
                                    </div>
                                    <div className="col-span-1 py-1 px-2">
                                        {item?.productDetails?.quantity}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            },
        },
        {
            field: 'requestApproved',
            headerName: 'First Status',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_TO_DEALER_LIST_FIRST_STATUS,
            align: 'center',
            renderCell: (row: DealerToDealerListResponseTypes) => {
                return (
                    <span>
                        {row?.requestApproved
                            ? 'Done'
                            : row?.requestApproved === null
                            ? 'Pending'
                            : 'Rejected'}{' '}
                    </span>
                )
            },
        },
        {
            field: 'requestApprovedByLabel',
            headerName: 'First Approved By',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_TO_DEALER_LIST_DH_FIRST_APPROVED_BY,
            align: 'center',
            renderCell: (row: DealerToDealerListResponseTypes) => {
                return <span> {row?.requestApprovedByLabel} </span>
            },
        },
        {
            field: 'Approved',
            headerName: 'Approval',
            flex: 'flex-[1.0_1.0_0%]',
            name: UserModuleNameTypes.DEALER_TO_DEALER_LIST_ACCOUNT_APPROVAL,
            align: 'center',
            renderCell: (row: DealerToDealerListResponseTypes) => {
                return (
                    <div className="z-0">
                        {!row?.requestApproved ? (
                            <Stack direction="row" spacing={1}>
                                {row?.requestApproved === null ? (
                                    <button
                                        id="btn"
                                        className=" overflow-hidden cursor-pointer z-0"
                                        onClick={() => {
                                            showConfirmationDialog({
                                                title: 'DH Approve',
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
                                        }}
                                    >
                                        <Chip
                                            label="First Pending"
                                            color="warning"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                ) : (
                                    <button
                                        id="btn"
                                        disabled={true}
                                        className="cursor-pointer"
                                    >
                                        <Chip
                                            label="First Rejected"
                                            color="error"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                )}
                            </Stack>
                        ) : (
                            <button
                                id="btn"
                                disabled={true}
                                className="cursor-pointer"
                            >
                                <Chip
                                    label="First Approved"
                                    color="success"
                                    variant="outlined"
                                    size="small"
                                    clickable={true}
                                />
                            </button>
                        )}
                    </div>
                )
            },
        },
    ]

    return (
        <SideNavLayout>
            <DealerToDealerOrderListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </SideNavLayout>
    )
}

export default DealerToDealerOrderListingWrapper
