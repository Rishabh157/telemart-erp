import { CircularProgress } from '@mui/material'
import moment from 'moment'
import { useState } from 'react'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'

import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetWHInwardInventoryByWarehouseIdQuery } from 'src/services/DashboardServices'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import React from 'react'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import BarGraph from 'src/components/UI/atoms/ATMBarGraph/ATMBarGraph'

type InwardStockProps = {
    label: string
    y: number
}
const WHInwardStock = () => {
    const [dateFilter, setDateFilter] = useState<any>({
        start_date: `${moment().format('YYYY-MM-DD')}`,
        end_date: `${moment().format('YYYY-MM-DD')}`,
    })
    const [warehouseId, setWarehouseId] = useState<string>()
    const [inwordStock, setInwordStock] = useState<InwardStockProps[]>([])

    const {
        items: data,
        isFetching,
        isLoading,
    } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetWHInwardInventoryByWarehouseIdQuery(
            {
                warehousId: warehouseId,
                dateFilter: {
                    startDate: dateFilter.start_date
                        ? moment(dateFilter?.start_date).format('YYYY-MM-DD')
                        : '',
                    endDate: dateFilter.end_date
                        ? moment(dateFilter?.end_date).format('YYYY-MM-DD')
                        : dateFilter.end_date
                        ? moment().format('YYYY-MM-DD')
                        : '',
                },
            },
            { skip: !warehouseId }
        ),
    })

    const { options } = useCustomOptions({
        useEndPointHook: useGetWareHousesQuery(''),
        keyName: 'wareHouseName',
        value: '_id',
    })

    React.useEffect(() => {
        if (options?.length) {
            setWarehouseId(options[0]?.value as string)
        }
    }, [options])

    React.useEffect(() => {
        if (!isLoading && !isFetching) {
            const dataPoints: InwardStockProps[] = [
                { y: data?.company, label: 'Company' },
                { y: data?.customer, label: 'Customer' },
                {
                    y: data?.dealer,
                    label: 'Dealer',
                },
                {
                    y: data?.eCom,
                    label: 'E-commerce',
                },
                {
                    y: data?.sample,
                    label: 'Sample',
                },
                { y: data?.warehouse, label: 'Warehouse' },
            ]

            setInwordStock(dataPoints)
        }
    }, [isLoading, isFetching, data])
    return (
        <div className="border-[1px] border-slate-400 rounded p-3 h-full">
            <div className="text-start flex justify-between">
                {/* Heading */}
                <ATMPageHeading> Warehouse inwaord </ATMPageHeading>
                {/* Date Filter */}
            </div>
            <div className="flex flex-wrap gap-2 justify-end items-center">
                <div className="min-w-[150px] max-w-[150px]">
                    <ATMSelectSearchable
                        size="xs"
                        fontSizeOptionsClass="12px"
                        componentClass="z-[10001]"
                        name=""
                        value={warehouseId}
                        onChange={(e) => setWarehouseId(e)}
                        options={options || []}
                        // label="Wareouse"
                    />
                </div>
                <div className="min-w-[150px] max-w-[150px]">
                    <ATMDatePicker
                        name=""
                        minDate={moment().subtract(3, 'months').startOf('day')}
                        value={dateFilter.start_date}
                        onChange={(value) => {
                            setDateFilter({
                                ...dateFilter,
                                start_date: value,
                            })
                        }}
                        label=""
                        dateTimeFormat="DD/MM/YYYY"
                    />
                </div>

                <div className="min-w-[150px] max-w-[150px]">
                    <ATMDatePicker
                        name=""
                        value={dateFilter.end_date}
                        onChange={(value) => {
                            setDateFilter({
                                ...dateFilter,
                                end_date: value,
                            })
                        }}
                        label=""
                        dateTimeFormat="DD/MM/YYYY"
                        minDate={
                            dateFilter.start_date
                                ? new Date(dateFilter.start_date)
                                : undefined
                        }
                    />
                </div>
                {dateFilter?.start_date || dateFilter?.end_date ? (
                    <div>
                        <button
                            type="button"
                            className={`rounded bg-primary-main text-white text-sm py-[0.40rem] px-2`}
                            onClick={() => {
                                setDateFilter({
                                    start_date: moment(new Date()).format(
                                        'YYYY-MM-DD'
                                    ),
                                    end_date: moment(new Date()).format(
                                        'YYYY-MM-DD'
                                    ),
                                })
                            }}
                        >
                            Clear
                        </button>
                    </div>
                ) : null}
            </div>
            <div className="relative">
                {isFetching && (
                    <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                        <CircularProgress />
                    </div>
                )}
                <div className="p-2">
                    <BarGraph
                        dataPoints={inwordStock}
                        label={'Inward stock'}
                        verticalLabel={'Quantity'}
                    />
                </div>
            </div>
        </div>
    )
}

export default WHInwardStock
