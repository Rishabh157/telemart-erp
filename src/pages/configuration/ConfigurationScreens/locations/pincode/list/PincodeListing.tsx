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
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import EditPincodeWrapper from '../add/EditPincodeWrapper'

// |-- Types --|
type Props = {
    pincodes: any[]
}

const PincodeListing = ({ pincodes }: Props) => {
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const [editPincodeId, setEditPincodeId] = useState<string>('')
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
                isAddButton={
                    isAuthorized(
                        UserModuleNameTypes.ACTION_PINCODES_ADD
                    ) as boolean
                }
                isEditButton
                onEditListItemClick={(newValue) => {
                    setEditPincodeId(newValue?.value)
                    // editPincodeId,
                }}
            />

            {isOpenAddForm && (
                <AddPincodeWrapper onClose={() => setisOpenAddForm(false)} />
            )}

            {editPincodeId && (
                <EditPincodeWrapper
                    id={editPincodeId}
                    onClose={() => setEditPincodeId('')}
                />
            )}
        </>
    )
}

export default PincodeListing
