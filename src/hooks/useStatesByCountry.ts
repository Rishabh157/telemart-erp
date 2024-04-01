import { useState, useMemo } from 'react'
import { useGetAllStateByCountryQuery } from 'src/services/StateService'

const useStatesByCountry = (countryId?: string) => {
    const [stateByCountry, setCountryStates] = useState<any>(null)

    const {
        data,
        isLoading: isDataLoading,
        isFetching,
    } = useGetAllStateByCountryQuery(countryId || '', { skip: !countryId })

    useMemo(() => {
        if (!isDataLoading && !isFetching) {
            const result: any[] = data?.data
            setCountryStates(result || [])
        }
    }, [data, isDataLoading, isFetching])

    return { stateByCountry, isDataLoading }
}

export default useStatesByCountry
