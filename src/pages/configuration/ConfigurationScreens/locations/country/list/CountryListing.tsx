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
import { setSelectedLocationCountry } from 'src/redux/slices/countrySlice'

import { AppDispatch, RootState } from 'src/redux/store'

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
        if (selectedLocationCountries === newValue.value) {
            dispatch(setSelectedLocationCountry(null))
        } else {
            dispatch(setSelectedLocationCountry(newValue.value))
        }
    }

    return (
        <>
            <LocationListView
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
