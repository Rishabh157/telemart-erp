/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:ViewPurchaseOrderWrapper.tsx
// Type: View Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetPurchaseOrderByIdQuery } from 'src/services/PurchaseOrderService'
import ViewPurchaseOrder from './ViewPurchaseOrder'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { useGetPaginationGRNQuery } from 'src/services/GRNService'

const ViewPurchaseOrderWrapper = () => {
    useUnmountCleanup()
    // Form Initial Values
    const params = useParams()
    const Id = params.id
    const { items: selectedItems } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetPurchaseOrderByIdQuery(Id),
    })
    const { userData }: any = useSelector((state: RootState) => state.auth)
    const grnState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = grnState
    const { items } = useGetCustomListingData({
        useEndPointHook: useGetPaginationGRNQuery({
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
        }),
    })

    return (
        <SideNavLayout>
            <ViewPurchaseOrder items={selectedItems} grnitems={items} />
        </SideNavLayout>
    )
}
export default ViewPurchaseOrderWrapper
