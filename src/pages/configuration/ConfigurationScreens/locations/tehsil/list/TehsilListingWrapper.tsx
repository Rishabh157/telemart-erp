/// ==============================================
// Filename:TehsilListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import TehsilListing from './TehsilListing'

// |-- Redux --|
import useTehsilByDistrict from 'src/hooks/useTehsilByDistrict'
import { AppDispatch, RootState } from 'src/redux/store'

import { setItems } from 'src/redux/slices/tehsilSlice'

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
        return { label: ele.tehsilName, value: ele._id }
    })
    const { tehsilBydistrict } = useTehsilByDistrict(selectedLocationDistrict)
    useEffect(() => {
        if (tehsilBydistrict?.length && selectedLocationDistrict) {
            dispatch(setItems(tehsilBydistrict))
        } else {
            dispatch(setItems(null))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tehsilBydistrict, selectedLocationDistrict])

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
