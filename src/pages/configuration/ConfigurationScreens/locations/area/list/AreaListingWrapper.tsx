/// ==============================================
// Filename:AreaListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AreaListing from './AreaListing'
// import { useGetAreaQuery } from 'src/services/AreaService'
import { setItems } from 'src/redux/slices/areaSlice'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import useGetAreaByPincode from 'src/hooks/useGetAreaByPincode'

const AreaListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector((state: RootState) => state.areas)

    const { searchValue }: any = useSelector((state: RootState) => state.areas)
    const { selectedLocationPincode }: any = useSelector(
        (state: RootState) => state.pincode
    )
    const area = items?.map((ele: any) => {
        return {
            label: ele.area,
            value: ele._id,
        }
    })

    const { AreaByPincode } = useGetAreaByPincode(selectedLocationPincode)
    useEffect(() => {
        if (AreaByPincode?.length && selectedLocationPincode) {
            dispatch(setItems(AreaByPincode))
        } else {
            dispatch(setItems(null))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AreaByPincode, selectedLocationPincode])

    return (
        <AreaListing
            areas={area?.filter((areaItem: any) =>
                areaItem?.label
                    ?.toLocaleLowerCase()
                    ?.includes(searchValue?.toLocaleLowerCase())
            )}
        />
    )
}

export default AreaListingWrapper
