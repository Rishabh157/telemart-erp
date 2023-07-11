/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:ViewPurchaseOrderWrapper.tsx
// Type: View Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ViewPurchaseOrder from './ViewPurchaseOrder'
import { useGetPurchaseOrderByIdQuery } from 'src/services/PurchaseOrderService'

// |-- Redux --|
import { setSelectedItems } from 'src/redux/slices/PurchaseOrderSlice'
import { RootState, AppDispatch } from 'src/redux/store'

const ViewPurchaseOrderWrapper = () => {
    // Form Initial Values
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const Id = params.id
    const { data, isLoading, isFetching } = useGetPurchaseOrderByIdQuery(Id)
    const { selectedItems }: any = useSelector(
        (state: RootState) => state?.purchaseOrder
    )
    useEffect(() => {
        dispatch(setSelectedItems(data?.data))
    }, [data, isLoading, isFetching, dispatch])

    return (
        <SideNavLayout>
            <ViewPurchaseOrder items={selectedItems} />
        </SideNavLayout>
    )
}
export default ViewPurchaseOrderWrapper
