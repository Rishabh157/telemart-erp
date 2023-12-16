import { useState, useMemo } from 'react'
import { useGetAllPincodeByTehsilQuery } from 'src/services/PinCodeService'

const usePincodesByTehsil = (dealerId?: string) => {
    const [pincodesByTehsil, setPincodes] = useState<any[]>([])

    const { data, isLoading, isFetching } = useGetAllPincodeByTehsilQuery(
        dealerId || '',
        { skip: !dealerId }
    )

    useMemo(() => {
        if (!isLoading && !isFetching) {
            const result: any[] = data?.data
            setPincodes(result || [])
        }
    }, [data, isLoading, isFetching])

    return { pincodesByTehsil, isDataLoading: isLoading }
}

export default usePincodesByTehsil
