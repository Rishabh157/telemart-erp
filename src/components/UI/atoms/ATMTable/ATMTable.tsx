import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface columnTypes {
    field: string;
    headerName: string;
    flex?: string;
    renderCell?: (row: any) => string | React.ReactNode;
    align?: 'start' | 'center' | 'end';

}

const idKey = '_id'
interface ATMTablePropTypes<T> {
    columns: columnTypes[];
    rows: T[];
    isCheckbox?: boolean;
    selectedRows?: T[];
    onRowSelect?: (row: any) => void;
    extraClasses?: string;
    onRowClick?: (row: any) => void;
    rowExtraClasses?: (row: any) => void;
    isLoading?: boolean;
}

const ATMTable = <T extends {}>({
    columns,
    rows,
    selectedRows = [],
    onRowSelect,
    isCheckbox = false,
    extraClasses = '',
    onRowClick,
    rowExtraClasses,
    isLoading = false,

}: ATMTablePropTypes<T>
) => {

    return (
        <div className={twMerge(`w-full relative flex flex-col gap-2  ${extraClasses}`)} >

            {/* Columns */}
            <div className='flex items-center rounded bg-white py-3 px-2 shadow-md sticky top-0' >

                {/* Checkbox */}
                {
                    rows.length && isCheckbox ?
                        <div className={` w-[20px]`} >
                            <input
                                type='checkbox'
                                className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 '
                                checked={selectedRows.length === rows.length}
                                onChange={(e) => { e.stopPropagation(); selectedRows.length === rows.length ? onRowSelect && onRowSelect([]) : onRowSelect && onRowSelect(rows) }}

                            />
                        </div>
                        :
                        null
                }

                {
                    columns.map((column, index) => {

                        return (
                            <div key={column.field} className={`${column.flex} text-sm text-slate-400 px-2 flex justify-${column.align || 'start'}`} >
                                {column.headerName}
                            </div>
                        )
                    })
                }
            </div>

            {
                isLoading ?
                    (
                        Array(10).fill(0).map((_, index) => {
                            return (
                                <div key={index} className='animate-pulse bg-slate-200 h-[50px] rounded' ></div>
                            )
                        })
                    )
                    :
                    (

                        rows.length ?
                            (
                                rows.map((row: any) => (

                                    <div
                                        onClick={() => onRowClick && onRowClick(row)}
                                        key={row[idKey]}
                                        className={`flex items-center rounded  py-3 px-2  hover:shadow-lg bg-white shadow-md ${onRowClick && 'cursor-pointer'} ${rowExtraClasses && rowExtraClasses(row)} `} >

                                        {/* Checkbox */}
                                        {
                                            isCheckbox ?
                                                <div className={`w-[20px]`} >
                                                    <input
                                                        type='checkbox'
                                                        checked={selectedRows.findIndex((ele: any) => ele._id === row._id) !== -1}
                                                        onChange={(e) => { e.stopPropagation(); onRowSelect && onRowSelect((selectedRows: any) => selectedRows.findIndex((ele: any) => ele._id === row._id) === -1 ? [...selectedRows, row] : selectedRows.filter((selectedRow: any) => selectedRow._id !== row._id)) }}
                                                        className=' w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300'
                                                    />
                                                </div>
                                                :
                                                null
                                        }

                                        {
                                            columns.map((column, index) => {

                                                return (
                                                    <div key={column.field} className={`${column.flex} text-sm text-slate-400 px-2 flex justify-${column.align || 'start'}`} >
                                                        {

                                                            column.renderCell ? column.renderCell(row)
                                                                :
                                                                row[column.field]
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ))
                            )
                            :
                            (
                                <div className='w-full flex justify-center text-slate-500' >
                                    No Data Found
                                </div>
                            )
                    )
            }
        </div>
    )
}

export default ATMTable