import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setItems } from 'src/redux/slices/configuration/dispositionOneSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetAlldispositionOneQuery } from 'src/services/configurations/DispositiononeServices'
import DispositionOneListing from './DispositionOneListing'

const DispositionOneListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { data, isLoading, isFetching } = useGetAlldispositionOneQuery('')
    const { items }: any = useSelector(
        (state: RootState) => state.dispositionOne
    )

    const dispositionOne = items?.map((ele: any) => {
        return {
            label: ele.dispositionName,
            value: ele._id,
        }
    })
    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setItems(data?.data || []))
        }
    }, [isLoading, isFetching, dispatch, data])

    return (
        <>
            <DispositionOneListing dispositionOne={dispositionOne} />
        </>
    )
}

export default DispositionOneListingWrapper
