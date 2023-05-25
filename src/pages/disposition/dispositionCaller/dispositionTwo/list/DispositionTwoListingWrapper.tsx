import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import DispositionOneListing from './DispositionTwoListing'
import { setItems } from 'src/redux/slices/configuration/dispositionTwoSlice'
import { useGetdispositionTwoQuery } from 'src/services/configurations/DispositionTwoServices'

const DispositionTwoListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector(
        (state: RootState) => state.dispositionTwo
    )
   
    const { searchValue, filterValue }: any = useSelector(
        (state: RootState) => state.dispositionTwo
    )
    
    const dispositionTwo = items?.map((ele: any) => {
        return {
            label: ele.dispositionName,
            value: ele._id,
        }
    })
    const { data } = useGetdispositionTwoQuery({
        limit: 100,
        searchValue: searchValue,
        params: ['dispositionName', 'dispositionOneId'],
        page: 0,
        filterBy: [
            {
                fieldName: 'dispositionOneId',
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
            <DispositionOneListing
                dispositionTwo={dispositionTwo}
            />
        </>
    )
}

export default DispositionTwoListingWrapper
