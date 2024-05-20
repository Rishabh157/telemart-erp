/// ==============================================
// Filename:CountryListing.tsx
// Type: List Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import LocationListView from '../../sharedComponents/LocationListView'
import AddCountryWrapper from '../add/AddCountryWrapper'

// |-- Redux --|
import {
    setSelectedLocationCountry,
    setSearchValue,
} from 'src/redux/slices/countrySlice'

import { AppDispatch, RootState } from 'src/redux/store'
import { setSelctedLocationState } from 'src/redux/slices/statesSlice'
import { setSelectedLocationDistrict } from 'src/redux/slices/districtSlice'
import { setSelectedLocationTehsil } from 'src/redux/slices/tehsilSlice'
import { setSelectedLocationPincode } from 'src/redux/slices/pincodeSlice'
import { setSelectedLocationArea } from 'src/redux/slices/areaSlice'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

// |-- Types --|
type Props = {
    contries: any[]
    items: any
}

const CountryListing = ({ contries, items }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const { selectedLocationCountries, searchValue }: any = useSelector(
        (state: RootState) => state.country
    )

    function handleCountryClick(newValue: any) {
        if (selectedLocationCountries === newValue.value) {
            dispatch(setSelectedLocationCountry(null))
        } else {
            dispatch(setSelectedLocationCountry(newValue.value))
        }
        dispatch(setSelctedLocationState(null))
        dispatch(setSelectedLocationDistrict(null))
        dispatch(setSelectedLocationTehsil(null))
        dispatch(setSelectedLocationPincode(null))
        dispatch(setSelectedLocationArea(null))
    }

    return (
        <>
            <LocationListView
                listHeading="Country"
                listData={contries}
                searchValue={searchValue}
                OnSearchChange={(newValue) => {
                    dispatch(setSearchValue(newValue))
                }}
                onAddClick={() => {
                    setisOpenAddForm(true)
                }}
                onListItemClick={(newValue) => {
                    handleCountryClick(newValue)
                }}
                disabled={false}
                isAddButton={
                    isAuthorized(
                        UserModuleNameTypes.ACTION_COUNTRY_ADD
                    ) as boolean
                }
            />
            {isOpenAddForm && (
                <AddCountryWrapper onClose={() => setisOpenAddForm(false)} />
            )}
        </>
    )
}

export default CountryListing
