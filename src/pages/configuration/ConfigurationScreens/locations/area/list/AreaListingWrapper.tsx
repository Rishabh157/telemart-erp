/// ==============================================
// Filename:AreaListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AreaListing from './AreaListing'
import { useGetAreaQuery } from 'src/services/AreaService'
import { setItems } from 'src/redux/slices/areaSlice'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'

const AreaListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector((state: RootState) => state.areas)

    const { searchValue, filterValue }: any = useSelector(
        (state: RootState) => state.areas
    )
    const area = items?.map((ele: any) => {
        return {
            label: ele.area,
            value: ele.id,
        }
    })
    const { data, isLoading, isFetching } = useGetAreaQuery({
        limit: 100,
        searchValue: searchValue,
        params: ['area', 'pincodeId'],
        page: 0,
        filterBy: [
            {
                fieldName: 'pincodeId',
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

    return <AreaListing areas={area} />
}

export default AreaListingWrapper
