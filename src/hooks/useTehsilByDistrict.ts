import { useState, useMemo } from 'react'
import { useGetAllTehsilByDistrictQuery } from 'src/services/TehsilService'

const useTehsilByDistrict = (districtId?: string) => {
    const [tehsilBydistrict, setTehsilByDistrict] = useState<any[]>([])

    const { data, isLoading, isFetching } = useGetAllTehsilByDistrictQuery(
        districtId || '',
        { skip: !districtId }
    )
    useMemo(() => {
        if (!isLoading && !isFetching) {
            const result: any[] = data?.data
            setTehsilByDistrict(result || [])
        }
    }, [data, isLoading, isFetching])

    return { tehsilBydistrict, isDataLoading: isLoading }
}

export default useTehsilByDistrict
