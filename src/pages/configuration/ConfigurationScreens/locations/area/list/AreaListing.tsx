/// ==============================================
// Filename:AreaListing.tsx
// Type: List Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector, useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import LocationListView from '../../sharedComponents/LocationListView'
import AddAreaWrapper from '../add/AddAreaWrapper'
import {
    setSearchValue,
    setSelectedLocationArea,
} from 'src/redux/slices/areaSlice'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

// |-- Types --|
type Props = {
    areas: any[]
}

const AreaListing = ({ areas }: Props) => {
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { searchValue }: any = useSelector((state: RootState) => state.areas)
    const { selectedLocationPincode }: any = useSelector(
        (state: RootState) => state.pincode
    )
    const { selectedLocationArea }: any = useSelector(
        (state: RootState) => state.areas
    )

    function handleCountryClick(newValue: any) {
        if (selectedLocationArea === newValue.value) {
            dispatch(setSelectedLocationArea(null))
        } else {
            dispatch(setSelectedLocationArea(newValue?.value))
        }
    }

    return (
        <>
            <LocationListView
                listHeading="Area"
                searchValue={searchValue}
                OnSearchChange={(newValue) => {
                    dispatch(setSearchValue(newValue))
                }}
                listData={areas}
                onAddClick={() => {
                    if (selectedLocationPincode === null) {
                        showToast('error', 'Please select pincode')
                    } else {
                        setisOpenAddForm(true)
                    }
                }}
                onListItemClick={(newValue) => {
                    if (selectedLocationPincode !== null) {
                        handleCountryClick(newValue)
                    }
                }}
                disabled={false}
                isAddButton={isAuthorized(UserModuleNameTypes.ACTION_AREA_ADD) as boolean}
            />

            {isOpenAddForm && (
                <AddAreaWrapper onClose={() => setisOpenAddForm(false)} />
            )}
        </>
    )
}

export default AreaListing
