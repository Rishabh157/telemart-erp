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
import { RootState, AppDispatch } from 'src/redux/store'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetOrderByIdQuery } from 'src/services/OrderService'
import OrderView from './OrderView'

// |-- Redux --|
import { setSelectedItem } from 'src/redux/slices/orderSlice'


const OrderViewWrapper = () => {
    const params = useParams()
    const id: any = params.id
    const dispatch = useDispatch<AppDispatch>()

    const { data, isLoading, isFetching } = useGetOrderByIdQuery(id)

    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [data, isLoading, isFetching, dispatch])

    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.order
    )

    return (
        <SideNavLayout>
            <OrderView items={selectedItem} />
        </SideNavLayout>
    )
}

export default OrderViewWrapper
