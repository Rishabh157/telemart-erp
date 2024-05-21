// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import AddDealerLedgerModelWrapper from '../add/AddDealerLedgerModelWrapper'
import { NoteType } from 'src/models/Ledger.model'
import MouseOverPopover from 'src/components/utilsComponent/MouseOverPopover'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
    setFilterBy,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'

import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
}

const DealerLedgerListing = ({ columns, rows }: Props) => {
    const [openModel, setOpenModel] = useState<keyof typeof NoteType>(
        'CREDIT_NOTE_CREATED'
    )
    const [isOpenModel, setIsOpenModel] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const dealerLedgerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
        dealerLedgerState

    return (
        <div className="px-4 h-[calc(100vh-200px)] ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <div className="flex gap-6">
                    <ATMPageHeading> Ledger</ATMPageHeading>
                    <div className=" pl-1 p-1 mb-1 hover:outline-blue-400 outline outline-offset-1 outline-blue-200 rounded">
                        <MouseOverPopover
                            title="Order Ledger Details"
                            children={
                                <>
                                    <div className="px-4 py-1 border flex justify-between">
                                        <div className="p-2 text-sm font-normal flex gap-1 ">
                                            <h1 className="font-bold">
                                                Credit Amount :
                                            </h1>
                                            <p className="text-green-400">
                                                4000
                                            </p>
                                        </div>
                                        <div className="p-2 text-sm font-normal flex gap-1 ">
                                            <h1 className="font-bold">
                                                Debit Amount :
                                            </h1>
                                            <p className="text-red-400">4000</p>
                                        </div>
                                        <div className="p-2 text-sm font-normal  gap-1 flex">
                                            <h1 className="font-bold">
                                                Effective Balane :
                                            </h1>
                                            <p className="text-blue-400">
                                                9000
                                            </p>
                                        </div>
                                    </div>
                                </>
                            }
                            buttonName="Order Ledger"
                            isbuttonName
                        />
                    </div>
                </div>
                <div className="flex gap-3">
                    {isAuthorized(
                        UserModuleNameTypes.ACTION_DEALER_DEALER_LEDGER_CREDIT_AMOUNT_ADD
                    ) && (
                        <button
                            onClick={() => {
                                setIsOpenModel(true)
                                setOpenModel(NoteType.DEALER_AMOUNT_CREDITED)
                            }}
                            className="bg-primary-main text-white rounded py-1 px-3"
                        >
                            + Cr. Amount
                        </button>
                    )}

                    {isAuthorized(
                        UserModuleNameTypes.ACTION_DEALER_DEALER_LEDGER_CREDIT_NOTE_ADD
                    ) && (
                        <button
                            onClick={() => {
                                setIsOpenModel(true)
                                setOpenModel(NoteType.CREDIT_NOTE_CREATED)
                            }}
                            className="bg-primary-main text-white rounded py-1 px-3"
                        >
                            + Cr. Note
                        </button>
                    )}
                    {isAuthorized(
                        UserModuleNameTypes.ACTION_DEALER_DEALER_LEDGER_DEBIT_NOTE_ADD
                    ) && (
                        <button
                            onClick={() => {
                                setIsOpenModel(true)
                                setOpenModel(NoteType.DEBIT_NOTE_CREATED)
                            }}
                            className="bg-primary-main text-white rounded py-1 px-3"
                        >
                            + Db. Note
                        </button>
                    )}
                </div>
            </div>

            <div className="border flex flex-col h-[calc(100%-35px)]  rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    searchValue={searchValue}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    // isFilter
                    isRefresh
                    isDateFilter
                    IsDaterFilterLoading={isTableLoading}
                    onSubmitDateHandler={(values) => {
                        dispatch(setFilterBy(values))
                    }}
                    // onFilterClick={() => setIsFilterOpen(true)}
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                />

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

            {/* {isFilterOpen && (
                <FilterDialogWarpper onClose={() => setIsFilterOpen(false)} />
            )} */}

            <DialogLogBox
                isOpen={isOpenModel}
                maxWidth="sm"
                handleClose={() => setIsOpenModel(false)}
                component={
                    <AddDealerLedgerModelWrapper
                        addType={openModel}
                        setIsOpenModel={setIsOpenModel}
                    />
                }
            />
        </div>
    )
}

export default DealerLedgerListing
