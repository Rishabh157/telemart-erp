import React, { useState, useEffect } from 'react'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import InwardInventory from './InwardInventory'
import { useGetAllCartonBoxQuery } from 'src/services/CartonBoxService'

import { CartonBoxListResponse, WarehousesListResponse } from 'src/models'
import { useGetWareHousesQuery } from 'src/services/WareHoouseService'
import { SelectOption } from 'src/models/FormField/FormField.model'

type Props = {}
export type SelectBoxOption = {
    label: string
    value: string | number
    itemCount: number
}
const InwardInventoryWrapper = (props: Props) => {
    const [cartonBoxOption, setCartonBoxOption] = useState<
        SelectBoxOption[] | []
    >([])
    const [wareHouseOption, setWareHouseOption] = useState<SelectOption[] | []>(
        []
    )
    const { data, isLoading, isFetching } = useGetAllCartonBoxQuery('')
    const {
        data: whData,
        isLoading: whIsLoading,
        isFetching: whIsFetching,
    } = useGetWareHousesQuery('')

    useEffect(() => {
        if (!isFetching && !isLoading) {
            const options = data?.data?.map((ele: CartonBoxListResponse) => {
                return {
                    label: `${ele?.boxName} (${ele?.innerItemCount})`,
                    value: ele?._id,
                    itemCount: ele?.innerItemCount,
                }
            })
            setCartonBoxOption(options)
        }
    }, [data, isLoading, isFetching])

    useEffect(() => {
        if (!whIsFetching && !whIsLoading) {
            const options = whData?.data?.map((ele: WarehousesListResponse) => {
                return {
                    label: ele?.wareHouseName,
                    value: ele?._id,
                }
            })
            setWareHouseOption(options)
        }
    }, [whData, whIsLoading, whIsFetching])
    return (
        <SideNavLayout>
            <InwardInventory
                cartonBoxOption={cartonBoxOption}
                wareHouseOption={wareHouseOption}
            />
        </SideNavLayout>
    )
}

export default InwardInventoryWrapper
