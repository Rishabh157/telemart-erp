// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { OrderListResponse } from 'src/models/Order.model'
import WarehouseAssignedOrdersListing from './WarehouseAssignedOrderListing'

// |-- Redux --|
import { Chip } from '@mui/material'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import {
    useApprovedWHFirstCallApprovalMutation,
    useGetWHFristCallAssignedOrderQuery,
} from 'src/services/OrderService'
import { showToast } from 'src/utils'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { FormInitialValuesFilterWithLabel } from './assignedOrderFilter/AssignedOrderListFilterFormDialogWrapper'

export enum FirstCallApprovalStatus {
    'APPROVED' = 'APPROVED',
    'CANCEL' = 'CANCEL',
}

const WarehouseAssignedOrderListingWrapper = () => {
    useUnmountCleanup()
    const [filter, setFilter] =
        React.useState<FormInitialValuesFilterWithLabel>({
            schemeId: { fieldName: '', label: '', value: '' },
            stateId: { fieldName: '', label: '', value: '' },
            districtId: {
                fieldName: '',
                label: '',
                value: '',
            },
            callCenterManagerId: {
                fieldName: '',
                label: '',
                value: '',
            },
            startDate: {
                fieldName: '',
                label: '',
                value: '',
            },
            endDate: { fieldName: '', label: '', value: '' },
            callBackFrom: {
                fieldName: '',
                label: '',
                value: '',
            },
            callBackTo: {
                fieldName: '',
                label: '',
                value: '',
            },
            orderType: {
                fieldName: '',
                label: '',
                value: '',
            },
            languageBarrier: {
                fieldName: '',
                label: '',
                value: '',
            },
            isPnd: { fieldName: '', label: '', value: false },
        })
    const [, setShowDropdown] = useState(false)
    const params = useParams()
    const warehouseId = params.id
    const warehouseAssignedOrdersState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [warehousefirstCallApproval] =
        useApprovedWHFirstCallApprovalMutation()
    const { page, rowsPerPage, searchValue } = warehouseAssignedOrdersState

    const columns: columnTypes[] = [
        {
            field: 'firstCallApproval',
            headerName: '1st Call Approval',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => {
                return (
                    <span className="block w-full px-2 py-1 text-left cursor-pointer">
                        {row.firstCallApproval ? (
                            <Chip
                                className="cursor-pointer"
                                label="Approved"
                                color="success"
                                variant="outlined"
                                size="small"
                            />
                        ) : row.firstCallState ===
                          FirstCallApprovalStatus.CANCEL ? (
                            <Chip
                                className="cursor-pointer"
                                label="Cancled"
                                color="warning"
                                variant="outlined"
                                size="small"
                            />
                        ) : (
                            <Chip
                                onClick={() => {
                                    isAuthorized(
                                        UserModuleNameTypes.ACTION_WAREHOUSE_FIRST_CALL_ORDERS_APPROVAL
                                    ) &&
                                        showConfirmationDialog({
                                            title: 'Approval',
                                            text: `Do you want to ${
                                                row.firstCallApproval
                                                    ? 'Disapprove '
                                                    : 'Approval '
                                            }`,
                                            html: `<div className='flex gap-x-8'>
                                            <h1>Payment Mode: ${
                                                row?.paymentMode
                                            }</h1>
                                            ${
                                                row?.paymentMode === 'PREPAID'
                                                    ? `<h2>
                                                        Transaction ID:
                                                        ${row?.transactionId}
                                                    </h2>`
                                                    : ``
                                            }
                                          </div>`,
                                            showCancelButton: true,
                                            showDenyButton: true,
                                            confirmButtonText: 'Order approval',
                                            denyButtonText: 'Order cancled',
                                            confirmButtonColor: '#239B56',
                                            denyButtonColor: '#F1948A',

                                            next: (res) => {
                                                if (res.isConfirmed) {
                                                    return res.isConfirmed
                                                        ? handleApproval(
                                                              row?._id,
                                                              FirstCallApprovalStatus.APPROVED,
                                                              row?.assignWarehouseId,
                                                              row?.schemeProducts?.map(
                                                                  (ele) =>
                                                                      ele?.productGroupId
                                                              )
                                                          )
                                                        : setShowDropdown(false)
                                                }
                                                if (res.isDenied) {
                                                    return res.isDenied
                                                        ? handleApproval(
                                                              row?._id,
                                                              FirstCallApprovalStatus.CANCEL,
                                                              row?.assignWarehouseId,
                                                              row?.schemeProducts?.map(
                                                                  (ele) =>
                                                                      ele?.productGroupId
                                                              )
                                                          )
                                                        : setShowDropdown(false)
                                                }
                                            },
                                        })
                                }}
                                className="cursor-pointer"
                                label="Pending"
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
            field: 'orderNumber',
            headerName: 'Order No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <Link to={`/warehouse-first-call/${row?._id}`}>
                    <span className="text-primary-main">
                        # {row.orderNumber}
                    </span>
                </Link>
            ),
        },
        {
            field: 'orderReferenceNumber',
            headerName: 'Order Ref No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row.orderReferenceNumber || '-'}</span>
            ),
        },
        {
            field: 'inquiryNumber',
            headerName: 'Enquiry No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            // renderCell: (row: OrderListResponse) => <span></span>,
        },
        {
            field: 'firstCallRemark',
            headerName: '1st call remark',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallRemark || '-'}</span>
            ),
        },
        {
            field: 'firstCallState',
            headerName: 'first Call State',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallState || '-'}</span>
            ),
        },
        {
            field: 'firstCallCallBackDate',
            headerName: 'call back date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallCallBackDate || '-'}</span>
            ),
        },
        {
            field: 'assignWarehouseLabel',
            headerName: 'Warehouse',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.assignWarehouseLabel || '-'}</span>
            ),
        },
        {
            field: 'trackingNo',
            headerName: 'Tracking No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span>-</span>,
        },
        {
            field: 'tehsilLabel',
            headerName: 'Taluk',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.tehsilLabel}</span>
            ),
        },
        {
            field: 'statusDate',
            headerName: 'Status Date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span>{row?.status}</span>,
        },
        {
            field: 'shippingCharges',
            headerName: 'Shipping Charges',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.deliveryCharges}</span>
            ),
        },
        {
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.schemeName} </span>
            ),
        },
        {
            field: 'schemeCode',
            headerName: 'Scheme Code',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.schemeCode} </span>
            ),
        },
        {
            field: 'shcemeQuantity',
            headerName: 'Quantity',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.shcemeQuantity} </span>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span> {row?.price} </span>,
        },
        {
            field: 'pincodeLabel',
            headerName: 'Pincode',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.pincodeLabel} </span>
            ),
        },
        {
            field: 'paymentMode',
            headerName: 'Payment Mode',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.paymentMode} </span>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Order Date',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">
                    <div className="text-[12px] text-slate-700 font-medium">
                        {moment(row?.createdAt).format('DD MMM YYYY')}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                        {moment(row?.createdAt).format('hh:mm A')}
                    </div>
                </div>
            ),
        },

        {
            field: 'edpDate',
            headerName: 'EDP Date',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <div>-</div>,
        },
        {
            field: 'districtLabel',
            headerName: 'District',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.districtLabel}</div>
            ),
        },
        {
            field: 'dispositionLevelThreeLabel',
            headerName: 'Disposition',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.dispositionLevelThreeLabel}</div>
            ),
        },
        {
            field: 'dealerStatus',
            headerName: 'Dealer Status',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">
                    {/* {row?.dealerStatus === true ? 'Active' : 'DeActive'} */}
                </div>
            ),
        },
        {
            field: 'dealerCode',
            headerName: 'Dealer Code',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.assignDealerCode || '-'}</div>
            ),
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.customerName || '-'}</div>
            ),
        },
        {
            field: 'areaLabel',
            headerName: 'Customer Address',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'mobileNo',
            headerName: 'Contact No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.mobileNo}</div>
            ),
        },
        {
            field: 'channelName',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.channelLabel?.[0]}</div>
            ),
        },
        {
            field: 'callCenterLabel',
            headerName: 'CC Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.callCenterLabel}</div>
            ),
        },
        {
            field: 'areaLabel',
            headerName: 'Area',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'remark',
            headerName: 'Remark',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.remark}</div>
            ),
        },
        {
            field: 'agent',
            headerName: 'Agent',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.agentName}</div>
            ),
        },

        {
            field: 'Shipping Charges',
            headerName: 'Delivery Charges',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main ">
                    &#8377; {row.deliveryCharges}
                </span>
            ),
        },

        {
            field: 'preffered_delivery_date',
            headerName: 'Preffred Delivery Date Time',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            // hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => {
                return (
                    <>
                        <span>
                            {row?.preffered_delivery_date
                                ? moment(row?.preffered_delivery_date).format(
                                      'DD-MM-YYYY'
                                  )
                                : '-'}
                        </span>
                        {/* <span>
                                {' '}
                                {moment(row?.preffered_delivery_date).format(
                                    'hh:mm:ss A'
                                )}
                            </span>, */}
                    </>
                )
            },
        },
        {
            field: 'preffered_delivery_date',
            headerName: 'Preffred Delivery Time',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => {
                return row?.preffered_delivery_start_time &&
                    row?.preffered_delivery_end_time ? (
                    <span className="flex gap-1">
                        {(row?.preffered_delivery_start_time).replaceAll(
                            '_',
                            ' '
                        ) || '-'}{' '}
                        -{' '}
                        {(row?.preffered_delivery_end_time).replaceAll(
                            '_',
                            ' '
                        ) || '-'}
                    </span>
                ) : (
                    '-'
                )
            },
        },
        {
            field: 'orderMBKNumber',
            headerName: 'MBK Number',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[250px]',
            renderCell: (row: any) => (
                <span> {row.orderMBKNumber || '-'} </span>
            ),
        },
    ]

    const handleApproval = (
        rowId: string,
        status: string,
        warehouseId: string,
        productData: string[]
    ) => {
        setShowDropdown(false)
        let body = {
            status,
            warehouseId,
            productData,
        }

        warehousefirstCallApproval({ body: body, id: rowId }).then(
            (res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Approved successfully!')
                    }
                } else {
                    showToast('error', res?.error?.data?.message)
                }
            }
        )
    }
    const { userData }: any = useSelector((state: RootState) => state?.auth)

    const { items } = useGetCustomListingData({
        useEndPointHook: useGetWHFristCallAssignedOrderQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['didNo', 'mobileNo', 'orderNumber'],
            page: page,
            filterBy: [
                { fieldName: 'assignWarehouseId', value: warehouseId },
                { fieldName: 'companyId', value: userData?.companyId },
                { fieldName: 'firstCallApproval', value: false },
                { fieldName: 'approved', value: true },
                { fieldName: 'schemeId', value: filter.schemeId.value },
                // { fieldName: 'orderType', value: filter.orderType },
                { fieldName: 'stateId', value: filter.stateId.value },
                { fieldName: 'districtId', value: filter.districtId.value },
                {
                    fieldName: 'firstCallState',
                    value: filter.languageBarrier.value
                        ? ['LANGUAGEBARRIER']
                        : '',
                },
                {
                    fieldName: 'status',
                    value: filter.isPnd.value ? ['PND'] : '',
                },
            ],
            dateFilter: {
                startDate: filter.startDate.value as string,
                endDate: filter.endDate.value as string,
            },
            callbackDateFilter: {
                startDate: filter.callBackFrom.value,
                endDate: filter.callBackTo.value,
                dateFilterKey: 'firstCallCallBackDate',
            },
            callCenterId: (filter.callCenterManagerId.value as any) || null,
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    return (
        <SideNavLayout>
            <WarehouseAssignedOrdersListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
                setFilter={setFilter}
                filter={filter}
            />
        </SideNavLayout>
    )
}

export default WarehouseAssignedOrderListingWrapper
