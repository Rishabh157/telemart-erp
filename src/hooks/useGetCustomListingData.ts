import { QueryStatus } from '@reduxjs/toolkit/query'
import { useEffect, useState } from 'react'
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'
import {
    setIsTableLoading,
    setTotalItems,
} from '../redux/slices/ListingPaginationSlice'

type UseCustomPaginationPropsType<T> = {
    useEndPointHook: {
        data?: any | T
        isLoading: boolean
        isFetching: boolean
        error?: any
        status: QueryStatus
    }
}

const useGetCustomListingData = <T>({
    useEndPointHook,
}: UseCustomPaginationPropsType<T>) => {
    const [items, setItems] = useState<T[]>([])
    const dispatch = useDispatch<AppDispatch>()

    const { data, isLoading, isFetching } = useEndPointHook

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            if (data) {
                setItems(data?.data || [])
                dispatch(setTotalItems(data?.totalItem)) // Assuming totalItem represents the length of the array
            }
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data])

    return { items }
}

export default useGetCustomListingData
