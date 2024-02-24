/// ==============================================
// Filename:OrderViewWrapper.tsx
// Type: View Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setSelectedItem } from '../../../redux/slices/orderSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { useGetOrderByIdQuery } from '../../../services/OrderService'

// |-- Internal Dependencies --|
import SideNavLayout from '../../../components/layouts/SideNavLayout/SideNavLayout'
import OrderView from './OrderView'

const OrderViewWrapper = () => {
    const params = useParams()
    const id: any = params.id
    const dispatch = useDispatch<AppDispatch>()
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.order
    )

    const { data, isLoading, isFetching } = useGetOrderByIdQuery(id)

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedItem(data?.data))
        }
    }, [data, isLoading, isFetching, dispatch])

    return (
        <SideNavLayout>
            <OrderView items={selectedItem} />
        </SideNavLayout>
    )
}

export default OrderViewWrapper
