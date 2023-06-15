import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate, useParams } from 'react-router'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/DealerLedgerSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import AddDealerLedgerModelWrapper from '../add/AddDealerLedgerModelWrapper'
import { NoteType } from 'src/models/Ledger.model'

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
        (state: RootState) => state.dealerLedger
    )

    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, searchValue, totalItems } = dealerLedgerState

    return (
        <div className="px-4 h-[calc(100vh-55px)] pt-3 ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Ledger</ATMPageHeading>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setIsOpenModel(true)
                            setOpenModel(NoteType.DEALER_AMOUNT_CREDITED)
                        }}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + Cr. Amount
                    </button>
                    <button
                        onClick={() => {
                            setIsOpenModel(true)
                            setOpenModel(NoteType.CREDIT_NOTE_CREATED)
                        }}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + Cr. Note
                    </button>
                    <button
                        onClick={() => {
                            setIsOpenModel(true)
                            setOpenModel(NoteType.DEBIT_NOTE_CREATED)
                        }}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + Db. Note
                    </button>
                </div>
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
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
                    isFilter
                    // onFilterClick={() => setIsFilterOpen(true)}
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
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

            <DialogLogBox
                isOpen={isOpenModel}
                handleClose={() => setIsOpenModel(false)}
                Component={
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
