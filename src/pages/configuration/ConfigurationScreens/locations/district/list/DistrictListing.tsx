/// ==============================================
// Filename:DistrictListing.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import LocationListView from '../../sharedComponents/LocationListView'
import AddDistrictWrapper from '../add/AddDistrictWrapper'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import {
    setSearchValue,
    setSelectedLocationDistrict,
} from 'src/redux/slices/districtSlice'
import { setSelectedLocationTehsil } from 'src/redux/slices/tehsilSlice'
import { setSelectedLocationPincode } from 'src/redux/slices/pincodeSlice'
import { setSelectedLocationArea } from 'src/redux/slices/areaSlice'

// |-- Types --|
type Props = {
    districts: any[]
}

const DistrictListing = ({ districts }: Props) => {
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { searchValue }: any = useSelector(
        (state: RootState) => state.district
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state.states
    )
    const { selectedLocationDistrict }: any = useSelector(
        (state: RootState) => state.district
    )

    function handleCountryClick(newValue: any) {
        if (selectedLocationDistrict === newValue.value) {
            dispatch(setSelectedLocationDistrict(null))
        } else {
            dispatch(setSelectedLocationDistrict(newValue.value))
        }
        dispatch(setSelectedLocationTehsil(null))
        dispatch(setSelectedLocationPincode(null))
        dispatch(setSelectedLocationArea(null))
    }

    return (
        <>
            <LocationListView
                listHeading="Districts"
                searchValue={searchValue}
                OnSearchChange={(newValue) =>
                    dispatch(setSearchValue(newValue))
                }
                listData={districts}
                onAddClick={() => {
                    if (selectedLocationState === null) {
                        showToast('error', 'Please select state')
                    } else {
                        setisOpenAddForm(true)
                    }
                }}
                onListItemClick={(newValue) => {
                    if (selectedLocationState !== null) {
                        handleCountryClick(newValue)
                    }
                }}
                disabled={false}
            />

            {isOpenAddForm && (
                <AddDistrictWrapper onClose={() => setisOpenAddForm(false)} />
            )}
        </>
    )
}

export default DistrictListing
