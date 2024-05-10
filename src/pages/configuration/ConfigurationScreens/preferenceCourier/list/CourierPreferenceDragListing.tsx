/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import ReactDragListView from 'react-drag-listview'

export interface CourierProps {
    _id: string
    courierName: string
    createdAt: string
    isActive: boolean
    isDeleted: boolean
    priority: string
    updatedAt: string
    __v: number
}

interface Props {
    rows: CourierProps[]
    handleUpdatePriority: (rows: CourierProps[]) => void
}

const CourierPreferenceDragListing: React.FC<Props> = ({
    rows,
    handleUpdatePriority,
}) => {
    const dragProps = {
        onDragEnd(fromIndex: number, toIndex: number) {
            const newData = [...rows] // Make a shallow copy of the array
            const [movedItem] = newData.splice(fromIndex, 1) // Remove the moved item
            newData.splice(toIndex, 0, movedItem) // Insert the moved item at the new index

            // Reassign priorities based on the new index
            const updatedData = newData.map((item, index) => ({
                ...item,
                priority: (index + 1).toString(),
            }))

            handleUpdatePriority(updatedData)
        },
        nodeSelector: 'tr',
        handleSelector: 'a',
        ignoreSelector: 'a',
        handle: '.drag-handle',
    }

    return (
        <div className="overflow-x-auto">
            <ReactDragListView {...dragProps}>
                <table
                    className="w-full table-auto border-collapse border"
                    id="courierTable"
                >
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Courier Name</th>
                            <th className="px-4 py-2">Priority</th>
                            <th className="px-4 py-2">Change </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((item, index) => (
                            <tr key={index} className="bg-white">
                                <td className="border px-4 py-2 ">
                                    <a
                                        href="#"
                                        className="cursor-move drag-handle block"
                                    >
                                        {index + 1}
                                    </a>
                                </td>
                                <td className="border px-4 py-2">
                                    <a
                                        href="#"
                                        className="cursor-move drag-handle block"
                                    >
                                        {item.courierName}
                                    </a>
                                </td>
                                <td className="border px-4 py-2">
                                    <a
                                        href="#"
                                        className="cursor-move drag-handle block"
                                    >
                                        {item.priority}
                                    </a>
                                </td>
                                <td className="border px-4 py-2">
                                    <a
                                        href="#"
                                        className="cursor-move drag-handle block"
                                    >
                                        Drag
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ReactDragListView>
        </div>
    )
}

export default CourierPreferenceDragListing
