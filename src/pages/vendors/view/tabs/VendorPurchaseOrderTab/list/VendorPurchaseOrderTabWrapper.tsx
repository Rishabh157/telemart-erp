// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { PurchaseOrderListResponse } from 'src/models/PurchaseOrder.model'
import PurchaseOrderListing from './PurchaseOrderListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import { useGetPurchaseOrderQuery } from 'src/services/PurchaseOrderService'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { Chip, Stack } from '@mui/material'

// |-- Types --|
type Props = {}

const VendorPurchaseOrderTabWrapper = (props: Props) => {
    useUnmountCleanup()
    const params = useParams()
    const vendorId: any = params.vendorId

    const productOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue } = productOrderState
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items } = useGetCustomListingData<PurchaseOrderListResponse>({
        useEndPointHook: useGetPurchaseOrderQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['poCode'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
                },
                {
                    fieldName: 'vendorId',
                    value: vendorId as string,
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
            field: 'poCode',
            headerName: 'PO Code',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: PurchaseOrderListResponse) => (
                <span> {row?.poCode} </span>
            ),
        },
        {
            field: 'itemName',
            headerName: 'Item Name',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row?.purchaseOrder.itemName} </span>
            },
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row?.purchaseOrder.quantity} </span>
            },
        },
        {
            field: 'rate',
            headerName: 'rate',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row?.purchaseOrder.rate} </span>
            },
        },
        {
            field: 'vendor',
            headerName: 'Vendor',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row?.vendorLabel} </span>
            },
        },
        {
            field: 'Ware House',
            headerName: 'warer house',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row?.warehouseLabel} </span>
            },
        },
        {
            field: 'estimateDeliveryDate',
            headerName: 'Est. Delivery Date',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row?.purchaseOrder.estReceivingDate} </span>
            },
        },
        {
            field: 'isConfirmed',
            headerName: 'Approval level',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                const approvalLength = row?.approval?.length
                return (
                    <span className="z-10">
                        {' '}
                        <Stack direction="row" spacing={1}>
                            {approvalLength === 0 ? (
                                <Chip
                                    label="Level 1 Pending"
                                    color="error"
                                    variant="outlined"
                                    size="small"
                                    clickable={false}
                                />
                            ) : approvalLength === 1 ? (
                                <Chip
                                    label="Level 1 Approved"
                                    color="warning"
                                    variant="outlined"
                                    size="small"
                                    clickable={false}
                                />
                            ) : (
                                <button
                                    id="btn"
                                    disabled={approvalLength >= 2}
                                    className="cursor-pointer"
                                >
                                    <Chip
                                        label="Level 2 Approved"
                                        color="success"
                                        variant="outlined"
                                        size="small"
                                        clickable={true}
                                    />
                                </button>
                            )}
                        </Stack>
                    </span>
                )
            },
        },
    ]

    return (
        <div className="px-2 h-full shadow rounded border ">
            <PurchaseOrderListing columns={columns} rows={items} />
        </div>
    )
}

export default VendorPurchaseOrderTabWrapper
