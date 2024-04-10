import { useEffect, useState } from 'react'
import { useGetAllDeliveryBoyQuery } from 'src/services/DeliveryBoyServices'

export const useGetAllDeliveryBoy = () => {
    const [allDeliveryBoy, setCountry] = useState([])
    const { data, isLoading, isFetching } = useGetAllDeliveryBoyQuery('')

    useEffect(() => {
        if (!isFetching && !isLoading) {
            setCountry(data?.data)
        }
    }, [data, isLoading, isFetching])

    return { allDeliveryBoy, isLoading }
}
