// |-- Built-in Dependencies --|
import { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import TehsilListing from './TehsilListing'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'

import { setItems } from 'src/redux/slices/tehsilSlice'
import { useGetAllTehsilByDistrictQuery } from 'src/services/TehsilService'

const TehsilListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector((state: RootState) => state.tehsils)
    const { searchValue: searchValueTehsil }: any = useSelector(
        (state: RootState) => state.tehsils
    )
    const { selectedLocationDistrict }: any = useSelector(
        (state: RootState) => state.district
    )
    const tehsil = items?.map((ele: any) => {
        return {
            label: ele.tehsilName,
            value: ele._id,
            preferredCourier: ele.preferredCourier,
        }
    })

    const { data: tehsilBydistrict } = useGetAllTehsilByDistrictQuery(
        selectedLocationDistrict,
        {
            skip: !selectedLocationDistrict,
        }
    )

    useEffect(() => {
        if (tehsilBydistrict?.data?.length && selectedLocationDistrict) {
            dispatch(setItems(tehsilBydistrict?.data))
        } else {
            dispatch(setItems(null))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tehsilBydistrict?.data, selectedLocationDistrict])

    return (
        <TehsilListing
            tehsils={tehsil?.filter((districtItem: any) =>
                districtItem?.label
                    ?.toLocaleLowerCase()
                    ?.includes(searchValueTehsil?.toLocaleLowerCase())
            )}
        />
    )
}

export default TehsilListingWrapper
