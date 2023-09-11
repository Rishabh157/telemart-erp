/// ==============================================
// Filename:PicodeListing.tsx
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
import AddPincodeWrapper from '../add/AddPincodeWrapper'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setFilterValue } from 'src/redux/slices/areaSlice'
import {
    setSearchValue,
    setSelectedLocationPincode,
} from 'src/redux/slices/pincodeSlice'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'

// |-- Types --|
type Props = {
    pincodes: any[]
}

const PincodeListing = ({ pincodes }: Props) => {
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { searchValue }: any = useSelector(
        (state: RootState) => state.pincode
    )
    const { selectedLocationTehsil }: any = useSelector(
        (state: RootState) => state.tehsils
    )
    const { selectedLocationPincode }: any = useSelector(
        (state: RootState) => state.pincode
    )

    function handleCountryClick(newValue: any) {
        if (selectedLocationPincode?.value === newValue.value) {
            dispatch(setSelectedLocationPincode(null))
            dispatch(setFilterValue(''))
        } else {
            dispatch(setSelectedLocationPincode(newValue))
            dispatch(setFilterValue(newValue.value))
        }
    }

    return (
        <>
            <LocationListView
                actionName={UserModuleNameTypes.pincode}
                listHeading="Pincodes"
                OnSearchChange={(newValue) =>
                    dispatch(setSearchValue(newValue))
                }
                searchValue={searchValue}
                listData={pincodes}
                onAddClick={() => {
                    if (selectedLocationTehsil === null) {
                        showToast('error', 'Please select tehsil')
                    } else {
                        setisOpenAddForm(true)
                    }
                }}
                onListItemClick={(newValue) => {
                    if (selectedLocationTehsil !== null) {
                        handleCountryClick(newValue)
                    }
                }}
                disabled={false}
            />
            {isOpenAddForm && (
                <AddPincodeWrapper onClose={() => setisOpenAddForm(false)} />
            )}
        </>
    )
}

export default PincodeListing
