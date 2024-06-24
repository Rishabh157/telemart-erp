// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { IconType } from 'react-icons'
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import OutwardManualMappingTabListing from './OutwardManualMappingTabListing'

// |-- Redux --|
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { useGetOrderByOrderNumberManualMappingQuery } from 'src/services/OrderService'
import { OrderListResponse } from 'src/models'
import { RootState } from 'src/redux/store'
import { useParams } from 'react-router-dom'
import DispatchingBarcodesOfManualMapping from './DispatchingBarcodes/DispatchingBarcodesOfManualMapping'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

const OutwardManualMappingTabListingWrapper = () => {
    useUnmountCleanup()
    const { id: warehouseId } = useParams()

    const outwardCustomerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const {
        //  page,
        //   rowsPerPage,
        searchValue: orderNumber,
    } = outwardCustomerState

    const { items } = useGetDataByIdCustomQuery<OrderListResponse>({
        useEndPointHook: useGetOrderByOrderNumberManualMappingQuery(
            { orderNumber, warehouseId },
            {
                skip: !orderNumber,
            }
        ),
    })

    return (
        <>
            <OutwardManualMappingTabListing orderInfo={items} />
            <DispatchingBarcodesOfManualMapping
                items={items as OrderListResponse}
            />
        </>
    )
}

export default OutwardManualMappingTabListingWrapper
