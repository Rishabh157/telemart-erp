import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import InitialCallThreeListing from './InitialCallThreeListing'
import { setItems } from 'src/redux/slices/configuration/initialCallerThreeSlice'
import {  useGetInitialCallerThreeQuery } from 'src/services/configurations/InitialCallerThreeServices'

const InitialCallThreeListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items ,filterValue}: any = useSelector(
        (state: RootState) => state.initialCallerThree
    )

    const initialCallerThree = items?.map((ele: any) => {
        return {
            label: ele.initialCallName,
            value: ele._id,
        }
    })

    // console.log(data)
    const { data } = useGetInitialCallerThreeQuery({
        limit: 100,
        searchValue: "",
        params: ['initialcallName' ,"initialCallTwoId"],
        page: 0,
        filterBy: [
            {
                fieldName: 'initialCallTwoId',
                value: filterValue ? filterValue : [],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
    })

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
