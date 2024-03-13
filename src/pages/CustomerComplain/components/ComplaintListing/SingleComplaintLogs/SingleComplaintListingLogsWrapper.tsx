import React from 'react'
import SingleComplaintListingLogs from './SingleComplaintListingLogs'
import { useGetComplaintLogsByIdQuery } from 'src/services/CustomerComplainServices'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import moment from 'moment'

type Props = {
    complaintId: string
}

const SingleComplaintListingLogsWrapper = ({ complaintId }: Props) => {
    const [complaintListing, setComplaintListing] = React.useState<any[]>([])

    const columns: columnTypes[] = [
        {
            field: 'createdAt',
            headerName: 'Date',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => (
                <div className="flex flex-col">
                    <span>{moment(row?.createdAt).format('DD-MM-YYYY')}</span>
                    <span> {moment(row?.createdAt).format('hh:mm:ss A')}</span>
                </div>
            ),
        },
        {
            field: 'orderNumber',
            headerName: 'Order No.',
            flex: 'flex-[1_1_0%]',
        },
        {
            field: 'callType',
            headerName: 'Call Type',
            flex: 'flex-[1_1_0%]',
        },
        {
            field: '',
            headerName: 'Issue Category (IC1:IC2:IC3)',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => (
                <div className="flex flex-col">
                    {row?.initialCallOneLabel}
                    {':'}
                    <br />
                    {row?.initialCallTwoLabel}
                    {':'}
                    <br />
                    {row?.initialCallThreeLabel}
                </div>
            ),
        },
        {
            field: 'status',
            headerName: 'Status (Return Type)',
            flex: 'flex-[1_1_0%]',
        },
        {
            field: 'stage',
            headerName: 'Stage',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => <span>-</span>,
        },
        {
            field: 'complaintbyLabel',
            headerName: 'Last Updated By',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'capitalize',
            renderCell: (row: any) => <span>{row?.complaintbyLabel}</span>,
        },
        {
            field: '',
            headerName: 'Last Updated Date',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => (
                <div className="flex flex-col">
                    {moment(row?.updatedAt).format('DD-MM-YYYY')}
                    {moment(row?.updatedAt).format('hh:mm:ss A')}
                </div>
            ),
        },
        {
            field: '',
            headerName: 'Total Calls',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => <span>-</span>,
        },
    ]

    // get complaint logs by id
    const {
        isLoading: isComplaintLogsLoading,
        isFetching: isComplaintLogsFetching,
        data: complaintLogsData,
    } = useGetComplaintLogsByIdQuery<any>(complaintId, {
        skip: !complaintId,
    })

    React.useEffect(() => {
        if (!isComplaintLogsLoading && !isComplaintLogsFetching) {
            console.log('component complaint logs Data', complaintLogsData)
            setComplaintListing(complaintLogsData?.data)
        }
    }, [complaintLogsData, isComplaintLogsLoading, isComplaintLogsFetching])

    return (
        <SingleComplaintListingLogs columns={columns} rows={complaintListing} />
    )
}

export default SingleComplaintListingLogsWrapper
