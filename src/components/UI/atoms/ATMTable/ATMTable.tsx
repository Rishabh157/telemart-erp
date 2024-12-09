/// ==============================================
// Filename:ATMTable.tsx
// Type: UI Component
// Last Updated: OCTOBER 25, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'
import AccessDenied from 'src/AccessDenied'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

// |-- External Dependencies --|
import { twMerge } from 'tailwind-merge'
// import { MdDelete } from "react-icons/md";
// import { MdModeEditOutline } from "react-icons/md";
// import { FaRegEye } from 'react-icons/fa'

export interface columnTypes {
    field: string
    headerName: string
    flex?: string
    renderCell?: (row: any) => string | React.ReactNode
    align?: 'start' | 'center' | 'end'
    extraClasses?: string
    name?: string
    hidden?: boolean
    checkBox?: boolean
    onCheckBox?: (e: any) => void
}

const idKey = '_id'
interface ATMTablePropTypes<T> {
    columns: columnTypes[]
    rows: T[]
    isCheckbox?: boolean
    selectedRows?: T[]
    onRowSelect?: (row: any) => void
    extraClasses?: string
    onRowClick?: (row: any) => void
    rowExtraClasses?: (row: any) => void
    isLoading?: boolean
    setShowDropdown?: React.Dispatch<React.SetStateAction<boolean>>
    onClick?: (event: any) => void
    headerClassName?: string
    headerExtraClassName?: string
    rowClassName?: string
    noDataFoundText?: string
    noDataFoundClass?: string
    onView?: (item: T) => void
    onEdit?: (item: T) => void
    onDelete?: (item: T) => void
    isColumnCheckbox?: boolean
    onCheckBox?: (e: any) => void
}

