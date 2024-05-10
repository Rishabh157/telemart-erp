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
    setSelctedStatePreffredCourier,
} from 'src/redux/slices/statesSlice'
import { setSelectedLocationDistrict } from 'src/redux/slices/districtSlice'
import { setSelectedLocationTehsil } from 'src/redux/slices/tehsilSlice'
import { setSelectedLocationPincode } from 'src/redux/slices/pincodeSlice'
import { setSelectedLocationArea } from 'src/redux/slices/areaSlice'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import EditStateWrapper from '../add/EditStateWrapper'

// |-- Types --|
type Props = {
    states: any[]
}

const StateListing = ({ states }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [editStateId, setEditStateId] = useState<string>('')
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
            dispatch(setSelctedStatePreffredCourier(null))
        } else {
            dispatch(setSelctedLocationState(newValue.value))
            dispatch(setSelctedStatePreffredCourier(newValue.preferredCourier))
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
                isAddButton={
                    isAuthorized(
                        UserModuleNameTypes.ACTION_STATE_ADD
                    ) as boolean
                }
                isEditButton={isAuthorized(UserModuleNameTypes.ACTION_STATE_EDIT)}
                onEditListItemClick={(newValue) => {
                    setEditStateId(newValue?.value)
                }}
            />

            {isOpenAddForm && (
                <AddStateWrapper onClose={() => setisOpenAddForm(false)} />
            )}

            {editStateId && (
                <EditStateWrapper
                    id={editStateId}
                    onClose={() => setEditStateId('')}
                />
            )}
        </>
    )
}

export default StateListing
