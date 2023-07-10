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
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
    // setFilterValue,
} from 'src/redux/slices/GRNSlice'
import { useGetPaginationGRNQuery } from 'src/services/GRNService'

const ViewPurchaseOrderWrapper = () => {
    // Form Initial Values
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const Id = params.id
    const { data, isLoading, isFetching } = useGetPurchaseOrderByIdQuery(Id)
    const { selectedItems }: any = useSelector(
        (state: RootState) => state?.purchaseOrder
    )
    const { userData }: any = useSelector((state: RootState) => state.auth)
    const grnState: any = useSelector((state: RootState) => state.grn)
    const { page, rowsPerPage, searchValue, items } = grnState
    useEffect(() => {
        dispatch(setSelectedItems(data?.data))
    }, [data, isLoading, isFetching, dispatch])

    const {
        data: GRNData,
        isLoading: GRNIsLoading,
        isFetching: GRNIsFetching,
    } = useGetPaginationGRNQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['itemName', 'poCode'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
            },
            {
                fieldName: 'poCode',
                value: selectedItems?.poCode,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: false,
    })

    useEffect(() => {
        if (!GRNIsLoading && !GRNIsFetching) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(GRNData?.data || []))
            dispatch(setTotalItems(GRNData?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [GRNIsLoading, GRNIsFetching, GRNData, dispatch])
    return (
        <SideNavLayout>
            <ViewPurchaseOrder items={selectedItems} grnitems={items} />
        </SideNavLayout>
    )
}
export default ViewPurchaseOrderWrapper
