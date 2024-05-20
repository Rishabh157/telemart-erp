// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import LocationListView from '../../sharedComponents/LocationListView'
import AddTehsilWrapper from '../add/AddTehsilWrapper'

// |-- Redux --|
import {
    setSearchValue,
    setSelectedLocationTehsil,
    setSelctedTehsilPreffredCourier,
} from 'src/redux/slices/tehsilSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { setSelectedLocationPincode } from 'src/redux/slices/pincodeSlice'
import { setSelectedLocationArea } from 'src/redux/slices/areaSlice'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import EditTehsiltWrapper from '../add/EditTehsiltWrapper'

// |-- Types --|
type Props = {
    tehsils: any[]
}

const TehsilListing = ({ tehsils }: Props) => {
    const [editTehsilId, setEditTehsilId] = useState<string>('')
    const dispatch = useDispatch<AppDispatch>()

    const { searchValue }: any = useSelector(
        (state: RootState) => state.tehsils
    )
    const { selectedLocationTehsil }: any = useSelector(
        (state: RootState) => state.tehsils
    )
    const { selectedLocationDistrict }: any = useSelector(
        (state: RootState) => state.district
    )
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    function handleCountryClick(newValue: any) {
        if (selectedLocationTehsil === newValue?.value) {
            dispatch(setSelectedLocationTehsil(null))
            dispatch(setSelctedTehsilPreffredCourier(null))
        } else {
            dispatch(setSelectedLocationTehsil(newValue?.value))
            dispatch(
                setSelctedTehsilPreffredCourier(newValue?.preferredCourier)
            )
        }
        dispatch(setSelectedLocationPincode(null))
        dispatch(setSelectedLocationArea(null))
    }

    return (
        <>
            <LocationListView
                listHeading="Tehsils"
                searchValue={searchValue}
                OnSearchChange={(newValue) => {
                    dispatch(setSearchValue(newValue))
                }}
                listData={tehsils}
                onAddClick={() => {
                    if (selectedLocationDistrict === null) {
                        showToast('error', 'Please select district')
                    } else {
                        setisOpenAddForm(true)
                    }
                }}
                onListItemClick={(newValue) => {
                    if (selectedLocationDistrict !== null) {
                        handleCountryClick(newValue)
                    }
                }}
                disabled={false}
                isAddButton={
                    isAuthorized(
                        UserModuleNameTypes.ACTION_TEHSILS_ADD
                    ) as boolean
                }
                isEditButton={isAuthorized(
                    UserModuleNameTypes.ACTION_TEHSILS_EDIT
                )}
                onEditListItemClick={(newValue) => {
                    setEditTehsilId(newValue?.value)
                }}
            />
            {isOpenAddForm && (
                <AddTehsilWrapper onClose={() => setisOpenAddForm(false)} />
            )}
            {editTehsilId && (
                <EditTehsiltWrapper
                    id={editTehsilId}
                    onClose={() => setEditTehsilId('')}
                />
            )}
        </>
    )
}

export default TehsilListing
