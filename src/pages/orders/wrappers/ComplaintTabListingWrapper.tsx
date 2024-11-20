import React, { useEffect } from 'react'
import OrderListing from '../OrderListing'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/orderSlice'
import { useGetPaginationComplaintQuery } from 'src/services/CallerService'

const ComplaintTabListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const orderState: any = useSelector((state: RootState) => state.order)

    // Get All Order Data Query
    const { page, rowsPerPage, searchValue, complaintNumberSearchValue } =
        orderState

    const { data, isFetching, isLoading } = useGetPaginationComplaintQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['customerNumber'],
        page: page,
        filterBy: [
            {
                fieldName: 'orderNumber',
                value: searchValue,
            },
            {
                fieldName: 'complaintNumber',
                value: complaintNumberSearchValue,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }
    }, [isLoading, isFetching, data, dispatch])

    // complaint columns
    const columns: columnTypes[] = [
        {
            field: 'orderNumber',
            headerName: 'Order No',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: any) => <span> {row?.orderNumber} </span>,
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_ORDER_NUMBER,
        },
        {
            field: 'complaintNumber',
            headerName: 'Complaint Number',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_COMPLAINT_NUMBER,
            renderCell: (row: any) => <span> {row?.complaintNumber} </span>,
        },
        {
            field: 'complaintbyLabel',
            headerName: 'Complaint Label',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_COMPLAINT_LABEL,
            renderCell: (row: any) => (
                <span>
                    {row?.complaintbyLabel ? row?.complaintbyLabel : 'NA'}
                </span>
            ),
        },
        {
            field: 'schemeName',
            headerName: 'Scheme',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_SCHEME_NAME,
            renderCell: (row: any) => <span> {row?.schemeName} </span>,
        },
        {
            field: 'initialCallOneLabel',
            headerName: 'Initial Call One Label',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[250px]',
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_INITAL_CALL_ONE_LABEL,
            renderCell: (row: any) => <span> {row?.initialCallOneLabel} </span>,
        },
        {
            field: 'initialCallTwoLabel',
            headerName: 'Initial Call Two Label',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[250px]',
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_INITAL_CALL_TWO_LABEL,
            renderCell: (row: any) => <span> {row?.initialCallTwoLabel} </span>,
        },
        {
            field: 'initialCallThreeLabel',
            headerName: 'Initial Call Three Label',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[250px]',
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_INITAL_CALL_THREE_LABEL,
            renderCell: (row: any) => (
                <span> {row?.initialCallThreeLabel} </span>
            ),
        },
    ]

    return <OrderListing columns={columns} />
}

export default ComplaintTabListingWrapper
