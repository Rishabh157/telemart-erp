import React, { useState, useEffect } from 'react'
import { useGetAgentWiseOutCallReportsQuery } from 'src/services/ReportsService'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMDateFilterChip from 'src/components/UI/atoms/ATMDateFilterChip/ATMDateFilterChip'
import { useSearchParams } from 'react-router-dom'
import { format, addMonths, endOfDay, isBefore } from 'date-fns';
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'
import { useGetAllAgentsByCallCenterQuery } from 'src/services/UserServices'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import ATMPDFExportButton from 'src/components/UI/atoms/ATMPDFExport'

const AgentWiseOutCallWrapper = () => {

    const keyName = {
        dateFilterKey: "dateFilterKey",
        startDate: "startDate",
        endDate: "endDate",
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const { userData } = useGetLocalStorage();

    const [dateFilter, setDateFilter] = useState<any>({
        start_date: searchParams.get(keyName.startDate) || format(new Date(), 'yyyy-MM-dd'),
        end_date: searchParams.get(keyName.endDate) || format(new Date(), 'yyyy-MM-dd'),
    })

    const [filters, setFilters] = useState({
        agentId: null,
        callCenterId: null
    })
    const [selectedHeaders, setSelectedHeaders] = useState<string[]>([])

    useEffect(() => {
        // Update search params whenever the date filter state changes
        searchParams.set(keyName.startDate, dateFilter.start_date);
        searchParams.set(keyName.endDate, dateFilter.end_date);
        setSearchParams(searchParams);
    }, [dateFilter, keyName.startDate, keyName.endDate, searchParams, setSearchParams]);

    // API
    const { items, isLoading } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetAgentWiseOutCallReportsQuery({
            dateFilter: {
                startDate: dateFilter.start_date,
                endDate: dateFilter.end_date,
            },
            agentId: filters?.agentId,
            callCenterId: filters?.callCenterId,
        }),
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
            filters?.callCenterId || '',
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
            checked ? [...prev, header] : prev?.filter((h) => h !== header)
        )
    }

    // order column
    const columns: columnTypes[] = [
        {
            field: 'agentName',
            headerName: 'Agent Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs',
            align: 'start',
            checkBox: selectedHeaders?.includes('agentName'),
            renderCell: (row) => {
                return (
                    <div className="py-0 flex flex-col items-start space-y-1">
                        <span className="text-xs font-medium text-gray-800">{row?.agentName}</span>
                    </div>
                );
            },
            onCheckBox: (e: any) =>
                handleHeaderSelection(e?.target?.checked, 'agentName'),
        },
        {
            field: 'firstCallApprovalCount',
            headerName: 'First Call Approval Count',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs',
            renderCell: (row) => {
                return (
                    <div className="py-0 flex flex-col items-start space-y-1">
                        <span className="text-xs font-medium text-gray-800">{row?.firstCallApprovalCount || 0}</span>
                    </div>
                );
            },
            checkBox: selectedHeaders?.includes('firstCallApprovalCount'),
            onCheckBox: (e: any) =>
                handleHeaderSelection(e?.target?.checked, 'firstCallApprovalCount'),
        },
    ]

    const handleStartDateChange = (newDate: any) => {
        if (!newDate) return;

        const maxEndDate = endOfDay(addMonths(newDate, 3));
        const updatedEndDate = isBefore(new Date(dateFilter.end_date), maxEndDate)
            ? dateFilter.end_date
            : format(maxEndDate, 'yyyy-MM-dd');

        setDateFilter({
            start_date: format(newDate, 'yyyy-MM-dd'),
            end_date: updatedEndDate,
        });
    };

    const handleEndDateChange = (newDate: any) => {
        if (!newDate) return;

        const minEndDate = endOfDay(addMonths(new Date(dateFilter.start_date), 3));

        if (isBefore(newDate, minEndDate)) {
            setDateFilter((prev: any) => ({
                ...prev,
                end_date: format(newDate, 'yyyy-MM-dd'),
            }));
        }
    };

    const handleClear = () => {
        setDateFilter({
            start_date: format(new Date(), 'yyyy-MM-dd'),
            end_date: format(new Date(), 'yyyy-MM-dd'),
        });
    };

    return (
        <div className="border border-slate-400 w-auto rounded p-2 h-full flex flex-col">

            <div className="flex gap-x-4 items-center justify-end mb-4 px-6 z-50">
                <ATMDateFilterChip
                    startDate={searchParams.get(keyName?.startDate) || null}
                    endDate={searchParams.get(keyName?.endDate) || null}
                    onSelectStartDate={handleStartDateChange}
                    onSelectEndDate={handleEndDateChange}
                    onClear={handleClear}
                />

                <ATMSelectSearchable
                    name=""
                    componentClass="m-0 w-[181px]"
                    value={filters?.callCenterId as any}
                    onChange={(newValue) =>
                        setFilters({
                            ...filters,
                            callCenterId: newValue ? newValue : null,
                        })
                    }
                    options={callCenterOptions}
                    selectLabel="Select Call Center"
                    label=""
                />

                <ATMSelectSearchable
                    isDisabled={filters?.callCenterId ? false : true}
                    name=""
                    componentClass="m-0 w-[181px]"
                    value={filters?.agentId as any}
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

                {selectedHeaders?.length && items?.length ? (
                    <ATMPDFExportButton
                        tableBody={[
                            selectedHeaders, // First row as the header
                            ...items?.map((row: any) => selectedHeaders?.map((header) =>
                                row[header] !== undefined
                                    ? row[header].toString()
                                    : ''
                            )),
                        ]}
                        columnLength={selectedHeaders?.length}
                        summarizeColumns={['firstCallApprovalCount']?.map((colName) => selectedHeaders?.indexOf(colName))?.filter((idx) => idx !== -1)} // Columns to summarize
                        onClick={() => {
                            setSelectedHeaders([])
                        }}
                    />
                ) : null}
            </div>

            {/* Table */}
            <div className="overflow-auto grow z-10">
                <ATMTable
                    isColumnCheckbox
                    extraClasses=""
                    columns={columns}
                    rows={items || []}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}

export default AgentWiseOutCallWrapper
