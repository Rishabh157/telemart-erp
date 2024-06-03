import React, { Dispatch, SetStateAction } from 'react'
import { CardData } from './WarehouseOrderStatusOverviewWrapper'
import DateFilterForm from 'src/components/utilsComponent/DateFilterForm'

type Props = {
    cardData: CardData[]
    setDateFilter: Dispatch<
        SetStateAction<{ startDate: string; endDate: string }>
    >
    dateFilter: { startDate: string; endDate: string }
}

const WarehouseOrderStatusOverview = ({
    cardData,
    setDateFilter,
    dateFilter,
}: Props) => {
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
                            <div className="mb-2 flex flex-col justify-start items-start gap-1 w-full px-2">
                                <strong className="uppercase pl-4 underline">
                                    Orders Summary
                                </strong>
                                <div className="text-gray-700 text-xs flex flex-1 justify-between items-around w-full px-6">
                                    <strong
                                        className="uppercase"
                                        style={{ minWidth: '150px' }}
                                    >
                                        Total no of orders
                                    </strong>
                                    <span className="font-normal ">-</span>
                                    <span className="font-normal text-lg">
                                        {card.orders.reduce(
                                            (acc, curr) => acc + curr.count,
                                            0
                                        )}
                                    </span>
                                </div>
                                {card.orders.map((status) => (
                                    <div
                                        key={status._id}
                                        className="text-gray-700 text-xs flex flex-1 justify-between items-around w-full  px-6"
                                    >
                                        <div style={{ minWidth: '150px' }}>
                                            <strong>{`ORDER ${status._id.replace(
                                                '_',
                                                ' '
                                            )}`}</strong>
                                        </div>
                                        <span className="font-normal ">-</span>
                                        <div>
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
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2 w-full overflow-y-auto max-h-full">
                                <div className="flex flex-wrap justify-start">
                                    <strong className="uppercase pl-4 underline">
                                        Products Summary
                                    </strong>
                                    {card.products.map((group, index) => (
                                        <div key={index} className="w-full p-1">
                                            <div className="p-2 rounded mb-1 shadow">
                                                <p className="text-xs font-normal">
                                                    Product Status:{' '}
                                                    <span
                                                        className={`${
                                                            group._id ===
                                                            'DISPATCHED'
                                                                ? 'text-green-500'
                                                                : 'text-red-500'
                                                        }`}
                                                    >
                                                        {group._id.replace(
                                                            '_',
                                                            ' '
                                                        )}
                                                    </span>
                                                </p>
                                                <p className="text-gray-600 text-xs font-normal">
                                                    Product Count: {group.count}
                                                </p>
                                                <table
                                                    className="w-full"
                                                    style={{
                                                        margin: '0',
                                                        padding: '0',
                                                        borderSpacing: '0',
                                                    }}
                                                >
                                                    <thead>
                                                        <tr className="bg-gray-400 text-center">
                                                            <th className="p-0">
                                                                Product Name
                                                            </th>
                                                            <th className="p-0">
                                                                Quantity
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {group.products.map(
                                                            (product, idx) => (
                                                                <tr
                                                                    key={idx}
                                                                    className="border-b font-normal border-gray-200 text-center"
                                                                >
                                                                    <td className="p-1">
                                                                        <p className="text-gray-800  text-sm">
                                                                            {
                                                                                product.productGroupName
                                                                            }
                                                                        </p>
                                                                    </td>
                                                                    <td className="p-1">
                                                                        <p className="text-gray-600 text-xs">
                                                                            {
                                                                                product.quantity
                                                                            }
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
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
