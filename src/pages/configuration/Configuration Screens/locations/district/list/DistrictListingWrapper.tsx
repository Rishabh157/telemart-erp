import React, { useEffect } from 'react'
import DistrictListing from './DistrictListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetDistictQuery } from 'src/services/DistricService'
import { setItems } from 'src/redux/slices/districtSlice'

const DistrictListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector((state: RootState) => state.district)
    const { userData } = useSelector((state: RootState) => state?.auth)
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
            {
                fieldName: 'companyId',
                value: userData?.companyId,
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
