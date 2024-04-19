// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
// import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

// |-- Redux --|
import { useGetAllDealersByZonalExeQuery } from 'src/services/DealerServices'
import {
    setRowsPerPage,
    setPage,
    setSelectedDealerFilter,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { DealersListResponse } from 'src/models'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
}

const DealerInventoryListing = ({ columns, rows }: Props) => {
    const [dealersOptions, setDealersOptions] = useState<SelectOption[]>([])

    const dispatch = useDispatch<AppDispatch>()
    const dealerInventoryState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [selectedRows, setSelectedRows] = useState([])
    const { page, rowsPerPage, totalItems, selectedDealer, isTableLoading } =
        dealerInventoryState

    const { data, isLoading, isFetching } = useGetAllDealersByZonalExeQuery('')

    useEffect(() => {
        if (!isFetching && !isLoading) {
            const filteredOptions = data?.data?.map(
                (ele: DealersListResponse) => {
                    return {
                        label: ele?.firstName + ' ' + ele?.lastName,
                        value: ele?._id,
                    }
                }
            )
            setDealersOptions(filteredOptions)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data, dispatch])

    return (
        <div className="h-[calc(100vh-60px)] px-4">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px] p-1">
                <ATMPageHeading> Dealer's Inventory </ATMPageHeading>
                {/* <button
                        type="button"
                        onClick={() => navigate('inward-inventory/add')}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + Inward Inventory
                    </button> */}
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white ">
                {/*Table Header */}
                <div className="flex justify-between mb-4 px-2">
                    <div className="w-[15%] z-[100000]">
                        <ATMSelectSearchable
                            name=""
                            label=""
                            componentClass="mt-2"
                            value={selectedDealer}
                            selectLabel="Select Dealer"
                            isLoading={isLoading}
                            options={dealersOptions}
                            onChange={(e) => {
                                dispatch(setSelectedDealerFilter(e))
                            }}
                        />
                    </div>

                    {/* Right */}
                    <div className="flex justify-end col-span-1 mt-2">
                        <div className="flex gap-3 items-center">
                            <div className="text-sm"> Rows per page : </div>
                            <select
                                value={rowsPerPage as number}
                                onChange={(e) => {
                                    dispatch(setRowsPerPage(e?.target?.value))
                                }}
                                className={`rounded-lg p-1 outline-0 bg-slate-100 text-sm `}
                            >
                                {[5, 10, 20, 50, 100]?.map((option: any) => {
                                    return (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    )
                                })}
                            </select>

                            <div className="text-sm bg-slate-100 py-1 px-2 rounded-lg text-slate-600">
                                Showing &nbsp; {rowsPerPage * (page - 1) + 1} -{' '}
                                {rowsPerPage * (page - 1) + rows?.length} of{' '}
                                {totalItems}
                            </div>
                        </div>
                    </div>
                </div>

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

export default DealerInventoryListing
