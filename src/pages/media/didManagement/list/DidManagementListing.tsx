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
    setRowsPerPage,
    setPage,
} from 'src/redux/slices/media/didManagementSlice'
import { AppDispatch, RootState } from 'src/redux/store'

type Props = {
    columns: any[]
    rows: any[]
}

const DidManagementListing = ({ columns, rows }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const didManagementState: any = useSelector(
        (state: RootState) => state.didManagement
    )
    const [selectedRows, setSelectedRows] = useState([])
    const { page, rowsPerPage, totalItems } = didManagementState
    const navigate = useNavigate()
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Media',
            path: '/dashboard',
        },
        {
            label: 'did',
        },
    ]

    return (
        <div className="px-4 h-[calc(100vh-55px)] pt-3 ">
            <div className="h-[30px]">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>
            {/* Page Header */}
            <div className="flex justify-between items-center h-[55px]">
                <ATMPageHeading> DID Management </ATMPageHeading>
                <button
                    type="button"
                    onClick={() => navigate('add')}
                    className="bg-primary-main text-white rounded py-1 px-3"
                >
                    + Add DID
                </button>
            </div>

            <div className="border flex flex-col h-[calc(100%-55px)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    rowCount={rows.length}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    isFilter
                />

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
                        extraClasses="max-h-[calc(100%-150px)] overflow-auto"
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

export default DidManagementListing
