import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/media/channelCategorySlice'

import { AppDispatch, RootState } from 'src/redux/store'

type Props = {
    columns: any[]
    rows: any[]
    isHeader?: boolean
    setShowDropdown?: React.Dispatch<React.SetStateAction<boolean>>
}

const ChannelCategoryListing = ({
    columns,
    rows,
    setShowDropdown,
    isHeader = true,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const channelCategoryState: any = useSelector(
        (state: RootState) => state.channelGroup
    )
    const [selectedRows, setSelectedRows] = useState([])
    const { page, rowsPerPage, totalItems } = channelCategoryState
    const navigate = useNavigate()
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Media',
            path: '/dashboard',
        },
        {
            label: 'Channel Category',
        },
    ]

    return (
        <div className="px-4 h-full overflow-auto pt-3 ">
            {isHeader && (
                <div className="h-[30px]">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>
            )}
            {/* Page Header */}
            {isHeader && (
                <div className="flex justify-between items-center h-[45px]">
                    <ATMPageHeading> Channel Category</ATMPageHeading>
                    <button
                        type="button"
                        onClick={() => navigate('add')}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + Add Channel Category
                    </button>
                </div>
            )}

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
                {/*Table Header */}
                {isHeader && (
                    <ATMTableHeader
                        page={page}
                        rowCount={totalItems}
                        rowsPerPage={rowsPerPage}
                        rows={rows}
                        onSearch={(searchvalue) =>
                            dispatch(setSearchValue(searchvalue))
                        }
                        onRowsPerPageChange={(newValue) =>
                            dispatch(setRowsPerPage(newValue))
                        }
                        isFilter
                    />
                )}

                {/* Table */}
                <div className="grow overflow-auto  ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        setShowDropdown={setShowDropdown}
                        extraClasses="h-full overflow-auto"
                    />
                </div>

                {/* Pagination */}

                <div className="h-[90px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChannelCategoryListing
