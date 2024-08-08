// |-- External Dependencies --|
import React from 'react'
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useGetPaginationWebLeadsQuery } from 'src/services/websites/WebLeadsServices'
import WebLeadsListing from './WebLeadsListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import moment from 'moment'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { WebLeadsListResponseType } from 'src/models/website/WebLeads.model'

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

const WebLeadsCodListingWrapper = () => {
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
            isPrepaid: false,
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const columns: columnTypes[] = [
        {
            field: 'createdAt',
            headerName: 'Date',
            flex: 'flex-[0.7_0.7_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_CREATED_DATE,
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
            flex: 'flex-[0.7_0.7_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_STATUS,
            renderCell: (row: WebLeadsListResponseType) => (
                <span>{row.leadStatus}</span>
            ),
        },
        {
            field: 'transactionId',
            headerName: 'Transaction ID',
            flex: 'flex-[0.7_0.7_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_TRANSACTION_ID,
            renderCell: (row: WebLeadsListResponseType) => (
                <span>{row?.transactionId}</span>
            ),
        },
        {
            field: 'mode',
            headerName: 'Mode',
            flex: 'flex-[0.8_0.8_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_MODE,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row?.mode} </span>
            ),
        },
        {
            field: 'idtag',
            headerName: 'Id Tags',
            flex: 'flex-[0.7_0.7_0%]',
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
            flex: 'flex-[0.8_0.8_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_MOBILE_NUMBER,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.phone} </span>
            ),
        },
        {
            field: 'email',
            headerName: 'Email',
            align: 'start',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'max-w-[300px]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_EMAIL,
            renderCell: (row: WebLeadsListResponseType) => (
                <span
                    className="w-[250px] whitespace-nowrap text-ellipsis overflow-hidden"
                    title={row.email}
                >
                    {row.email || '-'}
                </span>
            ),
        },
        {
            field: 'productName',
            headerName: 'Product Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'max-w-[350px]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_PRODUCT_NAME,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.product_name} </span>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_PRICE,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.price || '-'} </span>
            ),
        },
        {
            field: 'leadType',
            headerName: 'Lead Type',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_LEAD_TYPE,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row?.leadType || '-'} </span>
            ),
        },
        {
            field: 'paymentGatewayName',
            headerName: 'Payment Getway',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_PAYMENT_GETWAY,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row?.paymentGatewayName || '-'} </span>
            ),
        },
        {
            field: 'paymentMode',
            headerName: 'Payment Mode',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_PAYMENT_MODE,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row?.paymentMode || '-'} </span>
            ),
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_PAYMENT_STATUS,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row?.paymentStatus || '-'} </span>
            ),
        },
        {
            field: 'city',
            headerName: 'City',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.WEBSITES_LEADS_LIST_CITY,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.city || '-'} </span>
            ),
        },
        {
            field: 'state',
            headerName: 'State',
            flex: 'flex-[0.5_0.5_0%]',
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

export default WebLeadsCodListingWrapper
