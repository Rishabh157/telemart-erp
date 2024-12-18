// |-- External Dependencies --|
import { useParams } from 'react-router-dom'
import {
    useGetOrderByIdQuery,
    useGetOrderHistoryQuery,
} from '../../../services/OrderService'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'

// |-- Internal Dependencies --|
import SideNavLayout from '../../../components/layouts/SideNavLayout/SideNavLayout'
import OrderView from './OrderView'
import { OrderListResponse } from 'src/models'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ATMDateTimeDisplay } from 'src/components/UI/atoms/ATMDisplay/ATMDisplay'
import { OrderFlowListResponse } from 'src/models/Order.model'

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

    // Order History
    const { items: orderHistory } = useGetCustomListingData<OrderFlowListResponse[]>({
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
            renderCell: (row: OrderFlowListResponse) => <ATMDateTimeDisplay createdAt={row?.createdAt} />
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
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
