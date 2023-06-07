import React, { useEffect } from 'react'
import TehsilListing from './TehsilListing'
import { useDispatch, useSelector } from 'react-redux'
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
    })

    useEffect(() => {
        dispatch(setItems(data?.data))
    }, [data, isLoading, isFetching, dispatch])

    return <TehsilListing tehsils={tehsil} />
}

export default TehsilListingWrapper
