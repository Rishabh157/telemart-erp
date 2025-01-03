// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
// import { HiDotsVertical } from 'react-icons/hi'
import { ProductBarcodeGroupResponse } from 'src/models'
import moment from 'moment'
import { BsPrinter } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { useGetAllByGroupQuery } from 'src/services/BarcodeService'

// |-- Redux --|
import { AppDispatch } from 'src/redux/store'
import { setBarcodesToPrint } from 'src/redux/slices/barcodeSlice'

// |-- Types --|
type BarcodeCardProps = {
    cardBoxBarcodeList: ProductBarcodeGroupResponse[]
    selectedProductGroupBarcodes: ProductBarcodeGroupResponse[]
    onProductGroupBarcodeSelect: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        barcode: ProductBarcodeGroupResponse,
        isBarcodeSeleted: boolean
    ) => void
    onBarcodeClick: (barcode: ProductBarcodeGroupResponse) => void
}

const ProductGroupDetailCard = ({
    cardBoxBarcodeList,
    selectedProductGroupBarcodes,
    onProductGroupBarcodeSelect,
    onBarcodeClick,
}: BarcodeCardProps) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [groupId, setGroupId] = useState('')

    const { data, isLoading, isFetching } = useGetAllByGroupQuery(groupId, {
        skip: !groupId,
    })

    useEffect(() => {
        if (!isLoading && !isFetching) {

            const allBarcodes = data?.data?.map((ele: any) => {
                return {
                    barcodeNumber: ele?.barcodeNumber,
                    upperBarcodeNumber: ele?.upperBarcodeNumber
                }
            })

            dispatch(setBarcodesToPrint(allBarcodes))

            if (data?.data !== undefined) {
                navigate('/barcodes', {
                    state: { path: '/configurations/barcode' },
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isLoading, isFetching])

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5 py-3 px-3">
                {cardBoxBarcodeList?.map((barcode: ProductBarcodeGroupResponse) => {
                    return (
                        <div
                            key={barcode?._id}
                            className='flex flex-col gap-2 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer border-slate-200'
                        >
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
                                <div className=" text-slate-500 w-1/2">
                                    Vendor Name :-
                                </div>
                                <div className="text-primary-main font-medium w-full truncate grow flex items-end">
                                    <span className='w-full truncate'
                                        title={barcode?.vendorLabel}>
                                        {barcode?.vendorLabel}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className=" text-slate-500 mr-10 w-34">
                                    Product group :-
                                </div>
                                <div className="text-primary-main font-medium grow flex items-end">
                                    {barcode?.productGroupLabel}{' '}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className=" text-slate-500 mr-10 w-34">
                                    Created Date :-
                                </div>
                                <div className="text-primary-main font-medium grow flex items-end">
                                    {moment(barcode?.createdAt).format('YYYY/MM/D')}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className=" text-slate-500 mr-10 w-34">
                                    Created Time :-
                                </div>
                                <div className="text-primary-main font-medium grow flex items-end">
                                    {moment(barcode?.createdAt).format('hh:mm A')}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className=" text-slate-500 mr-10 w-34">
                                    Barocde Numbers :-
                                </div>
                                <div className="text-primary-main font-medium grow flex items-end">
                                    {barcode?.barcodeLength}{' '}
                                </div>
                            </div>
                            <ATMLoadingButton
                                className=" w-full"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setGroupId(barcode?._id)
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
            {/* {barcode?.length ? <AllBarcodes barcodes={barcode} /> : null} */}
        </div>
    )
}

export default ProductGroupDetailCard
