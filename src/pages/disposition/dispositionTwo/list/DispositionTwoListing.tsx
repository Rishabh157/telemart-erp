import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'

import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/configuration/dispositionTwoSlice'
import { useNavigate } from 'react-router-dom'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'

type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const DispositionTwoListing = ({ columns, rows, setShowDropdown }: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    //const [isOpenAddForm, setisOpenAddForm] = useState(false)
    // const { selectedDispositionOne }: any = useSelector(
    //     (state: RootState) => state.dispositionOne
    // )
    const dispositionTwoState: any = useSelector(
        (state: RootState) => state.dispositionTwo
    )
    const [selectedRows, setSelectedRows] = useState([])
    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
        dispositionTwoState
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Disposition',
            path: '/dashboard',
        },
        {
            label: 'Disposition Two',
        },
    ]

    // const { selectedDispostion, searchValue }: any = useSelector(
    //     (state: RootState) => state.dispositionTwo
    // )

    return (
        <>
            <div className="px-4 h-full overflow-auto pt-3 ">
                <div className="h-[30px]">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>
                {/* Page Header */}
                <div className="flex justify-between items-center h-[45px]">
                    <ATMPageHeading> Disposition Two </ATMPageHeading>
                    <button
                        type="button"
                        onClick={() => navigate('add')}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + Add
                    </button>
                </div>

                <div className="border flex flex-col h-[calc(100%-85px)] rounded bg-white">
                    {/*Table Header */}
                    <ATMTableHeader
                        searchValue={searchValue}
                        page={page}
                        rowCount={totalItems}
                        rowsPerPage={rowsPerPage}
                        rows={rows}
                        onRowsPerPageChange={(newValue) =>
                            dispatch(setRowsPerPage(newValue))
                        }
                        onSearch={(newValue) => {
                            dispatch(setSearchValue(newValue))
                        }}
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
                            setShowDropdown={setShowDropdown}
                            extraClasses="h-full overflow-auto"
                            isLoading={isTableLoading}
                        />
                    </div>

                    {/* Pagination */}

                    <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                        <ATMPagination
                            page={page}
                            rowCount={totalItems}
                            rows={rows}
                            rowsPerPage={rowsPerPage}
                            onPageChange={(newPage) =>
                                dispatch(setPage(newPage))
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DispositionTwoListing
