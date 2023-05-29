import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from 'src/redux/store'
import InitialCallTwoListing from './InitialCallTwoListing'
import { useGetinitialCallerTwoQuery } from 'src/services/configurations/InitialCallerTwoServices'
import { setItems } from 'src/redux/slices/configuration/initialCallerTwoSlice'

const InitialCallTwoListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector(
        (state: RootState) => state.initialCallerTwo
    )

    const { searchValue, filterValue }: any = useSelector(
        (state: RootState) => state.initialCallerTwo
    )

    const initialCallerTwo = items?.map((ele: any) => {
        return {
            label: ele.initialCallName,
            value: ele._id,
        }
    })
    const { data } = useGetinitialCallerTwoQuery({
        limit: 100,
        searchValue: searchValue,
        params: ['initialCallName', 'initialCallOneId'],
        page: 0,
        filterBy: [
            {
                fieldName: 'initialCallOneId',
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
            <InitialCallTwoListing initialCallerTwo={initialCallerTwo} />
        </>
    )
}

export default InitialCallTwoListingWrapper
