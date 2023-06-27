/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:CountryListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import CountryListing from './CountryListing'
import { useGetAllCountryQuery } from 'src/services/CountryService'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setItems } from 'src/redux/slices/countrySlice'

const CountryListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()

    const { data, isLoading, isFetching } = useGetAllCountryQuery('')
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
