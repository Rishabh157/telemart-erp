import React from 'react'

type Props = {
    preferredCourier: {
        label: string
        value: string
    }[]
}

const PrirorityTable = ({ preferredCourier }: Props) => {
    return (
        <div className="container mx-auto py-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-2/6 px-4 py-2 text-left">
                                Priority
                            </th>
                            <th className="w-4/6 px-4 py-2 text-left">
                                Courier Name
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {preferredCourier?.map((ele: any, ind: number) => {
                            return (
                                <tr
                                    key={ind.toString()}
                                    className="bg-gray-100"
                                >
                                    <td className="border px-4 py-2">
                                        {ind + 1}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {ele?.label}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PrirorityTable
