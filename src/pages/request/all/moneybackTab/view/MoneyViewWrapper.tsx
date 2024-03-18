import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetMoneybackOrderByIdQuery } from 'src/services/MoneybackServices'
import { setSelectedItem } from 'src/redux/slices/MoneybackSlice'

// |-- Internal Dependencies --|
import OrderView from './MoneyView'
import { AppDispatch, RootState } from 'src/redux/store'

const MoneyViewWrapper = () => {
    const params = useParams()
    const id: any = params.id
    const dispatch = useDispatch<AppDispatch>()
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.moneyback
    )

    const { data, isLoading, isFetching } = useGetMoneybackOrderByIdQuery(id, {
        skip: !id,
    })

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedItem(data?.data))
        }
    }, [data, isLoading, isFetching, dispatch])

    return <OrderView items={selectedItem} />
}

export default MoneyViewWrapper
