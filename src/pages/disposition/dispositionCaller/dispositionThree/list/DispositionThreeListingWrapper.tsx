import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from 'src/redux/store'
import DispositionOneListing from './DispositionThreeListing'
import { useGetdispositionThreeQuery } from 'src/services/configurations/DispositionThreeServices'
import { setItems } from 'src/redux/slices/configuration/dispositionThreeSlice'

const DispositionThreeListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { searchValue, filterValue, items }: any = useSelector(
        (state: RootState) => state.dispositionThree
    )

    const dispositionThree = items?.map((ele: any) => {
        return {
            label: ele.dispositionName,
            value: ele._id,
        }
    })
    const { data } = useGetdispositionThreeQuery({
        limit: 100,
        searchValue: searchValue,
        params: ['dispositionName', 'dispositionTwoId'],
        page: 0,
        filterBy: [
            {
                fieldName: 'dispositionTwoId',
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
                dispositionThree={dispositionThree}
                items={dispositionThree}
            />
        </>
    )
}

export default DispositionThreeListingWrapper
