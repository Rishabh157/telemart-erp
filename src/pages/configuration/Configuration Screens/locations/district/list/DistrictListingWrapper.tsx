/// ==============================================
// Filename:DistrictListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import DistrictListing from './DistrictListing'
import { useGetDistictQuery } from 'src/services/DistricService'
import { setItems } from 'src/redux/slices/districtSlice'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'

const DistrictListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector((state: RootState) => state.district)
    const { searchValue: searchValueDistrict, filterValue }: any = useSelector(
        (state: RootState) => state.district
    )

    const districts = items?.map((ele: any) => {
        return { label: ele.districtName, value: ele._id }
    })

    const { data, isLoading, isFetching } = useGetDistictQuery({
        limit: 100,
        searchValue: searchValueDistrict,
        params: ['districtName', 'stateId'],
        page: 0,
        filterBy: [
            {
                fieldName: 'stateId',
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

    return <DistrictListing districts={districts} />
}

export default DistrictListingWrapper
