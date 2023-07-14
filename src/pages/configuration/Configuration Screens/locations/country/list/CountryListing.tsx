/// ==============================================
// Filename:CountryListing.tsx
// Type: List Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import LocationListView from '../../sharedComponents/LocationListView'
import AddCountryWrapper from '../add/AddCountryWrapper'

// |-- Redux --|
import { setSelectedLocationCountry } from 'src/redux/slices/countrySlice'
import { RootState, AppDispatch } from 'src/redux/store'
import {
    setFilterValue,
    setSelctedLocationState,
} from 'src/redux/slices/statesSlice'
import { setSelectedLocationDistrict } from 'src/redux/slices/districtSlice'
import { setSelectedLocationTehsil } from 'src/redux/slices/tehsilSlice'
import { setSelectedLocationPincode } from 'src/redux/slices/pincodeSlice'
import { setFilterValue as setAreaFilterValue } from 'src/redux/slices/areaSlice'
import { setFilterValue as setPincodeFilterValue } from 'src/redux/slices/pincodeSlice'
import { setFilterValue as setTehsilFilterValue } from 'src/redux/slices/tehsilSlice'
import { setFilterValue as setDistrictFilterValue } from 'src/redux/slices/districtSlice'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'

// |-- Types --|
type Props = {
    contries: any[]
    items: any
}

const CountryListing = ({ contries, items }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state.country
    )

    function handleCountryClick(newValue: any) {
        if (selectedLocationCountries?.value === newValue.value) {
            dispatch(setSelectedLocationCountry(null))
            dispatch(setSelctedLocationState(null))
            dispatch(setSelectedLocationDistrict(null))
            dispatch(setSelectedLocationTehsil(null))
            dispatch(setSelectedLocationPincode(null))
            dispatch(setFilterValue(''))
            dispatch(setAreaFilterValue(''))
            dispatch(setPincodeFilterValue(''))
            dispatch(setTehsilFilterValue(''))
            dispatch(setDistrictFilterValue(''))
        } else {
            dispatch(setSelectedLocationCountry(newValue))
            dispatch(setFilterValue(newValue.value))
        }
    }

    return (
        <>
            <LocationListView
                moduleName={UserModuleNameTypes.country}
                listHeading="Country"
                listData={contries}
                onAddClick={() => {
                    setisOpenAddForm(true)
                }}
                onListItemClick={(newValue) => {
                    handleCountryClick(newValue)
                }}
                disabled={false}
            />
            {isOpenAddForm && (
                <AddCountryWrapper onClose={() => setisOpenAddForm(false)} />
            )}
        </>
    )
}

export default CountryListing
