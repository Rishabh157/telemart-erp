/// ==============================================
// Filename:DistrictListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import DistrictListing from './DistrictListing'
import { setItems, setSelectedLocationDistrict } from 'src/redux/slices/districtSlice'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import useStateDistricts from 'src/hooks/useDistrictsByState'

const DistrictListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector((state: RootState) => state.district)
    const { searchValue: searchValueDistrict }: any = useSelector(
        (state: RootState) => state.district
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state.states
    )

    const districts = items?.map((ele: any) => {
        return { label: ele.districtName, value: ele._id }
    })

    const { stateDistricts } = useStateDistricts(selectedLocationState)
    useEffect(() => {
        if (stateDistricts?.length && selectedLocationState) {
            dispatch(setItems(stateDistricts))
        } else {
            dispatch(setItems(null))
        }
        dispatch(setSelectedLocationDistrict(null))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateDistricts, selectedLocationState])

    return (
        <DistrictListing
            districts={districts?.filter((districtItem: any) =>
                districtItem?.label
                    ?.toLocaleLowerCase()
                    ?.includes(searchValueDistrict?.toLocaleLowerCase())
            )}
        />
    )
}

export default DistrictListingWrapper
