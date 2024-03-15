import React from 'react'
import { useGetAllinitialCallerOneQuery } from 'src/services/configurations/InitialCallerOneServices'

export const useGetAllInitialByCallType = (callType: string) => {
    const [initialCallOneByCallType, setInitialCallOneByCallType] =
        React.useState<any[]>([])

    const { data, isFetching, isLoading } = useGetAllinitialCallerOneQuery(
        callType,
        {
            skip: !callType,
        }
    )

    React.useEffect(() => {
        if (!isLoading && !isFetching) {
            const filterOption = data?.data?.map((ele: any) => {
                return {
                    label: ele?.initialCallDisplayName,
                    value: ele?._id,
                    originalLabel: ele?.initialCallName,
                }
            })
            setInitialCallOneByCallType(filterOption)
        }
    }, [data, isLoading, isFetching])

    return { initialCallOneByCallType, isDataLoading: isLoading }
}
