import React, { Dispatch, SetStateAction } from 'react'
import { CardData } from './WarehouseOrderStatusOverviewWrapper'
import DateFilterForm from 'src/components/utilsComponent/DateFilterForm'

type Props = {
    cardData: CardData[]
    setDateFilter: Dispatch<
        SetStateAction<{ startDate: string; endDate: string }>
    >
    dateFilter:{ startDate: string; endDate: string }
}

const WarehouseOrderStatusOverview = ({ cardData, setDateFilter,dateFilter }: Props) => {
    const onSubmitDateHandler = (values: any) => {
        setDateFilter(values)
    }
    return (
        <div className="h-[calc(100vh-170px)] ">
            <div className="flex flex-wrap justify-start items-center gap-4 mt-4 text-sm pb-4">
                <DateFilterForm
                    IsDaterFilterLoading={false as boolean}
                    onSubmitDateHandler={
                        onSubmitDateHandler as (values: any) => void
                    }
                    values={dateFilter}
                />
            </div>

            <div className="flex flex-wrap w-[100%] border-t-2 border-indigo-500 pt-2">
                {cardData.map((card) => (
                    <div key={card.id} className="w-full md:w-1/2 p-1 flex">
                        <div className="flex-grow w-full flex flex-col items-center bg-white rounded overflow-hidden shadow-lg">
                            <div className="font-bold text-lg mb-1 text-center w-full">
                                {card.title}
                            </div>
                            <div className="mb-2 flex flex-wrap justify-between items-start gap-2 w-full px-2">
                                {card.orders.map((status) => (
                                    <div
                                        key={status._id}
                                        className={`text-gray-700 text-sm flex-1 md:flex-none md:w-1/3 `}
                                    >
                                        <strong>
                                           ORDER {status._id.replace('_', ' ')}:
                                        </strong>{' '}
                                        <span
                                            className={`font-normal text-lg ${
                                                status._id === 'DISPATCHED'
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                            }`}
                                        >
                                            {status.count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2 w-full overflow-y-auto max-h-full">
                                <div className="flex flex-wrap justify-start">
                                    {card.products.map((group, index) => (
                                        <div key={index} className="w-full p-1">
                                            <div className="p-2 rounded mb-1 shadow">
                                                <p className="text-sm font-semibold">
                                                    Product Status:{' '}
                                                    <span
                                                        className={`${
                                                            group._id ===
                                                            'DISPATCHED'
                                                                ? 'text-green-500'
                                                                : 'text-red-500'
                                                        }`}
                                                    >
                                                        {group._id.replace('_', ' ')    }
                                                    </span>
                                                </p>
                                                <p className="text-gray-600 text-lg">
                                                    Count: {group.count}
                                                </p>
                                                <div className="flex flex-wrap justify-start mt-1">
                                                    {group.products.map(
                                                        (product, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="w-1/3 p-1"
                                                            >
                                                                <div className="bg-blue-200 p-2 rounded mb-1 shadow">
                                                                    <p className="text-gray-800 font-semibold text-sm">
                                                                        {
                                                                            product.productGroupName
                                                                        }
                                                                    </p>
                                                                    <p className="text-gray-600 text-xs">
                                                                        Quantity:{' '}
                                                                        {
                                                                            product.quantity
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WarehouseOrderStatusOverview
