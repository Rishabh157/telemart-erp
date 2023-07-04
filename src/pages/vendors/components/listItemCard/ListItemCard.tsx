/// ==============================================
// Filename:ListItemCard.tsx
// Type: card Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const ListItemCard = ({ item }: { item: any }) => {
    const navigate = useNavigate()
    const { vendorId } = useParams()
    const location = useLocation()
    const pathValue = location.pathname.split('/')[3] || 'general-information'

    useEffect(() => {
        document
            .getElementById(vendorId || '')
            ?.scrollIntoView({ behavior: 'smooth' })
    }, [vendorId])

    return (
        <div
            id={item._id}
            onClick={() => {
                navigate(`/vendors/${item._id}/${pathValue}`)
            }}
            key={item._id}
            className="flex gap-4 border-b items-center  px-3 py-1 cursor-pointer"
        >
            <div>
                <div
                    className={`h-[37px] w-[37px] flex justify-center items-center rounded text-white transition-all duration-[500ms] ${
                        vendorId === item._id
                            ? 'bg-primary-main'
                            : 'bg-slate-300 '
                    } `}
                >
                    {' '}
                    {item.vendorName[0].toUpperCase()}{' '}
                </div>
            </div>

            <div className="flex flex-col gap-1 ">
                <div
                    className={`text-md transition-all duration-[500ms] ${
                        vendorId === item._id
                            ? 'text-primary-main'
                            : 'text-slate-700'
                    } `}
                >
                    {item.vendorName}
                </div>
                <div
                    className={`text-sm transition-all duration-[500ms] ${
                        vendorId === item._id
                            ? 'text-primary-main'
                            : 'text-slate-500'
                    }`}
                >
                    {item.mobile}
                </div>
            </div>
        </div>
    )
}

export default ListItemCard
