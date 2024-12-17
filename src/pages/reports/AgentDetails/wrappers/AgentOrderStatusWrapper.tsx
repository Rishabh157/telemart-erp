import { useState } from 'react'
import moment from 'moment'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import { useGetAgentOrderStatusReportsQuery } from 'src/services/ReportsService'
import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'
import { useGetAllAgentsByCallCenterQuery } from 'src/services/UserServices'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMPDFExportButton from 'src/components/UI/atoms/ATMPDFExport'
import { ATMFullScreenLoader } from 'src/components/UI/atoms/ATMDisplay/ATMLoader'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

const AgentOrderStatusWrapper = () => {
    const [filters, setFilters] = useState<any>({
        start_date: `${moment().format('YYYY-MM-DD')}`,
        end_date: `${moment().format('YYYY-MM-DD')}`,
        callCenterId: '',
        agentId: null,
    })

    // State to track selected headers
    const [selectedHeaders, setSelectedHeaders] = useState<string[]>([])

    const { userData } = useGetLocalStorage()

    const { items, isFetching } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetAgentOrderStatusReportsQuery(
            {
                callCenterId: filters?.callCenterId,
                agentId: filters?.agentId,
                dateFilter: {
                    startDate: filters.start_date
                        ? moment(filters?.start_date).format('YYYY-MM-DD')
                        : '',
                    endDate: filters.end_date
                        ? moment(filters?.end_date).format('YYYY-MM-DD')
                        : filters.end_date
                            ? moment().format('YYYY-MM-DD')
                            : '',
                },
            },
            {
                skip: !(
                    filters.callCenterId &&
                    filters.start_date &&
                    filters.end_date
                ),
            }
        ),
    })

    // get call centers
    const { options: callCenterOptions } = useCustomOptions({
        useEndPointHook: useGetAllCallCenterMasterQuery(userData?.companyId, {
            skip: !userData?.companyId,
        }),
        keyName: 'callCenterName',
        value: '_id',
    })

    // get agents by call center id
    const { options: agentsOptions } = useCustomOptions({
        useEndPointHook: useGetAllAgentsByCallCenterQuery(
            filters?.callCenterId,
            {
                skip: !filters?.callCenterId,
            }
        ),
        keyName: 'userName',
        value: '_id',
    })

    // Handle header selection
    const handleHeaderSelection = (checked: boolean, header: string) => {
        setSelectedHeaders((prev) =>
            checked ? [...prev, header] : prev.filter((h) => h !== header)
        )
    }

    // order column
    const columns: columnTypes[] = [
        {
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            checkBox: selectedHeaders?.includes('schemeName'),
            onCheckBox: (e: any) =>
                handleHeaderSelection(e?.target?.checked, 'schemeName'),
        },
        {
            field: 'userName',
            headerName: 'User',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            checkBox: selectedHeaders?.includes('userName'),
            onCheckBox: (e: any) =>
                handleHeaderSelection(e?.target?.checked, 'userName'),
        },
        {
            field: 'FRESH',
            headerName: 'Fresh',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            checkBox: selectedHeaders?.includes('FRESH'),
            onCheckBox: (e: any) =>
                handleHeaderSelection(e?.target?.checked, 'FRESH'),
        },
        {
            field: 'PREPAID',
            headerName: 'Prepaid',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            checkBox: selectedHeaders?.includes('PREPAID'),
            onCheckBox: (e: any) =>
                handleHeaderSelection(e?.target?.checked, 'PREPAID'),
        },
        {
            field: 'DELIVERED',
            headerName: 'Delivered',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            checkBox: selectedHeaders?.includes('DELIVERED'),
            onCheckBox: (e: any) =>
                handleHeaderSelection(e?.target?.checked, 'DELIVERED'),
        },
        {
            field: 'HOLD',
            headerName: 'Hold',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            checkBox: selectedHeaders?.includes('HOLD'),
            onCheckBox: (e: any) =>
                handleHeaderSelection(e?.target?.checked, 'HOLD'),
        },
        {
            field: 'URGENT',
            headerName: 'Urgent',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            checkBox: selectedHeaders?.includes('URGENT'),
            onCheckBox: (e: any) =>
                handleHeaderSelection(e?.target?.checked, 'URGENT'),
        },
        {
            field: 'INTRANSIT',
            headerName: 'In Transit',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            checkBox: selectedHeaders?.includes('INTRANSIT'),
            onCheckBox: (e: any) =>
                handleHeaderSelection(e?.target?.checked, 'INTRANSIT'),
        },
        {
            field: 'TOTAL',
            headerName: 'Total',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            checkBox: selectedHeaders?.includes('TOTAL'),
            onCheckBox: (e: any) =>
                handleHeaderSelection(e?.target?.checked, 'TOTAL'),
        },
    ]


    return (
        <div className="border border-slate-400 rounded p-2 h-full flex flex-col">
            {isFetching && <ATMFullScreenLoader />}

            <div className="flex gap-2 items-center justify-end z-50">
                <ATMSelectSearchable
                    name=""
                    componentClass="m-0"
                    value={filters?.callCenterId}
                    onChange={(newValue) =>
                        setFilters({
                            ...filters,
                            callCenterId: newValue,
                        })
                    }
                    options={callCenterOptions}
                    selectLabel="Select Call Center"
                    label=""
                />

                <ATMSelectSearchable
                    isDisabled={filters?.callCenterId ? false : true}
                    name=""
                    componentClass="m-0"
                    value={filters?.agentId}
                    onChange={(newValue) =>
                        setFilters({
                            ...filters,
                            agentId: newValue ? newValue : null,
                        })
                    }
                    options={agentsOptions}
                    selectLabel="Select Agent"
                    label=""
                />

                <ATMDatePicker
                    name=""
                    value={filters.start_date}
                    onChange={(value) => {
                        const endDate = moment(value)
                            .add(3, 'months')
                            .endOf('day')
                        const threeMonthsLater = moment()
                            .add(3, 'months')
                            .endOf('day')

                        // Check if the selected start date is less than 3 months from the current date
                        if (moment(value).isBefore(threeMonthsLater)) {
                            // If yes, set the end date to 3 months from the selected start date
                            setFilters({
                                ...filters,
                                start_date: value,
                                end_date: endDate.isBefore(threeMonthsLater)
                                    ? endDate
                                    : threeMonthsLater,
                            })
                        } else {
                            // Otherwise, keep the end date unchanged
                            setFilters({
                                ...filters,
                                start_date: value,
                            })
                        }
                    }}
                    label=""
                    dateTimeFormat="DD/MM/YYYY"
                />

                <ATMDatePicker
                    name=""
                    value={filters.end_date}
                    onChange={(value) => {
                        setFilters({
                            ...filters,
                            end_date: value,
                        })
                    }}
                    label=""
                    dateTimeFormat="DD/MM/YYYY"
                    minDate={filters.start_date}
                    maxDate={moment(filters.start_date)
                        .add(3, 'months')
                        .endOf('day')}
                />

                {(filters.start_date || filters.end_date) && (
                    <button
                        type="button"
                        className="rounded bg-primary-main text-white text-sm py-1 px-2"
                        onClick={() => {
                            setFilters({
                                start_date: moment(new Date()).format(
                                    'YYYY-MM-DD'
                                ),
                                end_date: moment(new Date()).format(
                                    'YYYY-MM-DD'
                                ),
                            })
                        }}
                    >
                        Clear
                    </button>
                )}

                {selectedHeaders?.length && items?.detailedData?.length ? (
                    <ATMPDFExportButton
                        tableBody={[
                            selectedHeaders, // First row as the header
                            ...items?.detailedData?.map((row: any) =>
                                selectedHeaders?.map((header) =>
                                    row[header] !== undefined
                                        ? row[header].toString()
                                        : ''
                                )
                            ),
                        ]}
                        columnLength={selectedHeaders?.length}
                        summarizeColumns={[
                            'FRESH',
                            'PREPAID',
                            'DELIVERED',
                            'HOLD',
                            'URGENT',
                            'INTRANSIT',
                        ]?.map((colName) => selectedHeaders?.indexOf(colName))?.filter((idx) => idx !== -1)} // Columns to summarize
                        onClick={() => {
                            setSelectedHeaders([])
                        }}
                    />
                ) : null}
            </div>

            <div className="relative flex-1 h-0 z-10">
                <div className="h-full mt-4">
                    <div className="overflow-auto grow">
                        <ATMTable
                            isColumnCheckbox
                            extraClasses=""
                            columns={columns}
                            rows={items?.detailedData || []}
                            isLoading={isFetching}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgentOrderStatusWrapper
