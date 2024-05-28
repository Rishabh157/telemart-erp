import { useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetInwardInventrioesStatusQuery } from 'src/services/CourierReturnService'

const InwardInventoryOverview = () => {
    const { id: warehouseId } = useParams()

    const [dateFilter, setDateFilter] = useState<any>({
        start_date: `${moment().format('YYYY-MM-DD')}`,
        end_date: `${moment().format('YYYY-MM-DD')}`,
    })

    const { items } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetInwardInventrioesStatusQuery({
            warehouseId: warehouseId,
            body: {
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
        }),
    })

    return (
        <div className="border border-slate-400 rounded p-2 h-full flex flex-col">
            <div className="flex gap-2 items-center justify-end">
                <ATMDatePicker
                    name=""
                    value={dateFilter.start_date}
                    onChange={(value) => {
                        const endDate = moment(value)
                            .add(3, 'months')
                            .endOf('day')
                        const threeMonthsLater = moment()
                            .add(3, 'months')
                            .endOf('day')

                        // Check if the selected start date is less than 3 months from the current date
                        if (moment(value).isBefore(threeMonthsLater)) {
                            // If yes, set the end date to 3 months from the selected start date
                            setDateFilter({
                                ...dateFilter,
                                start_date: value,
                                end_date: endDate.isBefore(threeMonthsLater)
                                    ? endDate
                                    : threeMonthsLater,
                            })
                        } else {
                            // Otherwise, keep the end date unchanged
                            setDateFilter({
                                ...dateFilter,
                                start_date: value,
                            })
                        }
                    }}
                    label=""
                    dateTimeFormat="DD/MM/YYYY"
                />

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
                    minDate={dateFilter.start_date}
                    maxDate={moment(dateFilter.start_date)
                        .add(3, 'months')
                        .endOf('day')}
                />

                {(dateFilter.start_date || dateFilter.end_date) && (
                    <button
                        type="button"
                        className="rounded bg-primary-main text-white text-sm py-1 px-2"
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
                )}
            </div>
            <div>
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
                    <h2 className="text-lg font-bold mb-4 text-center">
                        Returns Overview
                    </h2>
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-sm font-semibold">
                                GPO Return
                            </h3>
                        </div>
                        <div className="bg-blue-100 text-blue-600 rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl">
                            {items?.totalGPORequest || 0}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-sm font-semibold">
                                Shipyaari Return
                            </h3>
                        </div>
                        <div className="bg-green-100 text-green-600 rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl">
                            {items?.totalShipyaariRequest || 0}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InwardInventoryOverview
