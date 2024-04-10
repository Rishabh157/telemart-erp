import { useEffect, useState } from 'react'
import { useGetAllDistrictQuery } from 'src/services/DistricService'

export const useGetAllDistricts = () => {
    const [districts, setDistricts] = useState([])
    const { data, isLoading, isFetching } = useGetAllDistrictQuery('')

    useEffect(() => {
        if (!isFetching && !isLoading) {
            setDistricts(data?.data)
        }
    }, [data, isLoading, isFetching])

    return { districts, isLoading }
}
