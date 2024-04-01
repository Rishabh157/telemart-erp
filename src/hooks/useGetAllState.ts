import { useEffect, useState } from 'react'
import { useGetAllStateQuery } from 'src/services/StateService'

export const useGetAllState = () => {
    const [state, setState] = useState([])
    const { data, isLoading, isFetching } = useGetAllStateQuery('')

    useEffect(() => {
        if (!isFetching && !isLoading) {
            setState(data?.data)
        }
    }, [data, isLoading, isFetching])

    return { state, isLoading }
}
