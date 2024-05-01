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
import { useGetAllAreaByPincodeQuery } from 'src/services/AreaService'

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

    const { data: AreaByPincode } = useGetAllAreaByPincodeQuery(
        selectedLocationPincode,
        {
            skip: !selectedLocationPincode,
        }
    )

    useEffect(() => {
        if (AreaByPincode?.data?.length && selectedLocationPincode) {
            dispatch(setItems(AreaByPincode?.data))
        } else {
            dispatch(setItems(null))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AreaByPincode?.data, selectedLocationPincode])

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
