import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useParams } from 'react-router-dom'
import { useGetPrePaidOrderByIdQuery } from 'src/services/PrePaidOrderService'
import { setSelectedItem } from 'src/redux/slices/orderSlice'
import OrderView from './ApprovedOrderView'

const ApprovedOrderViewWrapper = () => {
    const params = useParams()
    const id: any = params.id
    const dispatch = useDispatch<AppDispatch>()

    const { data, isLoading, isFetching } = useGetPrePaidOrderByIdQuery(id)

    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [data, isLoading, isFetching, dispatch])

    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.order
    )

    return <OrderView items={selectedItem} />
}

export default ApprovedOrderViewWrapper
