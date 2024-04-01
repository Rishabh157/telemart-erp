/// ==============================================
// Filename:StateListing.tsx
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
import AddStateWrapper from '../add/AddStateWrapper'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import {
    setSearchValue,
    setSelctedLocationState,
} from 'src/redux/slices/statesSlice'
import // setFilterValue,
// setSelectedLocationDistrict,
'src/redux/slices/districtSlice'
import { setSelectedLocationDistrict } from 'src/redux/slices/districtSlice'
import { setSelectedLocationTehsil } from 'src/redux/slices/tehsilSlice'
import { setSelectedLocationPincode } from 'src/redux/slices/pincodeSlice'
import { setSelectedLocationArea } from 'src/redux/slices/areaSlice'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
// import { setSelectedLocationTehsil } from 'src/redux/slices/tehsilSlice'
// import { setSelectedLocationPincode } from 'src/redux/slices/pincodeSlice'
// import { setFilterValue as setAreaFilterValue } from 'src/redux/slices/areaSlice'
// import { setFilterValue as setPincodeFilterValue } from 'src/redux/slices/pincodeSlice'
// import { setFilterValue as setTehsilFilterValue } from 'src/redux/slices/tehsilSlice'

// |-- Types --|
type Props = {
    states: any[]
}

const StateListing = ({ states }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const { searchValue }: any = useSelector((state: RootState) => state.states)
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state.country
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state.states
    )

    function handleCountryClick(newValue: any) {
        if (selectedLocationState === newValue.value) {
            dispatch(setSelctedLocationState(null))
        } else {
            dispatch(setSelctedLocationState(newValue.value))
        }
        dispatch(setSelectedLocationDistrict(null))
        dispatch(setSelectedLocationTehsil(null))
        dispatch(setSelectedLocationPincode(null))
        dispatch(setSelectedLocationArea(null))
    }

    return (
        <>
            <LocationListView
                searchValue={searchValue}
                OnSearchChange={(newValue) =>
                    dispatch(setSearchValue(newValue))
                }
                listHeading="States"
                listData={states}
                onAddClick={() => {
                    if (selectedLocationCountries === null) {
                        showToast('error', 'Please select country')
                    } else {
                        setisOpenAddForm(true)
                    }
                }}
                onListItemClick={(newValue) => {
                    if (selectedLocationCountries !== null) {
                        handleCountryClick(newValue)
                    }
                }}
                disabled={false}
                isAddButton={isAuthorized(UserModuleNameTypes.ACTION_STATE_ADD) as boolean}

            />

            {isOpenAddForm && (
                <AddStateWrapper onClose={() => setisOpenAddForm(false)} />
            )}
        </>
    )
}

export default StateListing
