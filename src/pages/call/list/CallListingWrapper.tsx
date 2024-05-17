// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import CallListing from './CallListing'

import { InbooundCallerListResponse } from 'src/models/configurationModel/InboundCaller.model'
import { useGetPaginationInboundCallerQuery } from 'src/services/CallerService'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

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
            renderCell: (row: InbooundCallerListResponse) => (
                <span> {row.didNo} </span>
            ),
            name: UserModuleNameTypes.CALL_LIST_DID_NUMBER,
        },
        {
            field: 'mobileNo',
            headerName: 'Mobile Number',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CALL_LIST_MOBILE_NUMBER,
            renderCell: (row: InbooundCallerListResponse) => (
                <span> {row?.mobileNo} </span>
            ),
        },
        {
            field: 'dispositionTwoLabel',
            headerName: 'Disposition Two',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CALL_LIST_DISPOSITION_LEBEL_TWO,
            renderCell: (row: InbooundCallerListResponse) => (
                <span>
                    {' '}
                    {row.dispositionTwoLabel ? row.dispositionTwoLabel : 'NA'}
                </span>
            ),
        },
        {
            field: 'dispositionThreeLabel',
            headerName: 'Disposition Three Label',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CALL_LIST_DISPOSITION_LEBEL_THREE,
            renderCell: (row: InbooundCallerListResponse) => (
                <span>
                    {' '}
                    {row.dispositionThreeLabel
                        ? row.dispositionThreeLabel
                        : 'NA'}{' '}
                </span>
            ),
        },
        {
            field: 'schemeLabel',
            headerName: 'Scheme',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CALL_LIST_SCHEME,
            renderCell: (row: InbooundCallerListResponse) => (
                <span> {row.schemeLabel} </span>
            ),
        },
        {
            field: 'channelId',
            headerName: 'Channel',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CALL_LIST_CHANNEL,
            renderCell: (row: InbooundCallerListResponse) => (
                <span> {row.channel} </span>
            ),
        },
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     flex: 'flex-[0.5_0.5_0%]',
        //     renderCell: (row: any) => (
        //         <ActionPopup
        //             handleOnAction={() => {
        //                 // e.stopPropagation()
        //                 // setShowDropdown(!showDropdown)
        //                 // setCurrentId(row?._id)
        //             }}
        //         />
        //
        //
        //     ),
        //
        // },
    ]
    const { userData } = useGetLocalStorage()
    const { items } = useGetCustomListingData<InbooundCallerListResponse>({
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
