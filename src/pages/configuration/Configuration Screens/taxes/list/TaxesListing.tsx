import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import { useNavigate } from 'react-router-dom'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/TaxesSlice'
import { AppDispatch, RootState } from 'src/redux/store'
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

type Props = {
    columns: any[]
    rows: any[]
}

const TaxesListing = ({ columns, rows }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const taxState: any = useSelector((state: RootState) => state.tax)
    // const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [selectedRows, setSelectedRows] = useState([])
    const navigate = useNavigate()

    const { page, rowsPerPage, totalItems, searchValue } = taxState

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Configuration',
            path: '/dashboard',
        },
        {
            label: 'Taxes',
        },
    ]

    return (
        <div className="px-4  pt-3 h-full ">
            {/* Breadcrumbs */}
            <div className="h-[30px]">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Taxes </ATMPageHeading>
                <button
                    onClick={() => navigate('/configurations/taxes/add')}
                    className="bg-primary-main text-white rounded py-1 px-3"
                >
                    {' '}
                    + Add Tax{' '}
                </button>
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
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
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    isFilter
                    // onFilterClick={() => setIsFilterOpen(true)}
                />

                {/* Table */}
                <div className="grow overflow-auto ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
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

            {/* {isFilterOpen && (
       <FilterDialogWarpper
       onClose={()=> setIsFilterOpen(false)}
       />
      )} */}
        </div>
    )
}

export default TaxesListing
