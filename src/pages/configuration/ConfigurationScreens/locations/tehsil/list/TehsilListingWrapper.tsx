/// ==============================================
// Filename:TehsilListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import TehsilListing from './TehsilListing'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetTehsilQuery } from 'src/services/TehsilService'
import { setItems } from 'src/redux/slices/tehsilSlice'

const TehsilListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector((state: RootState) => state.tehsils)
    const { searchValue: searchValueTehsil, filterValue }: any = useSelector(
        (state: RootState) => state.tehsils
    )

    const tehsil = items?.map((ele: any) => {
        return { label: ele.tehsilName, value: ele._id }
    })

    const { data, isLoading, isFetching } = useGetTehsilQuery({
        limit: 100,
        searchValue: searchValueTehsil,
        params: ['tehsilName', 'districtId'],
        page: 0,
        filterBy: [
            {
                fieldName: 'districtId',
                value: filterValue ? filterValue : [],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
    },
        {
            skip: !filterValue || filterValue?.length === 0,
        })

    useEffect(() => {
        dispatch(setItems(data?.data))
    }, [data, isLoading, isFetching, dispatch])

    return <TehsilListing tehsils={tehsil} />
}

export default TehsilListingWrapper
