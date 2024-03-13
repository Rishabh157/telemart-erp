/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:StateListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import StateListing from './StateListing'
// import { useGetStateQuery } from 'src/services/StateService'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { setItems, setSelctedLocationState } from 'src/redux/slices/statesSlice'
import useStatesByCountry from 'src/hooks/useStatesByCountry'

const StateListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector((state: RootState) => state.states)
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state.country
    )
    const { stateByCountry } = useStatesByCountry(selectedLocationCountries)
    const { searchValue: searchValueState }: any = useSelector(
        (state: RootState) => state.states
    )
    const states = items?.map((ele: any) => {
        return { label: ele.stateName, value: ele._id }
    })
    useEffect(() => {
        if (stateByCountry?.length && selectedLocationCountries) {
            dispatch(setItems(stateByCountry))
        } else {
            dispatch(setItems(null))
        }
        dispatch(setSelctedLocationState(null))
    }, [stateByCountry, selectedLocationCountries])

    return (
        <StateListing
            states={states?.filter((stateItem: any) =>
                stateItem?.label
                    ?.toLocaleLowerCase()
                    ?.includes(searchValueState?.toLocaleLowerCase())
            )}
        />
    )
}

export default StateListingWrapper
