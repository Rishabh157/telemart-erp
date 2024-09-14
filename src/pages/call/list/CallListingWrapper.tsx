// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import CallListing from './CallListing'

// import { OrderListResponse } from 'src/models/configurationModel/InboundCaller.model'
import { useGetPaginationInboundCallerQuery } from 'src/services/CallerService'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import { OrderListResponse } from 'src/models'

const CallListingWrapper = () => {
    useUnmountCleanup()

    const [, setShowDropdown] = useState(false)
    const inboundCallerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue } = inboundCallerState

    const columns: columnTypes[] = [
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
            ],
            dateFilter: {},
            orderBy: 'createdAt',
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
            />
        </SideNavLayout>
    )
}

export default CallListingWrapper
