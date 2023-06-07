/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import PincodeListing from './PincodeListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetPincodeQuery } from 'src/services/PinCodeService'
import { setItems } from 'src/redux/slices/pincodeSlice'

const PincodeListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector((state: RootState) => state.pincode)
    const { userData } = useSelector((state: RootState) => state?.auth)
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
    }, [data, isLoading, isFetching])

    return <PincodeListing pincodes={pincodes} />
}

export default PincodeListingWrapper
