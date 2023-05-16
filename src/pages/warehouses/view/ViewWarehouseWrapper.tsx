import React, { useEffect } from 'react'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ViewWarehouse from './ViewWarehouse'
//import { showToast } from "src/utils";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useParams } from 'react-router-dom'
import { useGetWareHouseByIdQuery } from 'src/services/WareHoouseService'
import { setSelectedItem } from 'src/redux/slices/warehouseSlice'

const ViewWarehouseWrapper = () => {
    const params = useParams()
    const id: any = params.id
    const dispatch = useDispatch()

    const { data, isLoading, isFetching } = useGetWareHouseByIdQuery(id)

    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [data, isLoading, isFetching, dispatch])

    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.warehouse
    )

    return (
        <SideNavLayout>
            <ViewWarehouse items={selectedItem} />
        </SideNavLayout>
    )
}

export default ViewWarehouseWrapper
