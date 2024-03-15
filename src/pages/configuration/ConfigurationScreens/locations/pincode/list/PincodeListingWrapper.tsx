/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:PicodeListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import PincodeListing from './PincodeListing'
// import { useGetPincodeQuery } from 'src/services/PinCodeService'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setItems,
    setSelectedLocationPincode,
} from 'src/redux/slices/pincodeSlice'
import usePincodesByTehsil from 'src/hooks/usePincodesByTehsil'
import useAllInfoByPincode from 'src/hooks/useAllInfoByPincode'
import { setSelectedLocationCountry } from 'src/redux/slices/countrySlice'
import { setSelctedLocationState } from 'src/redux/slices/statesSlice'
import { setSelectedLocationDistrict } from 'src/redux/slices/districtSlice'
import { setSelectedLocationTehsil } from 'src/redux/slices/tehsilSlice'

const PincodeListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector((state: RootState) => state.pincode)
    const { searchValue }: any = useSelector(
        (state: RootState) => state.pincode
    )
    const pincodes = items?.map((ele: any) => {
        return { label: ele.pincode, value: ele._id }
    })
    const { selectedLocationTehsil }: any = useSelector(
        (state: RootState) => state.tehsils
    )
    const { pincodesByTehsil } = usePincodesByTehsil(selectedLocationTehsil)
    const { pincodeData } = useAllInfoByPincode(searchValue)
    useEffect(() => {
        if (pincodesByTehsil?.length && selectedLocationTehsil) {
            dispatch(setItems(pincodesByTehsil))
        } else {
            dispatch(setItems(null))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincodesByTehsil, selectedLocationTehsil])
    useEffect(() => {
        if (pincodeData) {
            dispatch(setSelectedLocationPincode(pincodeData?._id))
            dispatch(setSelectedLocationCountry(pincodeData?.countryId))
            dispatch(setSelctedLocationState(pincodeData?.stateId))
            dispatch(setSelectedLocationDistrict(pincodeData?.districtId))
            dispatch(setSelectedLocationTehsil(pincodeData?.tehsilId))
        }
    }, [pincodeData])

    return (
        <PincodeListing
            pincodes={pincodes?.filter((districtItem: any) =>
                districtItem?.label
                    ?.toLocaleLowerCase()
                    ?.includes(searchValue?.toLocaleLowerCase())
            )}
        />
    )
}

export default PincodeListingWrapper
