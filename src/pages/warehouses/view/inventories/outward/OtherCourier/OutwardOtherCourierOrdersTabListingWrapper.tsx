// |-- Built-in Dependencies --|
import React, { useState } from 'react'
// |-- External Dependencies --|
import { IconType } from 'react-icons'
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { useParams } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import OutwardOtherCourierOrdersTabListing from './OutwardOtherCourierOrdersTabListing'

// |-- Redux --|
import { Chip } from '@mui/material'
import moment from 'moment'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import {
    useGetGenerateCouriorLabelByAwbNumberMutation,
    useGetGenerateInvoiceByAwbNumberMutation,
    useGetOrderQuery,
} from 'src/services/OrderService'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { FaRegFilePdf } from 'react-icons/fa'
import { MdLabelImportantOutline } from 'react-icons/md'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { OrderListResponse } from 'src/models'
import { SaleOrderStatus } from 'src/models/SaleOrder.model'
import { RootState } from 'src/redux/store'
import { PDFDocument } from 'pdf-lib'
import DispatchingBarcodes from '../GpoOrders/DispatchingBarcodes/DispatchingBarcodes'
// import { courierCompanyEnum } from 'src/utils/constants/enums'

type LabelValuePair = {
    fieldName: string
    label: string
    value: any
}

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

// Define the type for
export type FormInitialValuesFilterWithLabel = {
    startDate: LabelValuePair
    endDate: LabelValuePair
    startTime: LabelValuePair
    endTime: LabelValuePair
    orderStatus: LabelValuePair
    productGroup: LabelValuePair
}

enum FirstCallApprovalStatus {
    'APPROVED' = 'APPROVED',
    'CANCEL' = 'CANCEL',
}

