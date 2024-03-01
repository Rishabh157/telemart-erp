import { useState, useMemo } from 'react'
import { useGetAllPincodeByDistrictQuery } from 'src/services/PinCodeService'

const usePincodesByDistrict = (districtId?: string) => {
    const [pincodeByDistrict, setPincodeByDistrict] = useState<any[]>([])

    const { data, isLoading, isFetching } = useGetAllPincodeByDistrictQuery(
        districtId || '',
        { skip: !districtId }
    )

    useMemo(() => {
        if (!isLoading && !isFetching) {
            const result: any[] = data?.data
            setPincodeByDistrict(result || [])
        }
    }, [data, isLoading, isFetching])

    return { pincodeByDistrict, isDataLoading: isLoading }
}

export default usePincodesByDistrict
