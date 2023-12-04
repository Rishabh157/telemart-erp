import { useState, useMemo } from 'react'
import { useGetAllStateByCountryQuery } from 'src/services/StateService'

const useCountryStates = (countryId?: string) => {
    const [countryStates, setCountryStates] = useState<any[]>([])

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

    return { countryStates, isDataLoading }
}

export default useCountryStates
