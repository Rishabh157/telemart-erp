
// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import VendorRtvListing from './VendorRtvListing'

import {
    useGetPaginationReturnToVendorByGroupQuery,
} from 'src/services/ReturnToVendorService'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'

interface ProductSalesOrder {
    productGroupId: string
    rate: number
    quantity: number
    _id: string
    groupName: string
}

interface ReturnToVendorDocument {
    _id: string
    rtvNumber: string
    vendorId: string
    warehouseId: string
    firstApprovedById: string | null
    firstApproved: boolean | null
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApprovedById: string | null
    secondApproved: boolean | null
    secondApprovedActionBy: string
    secondApprovedAt: string
    productSalesOrder: ProductSalesOrder
    remark: string
    status: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    __v: number
    createdAt: string
    updatedAt: string
    vendorLabel: string
    warehouseLabel: string
}

interface ReturnToVendorListResponse {
    _id: string
    warehouseLabel: string
    vendorLabel: string
    firstApproved: boolean | null
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApprovedActionBy: string
    secondApprovedAt: string
    secondApproved: boolean | null
    createdAt: string
    updatedAt: string
    documents: ReturnToVendorDocument[]
}

const VendorRtvListingWrapper = () => {
    useUnmountCleanup()
    const returnToVendorState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = returnToVendorState
    const { vendorId } = useParams()

    const { userData }: any = useSelector((state: RootState) => state.auth)

    const { items } = useGetCustomListingData<ReturnToVendorListResponse>({
        useEndPointHook: useGetPaginationReturnToVendorByGroupQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['rtvNumber'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
                },
                {
                    fieldName: 'vendorId',
                    value: vendorId as string,
                },
                {
                    fieldName: 'status',
                    value: 'DISPATCHED',
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

 


    const columns: columnTypes[] = [
        {
            field: 'rtvNo',
            headerName: 'RTV No.',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: ReturnToVendorListResponse) => (
                <span> {row?._id} </span>
            ),
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
            flex: 'flex-[1.5_1.5_0%]',
            align: 'center',
            renderCell: (row: ReturnToVendorListResponse) => {
                return (
                    <div className="w-full">
                        {row?.documents?.map((item) => {
                            return (
                                <div className="grid grid-cols-3 border border-slate-400 mb-1 rounded text-center">
                                    <div className="col-span-2 border-r-[1px] border-slate-400 py-1 px-2">
                                        {item?.productSalesOrder?.groupName}
                                    </div>
                                    <div className="col-span-1 py-1 px-2">
                                        {item?.productSalesOrder?.quantity}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: ReturnToVendorListResponse) => {
                return <span> {row?.documents?.[0]?.status} </span>
            },
        },
        {
            field: 'createdAt',
            headerName: 'Inserted Date',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: ReturnToVendorListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.createdAt)} </span>
            },
        },
        {
            field: 'updatedAt',
            headerName: 'Updated Date',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: ReturnToVendorListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.updatedAt)} </span>
            },
        },
    ]

    return <VendorRtvListing columns={columns} rows={items} />
}

export default VendorRtvListingWrapper
