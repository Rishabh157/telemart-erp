import React, { useState } from 'react'
import LocationListView from '../../sharedComponents/LocationListView'
import AddStateWrapper from '../add/AddStateWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import {
    setSearchValue,
    setSelctedLocationState,
} from 'src/redux/slices/statesSlice'
import {
    setFilterValue,
    setSelectedLocationDistrict,
} from 'src/redux/slices/districtSlice'
import { setSelectedLocationTehsil } from 'src/redux/slices/tehsilSlice'
import { setSelectedLocationPincode } from 'src/redux/slices/pincodeSlice'
import { setFilterValue as setAreaFilterValue } from 'src/redux/slices/areaSlice'
import { setFilterValue as setPincodeFilterValue } from 'src/redux/slices/pincodeSlice'
import { setFilterValue as setTehsilFilterValue } from 'src/redux/slices/tehsilSlice'
import { showToast } from 'src/utils'

type Props = {
    states: any[]
}

const StateListing = ({ states }: Props) => {
    const dispatch = useDispatch()
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const { searchValue }: any = useSelector((state: RootState) => state.states)
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state.country
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state.states
    )

    function handleCountryClick(newValue: any) {
        if (selectedLocationState?.value === newValue.value) {
            dispatch(setSelctedLocationState(null))
            dispatch(setSelectedLocationDistrict(null))
            dispatch(setSelectedLocationTehsil(null))
            dispatch(setSelectedLocationPincode(null))
            dispatch(setFilterValue(''))
            dispatch(setAreaFilterValue(''))
            dispatch(setPincodeFilterValue(''))
            dispatch(setTehsilFilterValue(''))
        } else {
            dispatch(setSelctedLocationState(newValue))
            dispatch(setFilterValue(newValue.value))
        }
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
            />

            {isOpenAddForm && (
                <AddStateWrapper onClose={() => setisOpenAddForm(false)} />
            )}
        </>
    )
}

export default StateListing
