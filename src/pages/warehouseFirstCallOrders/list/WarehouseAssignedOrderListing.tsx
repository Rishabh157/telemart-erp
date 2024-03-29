// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/warehouseOrders/warehouseAssignedOrderSlice'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import AssignedOrderListFilterFormDialogWrapper from './assignedOrderFilter/AssignedOrderListFilterFormDialogWrapper'
import { statusProps } from 'src/pages/orders'
import { OrderListResponse } from 'src/models'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const WarehouseAssignedOrdersListing = ({
    columns,
    rows,
    setShowDropdown,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] =
        useState<boolean>(false)
    const warehouseAssignedOrdersState: any = useSelector(
        (state: RootState) => state.warehouseOrdersAssigned
    )
    const [selectedRows, setSelectedRows] = useState([])
    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
        warehouseAssignedOrdersState

    const getBackGroundColorByStatus = (status: string) => {
        // if (status?.firstCallState === 'LANGUAGEBARRIER') {
        //     return 'bg-green-200'
        // }
        console.log('status: ', status)
        switch (status) {
            // case statusProps.fresh:
            //     return 'bg-green-200'
            // console.log('here pnd')
            case statusProps.pnd:
                console.log('here pnd')
                return 'bg-amber-200'
            case statusProps.urgent:
                console.log('here urgent')
                return 'bg-rose-300'
            default:
                console.log('here default')
                break
        }
    }

    return (
        // <div className="px-4 h-full overflow-auto pt-3  bg-white ">
        <div className="px-4 h-[calc(100vh-55px)] bg-white ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Warehouse First Call Orders </ATMPageHeading>
                {/* <button
                    type="button"
                    onClick={() => navigate('add')}
                    className="bg-primary-main text-white rounded py-1 px-3"
                >
                    + Add 
                </button> */}
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
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    isFilter
                    onFilterClick={() => {
                        setIsOpenFilterFormDialog(true)
                    }}
                />

                {isOpenFilterFormDialog && (
                    <AssignedOrderListFilterFormDialogWrapper
                        open
                        onClose={() => setIsOpenFilterFormDialog(false)}
                    />
                )}

                {/* Table */}
                <div className="grow overflow-auto h-full ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        // isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        setShowDropdown={setShowDropdown}
                        // extraClasses="h-full overflow-auto"
                        isLoading={isTableLoading}
                        rowExtraClasses={(row: OrderListResponse) => {
                            getBackGroundColorByStatus(row?.status)
                        }}
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

export default WarehouseAssignedOrdersListing
