// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { useParams } from 'react-router-dom'
import MoneybackLogsListing from './MoneybackLogsListing'
import { useGetAllMoneybackLogsByIdQuery } from 'src/services/MoneybackServices'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import moment from 'moment'

type MoneybackLogsListResponseType = {
    _id: string
    moneyBackRequestId: string
    complaintNumber: string
    ccRemark: string
    ccApprovalDate: string
    accountRemark: string
    accountApprovalDate: string
    managerFirstRemark: string
    managerFirstApprovalDate: string
    managerSecondRemark: string
    managerSecondApprovalDate: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

const MoneybackLogsListingWrapper = () => {
    const params = useParams()
    const id: any = params.id

    const [moneybackLogs, setMoneybackLogs] = useState<any[]>([])
    const [apiStatus, setapiStatus] = React.useState<boolean>(false)

    const { data, isLoading, isFetching } = useGetAllMoneybackLogsByIdQuery(
        id,
        {
            skip: !id,
        }
    )

    useEffect(() => {
        setapiStatus(true)
        if (!isLoading && !isFetching) {
            setapiStatus(false)
            setMoneybackLogs(data?.data)
        }
    }, [data, isLoading, isFetching])

    const columns: columnTypes[] = [
        {
            field: 'complaintNumber',
            headerName: 'Complain No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            // renderCell: (row: MoneybackLogsListResponseType) => <span></span>,
        },
        {
            field: 'managerFirstApprovalDate',
            headerName: 'Manager First Approval Date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: MoneybackLogsListResponseType) =>
                row?.managerFirstApprovalDate ? (
                    <div className="flex flex-col">
                        <span>
                            {moment(row?.managerFirstApprovalDate).format(
                                'DD-MM-YYYY'
                            )}
                        </span>
                        <span>
                            {moment(row?.managerFirstApprovalDate).format(
                                'hh:mm:ss A'
                            )}
                        </span>
                    </div>
                ) : (
                    '-'
                ),
        },
        {
            field: 'managerFirstRemark',
            headerName: 'Manager First Remark',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] capitalize',
            renderCell: (row: MoneybackLogsListResponseType) => (
                <span>{row?.managerFirstRemark || '-'}</span>
            ),
        },
        {
            field: 'ccApprovalDate',
            headerName: 'CC Approval Date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: MoneybackLogsListResponseType) =>
                row?.ccApprovalDate ? (
                    <div className="flex flex-col">
                        <span>
                            {moment(row?.ccApprovalDate).format('DD-MM-YYYY')}
                        </span>
                        <span>
                            {moment(row?.ccApprovalDate).format('hh:mm:ss A')}
                        </span>
                    </div>
                ) : (
                    '-'
                ),
        },
        {
            field: 'ccRemark',
            headerName: 'CC Remark',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] capitalize',
            renderCell: (row: MoneybackLogsListResponseType) => (
                <span>{row?.ccRemark || '-'}</span>
            ),
        },
        {
            field: 'managerSecondApprovalDate',
            headerName: 'Manager Second Approval Date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: MoneybackLogsListResponseType) =>
                row?.managerSecondApprovalDate ? (
                    <div className="flex flex-col">
                        <span>
                            {moment(row?.managerSecondApprovalDate).format(
                                'DD-MM-YYYY'
                            )}
                        </span>
                        <span>
                            {moment(row?.managerSecondApprovalDate).format(
                                'hh:mm:ss A'
                            )}
                        </span>
                    </div>
                ) : (
                    '-'
                ),
        },
        {
            field: 'managerSecondRemark',
            headerName: 'Manager Second Remark',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] capitalize',
            renderCell: (row: MoneybackLogsListResponseType) => (
                <span>{row?.managerSecondRemark || '-'}</span>
            ),
        },
        {
            field: 'accountApprovalDate',
            headerName: 'Account Approval Date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: MoneybackLogsListResponseType) =>
                row?.accountApprovalDate ? (
                    <div className="flex flex-col">
                        <span>
                            {moment(row?.accountApprovalDate).format(
                                'DD-MM-YYYY'
                            )}
                        </span>
                        <span>
                            {moment(row?.accountApprovalDate).format(
                                'hh:mm:ss A'
                            )}
                        </span>
                    </div>
                ) : (
                    '-'
                ),
        },
        {
            field: 'accountRemark',
            headerName: 'Account Remark',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px] capitalize',
            renderCell: (row: MoneybackLogsListResponseType) => (
                <span>{row?.accountRemark || '-'}</span>
            ),
        },
    ]

    return (
        <MoneybackLogsListing
            columns={columns}
            rows={moneybackLogs}
            isTableLoading={apiStatus}
        />
    )
}

export default MoneybackLogsListingWrapper
