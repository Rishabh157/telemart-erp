// |-- External Dependencies --|
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import BarcodeCard from 'src/components/UI/Barcode/BarcodeCard'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import { BarcodeListResponseType } from 'src/models'
import { showToast } from 'src/utils'

// |-- Redux --|
import { AppDispatch } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useGetBarcodeOfEcomOrderMutation, useDispatchBarcodeOfEcomOrderMutation } from 'src/services/EcomOrdersMasterService'
import { useUpdateBarcodeFreezedStatus } from 'src/hooks/useUpdateBarcodeFreezedStatus'


type Props = {
    ecomType: string
}

const DispatchingEcomBarcodes = ({ ecomType }: Props) => {

    const [barcodeNumber, setBarcodeNumber] = useState<any>('')
    const [orderDetails, setOrderDetails] = useState({
        orderNumber: null,
        orderId: '',
        productCode: '',
        quantity: 0,
        itemPrice: 0,
        barcode: [],
    });

    const updateBarcodeStatus = useUpdateBarcodeFreezedStatus(); // Get the function from the hook
    const [getBarCode] = useGetBarcodeOfEcomOrderMutation()
    const [barcodeDispatch, barcodeDispatchInfo] = useDispatchBarcodeOfEcomOrderMutation()
    const dispatch = useDispatch<AppDispatch>();

    const params = useParams()
    const warehouseId = params.id

    // Getting the barcode while scanned
    const handleBarcodeSubmit = (barcodeNumber: string, index: number) => {

        getBarCode({
            barcodeNumber,
            type: ecomType,
        }).then((res: any) => {

            if (res?.data?.status) {
                if (res?.data?.data) {
                    const {
                        orderNumber,
                        orderId,
                        productCode,
                        quantity,
                        itemPrice,
                        barcode,
                    } = res?.data?.data

                    // setting the data with previous data
                    if (!orderDetails?.orderNumber) {
                        handleNewData(
                            orderNumber,
                            orderId,
                            productCode,
                            quantity,
                            itemPrice,
                            barcode,
                        )
                    } else {
                        handleExistingData(barcode)
                    }
                }
            } else {
                showToast('error', res?.data?.message);
            }
        })
            .catch((err) => console.error(err))
    }

    // first time call the function
    const handleNewData = async (
        orderNumber: number,
        orderId: string,
        productCode: string,
        quantity: number,
        itemPrice: number,
        barcode: any,
    ) => {
        setOrderDetails((prev: any) => ({
            ...prev,
            orderNumber,
            orderId,
            productCode,
            quantity,
            itemPrice,
            barcode: [{ ...barcode }]
        }))

        dispatch(setFieldCustomized(true))

        // freezed the barcode status
        updateBarcodeStatus({
            status: true,
            barcodes: [barcode?.barcodeNumber]
        });
    }

    // after set the order number then gettting the barcode
    const handleExistingData = async (
        barcode: BarcodeListResponseType
    ) => {
        const isBarcodeExist = orderDetails?.barcode?.some((ele: BarcodeListResponseType) => ele?.barcodeNumber === barcode?.barcodeNumber);

        if (!isBarcodeExist) {
            setOrderDetails((prev: any) => ({
                ...prev,
                barcode: [...prev.barcode, barcode]
            }))

            // freezed the barcode status
            updateBarcodeStatus({
                status: true,
                barcodes: [barcode?.barcodeNumber]
            });

        } else {
            showToast('error', 'Barcode already scanned!');
        }
    }

    // remove barcode
    const handleRemoveBarcode = async (barcodeNumber: string) => {
        const isBarcodeExist = orderDetails?.barcode?.some((ele: BarcodeListResponseType) => ele?.barcodeNumber === barcodeNumber);

        const filteredObj = orderDetails?.barcode?.filter(
            (item: BarcodeListResponseType) => item?.barcodeNumber !== barcodeNumber
        )

        if (isBarcodeExist) {
            setOrderDetails((prev: any) => ({
                ...prev,
                barcode: filteredObj
            }))

            // freezed the barcode status
            updateBarcodeStatus({
                status: false,
                barcodes: [barcodeNumber]
            });

        }
    }

    // FINAL DISPATCHING THE BARCODES
    const handleDispatchBarcode = async () => {

        const payloadValue = {
            orderNumber: orderDetails.orderNumber,
            type: ecomType,
            warehouseId: warehouseId,
            barcodes: orderDetails?.barcode?.map((ele: BarcodeListResponseType) => {
                return {
                    barcode: ele?.barcodeNumber,
                    barcodeId: ele?._id
                }
            }),
        }

        barcodeDispatch(payloadValue)
            .then((res: any) => {
                if (res?.data?.status) {
                    dispatch(setFieldCustomized(false))
                    // reset the state
                    setBarcodeNumber('')
                    setOrderDetails({
                        orderNumber: null,
                        orderId: '',
                        productCode: '',
                        quantity: 0,
                        itemPrice: 0,
                        barcode: [],
                    })
                    showToast('success', res?.data?.message)
                } else {
                    showToast('error', res?.data?.message)
                }
            })
            .catch((err: any) => {
                console.error(err)
            })
    }

    // for disable the input barcode number field and enable the dispatch button
    const handleDisableDispatchButton = () => orderDetails?.quantity === orderDetails?.barcode?.length

    return (
        <React.Fragment>
            <div className="border-b-slate-300 border-[1px] shadow p-4 my-4 rounded">
                <div className="mt-2 grid grid-cols-4 gap-x-4">
                    <ATMTextField
                        disabled={orderDetails?.orderNumber ? handleDisableDispatchButton() : false}
                        name=""
                        value={barcodeNumber}
                        label="Barcode Number"
                        placeholder="enter barcode number"
                        className="shadow bg-white rounded w-[50%] "
                        onChange={(e) => {
                            if (e.target.value?.length > 6) {
                                handleBarcodeSubmit(e.target.value, 0)
                            }
                            setBarcodeNumber(
                                e.target.value // Set the value at the desired index
                            )
                        }}
                    />
                </div>

                {orderDetails.orderNumber && (
                    <div className="mt-4  ">
                        <div className="flex gap-x-6">
                            <span className="font-semibold text-sm">
                                Order Number
                            </span>
                            {' : '}
                            <span className="font-semibold text-primary-main text-sm">
                                #{orderDetails?.orderNumber}
                            </span>
                        </div>

                        <div className="flex gap-x-6">
                            <span className="font-semibold text-sm">
                                Order ID
                            </span>
                            {' : '}
                            <span className="font-semibold text-sm">
                                {orderDetails?.orderId}
                            </span>
                        </div>

                        <div className="flex gap-x-6">
                            <span className="font-semibold text-sm">
                                Product Code
                            </span>
                            {' : '}
                            <span className="font-semibold text-sm">
                                {orderDetails?.productCode}
                            </span>
                        </div>

                        <div className="flex gap-x-6">
                            <span className="font-semibold text-sm">
                                Scheme Quantity
                            </span>
                            {' : '}
                            <span className="font-semibold text-sm">
                                {orderDetails.quantity}
                            </span>
                        </div>

                        <div className="flex gap-x-6">
                            <span className="font-semibold text-sm">
                                Total Price
                            </span>
                            {' : '}
                            <span className="font-semibold text-sm">
                                {orderDetails.quantity * orderDetails.itemPrice}
                            </span>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-5 gap-x-4">
                    {orderDetails?.barcode?.map(
                        (
                            barcode: BarcodeListResponseType,
                            barcodeIndex: number
                        ) => (
                            <BarcodeCard
                                key={barcodeIndex}
                                barcodeNumber={
                                    barcode?.barcodeNumber
                                }
                                productGroupLabel={capitalizeFirstLetter(
                                    barcode?.productGroupLabel ||
                                    ''
                                )}
                                handleRemoveBarcode={() => handleRemoveBarcode(barcode?.barcodeNumber)}
                            />
                        )
                    )}
                </div>
            </div>

            <div className="flex justify-end items-end ">
                <div>
                    <ATMLoadingButton
                        disabled={!handleDisableDispatchButton()}
                        isLoading={barcodeDispatchInfo?.isLoading}
                        loadingText="Dispatching"
                        onClick={() => handleDispatchBarcode()}
                        className="bg-primary-main text-white flex items-center py-1 px-4 rounded"

                    >
                        Dispatch
                    </ATMLoadingButton>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DispatchingEcomBarcodes
