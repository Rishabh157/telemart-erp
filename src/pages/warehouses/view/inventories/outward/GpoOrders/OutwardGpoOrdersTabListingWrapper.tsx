/* eslint-disable react-hooks/exhaustive-deps */
// |-- External Dependencies --|
import React, { useState } from 'react'
import { IconType } from 'react-icons'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { useParams, useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import OutwardGpoOrdersTabListing from './OutwardGpoOrdersTabListing'

// |-- Redux --|
import { Chip } from '@mui/material'
import moment from 'moment'
import { FaRegFilePdf } from 'react-icons/fa'
import BarcodeCard from 'src/components/UI/Barcode/BarcodeCard'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { BarcodeListResponseType, OrderListResponse } from 'src/models'
import { SaleOrderStatus } from 'src/models/SaleOrder.model'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetWarehouseBarcodeMutation } from 'src/services/BarcodeService'
import {
    useDispatchGPOOrdersToWarehouseMutation,
    useGetOrderQuery,
} from 'src/services/OrderService'
import { showToast } from 'src/utils'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { FormInitialValuesFilterWithLabel } from './Filters/OutwardGpoOrderFilterFormWrapper'

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

enum FirstCallApprovalStatus {
    'APPROVED' = 'APPROVED',
    'CANCEL' = 'CANCEL',
}

