// |-- External Dependencies --|
import { useGetOrderHistoryQuery } from '../../../services/OrderService'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'

// |-- Internal Dependencies --|
import { OrderListResponse } from 'src/models'
import ATMTable, { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ATMDateTimeDisplay } from 'src/components/UI/atoms/ATMDisplay/ATMDisplay';
import { OrderFlowListResponse } from 'src/models/Order.model';

type Props = {
    orderId: string | null
}

const OrderViewFlowWrapper = ({ orderId }: Props) => {

    // Order History
    const { items, isLoading } = useGetCustomListingData<OrderListResponse>({
        useEndPointHook: useGetOrderHistoryQuery(orderId, {
            skip: !orderId,
        }),
    })

    // Order History Columns
    const columns: columnTypes[] = [
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[2_2_0%]',
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
        },
        {
            field: 'createdAt',
            headerName: 'Action Perform Date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            renderCell: (row: OrderListResponse) => <ATMDateTimeDisplay createdAt={row?.createdAt} />
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
        },
    ]

    return (
        <div className='bg-white shadow border p-4 rounded-lg m-8'>
            <p className='sticky top-0 border-l-[3px] border-fuchsia-600 px-2 py-1 font font-medium text-md bg-white text-fuchsia-600'>
                Order Flow Of <span className='font-semibold text-primary-main text-sm'># {items?.[1]?.orderReferenceNumber} </span>
            </p>
            <div className="grow overflow-auto mt-4">
                <ATMTable
                    columns={columns}
                    rows={items || []}
                    extraClasses="max-h-full border-black border-1 overflow-auto max-h-[70vh]"
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}

export default OrderViewFlowWrapper
