/// ==============================================
// Filename:OutwardWarehouseTabs.tsx
// Type: List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
// import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
} from 'src/redux/slices/warehouseOutwardSlice/outwardRequestDealerSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
}

const OutwardWarehouseTabs = ({ columns, rows }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const outwardRequestState: any = useSelector(
        (state: RootState) => state.outwardRequest
    )
    const [selectedRows, setSelectedRows] = useState([])
    // const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    const { page, rowsPerPage, isTableLoading } = outwardRequestState

    return (
        // <div className="px-4 h-full flex flex-col gap-2 w-full">
        <div className=" h-[calc(100vh-160px)]  bg-white ">
            {/* Page Header */}
            {/* <div className="flex justify-between items-center ">
                <ATMPageHeading> Outward Requests </ATMPageHeading>
                <button className="bg-primary-main text-white rounded p px-3">
                    + Assign Courier
                </button>
            </div> */}

            {/* Tabs */}
            {/* <div className="h-[40px] border flex gap-2 items-center   shadow rounded ">
                {/* <TabScrollable tabs={tabs} />
                 */}
            {/*  <TabScrollable
                    tabs={tabs}
                    // setActiveTabHandle={setActiveTabHandle}
                    active={activeTab}
                />
            </div> */}

            {/* <div className="flex shadow rounded items-center gap-3 bg-white w-full overflow-auto px-3 ">
                {tabs.map((tab, tabIndex) => {
                    const { label } = tab
                    return (
                        <button
                            type="button"
                            onClick={() => setActiveTab(label)}
                            key={tabIndex}
                            className={`flex items-center gap-2 px-4 h-[calc(100%-14px)] rounded transition-all duration-500 ${
                                activeTab === label
                                    ? 'bg-slate-100 text-primary-main '
                                    : 'text-slate-500'
                            }`}
                        >
                            <div>
                                {' '}
                                <tab.icon className="text-xl" />{' '}
                            </div>
                            <div className="font-medium"> {label} </div>
                        </button>
                    )
                })}
            </div> */}

            <div className="border flex flex-col h-[calc(100%)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    rowCount={rows.length}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    // isFilter
                    // onFilterClick={() => setIsFilterOpen(true)}
                />

                {/* Table */}
                <div className="grow overflow-auto  ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        // isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        extraClasses="max-h-[calc(100%-150px)] overflow-auto"
                        isLoading={isTableLoading}
                    />
                </div>

                {/* Pagination */}
                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={rows.length}
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default OutwardWarehouseTabs
