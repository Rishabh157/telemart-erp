/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:PicodeListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import PincodeListing from './PincodeListing'
import { useGetPincodeQuery } from 'src/services/PinCodeService'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { setItems } from 'src/redux/slices/pincodeSlice'

const PincodeListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector((state: RootState) => state.pincode)
    const { searchValue, filterValue }: any = useSelector(
        (state: RootState) => state.pincode
    )
    const pincodes = items?.map((ele: any) => {
        return { label: ele.pincode, value: ele._id }
    })

    const { data, isLoading, isFetching } = useGetPincodeQuery({
        limit: 100,
        searchValue: searchValue,
        params: ['pincode', 'tehsilId'],
        page: 0,
        filterBy: [
            {
                fieldName: 'tehsilId',
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
    }, [data, isLoading, isFetching])

    return <PincodeListing pincodes={pincodes} />
}

export default PincodeListingWrapper
