/// ==============================================
// Filename:ATMTableHeader.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { BiFilter, BiSearch } from 'react-icons/bi'
import { IoReload } from 'react-icons/io5'

// |-- Internal Dependencies --|
import DateFilterForm from 'src/components/utilsComponent/DateFilterForm'

// |-- Types --|
type Props = {
    rowsPerPage: number
    searchValue?: string
    page: number
    rows: any[]
    rowCount: number
    rowsPerPageOptions?: number[]
    onRowsPerPageChange?: (newValue: number) => void
    isFilter?: boolean
    onFilterClick?: () => void
    onFilterDispatch?: () => void
    onSearch?: (newValue: string) => void
    isRefresh?: boolean
    isDateFilter?: boolean
    onSubmitDateHandler?: (values: any) => void
    IsDaterFilterLoading?: boolean
}

const ATMTableHeader = ({
    isRefresh = false,
    rowCount,
    rows,
    rowsPerPage,
    searchValue,
    page,
    rowsPerPageOptions = [5, 10, 20, 50, 100],
    onRowsPerPageChange = () => {},
    isFilter = false,
    onFilterClick = () => {},
    onFilterDispatch = () => {},
    onSearch = () => {},
    isDateFilter = false,
    IsDaterFilterLoading = false,
    onSubmitDateHandler,
}: Props) => {
    return (
        <div className="p-3 pb-5 border-b border-slate-300 grid grid-cols-3">
            {/* Left */}
            <div className="flex gap-1  col-span-2">
                <div className="border w-fit rounded flex shadow items-center p-1 hover:border-primary-main">
                    <BiSearch className="text-slate-600 text-xl" />
                    <input
                        className="border-none rounded outline-none px-2 w-[200px] placeholder:text-slate-500"
                        value={searchValue}
                        onChange={(e) => {
                            onSearch(e.currentTarget.value)
                        }}
                        placeholder="Search..."
                    />
                </div>

                {isFilter && (
                    <button
                        onClick={() => onFilterClick()}
                        className="bg-white shadow px-2 flex items-center rounded border"
                    >
                        <BiFilter className="text-2xl text-slate-600" />
                    </button>
                )}
                {isRefresh && (
                    <button
                        onClick={() => {
                            window.location.reload()
                            onFilterDispatch()
                            setTimeout(
                                () => (
                                    <div className="w-[100%] h-[100vh] flex justify-center fixed z-10">
                                        <div className="w-[64px] h-[64px] border border-spacing-8 border-cyan-600 rounded animate-spin "></div>
                                    </div>
                                ),
                                1000
                            )
                        }}
                        className="bg-white shadow px-2 flex items-center rounded border"
                    >
                        <IoReload className="text-2xl text-slate-600" />
                    </button>
                )}
                {isDateFilter && (
                    <div className="-mt-1">
                        <DateFilterForm
                            IsDaterFilterLoading={
                                IsDaterFilterLoading as boolean
                            }
                            onSubmitDateHandler={
                                onSubmitDateHandler as (values: any) => void
                            }
                        />
                    </div>
                )}
            </div>

            {/* Right */}
            <div className="flex justify-end col-span-1 -mt-2">
                <div className="flex gap-3 items-center">
                    <div className="text-sm"> Rows per page : </div>
                    <select
                        value={rowsPerPage as number}
                        onChange={(e) =>
                            onRowsPerPageChange(parseInt(e.target.value))
                        }
                        className={`rounded-lg p-1 outline-0 bg-slate-100 text-sm `}
                    >
                        {rowsPerPageOptions?.map((option) => {
                            return (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            )
                        })}
                    </select>

                    <div className="text-sm bg-slate-100 py-1 px-2 rounded-lg text-slate-600">
                        Showing &nbsp; {rowsPerPage * (page - 1) + 1} -{' '}
                        {rowsPerPage * (page - 1) + rows.length} of {rowCount}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ATMTableHeader
