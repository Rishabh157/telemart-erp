// |-- External Dependencies --|
import { useSelector } from 'react-redux'
// |-- Internal Dependencies --|
import CountryListing from './CountryListing'

// |-- Redux --|
import { RootState } from 'src/redux/store'

import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAllCountryQuery } from 'src/services/CountryService'

const CountryListingWrapper = () => {
    const { options: contries } = useCustomOptions({
        useEndPointHook: useGetAllCountryQuery(''),
        keyName: 'countryName',
        value: '_id',
    })
    const { searchValue }: any = useSelector(
        (state: RootState) => state.country
    )

    return (
        <CountryListing
            contries={contries}
            items={contries.filter((countryItems: any) =>
                countryItems?.label
                    ?.toLocaleLowerCase()
                    ?.includes(searchValue?.toLocaleLowerCase())
            )}
        />
    )
}

export default CountryListingWrapper
