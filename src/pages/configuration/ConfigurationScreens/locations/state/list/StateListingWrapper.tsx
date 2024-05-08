/* eslint-disable react-hooks/exhaustive-deps */
// |-- Built-in Dependencies --|
import { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import StateListing from './StateListing'

// |-- Redux --|
import useStatesByCountry from 'src/hooks/useStatesByCountry'
import { setItems } from 'src/redux/slices/statesSlice'
import { AppDispatch, RootState } from 'src/redux/store'

const StateListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items }: any = useSelector((state: RootState) => state.states)
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state.country
    )
    const { stateByCountry } = useStatesByCountry(selectedLocationCountries)
    const { searchValue: searchValueState }: any = useSelector(
        (state: RootState) => state.states
    )

    const states = items?.map((ele: any) => {
        return {
            label: ele.stateName,
            value: ele._id,
            preferredCourier: ele.preferredCourier,
        }
    })

    useEffect(() => {
        if (stateByCountry?.length && selectedLocationCountries) {
            dispatch(setItems(stateByCountry))
        } else {
            dispatch(setItems(null))
        }
    }, [stateByCountry, selectedLocationCountries])

    return (
        <StateListing
            states={states?.filter((stateItem: any) =>
                stateItem?.label
                    ?.toLocaleLowerCase()
                    ?.includes(searchValueState?.toLocaleLowerCase())
            )}
        />
    )
}

export default StateListingWrapper
