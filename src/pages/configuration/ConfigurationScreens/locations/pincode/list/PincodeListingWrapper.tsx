// |-- Built-in Dependencies --|
import { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import PincodeListing from './PincodeListing'

// |-- Redux --|
import useAllInfoByPincode from 'src/hooks/useAllInfoByPincode'
import { setSelectedLocationCountry } from 'src/redux/slices/countrySlice'
import { setSelectedLocationDistrict } from 'src/redux/slices/districtSlice'
import {
    setItems,
    setSelectedLocationPincode,
} from 'src/redux/slices/pincodeSlice'
import { setSelctedLocationState } from 'src/redux/slices/statesSlice'
import { setSelectedLocationTehsil } from 'src/redux/slices/tehsilSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetAllPincodeByTehsilQuery } from 'src/services/PinCodeService'

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

    const { data: pincodesByTehsil } = useGetAllPincodeByTehsilQuery(
        selectedLocationTehsil,
        {
            skip: !selectedLocationTehsil,
        }
    )

    const { pincodeData } = useAllInfoByPincode(searchValue)

    useEffect(() => {
        if (pincodesByTehsil?.data?.length && selectedLocationTehsil) {
            dispatch(setItems(pincodesByTehsil?.data))
        } else {
            dispatch(setItems(null))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincodesByTehsil?.data, selectedLocationTehsil])

    useEffect(() => {
        if (pincodeData) {
            dispatch(setSelectedLocationPincode(pincodeData?._id))
            dispatch(setSelectedLocationCountry(pincodeData?.countryId))
            dispatch(setSelctedLocationState(pincodeData?.stateId))
            dispatch(setSelectedLocationDistrict(pincodeData?.districtId))
            dispatch(setSelectedLocationTehsil(pincodeData?.tehsilId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
