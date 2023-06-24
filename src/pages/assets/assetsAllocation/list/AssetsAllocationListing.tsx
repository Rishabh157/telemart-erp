/// ==============================================
// Filename:AssetAllocationListing.tsx
// Type: List Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'

const AssetsAllocationListing = () => {
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Assets',
            path: '/dashboard',
        },
        {
            label: 'Assets Allocation ',
        },
    ]

    const navigate = useNavigate()
    return (
        <div className="px-4 h-full mt-3 ">
            <div className="h-[30px]">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading>Assets Allocation</ATMPageHeading>
                <button
                    onClick={() => navigate('add')}
                    className="bg-primary-main text-white rounded py-1 px-3"
                >
                    {' '}
                    + Add{' '}
                </button>
            </div>

            <div className="border flex flex-col h-[calc(100%-85px)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    page={0}
                    rowCount={0}
                    rowsPerPage={0}
                    rows={[]}
                    onRowsPerPageChange={() => {}}
                    onSearch={() => {}}
                    isFilter
                    // onFilterClick={() => setIsFilterOpen(true)}
                />

                {/* Table */}
                <div className="grow overflow-auto  ">
                    <ATMTable columns={[]} rows={[]} onRowSelect={() => {}} />
                </div>

                {/* Pagination */}
                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={0}
                        rowCount={0}
                        rows={[]}
                        rowsPerPage={0}
                        onPageChange={() => {}}
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

export default AssetsAllocationListing