const OutwardOtherCourierOrdersTabListingWrapper = () => {
    useUnmountCleanup()
    const { id } = useParams()

    const { userData }: any = useSelector((state: RootState) => state?.auth)
    const [, setSelectedItemsTobeDispatch] = useState<any>(null)
    const [selectedCourier, setSelectedCourier] = useState<string>('')

    const outwardCustomerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    // filter state
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
            productGroup: {
                fieldName: '',
                label: '',
                value: '',
            },
        })

    const { page, rowsPerPage, searchValue } = outwardCustomerState

    const { items } = useGetCustomListingData({
        useEndPointHook: useGetOrderQuery(
            {
                limit: rowsPerPage,
                searchValue: searchValue,
                params: ['didNo', 'mobileNo'],
                page: page,
                filterBy: [
                    {
                        fieldName: 'orderAssignedToCourier',
                        value: selectedCourier,
                    },
                    { fieldName: 'companyId', value: userData?.companyId },
                    { fieldName: 'assignWarehouseId', value: id },
                    {
                        fieldName: 'orderStatus',
                        value: filter?.orderStatus?.value,
                    },
                    {
                        fieldName: 'schemeProducts.productGroupId',
                        value: filter?.productGroup?.value,
                    },
                ],
                dateFilter: {
                    startDate: filter.startDate.value as string,
                    endDate: filter.endDate.value as string,
                },
                orderBy: 'createdAt',
                orderByValue: -1,
                isPaginationRequired: true,
            },
            {
                skip: !selectedCourier,
            }
        ),
    })

    const [getGenerateCouriorLabel] =
        useGetGenerateCouriorLabelByAwbNumberMutation()
    const [getGenerateInvoice] = useGetGenerateInvoiceByAwbNumberMutation()

    const handleGenerateCourierLabel = (row: any) => {
        getGenerateCouriorLabel({ awbNumber: row.awbNumber }).then(
            (res: any) => {
                if (res.data?.data) {
                    const pdfBlob = base64ToBlob(res.data?.data)
                    if (pdfBlob) {
                        const pdfUrl = URL.createObjectURL(pdfBlob)
                        window.open(pdfUrl, '_blank')
                    }
                }
            }
        )
    }

    const handleGenerateInvoice = (row: any) => {
        getGenerateInvoice({ awbNumber: row.awbNumber }).then((res: any) => {
            if (res.data?.data) {
                const pdfBlob = base64ToBlob(res.data?.data)
                if (pdfBlob) {
                    const pdfUrl = URL.createObjectURL(pdfBlob)
                    window.open(pdfUrl, '_blank')
                }
            }
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleGenerateInvoiceDisaptch = (row: any) => {
        const promises = []

        // Fetch both PDFs
        promises.push(getGenerateCouriorLabel({ awbNumber: row.awbNumber }))
        promises.push(getGenerateInvoice({ awbNumber: row.awbNumber }))

        // Wait for both promises to resolve
        Promise.all(promises).then((responses) => {
            const pdfBlobs: Blob[] = []

            responses.forEach((res: any) => {
                if (res.data?.data) {
                    const pdfBlob = base64ToBlob(res.data?.data)
                    if (pdfBlob) {
                        pdfBlobs.push(pdfBlob)
                    }
                }
            })

            // Merge PDFs
            mergePDFs(pdfBlobs)
        })
    }

    const mergePDFs = async (pdfBlobs: Blob[]) => {
        const pdfDoc = await PDFDocument.create()
        for (const pdfBlob of pdfBlobs) {
            const pdfBuffer = await pdfBlob.arrayBuffer()
            const existingPdfDoc = await PDFDocument.load(pdfBuffer)
            const copiedPages = await pdfDoc.copyPages(
                existingPdfDoc,
                existingPdfDoc.getPageIndices()
            )
            copiedPages.forEach((page: any) => {
                pdfDoc.addPage(page)
            })
        }
        const mergedPdfBytes = await pdfDoc.save()
        const mergedPdfBlob = new Blob([mergedPdfBytes], {
            type: 'application/pdf',
        })
        // Open the merged PDF in a new tab
        const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob)
        window.open(mergedPdfUrl, '_blank')
    }

    const base64ToBlob = (base64Data: string): Blob => {
        const byteCharacters = atob(base64Data)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        return new Blob([byteArray], { type: 'application/pdf' })
    }

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Dispatch',
            flex: 'flex-[0.5_0.5_0%]',
            hidden: true,
            renderCell: (row: OrderListResponse) =>
                row?.orderStatus === SaleOrderStatus.complete ? (
                    'Dispatched'
                ) : row?.orderStatus === SaleOrderStatus.dispatched ? (
                    ''
                ) : (
                    <ActionPopup
                        handleOnAction={() => { }}
                        isCustomBtn={true}
                        customBtnText="Dispatch"
                        handleCustomActionButton={() => {
                            setSelectedItemsTobeDispatch(row)
                        }}
                    />
                ),
        },
        {
            field: 'awbBill',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_FIRST_CALL_APPROVAL,
            headerName: 'Label & Invoice',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => {
                return (
                    <>
                        {row.awbNumber ? (
                            <div className="flex gap-2">
                                <MdLabelImportantOutline
                                    title="Print label"
                                    size={25}
                                    color="blue"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        handleGenerateCourierLabel(row)
                                    }}
                                />
                                <FaRegFilePdf
                                    title="Print Invoice"
                                    className="cursor-pointer"
                                    color="red"
                                    size={22}
                                    onClick={() => handleGenerateInvoice(row)}
                                />
                            </div>
                        ) : null}
                    </>
                )
            },
        },
        {
            field: 'firstCallApproval',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_FIRST_CALL_APPROVAL,
            headerName: '1st Call Approval',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => {
                return (
                    <span className="block w-full px-2 py-1 text-left cursor-default">
                        {row.firstCallApproval ? (
                            <Chip
                                className="cursor-none"
                                label="Approved"
                                color="success"
                                variant="outlined"
                                size="small"
                            />
                        ) : row.firstCallState ===
                            FirstCallApprovalStatus.CANCEL ? (
                            <Chip
                                className="cursor-default"
                                label="Cancled"
                                color="warning"
                                variant="outlined"
                                size="small"
                            />
                        ) : (
                            <Chip
                                onClick={() => { }}
                                className="cursor-default"
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
            field: 'awbNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_ORDER_NUMBER,
            headerName: 'AWB Number',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main ">{row.awbNumber}</span>
            ),
        },
        {
            field: 'orderAssignedToCourier',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_ORDER_NUMBER,
            headerName: 'Assigned Courier',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main ">
                    {row?.orderAssignedToCourier?.replaceAll('_', ' ')}
                </span>
            ),
        },
        {
            field: 'orderNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_ORDER_STATUS,
            headerName: 'Order No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
        },
        {
            field: 'orderReferenceNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_ORDER_REF_NUMBER,
            headerName: 'Order Ref No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span>{row.orderReferenceNumber || '-'}</span>
            ),
        },
        {
            field: 'inquiryNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_ENQUIRY_NUMBER,
            headerName: 'Enquiry No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            // renderCell: (row: OrderListResponse) => <span></span>,
        },
        {
            field: 'firstCallRemark',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_FIRST_CALL_REMARK,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_FIRST_CALL_STATE,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_FIRST_CALL_BACK_DATE,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_ASSIGNED_WEARHOUSE,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_TRACKING_NUMBER,
            headerName: 'Tracking No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => <span>-</span>,
        },
        {
            field: 'tehsilLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_TALUK,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_STATUS_DATE,
            headerName: 'Status Date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
        },
        {
            field: 'status',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_STATUS,
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => <span>{row?.status}</span>,
        },
        {
            field: 'shippingCharges',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_SHIPPING_CHARGES,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_SCHEME_NAME,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_SCHEME_CODE,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_SHCEME_QUANTITY,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_PRICE,
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => <span> {row?.price} </span>,
        },
        {
            field: 'pincodeLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_PIN_CODE_LABEL,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_PAYMENT_MODE,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_ORDER_DATE,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_EDP_DATE,
            headerName: 'EDP Date',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => <div>-</div>,
        },
        {
            field: 'districtLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_DISTRICT_LABEL,
            headerName: 'District',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.districtLabel}</div>
            ),
        },
        {
            field: 'dispositionLevelThree',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_DISPOSITION_LEVEL_THREE,
            headerName: 'Disposition',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.dispositionLevelThreeLabel}</div>
            ),
        },
        {
            field: 'dealerStatus',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_DEALER_STATUS,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_DEALER_CODE,
            headerName: 'Dealer Code',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.assignDealerCode || '-'}</div>
            ),
        },
        {
            field: 'customerName',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_CUSTOMER_NAME,
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.customerName || '-'}</div>
            ),
        },
        {
            field: 'areaLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_AREA_LABEL,
            headerName: 'Customer Address',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[30px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'mobileNo',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_MOBILE_NO,
            headerName: 'Contact No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.mobileNo}</div>
            ),
        },
        {
            field: 'channelName',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_CHANNEL_NAME,
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.channelLabel?.[0]}</div>
            ),
        },
        {
            field: 'callCenterLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_CALL_CENTER_LABEL,
            headerName: 'CC Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.callCenterLabel}</div>
            ),
        },
        {
            field: 'areaLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_AREA,
            headerName: 'Area',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'remark',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_REMARK,
            headerName: 'Remark',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.remark}</div>
            ),
        },
        {
            field: 'agent',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_AGENT,
            headerName: 'Agent',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.agentName}</div>
            ),
        },

        {
            field: 'preffered_delivery_date',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_PREFFERED_DELIVERY_DATE,
            headerName: 'Preffred Delivery Date',
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_PREFFERED_DELIVERY_TIME,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_ORDER_MBK_NUMBER,
            headerName: 'MBK Number',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[250px] text-xs',
            renderCell: (row: OrderListResponse) => (
                <span> {row.orderMBKNumber || '-'} </span>
            ),
        },
        {
            field: 'barcodeData',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS_TAB_LIST_BARCODE_NUMBERS,
            headerName: 'Barcodes',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[200px]',
            renderCell: (row: OrderListResponse) => (
                <span>
                    {row.barcodeData?.map((ele) => ele?.barcode)?.join(' , ') ||
                        '-'}
                </span>
            ),
        },
    ]

    return (
        <>
            <OutwardOtherCourierOrdersTabListing
                columns={columns}
                rows={items}
                filter={filter}
                setFilter={setFilter}
                selectedCourier={selectedCourier}
                onSelectCourier={(newValue) => setSelectedCourier(newValue)}
            />
            {selectedCourier ? <DispatchingBarcodes courierType={selectedCourier} /> : null}
        </>
    )
}

export default OutwardOtherCourierOrdersTabListingWrapper
