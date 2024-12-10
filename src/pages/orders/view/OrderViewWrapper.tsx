// |-- External Dependencies --|
import { useParams } from 'react-router-dom'
import {
    useGetOrderByIdQuery,
    useGetOrderHistoryQuery,
} from '../../../services/OrderService'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
// import moment from 'moment'

// |-- Internal Dependencies --|
import SideNavLayout from '../../../components/layouts/SideNavLayout/SideNavLayout'
import OrderView from './OrderView'
import { OrderListResponse } from 'src/models'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import moment from 'moment'
// import { useGetInquiryByIdQuery } from 'src/services/InquiryService'

type OrderFlowListResponse = {
    _id: string,
    orderId: string,
    orderReferenceNumber: number,
    remark: string,
    status: string,
    createdBy: string,
    isDeleted: boolean,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    __v: number
}

const OrderViewWrapper = () => {

    const params = useParams()
    const id: any = params.id

    // Get Order Details
    const { items, isLoading } = useGetCustomListingData<OrderListResponse>({
        useEndPointHook: useGetOrderByIdQuery(id, {
            skip: !id,
        }),
    })

    // // Get Order Details
    // const { items: inquiryItems, isLoading: inquiryLoading } = useGetCustomListingData<OrderListResponse>({
    //     useEndPointHook: useGetInquiryByIdQuery(id, {
    //         skip: !id,
    //     }),
    // })

    // console.log('inquiryItems', inquiryLoading, inquiryItems);

    // Order History
    const { items: orderHistory } = useGetCustomListingData<OrderListResponse>({
        useEndPointHook: useGetOrderHistoryQuery(id, {
            skip: !id,
        }),
    })

    // Order History Columns
    const columns: columnTypes[] = [
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[2_2_0%]',
            extraClasses: 'min-w-[180px]',
            renderCell: (row: OrderFlowListResponse) => (
                <div className="w-full truncate" title={row?.remark}>
                    {row?.remark}
                </div>
            ),
        },
        {
            field: 'createdBy',
            headerName: 'Action Perform By',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
        },
        {
            field: 'createdAt',
            headerName: 'Action Perform Date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderFlowListResponse) => (
                <div className="py-0">
                    <div className=" text-slate-700 font-medium">
                        {moment(row?.createdAt).format('DD MMM YYYY')}
                    </div>
                    <div className="text-[12px] text-slate-500 font-medium">
                        {moment(row?.createdAt).format('hh:mm A')}
                    </div>
                </div>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
        },
        {
            field: 'orderReferenceNumber',
            headerName: 'Order Ref. No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderFlowListResponse) => (
                <div className="py-0">{row?.orderReferenceNumber}</div>
            ),
        },
    ]

    return (
        <SideNavLayout>
            <OrderView
                items={items as any}
                isLoading={isLoading}
                historyColumns={columns}
                orderHistory={orderHistory || []}
            />
        </SideNavLayout>
    )
}

export default OrderViewWrapper
