// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|

// |-- Redux --|
import { RootState } from '../../redux/store'
import useUnmountCleanup from '../../hooks/useUnmountCleanup'
import { useGetDealerOrderByOrderNumberQuery } from 'src/services/OrderService'
import OrderSchemChangeRequest from './OrderSchemChangeRequest'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { OrderListResponse } from 'src/models'

const OrderSchemChangeRequestWrapper = () => {

    useUnmountCleanup()

    const dealerToDealerState: any = useSelector((state: RootState) => state.listingPagination)
    const { searchValue } = dealerToDealerState

    const { items, isLoading } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetDealerOrderByOrderNumberQuery(searchValue, {
            skip: !searchValue
        }),
    })

    return (
        <SideNavLayout>
            <OrderSchemChangeRequest
                items={items as OrderListResponse}
                isLoading={isLoading}
            />
        </SideNavLayout>
    )
}

export default OrderSchemChangeRequestWrapper
