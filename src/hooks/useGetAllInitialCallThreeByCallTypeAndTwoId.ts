import React from 'react'
import { useGetAllinitialCallThreeByTwoByAndCallTypeQuery } from 'src/services/configurations/InitialCallerThreeServices'

export const useGetAllInitialCallThreeByCallTypeAndTwoId = (
    icTwoId: string,
    callType: string
) => {
    const [
        initialCallThreeByCallTypeAndTwoId,
        setInitialCallThreeByCallTypeAndTwoId,
    ] = React.useState<any[]>([])

    // Get IC2 Option By Call Type And IC1 _id
    const { data, isFetching, isLoading } =
        useGetAllinitialCallThreeByTwoByAndCallTypeQuery(
            {
                id: icTwoId,
                callType: callType,
            },
            {
                skip: !(icTwoId && callType),
            }
        )

    React.useEffect(() => {
        if (!isLoading && !isFetching) {
            const filterOption = data?.data?.map((ele: any) => {
                return {
                    label: ele?.initialCallDisplayName,
                    value: ele?._id,
                }
            })
            setInitialCallThreeByCallTypeAndTwoId(filterOption)
        }
    }, [data, isLoading, isFetching])

    return { initialCallThreeByCallTypeAndTwoId, isDataLoading: isLoading }
}
