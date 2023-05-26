import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import InitialCallThreeListing from './InitialCallThreeListing'
import { setItems } from 'src/redux/slices/configuration/initialCallerThreeSlice'
import { useGetAllInitialCallerThreeQuery } from 'src/services/configurations/InitialCallerThreeServices'

const InitialCallThreeListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector(
        (state: RootState) => state.initialCallerThree
    )

    const initialCallerThree = items?.map((ele: any) => {
        return {
            label: ele.initialCallName,
            value: ele._id,
        }
    })

    const { data } = useGetAllInitialCallerThreeQuery('')
    // console.log(data)

    useEffect(() => {
        dispatch(setItems(data?.data || []))
    }, [dispatch, data])

    return (
        <>
            <InitialCallThreeListing initialCallerThree={initialCallerThree} />
        </>
    )
}

export default InitialCallThreeListingWrapper
