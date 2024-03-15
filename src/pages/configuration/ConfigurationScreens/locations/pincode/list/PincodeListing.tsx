/// ==============================================
// Filename:PicodeListing.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import LocationListView from '../../sharedComponents/LocationListView'
import AddPincodeWrapper from '../add/AddPincodeWrapper'

// |-- Redux --|
import {
    setSearchValue,
    setSelectedLocationPincode,
} from 'src/redux/slices/pincodeSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { setSelectedLocationArea } from 'src/redux/slices/areaSlice'

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
        if (selectedLocationPincode === newValue.value) {
            dispatch(setSelectedLocationPincode(null))
        } else {
            dispatch(setSelectedLocationPincode(newValue.value))
        }
        dispatch(setSelectedLocationArea(null))
    }

    return (
        <>
            <LocationListView
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
