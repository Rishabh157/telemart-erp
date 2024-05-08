// |-- Built-in Dependencies --|
import { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { setItems } from 'src/redux/slices/districtSlice'
import DistrictListing from './DistrictListing'

// |-- Redux --|
import useStateDistricts from 'src/hooks/useDistrictsByState'
import { AppDispatch, RootState } from 'src/redux/store'

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
        return {
            label: ele.districtName,
            value: ele._id,
            preferredCourier: ele?.preferredCourier,
        }
    })

    const { stateDistricts } = useStateDistricts(selectedLocationState)
    useEffect(() => {
        if (stateDistricts?.length && selectedLocationState) {
            dispatch(setItems(stateDistricts))
        } else {
            dispatch(setItems(null))
        }
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
