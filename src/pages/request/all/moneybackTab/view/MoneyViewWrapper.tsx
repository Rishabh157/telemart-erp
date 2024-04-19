
// |-- External Dependencies --|
import { useParams } from 'react-router-dom'
import { useGetMoneybackOrderByIdQuery } from 'src/services/MoneybackServices'

// |-- Internal Dependencies --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import OrderView from './MoneyView'

const MoneyViewWrapper = () => {
    const params = useParams()
    const id: any = params.id
    const { items } = useGetDataByIdCustomQuery({
        useEndPointHook: useGetMoneybackOrderByIdQuery(id, {
            skip: !id,
        }),
    })
    return <OrderView items={items} />
}

export default MoneyViewWrapper
