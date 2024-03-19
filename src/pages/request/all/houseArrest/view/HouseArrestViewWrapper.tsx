import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetHouseArrestByIdQuery } from 'src/services/HouseArrestServices'
import { setSelectedItem } from 'src/redux/slices/houseArrestSlice'

// |-- Internal Dependencies --|
import HouseArrestView from './HouseArrestView'
import { AppDispatch, RootState } from 'src/redux/store'

const HouseArrestViewWrapper = () => {
    const params = useParams()
    const id: any = params.id
    const dispatch = useDispatch<AppDispatch>()
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.houseArrest
    )

    const { data, isLoading, isFetching } = useGetHouseArrestByIdQuery(id, {
        skip: !id,
    })

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedItem(data?.data))
        }
    }, [data, isLoading, isFetching, dispatch])

    return <HouseArrestView items={selectedItem} />
}

export default HouseArrestViewWrapper
