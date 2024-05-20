import moment from 'moment'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import {
    useGetGpoOrderStatusQuery,
    useGetShipayaariOrderStatusQuery,
} from 'src/services/OrderService'
import WarehouseOrderStatusOverview from './WarehouseOrderStatusOverview'

type Props = {}
type ProductDetail = {
    productGroupName: string
    quantity: number
}

type ProductGroup = {
    count: number
    products: ProductDetail[]
    _id: string
}

type OrderStatus = {
    _id: string
    count: number
}

export type CardData = {
    id: number
    title: string
    products: ProductGroup[]
    orders: OrderStatus[]
}

const WarehouseOrderStatusOverviewWrapper = (props: Props) => {
    const [dateFilter, setDateFilter] = React.useState({
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
    })
    const params = useParams()
    const warehouseId = params?.id

    const { items: gpo } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetGpoOrderStatusQuery({
            warehouseId: warehouseId,
            dateFilter: {
                ...dateFilter,
            },
        }),
    })
    const { items: shipyaari } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetShipayaariOrderStatusQuery({
            warehouseId: warehouseId,
            dateFilter: {
                ...dateFilter,
            },
        }),
    })
    const cardData: CardData[] = [
        {
            id: 1,
            title: 'SHIPYAARI',
            products: [
                {
                    count: 0,
                    products: [],
                    _id: 'NOT_DISPATCHED',
                },
                {
                    count: 0,
                    products: [],
                    _id: 'DISPATCHED',
                },
            ],
            orders: [
                { _id: 'DISPATCHED', count: 0 },
                { _id: 'NOT_DISPATCHED', count: 0 },
            ],
        },
        {
            id: 2,
            title: 'GPO',
            products: [
                {
                    count: 0,
                    products: [],
                    _id: 'NOT_DISPATCHED',
                },
                {
                    count: 0,
                    products: [],
                    _id: 'DISPATCHED',
                },
            ],
            orders: [
                { _id: 'DISPATCHED', count: 0 },
                { _id: 'NOT_DISPATCHED', count: 0 },
            ],
        },
        // Add more cards as needed
    ]
    const [warehouseStatusData, setWarehouseStatusData] =
        React.useState(cardData)

    useEffect(() => {
        if (gpo) {
            setWarehouseStatusData((prev) => {
                return prev.map((card) => {
                    if (card.title === 'GPO') {
                        return {
                            ...card,
                            products: gpo.products || [],
                            orders: gpo.orders || [],
                        }
                    }
                    return card
                })
            })
        }
        if (shipyaari) {
            setWarehouseStatusData((prev) => {
                return prev.map((card) => {
                    if (card.title === 'SHIPYAARI') {
                        return {
                            ...card,
                            products: shipyaari.products || [],
                            orders: shipyaari.orders || [],
                        }
                    }
                    return card
                })
            })
        }
    }, [gpo, shipyaari])

    return (
        <WarehouseOrderStatusOverview
            cardData={warehouseStatusData as CardData[]}
            setDateFilter={setDateFilter}
            dateFilter={dateFilter}
        />
    )
}

export default WarehouseOrderStatusOverviewWrapper
