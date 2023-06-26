/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:StateListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import StateListing from './StateListing'
import { useGetStateQuery } from 'src/services/StateService'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { setItems } from 'src/redux/slices/statesSlice'


const StateListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector((state: RootState) => state.states)

    const { searchValue: searchValueState, filterValue }: any = useSelector(
        (state: RootState) => state.states
    )

    const states = items?.map((ele: any) => {
        return { label: ele.stateName, value: ele._id }
    })

    const { data, isLoading, isFetching } = useGetStateQuery({
        limit: 100,
        searchValue: searchValueState,
        params: ['stateName', 'countryId'],
        page: 0,
        filterBy: [
            {
                fieldName: 'countryId',
                value: filterValue ? filterValue : [],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
    })

    useEffect(() => {
        dispatch(setItems(data?.data))
    }, [data, isLoading, isFetching])

    return <StateListing states={states} />
}

export default StateListingWrapper
