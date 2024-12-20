// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import OutwardGpoOrderFilterFormWrapper, {
    FormInitialValuesFilterWithLabel,
} from '../GpoOrders/Filters/OutwardGpoOrderFilterFormWrapper'
import { Chip, Stack } from '@mui/material'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { courierCompanyEnum } from 'src/utils/constants/enums'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setFilter: React.Dispatch<
        React.SetStateAction<FormInitialValuesFilterWithLabel>
    >
    filter: FormInitialValuesFilterWithLabel
}

const OutwardMaerskOrdersTabListing = ({
    columns,
    rows,
    setFilter,
    filter,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { id: warehouseId } = useParams()
    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] = useState({
        isFilterOpen: false,
        isMenifest: false,
    })
    const [isRedirect, setIsRedirect] = useState<boolean>(false)
    const outwardCustomerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, isTableLoading, searchValue, totalItems } =
        outwardCustomerState

    const handleReset = () => {
        setFilter((prev) => ({
            ...prev,
            startDate: { fieldName: '', value: '', label: '' },
            endDate: { fieldName: '', value: '', label: '' },
            startTime: { fieldName: '', value: '', label: '' },
            endTime: { fieldName: '', value: '', label: '' },
            orderStatus: { fieldName: '', value: '', label: '' },
        }))
    }

    const filterShow = (filter: FormInitialValuesFilterWithLabel) => {
        return (
            <span className="capitalize">
                <Stack direction="row" spacing={1}>
                    {Object.entries(filter).map(([key, value], index) => {
                        return value.value ? (
                            <Chip
                                key={index}
                                label={`${value.fieldName}: ${value.label}`}
                                color="primary"
                                variant="outlined"
                                size="small"
                            />
                        ) : null
                    })}
                </Stack>
            </span>
        )
    }

    const isFilterApplied = (isMenifest: boolean, isRedirect: boolean) => {
        let keys: string = ''
        for (keys in filter) {
            if (
                filter[keys as keyof typeof filter].value !== '' &&
                isMenifest === true &&
                isRedirect === true
            )
                return true
        }
        return false
    }

    useEffect(() => {
        return () => {
            setIsOpenFilterFormDialog({
                isFilterOpen: false,
                isMenifest: false,
            })
            setIsRedirect(false)
        }
    }, [])

    return (
        <div className="h-[calc(100vh-350px)] bg-white">
            <div className="border flex flex-col h-[calc(100%)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    searchValue={searchValue}
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    isFilter
                    onFilterClick={() => {
                        setIsOpenFilterFormDialog((prev) => ({
                            ...prev,
                            isFilterOpen: true,
                        }))
                        setIsRedirect(false)
                    }}
                    isFilterRemover
                    onFilterRemoverClick={handleReset}
                    filterShow={filterShow(filter)}
                    children={
                        isAuthorized(
                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_GET_MENIFEST
                        ) && (
                            <ATMLoadingButton
                                type="submit"
                                className="h-[40px] hover:bg-blue-600"
                                onClick={() => {
                                    setIsOpenFilterFormDialog({
                                        isFilterOpen: true,
                                        isMenifest: true,
                                    })
                                    setIsRedirect(true)
                                }}
                            >
                                Get Manifest
                            </ATMLoadingButton>
                        )
                    }
                />

                {/* Filter Form */}
                <OutwardGpoOrderFilterFormWrapper
                    open={isOpenFilterFormDialog}
                    filter={filter}
                    setFilter={setFilter}
                    onClose={() => {
                        setIsOpenFilterFormDialog((prev) => ({
                            ...prev,
                            isFilterOpen: false,
                        }))
                        if (
                            isFilterApplied(
                                isOpenFilterFormDialog.isMenifest,
                                isRedirect
                            )
                        ) {
                            navigate('/menifest-invoice-orders', {
                                state: {
                                    filter,
                                    warehouseId,
                                    providerName: courierCompanyEnum.shipyaari,
                                },
                            })
                        }
                    }}
                />

                {/* Table */}
                <div className="grow overflow-auto">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        extraClasses="max-h-[calc(100%-10px)] overflow-auto"
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

export default OutwardMaerskOrdersTabListing