const OutwardGpoOrdersTabListingWrapper = () => {
    // state
    const [orderNumber, setOrderNumber] = useState<string | null>(null)
    const [barcodeNumber, setBarcodeNumber] = useState<any>()
    const [products, setProducts] = useState<any>([])
    // const [autoDispatch, setAutoDispatch] = useState<boolean>(false)

    const [filter, setFilter] =
        React.useState<FormInitialValuesFilterWithLabel>({
            startDate: {
                fieldName: '',
                label: '',
                value: '',
            },
            endDate: { fieldName: '', label: '', value: '' },
            startTime: {
                fieldName: '',
                label: '',
                value: '',
            },
            endTime: { fieldName: '', label: '', value: '' },
            orderStatus: {
                fieldName: '',
                label: '',
                value: '',
            },
        })

    // redux
    const { userData }: any = useSelector((state: RootState) => state?.auth)

    // warehouse id
    const params = useParams()
    const warehouseId = params?.id
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    // listing gpo orders
    const outwardCustomerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = outwardCustomerState

    const { items } = useGetCustomListingData({
        useEndPointHook: useGetOrderQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['didNo', 'mobileNo'],
            page: page,
            filterBy: [
                { fieldName: 'isGPO', value: true },
                { fieldName: 'companyId', value: userData?.companyId },
                { fieldName: 'assignWarehouseId', value: warehouseId },
                { fieldName: 'orderStatus', value: filter?.orderStatus?.value },
            ],
            dateFilter: {
                startDate: filter.startDate.value as string,
                endDate: filter.endDate.value as string,
            },
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const [getBarCode] = useGetWarehouseBarcodeMutation()
    const [barcodeDispatch, barcodeDispatchInfo] =
        useDispatchGPOOrdersToWarehouseMutation()

    const columns: columnTypes[] = [
        {
            field: 'invoice',
            headerName: 'Invoice',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            hidden: true,
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => {
                return row?.orderStatus === SaleOrderStatus.dispatched ? (
                    <div className="flex gap-2">
                        {/* <MdLabelImportantOutline
                                    title="Print label"
                                    size={25}
                                    color="blue"
                                    onClick={() =>
                                        window.open(`/gpo/label?orderNumber=${row.orderNumber}`, '_blank')
                                    }
                                /> */}
                        <FaRegFilePdf
                            title="Print Invoice"
                            color="red"
                            size={22}
                            onClick={() =>
                                window.open(
                                    `/gpo/invoice?orderNumber=${row.orderNumber}`,
                                    '_blank'
                                )
                            }
                        />
                    </div>
                ) : null
            },
        },
        {
            field: 'firstCallApproval',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_FIRST_CALL_APPROVAL,
            headerName: '1st Call Approval',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => {
                return (
                    <span className="block w-full text-left px-2 py-1 cursor-pointer">
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
                                onClick={() => {}}
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
            field: 'orderStatus',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_ORDER_STATUS,
            headerName: 'Order Status',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span
                    className={
                        row?.orderStatus === 'DISPATCHED'
                            ? 'text-green-600'
                            : 'text-red-600'
                    }
                >
                    {row.orderStatus.replaceAll('_', ' ')}
                </span>
            ),
        },
        {
            field: 'orderNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_ORDER_NUMBER,
            headerName: 'Order No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
        },
        {
            field: 'orderReferenceNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_ORDER_REF_NUMBER,
            headerName: 'Order Ref No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span>{row.orderReferenceNumber || '-'}</span>
            ),
        },
        {
            field: 'inquiryNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_ENQUIRY_NUMBER,
            headerName: 'Enquiry No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            // renderCell: (row: OrderListResponse) => <span></span>,
        },
        {
            field: 'firstCallRemark',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_FIRST_CALL_REMARK,
            headerName: '1st call remark',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallRemark || '-'}</span>
            ),
        },
        {
            field: 'firstCallState',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_FIRST_CALL_STATE,
            headerName: 'first Call State',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallState || '-'}</span>
            ),
        },
        {
            field: 'firstCallCallBackDate',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_FIRST_CALL_BACK_DATE,
            headerName: 'call back date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallCallBackDate || '-'}</span>
            ),
        },
        {
            field: 'assignWarehouseLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_ASSIGNED_WEARHOUSE,
            headerName: 'Warehouse',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.assignWarehouseLabel || '-'}</span>
            ),
        },
        {
            field: 'trackingNo',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_TRACKING_NUMBER,
            headerName: 'Tracking No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => <span>-</span>,
        },
        {
            field: 'tehsilLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_TALUK,
            headerName: 'Taluk',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.tehsilLabel}</span>
            ),
        },
        {
            field: 'statusDate',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_STATUS_DATE,
            headerName: 'Status Date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
        },
        {
            field: 'status',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_STATUS,
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => <span>{row?.status}</span>,
        },
        {
            field: 'shippingCharges',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_SHIPPING_CHARGES,
            headerName: 'Shippgig Charges',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.deliveryCharges}</span>
            ),
        },
        {
            field: 'schemeName',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_SCHEME_NAME,
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.schemeName} </span>
            ),
        },
        {
            field: 'schemeCode',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_SCHEME_CODE,
            headerName: 'Scheme Code',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.schemeCode} </span>
            ),
        },
        {
            field: 'shcemeQuantity',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_SHCEME_QUANTITY,
            headerName: 'Quantity',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.shcemeQuantity} </span>
            ),
        },
        {
            field: 'price',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_PRICE,
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => <span> {row?.price} </span>,
        },
        {
            field: 'pincodeLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_PIN_CODE_LABEL,
            headerName: 'Pincode',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.pincodeLabel} </span>
            ),
        },
        {
            field: 'paymentMode',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_PAYMENT_MODE,
            headerName: 'Payment Mode',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.paymentMode} </span>
            ),
        },
        {
            field: 'createdAt',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_ORDER_DATE,
            headerName: 'Order Date',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_EDP_DATE,
            headerName: 'EDP Date',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => <div>-</div>,
        },
        {
            field: 'districtLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_DISTRICT_LABEL,
            headerName: 'District',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.districtLabel}</div>
            ),
        },
        {
            field: 'dispositionLevelThree',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_DISPOSITION_LEVEL_THREE,
            headerName: 'Disposition',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.dispositionLevelThree}</div>
            ),
        },
        {
            field: 'dealerStatus',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_DEALER_STATUS,
            headerName: 'Dealer Status',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">
                    {/* {row?.dealerStatus === true ? 'Active' : 'DeActive'} */}
                </div>
            ),
        },
        {
            field: 'dealerCode',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_DEALER_CODE,
            headerName: 'Dealer Code',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.dealerCode || '-'}</div>
            ),
        },
        {
            field: 'customerName',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_CUSTOMER_NAME,
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.customerName || '-'}</div>
            ),
        },
        {
            field: 'areaLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_AREA_LABEL,
            headerName: 'Customer Address',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[30px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'mobileNo',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_MOBILE_NO,
            headerName: 'Contact No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.mobileNo}</div>
            ),
        },
        {
            field: 'channelName',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_CHANNEL_NAME,
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.channelLabel?.[0]}</div>
            ),
        },
        {
            field: 'callCenterLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_CALL_CENTER_LABEL,
            headerName: 'CC Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.callCenterLabel}</div>
            ),
        },
        {
            field: 'areaLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_AREA,
            headerName: 'Area',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'remark',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_REMARK,
            headerName: 'Remark',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.remark}</div>
            ),
        },
        {
            field: 'agent',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_AGENT,
            headerName: 'Agent',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.agentName}</div>
            ),
        },
        {
            field: 'preffered_delivery_date',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_PREFFERED_DELIVERY_DATE,
            headerName: 'Preffred Delivery Date Time',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            // hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => {
                return (
                    <span>
                        {row?.preffered_delivery_date
                            ? moment(row?.preffered_delivery_date).format(
                                  'DD-MM-YYYY'
                              )
                            : '-'}
                    </span>
                )
            },
        },
        {
            field: 'preffered_delivery_date',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_PREFFERED_DELIVERY_TIME,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_GPO_TAB_LIST_ORDER_MBK_NUMBER,
            headerName: 'MBK Number',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[250px]',
            renderCell: (row: any) => (
                <span> {row.orderMBKNumber || '-'} </span>
            ),
        },
    ]

    // remove barcode
    // const handleRemoveBarcode = (
    //     barcodeNumber: string,
    //     productIndex: number
    // ) => {
    //     // eslint-disable-next-line array-callback-return
    //     // const filteredObj = products?.[productIndex]?.barcode?.filter(
    //     //     (item: any) => {
    //     //         if (item?.barcodeNumber !== barcodeNumber) {
    //     //             return item
    //     //         }
    //     //     }
    //     // )
    //     // console.log('filteredObj', filteredObj)
    //     // setProducts()
    //     // setBarcodeList(barcode)
    // }

    const handleBarcodeSubmit = (barcodeNumber: string, index: number) => {
        getBarCode({
            warehouseId: (warehouseId as string) || '',
            barcode: barcodeNumber,
            status: 'GPO',
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    if (res?.data?.data) {
                        const {
                            products: productsOfRes,
                            barcode: barcodeOfRes,
                            orderNumber: orderNumberRes,
                            customerName,
                            schemeQuantity,
                            address,
                        } = res?.data?.data

                        if (orderNumber) {
                            const newData = products?.map((ele: any) => {
                                let prevBarcode = [...ele?.barcode] || []

                                const isAlredyExist = prevBarcode?.some(
                                    (barcode: any) => {
                                        return (
                                            barcode?.barcodeNumber ===
                                            barcodeOfRes?.barcodeNumber
                                        )
                                    }
                                )

                                let barcodeObj =
                                    ele?.productGroupId ===
                                    barcodeOfRes.productGroupId
                                        ? barcodeOfRes
                                        : null

                                return {
                                    ...ele,
                                    barcode:
                                        barcodeObj &&
                                        isAlredyExist === false &&
                                        ele?.schemeQuantity !==
                                            ele?.barcode?.length
                                            ? [...prevBarcode, barcodeObj]
                                            : [...prevBarcode],
                                }
                            })
                            setProducts(newData)
                        } else {
                            const newData = productsOfRes?.map((ele: any) => {
                                let barcodeObj =
                                    ele?.productGroupId ===
                                    barcodeOfRes.productGroupId
                                        ? barcodeOfRes
                                        : null
                                return {
                                    ...ele,
                                    barcode: barcodeObj ? [barcodeObj] : [],
                                    customerName,
                                    schemeQuantity,
                                    address,
                                }
                            })
                            setOrderNumber(orderNumberRes)
                            setProducts(newData)
                            dispatch(setFieldCustomized(true))
                        }
                    }
                } else {
                    // showToast('error', 'barcode number is not matched')
                }
            })
            .catch((err) => console.error(err))
    }

    const handleDispatchBarcode = () => {
        const filterValue = products?.map((ele: any) => {
            return ele?.barcode
        })

        barcodeDispatch({
            barcodes: [
                ...filterValue
                    ?.flat(1)
                    ?.map((ele: BarcodeListResponseType) => ele?._id),
            ],
            orderNumber: orderNumber,
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    // window.open(
                    //     `/gpo/label-invoice?orderNumber=${orderNumber}`,
                    //     '_blank'
                    // )
                    showToast('success', 'dispatched successfully')
                    dispatch(setFieldCustomized(false))
                    navigate(`/gpo/invoice?orderNumber=${orderNumber}`)
                    dispatch(setFieldCustomized(false))
                } else {
                    showToast('error', res?.data?.message)
                }
            })
            .catch((err: any) => {
                console.error(err)
            })
    }

    const handleDisableDispatchButton = () => {
        let barcodeLength: number = 0
        let schemeQuantity: number = 0

        products?.forEach((ele: any) => {
            schemeQuantity += ele?.schemeQuantity
            barcodeLength += ele?.barcode?.length
        })
        return schemeQuantity === barcodeLength
    }

    // useEffect(() => {
    //     if (autoDispatch) {
    //         handleDispatchBarcode()
    //     }
    // }, [autoDispatch])

    // console.log('products', products)

    return (
        <>
            <OutwardGpoOrdersTabListing
                columns={columns}
                rows={items}
                filter={filter}
                setFilter={setFilter}
            />

            {/* Dispatching the barcode */}
            <div className="border-b-slate-300 border-[1px] shadow p-4 my-4 rounded">
                <div className="mt-2 grid grid-cols-4 gap-x-4">
                    <ATMTextField
                        disabled={
                            orderNumber ? handleDisableDispatchButton() : false
                        }
                        name=""
                        value={barcodeNumber}
                        label="Barcode Number"
                        placeholder="enter barcode number"
                        className="shadow bg-white rounded w-[50%] "
                        onChange={(e) => {
                            if (e.target.value?.length > 6) {
                                handleBarcodeSubmit(e.target.value, 0)
                            }
                            setBarcodeNumber(
                                e.target.value // Set the value at the desired index
                            )
                        }}
                    />
                </div>

                {orderNumber && (
                    <div className="mt-4  ">
                        <div className="flex gap-x-6">
                            <span className="font-semibold text-sm">
                                Customer Name
                            </span>
                            {' : '}
                            <span className="font-semibold text-sm">
                                {products?.[0]?.customerName}
                            </span>
                        </div>

                        <div className="flex gap-x-6">
                            <span className="font-semibold text-sm">
                                Order Number
                            </span>
                            {' : '}
                            <span className="font-semibold text-sm">
                                {orderNumber}
                            </span>
                        </div>

                        <div className="flex gap-x-10">
                            <span className="font-semibold text-sm">
                                Address
                            </span>
                            {' : '}
                            <span className="font-semibold text-sm flex flex-wrap">
                                {products?.[0]?.address}
                            </span>
                        </div>
                    </div>
                )}

                {products?.map((ele: any, productIndex: any) => {
                    return (
                        <>
                            <div
                                key={productIndex}
                                className="bg-white shadow-md rounded-md overflow-hidden border-[1px] border-gray-500 my-5"
                            >
                                <div className="p-4">
                                    <div className="font-bold text-lg mb-2">
                                        {ele?.productGroupName}
                                    </div>
                                    <div className="flex gap-x-6 mb-2">
                                        <div className="text-gray-700">
                                            Quantity :
                                        </div>
                                        <div>
                                            {products?.[0]?.schemeQuantity}{' '}
                                            {' / '}
                                            {ele?.barcode?.length}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-5 gap-x-4">
                                        {ele?.barcode?.map(
                                            (
                                                barcode: BarcodeListResponseType,
                                                barcodeIndex: number
                                            ) => (
                                                <BarcodeCard
                                                    key={barcodeIndex}
                                                    barcodeNumber={
                                                        barcode?.barcodeNumber
                                                    }
                                                    productGroupLabel={capitalizeFirstLetter(
                                                        barcode?.productGroupLabel ||
                                                            ''
                                                    )}
                                                    handleRemoveBarcode={() => {
                                                        console.log(
                                                            'barcode: ',
                                                            barcode
                                                        )
                                                        // handleRemoveBarcode(
                                                        //     barcode?.barcodeNumber,
                                                        //     productIndex
                                                        // )
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>

            <div className="flex justify-end items-end ">
                {products.length ? (
                    <div>
                        <ATMLoadingButton
                            disabled={!handleDisableDispatchButton()}
                            isLoading={barcodeDispatchInfo?.isLoading}
                            loadingText="Dispatching"
                            onClick={() => handleDispatchBarcode()}
                            className="bg-primary-main text-white flex items-center py-1 px-4 rounded"
                        >
                            Dispatch
                        </ATMLoadingButton>
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default OutwardGpoOrdersTabListingWrapper
