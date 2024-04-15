import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { useNavigate } from 'react-router-dom'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import FilterStatusFormDialogWrapper from 'src/filtersDialogs/filterStatusDialog/FilterStatusFormDialogWrapper'

type Props = {
    columns: any[]
    rows: any[]
}

const DispositionTwoListing = ({ columns, rows }: Props) => {
    // state
    const [isOpenFilterForm, setIsOpenFilterForm] = useState<boolean>(false)

    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
        listingPaginationState

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Disposition',
            path: '/dashboard',
        },
        {
            label: 'Disposition Two',
        },
    ]

    return (
        <div className="px-4 h-full overflow-auto pt-3 ">
            <div className="h-[30px]">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Disposition Two </ATMPageHeading>

                {isAuthorized(
                    UserModuleNameTypes.ACTION_DISPOSITION_TWO_ADD
                ) && (
                    <button
                        type="button"
                        onClick={() => navigate('add')}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + Add
                    </button>
                )}
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
                    onFilterClick={() => {
                        setIsOpenFilterForm(true)
                    }}
                />

                {/* filter status */}
                {isOpenFilterForm && (
                    <FilterStatusFormDialogWrapper
                        open
                        onClose={() => setIsOpenFilterForm(false)}
                    />
                )}

                {/* Table */}
                <div className="grow overflow-auto  ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
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
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default DispositionTwoListing
