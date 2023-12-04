import { useState, useMemo } from 'react'
import { useGetAllDistrictByStateQuery } from 'src/services/DistricService'

const useStateDistricts = (stateId?: string) => {
    const [stateDistricts, setStateCities] = useState<any[]>([])

    const { data, isLoading, isFetching } = useGetAllDistrictByStateQuery(
        stateId || '',
        { skip: !stateId }
    )

    useMemo(() => {
        if (!isLoading && !isFetching) {
            const result: any[] = data?.data
            setStateCities(result || [])
        }
    }, [data, isLoading, isFetching])

    return { stateDistricts, isDataLoading: isLoading }
}

export default useStateDistricts
