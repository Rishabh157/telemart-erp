// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ATMAmountDisplay } from 'src/components/UI/atoms/ATMDisplay/ATMDisplay'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

// |-- Redux --|
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetDealerBalanceAmountRequestQuery, useSyncedDealerCreditAmountRequestMutation } from 'src/services/DealerBalanceRequestService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
}

const DealerBalanceRequestTabListing = ({ columns, rows }: Props) => {

    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const dealerId: any = params.dealerId
    const [updateSynced] = useSyncedDealerCreditAmountRequestMutation();

    const state: any = useSelector((state: RootState) => state.listingPagination)
    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } = state

    const { items, isLoading } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetDealerBalanceAmountRequestQuery(dealerId, {
            skip: !dealerId
        }),
    })

    // console.log('dealerCreditAmount: ', items);

    const handleSynced = () => {
        updateSynced(dealerId)
            .then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Synced successfully!')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', res?.error?.data?.message)
                }
            })
    }


    // function formatCustomAmount(amount: number) {
    //     const amountString = amount.toString();
    //     const reversed = amountString.split("").reverse().join(""); // Reverse the string
    //     const grouped = reversed.match(/.{1,2}/g)?.join(",");       // Group every two characters
    //     return grouped?.split("").reverse().join("");              // Reverse back and return
    // }


    return (
        <div className="px-4 h-[calc(100vh-200px)]">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading>Credit Amount Request</ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-35px)] rounded bg-white ">
                {/*Table Header */}
                <ATMTableHeader
                    searchValue={searchValue}
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    children={
                        !isLoading && (
                            <div className="px-4 py-2 shadow border border-gray-200 rounded-lg bg-white flex justify-between items-center">
                                <div className="flex items-center gap-2 pr-4">
                                    <ATMAmountDisplay
                                        priceLabel='To Be Synced Amount'
                                        // amount={100003000}
                                        amount={items?.totalAmount || 0}
                                        disableLabel={false}
                                        disableAmount={false}
                                    />
                                </div>
                                <button
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                                    onClick={() => {
                                        if (items?.totalAmount) {
                                            showConfirmationDialog({
                                                title: 'Do You Want To Synced ?',
                                                text: 'Do you want to synced all entries?',
                                                showCancelButton: true,
                                                next: (res: any) => {
                                                    return res.isConfirmed && handleSynced()

                                                },
                                            })
                                        } else {
                                            alert("no amount to be synced")
                                        }
                                    }}
                                >
                                    Sync
                                </button>
                            </div>
                        )}
                />

                {/* Table */}
                <div className="grow overflow-auto">
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
        </div >
    )
}

export default DealerBalanceRequestTabListing
