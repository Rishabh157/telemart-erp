// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useGetPaginationWebLeadsQuery } from 'src/services/websites/WebLeadsServices'
import WebLeadsListing from './WebLeadsListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
// import { isAuthorized } from 'src/utils/authorization'
import moment from 'moment'
import React from 'react'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

type WebLeadsListResponseType = {
    _id: string
    order_id: string | null
    name: string
    phone: string
    email: string
    address: string
    address1: string
    landmark: string
    city: string
    state: string
    country: string
    zip_code: string
    quantity: string
    remark: string
    sdate: string
    idtag: string
    product_name: string
    mode: string
    paymeny_mode: string
    url: string
    price: string
    leadStatus: string
    isDeleted: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    __v: number
}
type LabelValuePair = {
    fieldName: string
    label: string
    value: any
}
export type WebLeadsFormInitialValuesFilterWithLabel = {
    leadStatus: LabelValuePair
    product_name: LabelValuePair
    startDate: LabelValuePair
    endDate: LabelValuePair
}

const WebLeadsListingWrapper = () => {
    useUnmountCleanup()
    const listState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const [filter, setFilter] =
        React.useState<WebLeadsFormInitialValuesFilterWithLabel>({
            leadStatus: { fieldName: '', label: '', value: '' },
            product_name: { fieldName: '', label: '', value: '' },
            startDate: {
                fieldName: '',
                label: '',
                value: '',
            },
            endDate: { fieldName: '', label: '', value: '' },
        })
    const { page, rowsPerPage, searchValue } = listState

    // pagination api
    const { items } = useGetCustomListingData<WebLeadsListResponseType[]>({
        useEndPointHook: useGetPaginationWebLeadsQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['phone', 'email', 'product_name', 'leadStatus'],
            page: page,
            filterBy: [
                {
                    fieldName: 'leadStatus',
                    value: filter.leadStatus.value || '',
                },
            ],
            dateFilter: {
                startDate: filter.startDate.value,
                endDate: filter.endDate.value,
            },
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const columns: columnTypes[] = [
        {
            field: 'createdAt',
            headerName: 'Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_CREATED_DATE,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: WebLeadsListResponseType) => (
                <div className="py-0">
                    <div className="text-[12px] text-slate-700 font-medium">
                        {moment(row?.createdAt).format('DD MMM YYYY')}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                        {moment(row?.createdAt).format('hh:mm A')}
                    </div>
                </div>
            ),
        },
        {
            field: 'leadStatus',
            headerName: 'Lead Status',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_STATUS,
            renderCell: (row: WebLeadsListResponseType) => (
                <span>{row.leadStatus}</span>
            ),
        },
        {
            field: 'idtag',
            headerName: 'Id Tags',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_ID_TAGS,
            renderCell: (row: WebLeadsListResponseType) => (
                <span>{row.idtag}</span>
            ),
        },
        {
            field: 'name',
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_CUSTOMER_NAME,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.name} </span>
            ),
        },
        {
            field: 'phone',
            headerName: 'Mobile No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_MOBILE_NUMBER,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.phone} </span>
            ),
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 'flex-[1_1_0%]',
            extraClasses : "max-w-[300px]",
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_EMAIL,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.email || '-'} </span>
            ),
        },
        {
            field: 'productName',
            headerName: 'Product Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_PRODUCT_NAME,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.product_name} </span>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_PRICE,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.price || '-'} </span>
            ),
        },
        {
            field: 'city',
            headerName: 'City',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_CITY,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.city || '-'} </span>
            ),
        },
        {
            field: 'state',
            headerName: 'State',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_STATE,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.state || '-'} </span>
            ),
        },
    ]

    return (
        <WebLeadsListing
            columns={columns}
            rows={items}
            filter={filter}
            setFilter={setFilter}
        />
    )
}

export default WebLeadsListingWrapper
