// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { GRNListResponse } from 'src/models/GRN.model'
import { useGetPaginationGRNQuery } from 'src/services/GRNService'
import GRNListing from './GRNListing'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const columns: columnTypes[] = [
    {
        field: 'poCode',
        headerName: 'PO Code',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: GRNListResponse) => <span> {row.poCode} </span>,
        name: UserModuleNameTypes.GRN_LIST_PO_CODE,
    },
    {
        field: 'itemName',
        headerName: 'Item Name',
        flex: 'flex-[1.5_1.5_0%]',
        name: UserModuleNameTypes.GRN_LIST_ITEM_NAME,
        renderCell: (row: GRNListResponse) => {
            return <span> {row?.itemName} </span>
        },
    },
    {
        field: 'receivedQuantity',
        headerName: 'Received Qnty.',
        flex: 'flex-[1.5_1.5_0%]',
        name: UserModuleNameTypes.GRN_LIST_RECEVIED_QUANTITY,
        renderCell: (row: GRNListResponse) => {
            return <span> {row?.receivedQuantity} </span>
        },
    },
    {
        field: 'goodQuantity',
        headerName: 'Good Qnty.',
        flex: 'flex-[1.5_1.5_0%]',
        name: UserModuleNameTypes.GRN_LIST_GOOD_QUANTITY,
        renderCell: (row: GRNListResponse) => {
            return <span> {row.goodQuantity} </span>
        },
    },
    {
        field: 'defectiveQuantity',
        headerName: 'Defective Qnty.',
        flex: 'flex-[1.5_1.5_0%]',
        name: UserModuleNameTypes.GRN_LIST_DEFECTIVE_QUANTITY,
        renderCell: (row: GRNListResponse) => {
            return <span> {row.defectiveQuantity} </span>
        },
    },
]

const GRNListingWrapper = () => {
    useUnmountCleanup()

    // state
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = listingPaginationState
    const { userData } = useSelector((state: RootState) => state?.auth)

    // pagination api
    const { items } = useGetCustomListingData<any[]>({
        useEndPointHook: useGetPaginationGRNQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['poCode', 'itemName'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    return (
        <SideNavLayout>
            <GRNListing columns={columns} rows={items} />
        </SideNavLayout>
    )
}

export default GRNListingWrapper
