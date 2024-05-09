/// ==============================================
// Filename:InventoryListing.tsx
// Type: List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
// import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import FillCartonBoxInventory from './FillCartonBoxInventory'
import { useGetAllCartonBoxQuery } from 'src/services/CartonBoxService'
import { CartonBoxListResponse, WarehousesListResponse } from 'src/models'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { SelectOption } from 'src/models/FormField/FormField.model'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}
export type SelectBoxOption = {
    label: string
    value: string | number
    itemCount: number
}
const FillCartonBoxInventoryWrapper = (props: Props) => {
    const [cartonBoxOption, setCartonBoxOption] = useState<
        SelectBoxOption[] | []
    >([])
    const { userData } = useSelector((state: RootState) => state?.auth)

    const [wareHouseOption, setWareHouseOption] = useState<SelectOption[] | []>(
        []
    )
    const { data, isLoading, isFetching } = useGetAllCartonBoxQuery(
        userData?.companyId
    )

    const {
        data: whData,
        isLoading: whIsLoading,
        isFetching: whIsFetching,
    } = useGetWareHousesQuery(userData?.companyId)

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
        <FillCartonBoxInventory
            cartonBoxOption={cartonBoxOption}
            wareHouseOption={wareHouseOption}
        />
    )
}

export default FillCartonBoxInventoryWrapper
