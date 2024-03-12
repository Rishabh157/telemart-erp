import { useEffect, useState } from 'react'
import { useGetAllCountryQuery } from 'src/services/CountryService'

const useCountries = () => {
    const [country, setCountry] = useState([])
    const { data, isLoading, isFetching } = useGetAllCountryQuery('')

    useEffect(() => {
        if (!isFetching && !isLoading) {
            setCountry(data?.data)
        }
    }, [data, isLoading, isFetching])

    return { country, isLoading }
}

export default useCountries
