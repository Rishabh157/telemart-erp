import React, { useEffect, useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import CallListing from './CallListing'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/inboundCallerSlice'
import { InbooundCallerListResponse } from 'src/models/configurationModel/InboundCaller.model'
import { useGetPaginationInboundCallerQuery } from 'src/services/media/InboundCallerServices'

const CallListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()

    const [showDropdown, setShowDropdown] = useState(false)
    const inboundCallerState: any = useSelector(
        (state: RootState) => state.inboundCaller
    )

    const { page, rowsPerPage, searchValue, items } = inboundCallerState
    const columns: columnTypes[] = [
        {
            field: 'didNo',
            headerName: 'DID No',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: InbooundCallerListResponse) => (
                <span> {row.didNo} </span>
            ),
        },
        {
            field: 'generalInformation.incomingCallerNo',
            headerName: 'Incoming Caller No',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: InbooundCallerListResponse) => (
                <span> {row.incomingCallerNo} </span>
            ),
        },
        {
            field: 'dispositionTwoLabel',
            headerName: 'Disposition Two',
            flex: 'flex-[1_1_0%]',
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
            renderCell: (row: InbooundCallerListResponse) => (
                <span> {row.schemeLabel} </span>
            ),
        },
        {
            field: 'channelId',
            headerName: 'Channel',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: InbooundCallerListResponse) => (
                <span> {row.channel} </span>
            ),
        },
    ]

    const { data, isFetching, isLoading } = useGetPaginationInboundCallerQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['didNo'],
        page: page,
        filterBy: [
            {
                fieldName: '',
                value: [],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data])

    return (
        <>
            <ConfigurationLayout>
                <CallListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </ConfigurationLayout>
        </>
    )
}

export default CallListingWrapper
