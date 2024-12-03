import React, { useState } from 'react'
import moment from 'moment'
// import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { Chip, Stack } from '@mui/material'
import { useGetAgentWiseProductReportsQuery } from 'src/services/ReportsService'
// import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'

// import {
//     useGetAllAgentsByCallCenterQuery,
//     useGetFloorMangerUserByCallCenterIdQuery,
//     useGetTeamLeadUserByCallCenterIdQuery,
// } from 'src/services/UserServices'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
// import { GetHierarchByDeptProps } from 'src/utils/GetHierarchyByDept'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import AgentWiseSchemeFormDialogWrapper,
{ FormInitialValuesFilterWithLabel } from './Filters/AgentWiseSchemeFormDialogWrapper'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'

const AgentWiseSchemeWrapper = () => {

    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] = useState<boolean>(false)
    const listingPaginationState: any = useSelector((state: RootState) => state.listingPagination)
    const { page, rowsPerPage, totalItems, searchValue } = listingPaginationState
    const dispatch = useDispatch<AppDispatch>()

    // const [filters, setFilters] = useState<any>({
    //     start_date: `${moment().format('YYYY-MM-DD')}`,
    //     end_date: `${moment().format('YYYY-MM-DD')}`,
    //     callCenterId: '',
    //     agentId: null,
    //     floorManagerId: null,
    //     userDepartment: null,
    //     teamLeadId: null,
    // })

    const [filters, setFilters] = React.useState<FormInitialValuesFilterWithLabel>({
        startDate: { fieldName: '', label: '', value: '' },
        endDate: { fieldName: '', label: '', value: '' },
        callCenterId: { fieldName: '', label: '', value: '' },
        agentId: { fieldName: '', label: '', value: '' },
        floorManagerId: { fieldName: '', label: '', value: '' },
        userDepartment: { fieldName: '', label: '', value: '' },
        teamLeadId: { fieldName: '', label: '', value: '' },
    })

    const { items, isLoading } = useGetCustomListingData<any>({
        useEndPointHook: useGetAgentWiseProductReportsQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['orderNumber', 'agentName'],
            page: page,
            filterBy: [
                { fieldName: 'callCenterId', value: filters?.callCenterId?.value || null },
                { fieldName: 'agentId', value: filters?.agentId?.value || null },
                { fieldName: 'agentFloorManagerId', value: filters?.floorManagerId?.value || null },
                // { fieldName: 'userDepartment', value: filters?.userDepartment?.value || null },
                { fieldName: 'agentTeamLeadId', value: filters?.teamLeadId?.value || null },
            ],
            dateFilter: {
                startDate: filters.startDate.value
                    ? moment(filters.startDate.value).format('YYYY-MM-DD')
                    : '',
                endDate: filters.endDate.value
                    ? moment(filters.endDate.value).format('YYYY-MM-DD')
                    : filters.endDate.value ? moment().format('YYYY-MM-DD') : '',
            },
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }, {
            skip: !(filters?.startDate?.value && filters?.endDate?.value),
        }),
    })

    // const { options: florManagerOptionList } = useCustomOptions({
    //     useEndPointHook: useGetFloorMangerUserByCallCenterIdQuery(
    //         {
    //             // companyId: userData?.companyId as string,
    //             callCenterId: filters?.callCenterId as any,
    //             departmentId: filters?.userDepartment as any,
    //         },
    //         {
    //             skip: !filters?.userDepartment || !filters?.callCenterId, // Skip the query if isAgent is false or callCenterId is not available
    //         }
    //     ),
    //     keyName: 'userName',
    //     value: '_id',
    // })
    // const { options: teamLeadOptionList } = useCustomOptions({
    //     useEndPointHook: useGetTeamLeadUserByCallCenterIdQuery(
    //         {
    //             // companyId: userData?.companyId as string,
    //             callCenterId: filters?.callCenterId as any,
    //             departmentId: filters?.userDepartment as any,
    //         },
    //         {
    //             skip: !filters?.isAgent || !filters?.callCenterId, // Skip the query if isAgent is false or callCenterId is not available
    //         }
    //     ),
    //     keyName: 'userName',
    //     value: '_id',
    // })

    // order column
    const columns: columnTypes[] = [
        {
            field: 'agentName',
            headerName: 'Agent Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            align: 'start'
        },
        {
            field: 'agentFloorManagerName',
            headerName: 'Floor Manager',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
        },
        {
            field: 'agentTeamLeadName',
            headerName: 'Sales Center Manager',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
        },
        {
            field: 'callCenterLabel',
            headerName: 'Call Center',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
        },
        {
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
        },
        {
            field: 'freshOrders',
            headerName: 'Fresh',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row) => {
                const { freshOrders, freshPercent } = row;
                return (
                    <div className="py-0 flex flex-col items-start space-y-1">
                        <span className="text-sm font-medium text-gray-800">{freshOrders}</span>
                        <span className="text-xs text-gray-500">({freshPercent}%)</span>
                    </div>
                );
            },
        },
        {
            field: 'deliveredOrders',
            headerName: 'Delivered',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row) => {
                const { deliveredOrders, deliveredPercent } = row;
                return (
                    <div className="py-0 flex flex-col items-start space-y-1">
                        <span className="text-sm font-medium text-gray-800">{deliveredOrders}</span>
                        <span className="text-xs text-gray-500">({deliveredPercent}%)</span>
                    </div>
                );
            },
        },
        {
            field: 'cancelledOrders',
            headerName: 'Cancelled',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row) => {
                const { cancelledOrders, cancelledPercent } = row;
                return (
                    <div className="py-0 flex flex-col items-start space-y-1">
                        <span className="text-sm font-medium text-gray-800">{cancelledOrders}</span>
                        <span className="text-xs text-gray-500">({cancelledPercent}%)</span>
                    </div>
                );
            },
        },
        {
            field: 'urgentOrders',
            headerName: 'Urgent',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row) => {
                const { urgentOrders, urgentPercent } = row;
                return (
                    <div className="py-0 flex flex-col items-start space-y-1">
                        <span className="text-sm font-medium text-gray-800">{urgentOrders}</span>
                        <span className="text-xs text-gray-500">({urgentPercent}%)</span>
                    </div>
                );
            },
        },
        {
            field: 'holdOrders',
            headerName: 'Hold',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row) => {
                const { holdOrders, holdPercent } = row;
                return (
                    <div className="py-0 flex flex-col items-start space-y-1">
                        <span className="text-sm font-medium text-gray-800">{holdOrders}</span>
                        <span className="text-xs text-gray-500">({holdPercent}%)</span>
                    </div>
                );
            },
        },
        {
            field: 'unaOrders',
            headerName: 'UNA',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row) => {
                const { unaOrders, unaPercent } = row;
                return (
                    <div className="py-0 flex flex-col items-start space-y-1">
                        <span className="text-sm font-medium text-gray-800">{unaOrders}</span>
                        <span className="text-xs text-gray-500">({unaPercent}%)</span>
                    </div>
                );
            },
        },
        {
            field: 'freshOrders',
            headerName: 'Fresh',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row) => {
                const { freshOrders, freshPercent } = row;
                return (
                    <div className="py-0 flex flex-col items-start space-y-1">
                        <span className="text-sm font-medium text-gray-800">{freshOrders}</span>
                        <span className="text-xs text-gray-500">({freshPercent}%)</span>
                    </div>
                );
            },
        },
        {
            field: 'intransitOrders',
            headerName: 'In Transit',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row) => {
                const { intransitOrders, intransitPercent } = row;
                return (
                    <div className="py-0 flex flex-col items-start space-y-1">
                        <span className="text-sm font-medium text-gray-800">{intransitOrders}</span>
                        <span className="text-xs text-gray-500">({intransitPercent}%)</span>
                    </div>
                );
            },
        },
        {
            field: 'doorCancelled',
            headerName: 'Door Cancelled',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row) => {
                const { doorCancelled, doorCancelledPercent } = row;
                return (
                    <div className="py-0 flex flex-col items-start space-y-1">
                        <span className="text-sm font-medium text-gray-800">{doorCancelled}</span>
                        <span className="text-xs text-gray-500">({doorCancelledPercent}%)</span>
                    </div>
                );
            },
        },
        {
            field: 'totalOrders',
            headerName: 'Total',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row) => {
                const { totalOrders } = row;
                return (
                    <div className="py-0 flex flex-col items-start space-y-1">
                        <span className="text-sm font-medium text-gray-800">{totalOrders}</span>
                    </div>
                );
            },
        },
    ]

    const handleReset = () => {
        setFilters((prev) => ({
            ...prev,
            startDate: { fieldName: '', value: '', label: '' },
            endDate: { fieldName: '', value: '', label: '' },
            callCenterId: { fieldName: '', value: '', label: '' },
            agentId: { fieldName: '', value: '', label: '' },
            floorManagerId: { fieldName: '', value: '', label: '' },
            userDepartment: { fieldName: '', value: '', label: '' },
            teamLeadId: { fieldName: '', value: '', label: '' },
        }))
    }

    // showing the applied filter
    const filterShow = (filter: FormInitialValuesFilterWithLabel) => {
        return (
            <span className="capitalize">
                <Stack direction="row" spacing={1}>
                    {Object.entries(filter).map(([key, value], index) => {
                        return value.value ? (
                            <Chip
                                key={index}
                                label={`${value.fieldName}: ${value.label}`}
                                color="primary"
                                variant="outlined"
                                size="small"
                            />
                        ) : null
                    })}
                </Stack>
            </span>
        )
    }

    return (
        <div className="border border-slate-400 rounded p-2 h-full flex flex-col">
            <div className="flex gap-2 items-center justify-end z-50">
                {/* <ATMSelectSearchable
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
                /> */}
                {/* <ATMSelectSearchable
                    name=""
                    componentClass="m-0"
                    value={filters?.userDepartment}
                    onChange={(newValue) =>
                        setFilters({
                            ...filters,
                            userDepartment: newValue,
                        })
                    }
                    options={departmentoption}
                    selectLabel="Select Department"
                    label=""
                /> */}

                {/* <ATMSelectSearchable
                    // isDisabled={filters?.callCenterId ? false : true}
                    name=""
                    componentClass="m-0"
                    value={filters?.floorManagerId}
                    onChange={(newValue) =>
                        setFilters({
                            ...filters,
                            floorManagerId: newValue ? newValue : null,
                        })
                    }
                    options={florManagerOptionList}
                    selectLabel="Select Floor Manager"
                    label=""
                />
                <ATMSelectSearchable
                    // isDisabled={filters?.teamLeadId ? false : true}
                    name=""
                    componentClass="m-0"
                    value={filters?.teamLeadId}
                    onChange={(newValue) =>
                        setFilters({
                            ...filters,
                            teamLeadId: newValue ? newValue : null,
                        })
                    }
                    options={teamLeadOptionList}
                    selectLabel="Select team lead"
                    label=""
                />
                <ATMSelectSearchable
                    // isDisabled={filters?.callCenterId ? false : true}
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
                /> */}

                {/* <ATMDatePicker
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
                /> */}

                {/* <ATMDatePicker
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
                /> */}

                {/* {(filters.start_date || filters.end_date) && (
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
                )} */}
            </div>

            <div className="relative flex-1 h-0 z-10">
                <div className="h-full mt-4">
                    <ATMTableHeader
                        page={page}
                        searchValue={searchValue}
                        rowCount={totalItems}
                        rowsPerPage={rowsPerPage}
                        rows={items}
                        onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
                        onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                        isFilter
                        onFilterClick={() => setIsOpenFilterFormDialog(true)}
                        isFilterRemover
                        onFilterRemoverClick={handleReset}
                        filterShow={filterShow(filters)}
                    />

                    {isOpenFilterFormDialog && (
                        <AgentWiseSchemeFormDialogWrapper
                            open
                            onClose={() => setIsOpenFilterFormDialog(false)}
                            setFilter={setFilters}
                            filter={filters}
                        />
                    )}

                    {/* Table */}
                    <div className="overflow-auto grow">
                        <ATMTable
                            extraClasses=""
                            columns={columns}
                            rows={items || []}
                            isLoading={isLoading}
                        />
                    </div>

                    {/* Pagination */}
                    <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                        <ATMPagination
                            page={page}
                            rowCount={totalItems}
                            rows={items}
                            rowsPerPage={rowsPerPage}
                            onPageChange={(newPage) => dispatch(setPage(newPage))}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgentWiseSchemeWrapper
