import React from 'react'
import { useLocation } from 'react-router-dom'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { OrderListResponse } from 'src/models'
import { useGetInvoiceByOrderNumberQuery } from 'src/services/OrderService'

const RetailLabel = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const orderNumber = queryParams.get('orderNumber')

    const { items } = useGetDataByIdCustomQuery<OrderListResponse>({
        useEndPointHook: useGetInvoiceByOrderNumberQuery(orderNumber, {
            skip: !orderNumber,
        }),
    })

    const totalPrice: number =
        (items?.shcemeQuantity || 0) * (items?.price || 0)

    // React.useEffect(() => {
    //     const printFunc = setTimeout(() => {
    //         window?.print()
    //     }, 1000)
    //     return () => {
    //         clearInterval(printFunc)
    //     }
    // }, [])
    return (
        <div className="bg-white p-4 py-2">
            <div className="flex py-6 items-center border-b border-gray-400 gap-x-8">
                <div>
                    <img src="/logo.jpg" className="h-20 w-half" alt="logo" />
                </div>
                <div className="flex flex-col font-medium">
                    <p className="text-2xl font-bold text-center ">Telemart</p>
                    <span className="">
                        Regd. Office:701 Atulya IT Park, Khandwa Road, Near
                        Crystal IT Park,Indore,Madhya
                    </span>
                    <div className="flex flex-col items-center">
                        <span> Pradesh-452001,India, </span>
                        <span> Phone :7770884999 </span>
                        <span> GSTIN : 23AATFT1962F1ZZ </span>
                    </div>
                </div>
            </div>

            <div className="flex justify-between gap-4 border-b-[1px] border-gray-400 ">
                <div className="flex flex-col border-r-[1px] border-gray-400 pr-10 pb-20">
                    <span className="font-medium">To</span>
                    <span className="font-medium">{items?.customerName}</span>
                    <span className="font-medium">
                        {items?.houseNumber},, PINCOD 403512MOB NO ,9209162825,
                        NEAR BY COLLEGE,,,
                    </span>
                    <div>
                        <span className="font-medium">
                            CITY :{' '}
                            <span className="font-normal">NORTH GOA</span>
                        </span>
                        <span className="font-medium">
                            {' '}
                            STATE : <span className="font-normal">GOA</span>
                        </span>
                        <span className="font-medium">
                            {' '}
                            PIN : <span className="font-normal">403512</span>
                        </span>
                    </div>
                    <span className="font-medium">MOBILE : 9209162825</span>
                </div>
                <div className="flex items-center flex-col font-bold text-[19px] p-2">
                    <span> CASH ON DELIVERY</span>
                    <span>AMOUNT TO COLLECT</span>
                    <span>Rs {totalPrice?.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex gap-4 border-b-[1px] border-gray-400 ">
                <div className="flex flex-col justify-between border-r-[1px] border-gray-400 pr-10">
                    <div>
                        <div className="flex gap-x-8">
                            <span className="font-semibold">Invoice No:</span>
                            <span className="font-semibold">
                                RI-Y24-0216617{' '}
                            </span>
                        </div>
                        <div className="flex gap-x-5 mt-4">
                            <span className="font-semibold">Invoice Date:</span>
                            <span className="font-semibold">14-Dec-2023</span>
                        </div>
                    </div>
                    <span className="font-bold text-lg">CASH ON DELIVERY</span>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <div className="ml-32">
                        <span className="font-bold text-lg">
                            Maersk Courier
                        </span>
                        <span className="pl-32 text-lg font-bold">
                            - Delhivery
                        </span>
                        <img
                            className=" w-[300px] h-[60px] mt-2"
                            src="https://static.vecteezy.com/system/resources/thumbnails/008/506/948/small/abstract-digital-code-scanner-barcode-template-for-social-media-payment-market-and-design-png.png"
                            alt=""
                        />
                        <p className="font-bold text-center text-lg mt-1">
                            AWB No. : {items?.awbNumber || '-'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 border-b-[1px] border-black">
                <div className="col-span-12">
                    <table className="border-none w-[100%]">
                        {/* table head */}
                        <thead>
                            <tr>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    VSKU
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    ITEM DESCRIPTION
                                </th>
                                <th className="pb-3 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    QTY
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    PRICE/UNIT
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    DISCOUNT
                                </th>
                                <th className="pb-3 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    SHIPPING CHARGES
                                </th>
                                <th className="pb-3 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    COLLECT
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-semibold border-l border-r text-[14px] border-black text-center py-1">
                                    -SC00147-
                                </td>
                                <td className="font-semibold border-l border-r text-[14px] border-black text-center py-1">
                                    {items?.schemeName}
                                </td>
                                <td className="font-semibold border-l border-r text-[14px] border-black text-center py-1">
                                    {items?.shcemeQuantity}
                                </td>
                                <td className="font-semibold border-l border-r text-[14px] border-black text-center py-1">
                                    {totalPrice?.toFixed(2)}
                                </td>
                                <td className="font-semibold border-l border-r text-[14px] border-black text-center py-1">
                                    -
                                </td>
                                <td className="font-semibold border-l border-r text-[14px] border-black text-center py-1">
                                    {items?.deliveryCharges}
                                </td>
                                <td className="font-semibold border-l border-r text-[14px] border-black text-center py-1">
                                    Rs. {items?.totalAmount?.toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex justify-between gap-4 border-t-[1px] border-b-[1px] border-gray-400 ">
                        <div className="flex justify-between items-end border-r-[1px] border-gray-400 w-1/2">
                            <div>
                                <span className="font-bold text-md">
                                    Total Pieces :{' '}
                                </span>
                                <span className="font-bold text-md">1</span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center w-1/2">
                            <div className="ml-32">
                                <img
                                    className=" w-[300px] h-[60px] mt-2"
                                    src="https://static.vecteezy.com/system/resources/thumbnails/008/506/948/small/abstract-digital-code-scanner-barcode-template-for-social-media-payment-market-and-design-png.png"
                                    alt=""
                                />
                                <p className="font-bold text-start text-xl mt-1">
                                    Order No. : {items?.orderNumber}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between gap-4 border-t-[1px] border-b-[1px] border-gray-400 ">
                        <div className="flex flex-col ">
                            <span className="text-md font-semibold">
                                If undelivered then return to :
                            </span>
                            <span className="text-md font-semibold">
                                Telemart
                            </span>
                            <span className="text-md font-semibold">
                                Godown Address: 188 Gayatri Nagar, Palda, Near
                                Goyal Flour Mill,,Indore
                            </span>
                            <span className="text-md font-semibold">
                                Madhya Pradesh,India-452020
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-end text-md font-semibold">
                Madhya Pradesh,India-452020
            </div>
        </div>
    )
}

export default RetailLabel
