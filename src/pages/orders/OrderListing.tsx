// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
    setMobileNumberSearchValue,
    setComplaintNumberSearchValue,
} from 'src/redux/slices/orderSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { BiSearch } from 'react-icons/bi'
import { handleValidNumber, handleValidNumberForSearch } from 'src/utils/methods/numberMethods'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import MOLFilterBar from 'src/components/UI/molecules/MOLFilterBar/MOLFilterBar'

type Props = {
    columns: columnTypes[]
    filters?: any
}

const OrderListing = ({ columns, filters }: Props) => {
    const [activeTab, setActiveTab] = useState('')

    // Hooks
    const dispatch = useDispatch<AppDispatch>()
    const orderState: any = useSelector((state: RootState) => state.order)

    // redux state
    const {
        page,
        rowsPerPage,
        items,
        totalItems,
        isTableLoading,
        searchValue,
        mobileNumberSearchValue,
        complaintNumberSearchValue,
    } = orderState

    // update the tab label
    useEffect(() => {
        const activeTab = window.location.pathname?.split('/')?.[2]
        setActiveTab(activeTab)
    }, [])

    // reset the redux pagination state unmount
    useEffect(() => {
        return () => {
            dispatch(setPage(1))
            dispatch(setRowsPerPage(10))
            dispatch(setSearchValue(''))
            dispatch(setMobileNumberSearchValue(''))
        }
    }, [dispatch])

    return (
        <div className="px-4 h-[calc(100vh-150px)]">
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Order </ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-45px)] rounded bg-white">
                {/*Table Header */}

                {activeTab === 'global-search' ? (
                    <div className="flex px-2 py-2 gap-x-4">
                        <div className="flex items-center p-1 border rounded shadow w-fit hover:border-primary-main">
                            <BiSearch className="text-xl text-slate-600" />
                            <input
                                className="border-none rounded outline-none px-2 w-[200px] placeholder:text-slate-500"
                                value={searchValue}
                                placeholder="Order No..."
                                onChange={(e) => {
                                    dispatch(setMobileNumberSearchValue(''))
                                    handleValidNumber(e) && dispatch(setSearchValue(e.target.value))
                                }}
                            />
                        </div>
                        <div className="flex items-center p-1 border rounded shadow w-fit hover:border-primary-main">
                            <BiSearch className="text-xl text-slate-600" />
                            <input
                                className="border-none rounded outline-none px-2 w-[200px] placeholder:text-slate-500"
                                value={mobileNumberSearchValue}
                                placeholder="Mobile No..."
                                onChange={(e) => {
                                    dispatch(setSearchValue(''))
                                    handleValidNumber(e) && dispatch(setMobileNumberSearchValue(e.target.value))
                                }}
                            />
                        </div>
                    </div>
                ) : activeTab === 'complaint' ? (
                    <ATMTableHeader
                        page={page}
                        searchValue={searchValue}
                        placeholder="Order No..."
                        isAnotherSearchTwo
                        anotherSearchTwoPlaceholder="Complaint No..."
                        anotherSearchTwoValue={complaintNumberSearchValue}
                        onAnotherSearchTwo={(newValue) => {
                            dispatch(setComplaintNumberSearchValue(newValue))
                        }}
                        rowCount={totalItems}
                        rowsPerPage={rowsPerPage}
                        rows={items}
                        onRowsPerPageChange={(newValue) =>
                            dispatch(setRowsPerPage(newValue))
                        }
                        onSearch={(newValue) =>
                            dispatch(setSearchValue(newValue))
                        }
                    />
                ) : (
                    <ATMTableHeader
                        searchValue={searchValue}
                        placeholder={activeTab !== 'inquiry' ? 'Order No...' : 'Inquiry No...'}
                        page={page}
                        rowCount={totalItems}
                        rowsPerPage={rowsPerPage}
                        rows={items}
                        onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
                        onSearch={(newValue) => handleValidNumberForSearch(newValue) && dispatch(setSearchValue(newValue))}
                        isAnotherSearch
                        anotherSearchValue={mobileNumberSearchValue}
                        anotherSearchPlaceholder="Mobile No..."
                        onAnotherSearch={(newValue) => handleValidNumberForSearch(newValue) && dispatch(setMobileNumberSearchValue(newValue))}
                        isRefresh
                        children={<MOLFilterBar filters={filters} />}
                    />
                )}

                {/* Table */}
                <div className="overflow-auto grow">
                    <ATMTable
                        extraClasses="w-[200%]"
                        columns={columns}
                        rows={items}
                        isLoading={isTableLoading}
                    />
                </div>

                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={items}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default OrderListing
