import { useState, useMemo } from 'react'
import { useGetAllAreaByPincodeQuery } from 'src/services/AreaService'

const useGetAreaByPincode = (pincodeId?: string) => {
    const [AreaByPincode, setAreaByPincode] = useState<any[]>([])

    const { data, isLoading, isFetching } = useGetAllAreaByPincodeQuery(
        pincodeId || '',
        { skip: !pincodeId }
    )
    useMemo(() => {
        if (!isLoading && !isFetching) {
            const result: any[] = data?.data
            setAreaByPincode(result || [])
        }
    }, [data, isLoading, isFetching])

    return { AreaByPincode, isDataLoading: isLoading }
}

export default useGetAreaByPincode
