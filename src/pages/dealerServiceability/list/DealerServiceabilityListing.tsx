// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

// |-- Redux --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { DealersListResponse } from 'src/models'
import { SelectOption } from 'src/models/FormField/FormField.model'
import {
    setPage,
    setRowsPerPage,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetAllDealersByZonalExeQuery } from 'src/services/DealerServices'
import { useGetAllSchemeQuery } from 'src/services/SchemeService'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setFilerDealerServiceability: any
    filerDealerServiceability: any
}

const DealerServiceabilityListing = ({
    columns,
    rows,
    setFilerDealerServiceability,
    filerDealerServiceability,
}: Props) => {
    const [dealersOptions, setDealersOptions] = useState<SelectOption[]>([])

    const dispatch = useDispatch<AppDispatch>()
    const dealerInventoryState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const [selectedRows, setSelectedRows] = useState([])
    const { page, rowsPerPage, totalItems, isTableLoading } =
        dealerInventoryState

    const { data, isLoading, isFetching } = useGetAllDealersByZonalExeQuery('')
    const { userData }: any = useSelector((state: RootState) => state.auth)
    const { options: schemeOptions, } = useCustomOptions({
        keyName: 'schemeName',
        value: '_id',
        useEndPointHook: useGetAllSchemeQuery({
            limit: rowsPerPage,
            searchValue: '',
            params: ['schemeName', 'schemeCode'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: false,
        }),
    })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            const filteredOptions = data?.data?.map(
                (ele: DealersListResponse) => {
                    return {
                        label:
                            ele?.firstName +
                            ' ' +
                            ele?.lastName +
                            ' ( ' +
                            ele?.dealerCode +
                            ' )',
                        value: ele?._id,
                    }
                }
            )
            setDealersOptions(filteredOptions)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data, dispatch])
    const handleFilter = (name: string, value: string) => {
        setFilerDealerServiceability((prev: any) => ({
            ...prev,
            [name]: value || null,
        }))
    }
    return (
        <div className="h-[calc(100vh-60px)] px-4">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px] p-1">
                <ATMPageHeading> Dealer's Serviceability </ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white ">
                {/*Table Header */}
                <div className="grid grid-cols-3 gap-2 px-2">
                    <div className="z-[100000]">
                        <ATMTextField
                            extraClassField={'mt-2 w-full'}
                            name=""
                            type="number"
                            value={filerDealerServiceability?.pincode}
                            label="pincode"
                            maxLength={6}
                            placeholder="pincode"
                            onChange={(e) => {
                                handleFilter('pincode', e?.target?.value)
                            }}
                        />
                    </div>
                    <div className="z-[100000]">
                        <ATMSelectSearchable
                            name=""
                            label="scheme"
                            componentClass="mt-2"
                            value={filerDealerServiceability?.schemeId}
                            selectLabel="Select Scheme"
                            // isLoading={isLoading}
                            options={schemeOptions}
                            onChange={(e) => {
                                handleFilter('schemeId', e)
                            }}
                        />
                    </div>
                    <div className="z-[100000]">
                        <ATMSelectSearchable
                            name=""
                            label="dealer"
                            componentClass="mt-2"
                            value={filerDealerServiceability?.dealerId}
                            selectLabel="Select Dealer"
                            isLoading={isLoading}
                            options={dealersOptions}
                            onChange={(e) => {
                                handleFilter('dealerId', e)
                            }}
                        />
                    </div>

                    {/* Right */}
                </div>
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
                {/* Table */}
                <div className="grow overflow-auto  ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
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

export default DealerServiceabilityListing
