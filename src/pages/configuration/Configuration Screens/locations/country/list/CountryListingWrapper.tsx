/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import CountryListing from './CountryListing'
import { useGetAllCountryQuery } from 'src/services/CountryService'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { setItems } from 'src/redux/slices/countrySlice'

const CountryListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { data, isLoading, isFetching } = useGetAllCountryQuery(
        userData?.companyId
    )
    const { items }: any = useSelector((state: RootState) => state.country)

    const contries = items?.map((elem: any) => {
        return {
            label: elem.countryName,
            value: elem._id,
        }
    })

    useEffect(() => {
        dispatch(setItems(data?.data))
    }, [data, isLoading, isFetching])

    return <CountryListing contries={contries} items={contries} />
}

export default CountryListingWrapper
