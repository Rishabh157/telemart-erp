// |-- External Dependencies --|
import { useParams } from 'react-router-dom'
// import SideNavLayout from '../../../components/layouts/SideNavLayout/SideNavLayout'
import SaleOrderView from './SaleOrderView'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetSalesOrderByIdQuery } from 'src/services/SalesOrderService'
import { SaleOrderListResponseTypes } from './SaleOrderView'

type RouteParams = {
    id: string;
};

const SaleOrderViewWrapper = () => {

    const params = useParams<RouteParams>();
    const id = params?.id

    const { items, isLoading } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetSalesOrderByIdQuery(id || '', {
            skip: !id
        }),
    })

    return (
        <SaleOrderView
            items={items as SaleOrderListResponseTypes[]}
            isLoading={isLoading}
        />
    )
}

export default SaleOrderViewWrapper
