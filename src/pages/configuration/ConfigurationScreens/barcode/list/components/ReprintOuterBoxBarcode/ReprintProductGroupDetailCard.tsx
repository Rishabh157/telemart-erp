/* eslint-disable react-hooks/exhaustive-deps */
// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { BiCheck } from 'react-icons/bi'
// import { HiDotsVertical } from 'react-icons/hi'
import { ProductBarcodeGroupResponse } from 'src/models'
import moment from 'moment'
import { BsPrinter } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { ReprintOuterboxBarcodeListResponse } from './ReprintOuterBoxBarcode'

// |-- Redux --|
import { AppDispatch } from 'src/redux/store'
import { setBarcodesToPrint } from 'src/redux/slices/barcodeSlice'

// |-- Types --|
type BarcodeCardProps = {
    cardBoxBarcodeList: ReprintOuterboxBarcodeListResponse[]
    selectedProductGroupBarcodes: ProductBarcodeGroupResponse[]
    onProductGroupBarcodeSelect: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        barcode: ProductBarcodeGroupResponse,
        isBarcodeSeleted: boolean
    ) => void
    onBarcodeClick: (barcode: ProductBarcodeGroupResponse) => void
}

const ReprintProductGroupDetailCard = ({
    cardBoxBarcodeList,
    selectedProductGroupBarcodes,
    onProductGroupBarcodeSelect,
    onBarcodeClick,
}: BarcodeCardProps) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [barcodes, setBarcodes] = useState<string[]>([])
    const [outerBarcode, setOuterBarcode] = useState<any>({})

    useEffect(() => {
        if (barcodes.length) {
            dispatch(setBarcodesToPrint(barcodes))
            if (barcodes?.length) {

                navigate(`/barcodes-outerbox`, {
                    state: {
                        path: `/configurations/barcode`,
                        outerBoxCode: outerBarcode?.outerBoxNumber,
                        productGroupLabel: outerBarcode?.productLabel,
                        productCode: outerBarcode?.productCode || '',
                        expiryDate: outerBarcode?.expiryDate,
                        lotNumber: outerBarcode?.batchNumber,
                    },
                })
            }
        }
    }, [barcodes])

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3  gap-5 py-3 px-3">
                {cardBoxBarcodeList.map(
                    (barcode: ReprintOuterboxBarcodeListResponse) => {
                        const isBarcodeSeleted =
                            selectedProductGroupBarcodes.findIndex(
                                (selected) => selected._id === barcode._id
                            ) !== -1

                        return (
                            <div
                                key={barcode?._id}
                                className={`flex flex-col gap-2 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer ${false
                                        ? ' border-red-500'
                                        : 'border-slate-200'
                                    }`}
                            >
                                {/*Checkbox */}
                                <button
                                    onClick={(e) =>
                                        onProductGroupBarcodeSelect(
                                            e,
                                            barcode as any,
                                            isBarcodeSeleted
                                        )
                                    }
                                    className={`flex justify-center items-center h-5 w-5 rounded-full border border-slate-400 shadow font-bold absolute -right-2 -top-2
                                    ${isBarcodeSeleted
                                            ? 'bg-green-500 text-white'
                                            : 'bg-white'
                                        }`}
                                >
                                    {isBarcodeSeleted && <BiCheck />}
                                </button>

                                <div className="flex justify-between">
                                    <div>
                                        {/* Used Chip */}
                                        {false && (
                                            <span className="text-white bg-red-500 px-2 text-[11px] rounded-full inline-flex items-center py-[1px] font-medium">
                                                Used
                                            </span>
                                        )}
                                    </div>
                                    {/* <div>
                                        <HiDotsVertical />
                                    </div> */}
                                </div>
                                <div className="flex justify-between">
                                    <div className=" text-slate-500 mr-10 w-34">
                                        Outerbox Barcode :-
                                    </div>
                                    <div className="text-primary-main font-medium grow flex items-end">
                                        {barcode?.outerBoxNumber}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className=" text-slate-500 mr-10 w-34">
                                        Lot Number :-
                                    </div>
                                    <div className="text-primary-main font-medium grow flex items-end">
                                        {barcode?.batchNumber}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className=" text-slate-500 mr-10 w-34">
                                        Barcode Count :-
                                    </div>
                                    <div className="text-primary-main font-medium grow flex items-end">
                                        {barcode?.innerBarcodes?.length}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className=" text-slate-500 mr-10 w-34">
                                        Created By :-
                                    </div>
                                    <div className="text-primary-main font-medium grow flex items-end">
                                        {barcode?.createdBy}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className=" text-slate-500 mr-10 w-34">
                                        Created Date :-
                                    </div>
                                    <div className="text-primary-main font-medium grow flex items-end">
                                        {moment(barcode?.createdAt).format(
                                            'YYYY/MM/D'
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className=" text-slate-500 mr-10 w-34">
                                        Created Time :-
                                    </div>
                                    <div className="text-primary-main font-medium grow flex items-end">
                                        {moment(barcode?.createdAt).format(
                                            'hh:mm A'
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className=" text-slate-500 mr-10 w-34">
                                        Product group :-
                                    </div>
                                    <div className="text-primary-main font-medium grow flex items-end">
                                        {barcode?.productLabel}{' '}
                                    </div>
                                </div>
                                <ATMLoadingButton
                                    className=" w-full"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setBarcodes(barcode?.innerBarcodes)
                                        setOuterBarcode(barcode)
                                    }}
                                >
                                    <div className="flex gap-2 items-center justify-center">
                                        <BsPrinter className="text-xl" /> Print
                                    </div>
                                </ATMLoadingButton>
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}

export default ReprintProductGroupDetailCard
