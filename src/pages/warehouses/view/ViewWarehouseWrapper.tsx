/// ==============================================
// Filename:ViewWarehouseWrapper.tsx
// Type: View Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import ViewWarehouse from './ViewWarehouse'
//import { showToast } from "src/utils";
import { useGetWareHouseByIdQuery } from 'src/services/WareHoouseService'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedItem } from 'src/redux/slices/warehouseSlice'

const ViewWarehouseWrapper = () => {
    const params = useParams()
    const id: any = params.id
    const dispatch = useDispatch<AppDispatch>()

    const { data, isLoading, isFetching } = useGetWareHouseByIdQuery(id)

    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [data, isLoading, isFetching, dispatch])

    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.warehouse
    )

    return (
        // <SideNavLayout>
        <ViewWarehouse items={selectedItem} />
        // </SideNavLayout>
    )
}

export default ViewWarehouseWrapper
