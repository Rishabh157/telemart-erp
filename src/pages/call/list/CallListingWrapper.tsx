// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import CallListing from './CallListing'
import { useGetPaginationInboundCallerQuery } from 'src/services/CallerService'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import { OrderListResponse } from 'src/models'
import { CallListFilterFormValues } from './CallListingFilter/CallListingFilterWrapper'
import moment from 'moment'

const CallListingWrapper = () => {
    useUnmountCleanup()

    const [, setShowDropdown] = useState(false)
    const inboundCallerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue } = inboundCallerState


    // listing filters states
    const [filter, setFilter] =
        React.useState<CallListFilterFormValues>({
            dispositionOneId: { fieldName: '', label: '', value: '' },
            dispositionTwoId: {
                fieldName: '',
                label: '',
                value: '',
            },
            startDate: {
                fieldName: '',
                label: '',
                value: '',
            },
            endDate: { fieldName: '', label: '', value: '' },
        })

    const columns: columnTypes[] = [
        {
            field: 'createdAt',
            headerName: 'Create Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CALL_LIST_CREATE_DATE,
            renderCell: (row: OrderListResponse) => (
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
            field: 'didNo',
            headerName: 'DID No',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CALL_LIST_DID_NUMBER,
        },
        {
            field: 'callType',
            headerName: 'Call Type',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CALL_LIST_CALL_TYPE,
        },
        {
            field: 'campaign',
            headerName: 'Campaign',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CALL_LIST_CAMPAIGN,
        },
        {
            field: 'mobileNo',
            headerName: 'Mobile Number',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CALL_LIST_MOBILE,
        },
        {
            field: 'dispositionLevelTwoLabel',
            headerName: 'Disposition (One/Two)',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CALL_LIST_DISPOSITION,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div>
                    <div className="text-sm text-slate-700 font-medium">
                        {row?.dispositionLevelTwoLabel || '-'}
                    </div>
                    <div className="text-sm text-primary-main font-medium">
                        {row?.dispositionLevelThreeLabel}
                    </div>
                </div>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CALL_LIST_STATUS,
        },
        {
            field: 'schemeName',
            headerName: 'Scheme',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CALL_LIST_SCHEME,
        }
    ]

    const { userData } = useGetLocalStorage()
    const { items } = useGetCustomListingData<OrderListResponse>({
        useEndPointHook: useGetPaginationInboundCallerQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['didNo'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId,
                },
                {
                    fieldName: 'dispositionLevelTwoId',
                    value: filter?.dispositionOneId?.value,
                },
                {
                    fieldName: 'dispositionLevelThreeId',
                    value: filter?.dispositionTwoId?.value,
                },
            ],
            dateFilter: {
                startDate: filter.startDate.value as string,
                endDate: filter.endDate.value as string,
            }, orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    return (
        <SideNavLayout>
            <CallListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
                filter={filter}
                setFilter={setFilter}
            />
        </SideNavLayout>
    )
}

export default CallListingWrapper