const NOT_DATA_FOUND = 'No Data Found'
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
    setShowDropdown,
    headerClassName = ' py-1 px-2',
    headerExtraClassName,
    rowClassName = 'px-2 bg-white py-2',
    noDataFoundText = `${NOT_DATA_FOUND}`,
    noDataFoundClass = 'text-slate-500',
    isColumnCheckbox = false,
    onView,
    onEdit,
    onDelete,
}: ATMTablePropTypes<T>) => {
    // console.log('onEdit: ', onEdit);
    const tabsRender = columns?.some((nav) => {
        if (nav.field === 'action') {
            return false
        }
        return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
    })

    if (!tabsRender) {
        return <AccessDenied />
    }

    return (
        <div
            onClick={() => {
                setShowDropdown && setShowDropdown(false)
            }}
            className={twMerge(
                `min-w-fit relative flex flex-col h-full ${extraClasses}`
            )}
        >
            {/* Columns */}
            <div
                className={twMerge(
                    `flex items-center border-b sticky top-0 border-slate-300 bg-slate-50 z-[1000]`,
                    `${headerClassName}`
                )}
            >
                {/* Checkbox */}
                {rows.length && isCheckbox ? (
                    <div className={`w-[20px]`}>
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 "
                            checked={selectedRows.length === rows.length}
                            onChange={(e) => {
                                e.stopPropagation()
                                selectedRows.length === rows.length
                                    ? onRowSelect && onRowSelect([])
                                    : onRowSelect && onRowSelect(rows)
                            }}
                        />
                    </div>
                ) : null}

                {columns
                    ?.filter((nav) => {
                        return isAuthorized(
                            nav?.name as keyof typeof UserModuleNameTypes
                        )
                    })
                    ?.map((column, index) => {
                        if (column?.hidden) {
                            return null
                        } else {
                            return (
                                <>
                                    {/* {isColumnCheckbox ? (
                                        <div
                                            key={
                                                'checkbox' + column?.headerName
                                            }
                                            className={`w-[20px]`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <input
                                                type="checkbox"
                                                // name=''
                                                checked={column?.checkBox}
                                                onChange={(e: any) => {
                                                    e?.stopPropagation()
                                                    column?.onCheckBox &&
                                                        column?.onCheckBox(e)
                                                }}
                                                className=" w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            />
                                        </div>
                                    ) : null} */}

                                    {isColumnCheckbox ? (
                                        <div
                                            key={'checkbox' + column?.headerName}
                                            className={`w-[20px]`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={column?.checkBox}
                                                onChange={(e: any) => {
                                                    e?.stopPropagation()
                                                    column?.onCheckBox &&
                                                        column?.onCheckBox(e)
                                                }}
                                                className=" w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            />
                                        </div>
                                    ) : null}

                                    <div
                                        key={column.field + index}
                                        className={twMerge(
                                            `flex ${column.flex} justify-${column.align || 'start'
                                            } text-xs text-black font-semibold px-2 ${column.extraClasses
                                            }`,
                                            headerExtraClassName
                                        )}
                                    >
                                        {column.headerName}
                                    </div>
                                </>
                            )
                        }
                    })}
            </div>

            {isLoading ? (
                Array(10)
                    .fill(0)
                    .map((_, index) => {
                        return (
                            <div
                                key={index}
                                className="animate-pulse h-[50px] p-2"
                            >
                                <div className="bg-slate-200 h-full rounded">
                                    {' '}
                                </div>
                            </div>
                        )
                    })
            ) : rows.length ? (
                rows?.map((row: any, rowIndex) => (
                    <div
                        onClick={() => onRowClick && onRowClick(row)}
                        key={row[idKey] || rowIndex}
                        className={`flex items-center font-semibold text-grey-800 group group/action  ${rowClassName}  ${onRowClick && 'cursor-pointer'
                            }  ${rowExtraClasses && rowExtraClasses(row)}  ${rowIndex !== rows.length - 1 &&
                            'border-b border-slate-300'
                            } `}
                    >
                        {/* Checkbox */}
                        {isCheckbox ? (
                            <div
                                key={'checkbox' + row[idKey] || rowIndex}
                                className={`w-[20px]`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <input
                                    type="checkbox"
                                    checked={
                                        selectedRows.findIndex(
                                            (ele: any) => ele._id === row._id
                                        ) !== -1
                                    }
                                    onChange={(e) => {
                                        e.stopPropagation()
                                        onRowSelect &&
                                            onRowSelect((selectedRows: any) =>
                                                selectedRows.findIndex(
                                                    (ele: any) =>
                                                        ele._id === row._id
                                                ) === -1
                                                    ? [...selectedRows, row]
                                                    : selectedRows.filter(
                                                        (selectedRow: any) =>
                                                            selectedRow._id !==
                                                            row._id
                                                    )
                                            )
                                    }}
                                    className=" w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        ) : null}

                        {/* {!isLoading && (
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className={`min-w-[85px] md:invisible md:group-hover/action:visible transition-all duration-75`}>
                                <div className="flex items-center h-full gap-2">
                                    {onDelete !== undefined && (
                                        <button
                                            type="button"
                                            onClick={() => onDelete?.(row)}
                                            className="p-1.5 rounded-full text-primary-30 bg-primary-90 border hover:border-primary-main">
                                            <MdDelete className="size-[0.75rem]" />
                                        </button>
                                    )}
                                    {onEdit !== undefined && (
                                        <button
                                            type="button"
                                            onClick={() => onEdit?.(row)}
                                            className="p-1.5 rounded-full text-primary-30 bg-primary-90 border hover:border-primary-main">
                                            <MdModeEditOutline className="size-[0.75rem]" />
                                        </button>
                                    )}
                                    {onView !== undefined && (
                                        <button
                                            type="button"
                                            onClick={() => onView?.(row)}
                                            className="p-1.5 rounded-full text-primary-30 bg-primary-90 border hover:border-primary-main">
                                            <FaRegEye className="size-[0.75rem]" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        )} */}

                        {columns
                            ?.filter((nav) => {
                                return isAuthorized(
                                    nav?.name as keyof typeof UserModuleNameTypes
                                )
                            })
                            ?.map((column, index) => {
                                if (column.hidden) {
                                    return null
                                } else {
                                    return (
                                        <div
                                            key={column.field + index}
                                            className={`${column.flex
                                                } text-xs text-slate-600 px-2 flex justify-${column.align || 'start'
                                                } ${column.extraClasses}`}
                                        >
                                            {column.renderCell
                                                ? column.renderCell(row)
                                                : row[column.field]}
                                        </div>
                                    )
                                }
                            })}
                    </div>
                ))
            ) : (
                <div
                    className={`w-full flex justify-center items-center h-[60vh] font-semibold ${noDataFoundClass}`}
                >
                    {noDataFoundText}
                </div>
            )}
        </div>
    )
}

export default ATMTable
