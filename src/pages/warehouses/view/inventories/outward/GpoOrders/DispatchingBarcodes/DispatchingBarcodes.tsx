// |-- External Dependencies --|
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import { useParams, useNavigate, useLocation } from 'react-router-dom'

// |-- Redux --|
import BarcodeCard from 'src/components/UI/Barcode/BarcodeCard'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import { useUpdateBarcodeFreezedStatus } from 'src/hooks/useUpdateBarcodeFreezedStatus'
import { BarcodeListResponseType } from 'src/models'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'
import { useGetWarehouseBarcodeMutation } from 'src/services/BarcodeService'
import { useDispatchGPOOrdersToWarehouseMutation } from 'src/services/OrderService'
import { showToast } from 'src/utils'
import {
    barcodeStatusEnum,
    courierCompanyEnum,
} from 'src/utils/constants/enums'

type Props = {
    courierType: courierCompanyEnum | barcodeStatusEnum | any
}

const DispatchingBarcodes = ({ courierType }: Props) => {
    // state
    const [orderNumber, setOrderNumber] = useState<number | null>(null)
    const [barcodeNumber, setBarcodeNumber] = useState<any>('')
    const [products, setProducts] = useState<any>([])
    const { pathname } = useLocation()

    // warehouse id
    const params = useParams()
    const warehouseId = params?.id
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const [getBarCode] = useGetWarehouseBarcodeMutation()
    const [barcodeDispatch, barcodeDispatchInfo] =
        useDispatchGPOOrdersToWarehouseMutation()
        const { updateStatus } = useUpdateBarcodeFreezedStatus()


    const handleBarcodeSubmit = (barcodeNumber: string, index: number) => {
        getBarCode({
            warehouseId: (warehouseId as string) || '',
            barcode: barcodeNumber,
            status: courierType,
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    if (res?.data?.data) {
                        updateStatus({
                            status: true,
                            barcodes: [barcodeNumber],
                        })
                        const {
                            products: productsOfRes,
                            barcode: barcodeOfRes,
                            orderNumber: orderNumberRes,
                            customerName,
                            schemeQuantity,
                            address,
                        } = res?.data?.data

                        // setting the data with previous data
                        if (orderNumber) {
                            handleExistingData(products, barcodeOfRes)
                        } else {
                            handleNewData(
                                orderNumberRes,
                                productsOfRes,
                                barcodeOfRes,
                                customerName,
                                schemeQuantity,
                                address
                            )
                        }
                    }
                } else {
                    // showToast('error', 'barcode number is not matched')
                }
            })
            .catch((err) => console.error(err))
    }

    // first time call the function
    const handleNewData = (
        orderNumber: number,
        products: any,
        barcode: BarcodeListResponseType,
        customerName: string,
        schemeQuantity: number,
        address: string
    ) => {
        const newData = products?.map((ele: any) => {
            let barcodeObj =
                ele?.productGroupId === barcode?.productGroupId ? barcode : null
            return {
                ...ele,
                barcode: barcodeObj ? [barcodeObj] : [],
                customerName,
                schemeQuantity,
                address,
            }
        })
        setOrderNumber(orderNumber)
        setProducts(newData)
        dispatch(setFieldCustomized(true))
    }

    // after set the order number then gettting the barcode
    const handleExistingData = (
        products: any,
        newBarcode: BarcodeListResponseType
    ) => {
        const newData = products?.map((ele: any) => {
            const totalQuantityOfBarocde =
                ele?.schemeQuantity * ele?.productQuantity

            const isAlredyExist = ele?.barcode?.some((barcode: any) => {
                return barcode?.barcodeNumber === newBarcode?.barcodeNumber
            })

            let barcodeObj =
                ele?.productGroupId === newBarcode.productGroupId
                    ? newBarcode
                    : null

            return {
                ...ele,
                // set the barcode if barcode is founded , isAlredayExist is false and length is equal to schemeQuantity
                barcode:
                    barcodeObj &&
                        isAlredyExist === false &&
                        totalQuantityOfBarocde !== ele?.barcode?.length
                        ? [...ele?.barcode, barcodeObj]
                        : [...ele?.barcode],
            }
        })
        setProducts(newData)
    }

    // remove barcode
    const handleRemoveBarcode = (barcodeNumber: string) => {
        const newData = products?.map((ele: any) => {
            const filteredObj = ele?.barcode?.filter(
                (item: any) => item?.barcodeNumber !== barcodeNumber
            )
            // remove the specific barcode and set the previouse barcode
            return {
                ...ele,
                barcode: [...filteredObj],
            }
        })
        updateStatus({
            status: false,
            barcodes: [barcodeNumber],
        })
        setProducts(newData)
    }

    // final submitting
    const handleDispatchBarcode = () => {
        const filterValue = products?.map((ele: any) => {
            return ele?.barcode
        })

        barcodeDispatch({
            orderNumber: orderNumber,
            type: courierType,
            barcodes: [
                ...filterValue
                    ?.flat(1)
                    ?.map((ele: BarcodeListResponseType) => ({
                        barcodeId: ele?._id,
                        barcode: ele?.barcodeNumber,
                    })),
            ],
        })
            .then((res: any) => {

                if ('error' in res) {
                    showToast("error", res?.error?.data?.message)
                    return
                }

                if (res?.data?.status) {
                    dispatch(setFieldCustomized(false))
                    setOrderNumber(null)
                    setBarcodeNumber('')
                    setProducts([])
                    navigate(`/gpo/label-invoice?orderNumber=${orderNumber}`, {
                        state: { pathname: pathname },
                    })
                } else {
                    showToast('error', res?.data?.message)
                }
            }).catch((err: any) => {
                console.error(err)
            })
    }

    // for disable the input barcode number field and enable the dispatch button
    const handleDisableDispatchButton = () => {
        const schemeQ = products?.reduce((sum: number, product: any) => {
            let totalQuantity =
                product?.schemeQuantity * product?.productQuantity
            return (sum += totalQuantity)
        }, 0)

        const barcodeLength = products?.reduce((sum: number, product: any) => {
            return (sum += product?.barcode?.length)
        }, 0)

        return schemeQ === barcodeLength
    }

    useEffect(() => {
        const schemeQ = products?.reduce((sum: number, product: any) => {
            let totalQuantity =
                product?.schemeQuantity * product?.productQuantity
            return (sum += totalQuantity)
        }, 0)
        const barcodeLength = products.reduce((sum: number, product: any) => {
            return (sum += product?.barcode?.length)
        }, 0)

        if (schemeQ && barcodeLength) {
            if (barcodeLength === schemeQ) {
                handleDispatchBarcode()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    React.useEffect(() => {
        return () => {
            if (products?.barcode?.length) {
                const barcodeNumbers = products?.barcode?.map(
                    (barcode: any) => barcode.barcodeNumber
                )
                updateStatus({
                    status: false,
                    barcodes: [...barcodeNumbers],
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products?.barcode])
    return (
        <React.Fragment>
            <div className="border-b-slate-300 border-[1px] shadow p-4 my-4 rounded">
                <div className="mt-2 grid grid-cols-4 gap-x-4">
                    <ATMTextField
                        disabled={
                            orderNumber ? handleDisableDispatchButton() : false
                        }
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

                {orderNumber && (
                    <div className="mt-4  ">
                        <div className="flex gap-x-6">
                            <span className="font-semibold text-sm">
                                Order Number
                            </span>
                            {' : '}
                            <span className="font-semibold text-primary-main text-sm">
                                #{orderNumber}
                            </span>
                        </div>

                        <div className="flex gap-x-6">
                            <span className="font-semibold text-sm">
                                Scheme Quantity
                            </span>
                            {' : '}
                            <span className="font-semibold text-sm">
                                {products?.[0]?.schemeQuantity}
                            </span>
                        </div>

                        <div className="flex gap-x-6">
                            <span className="font-semibold text-sm">
                                Customer Name
                            </span>
                            {' : '}
                            <span className="font-semibold text-sm">
                                {products?.[0]?.customerName}
                            </span>
                        </div>

                        <div className="flex gap-x-10">
                            <span className="font-semibold text-sm">
                                Address
                            </span>
                            {' : '}
                            <span className="font-semibold text-sm flex flex-wrap">
                                {products?.[0]?.address}
                            </span>
                        </div>
                    </div>
                )}

                {products?.map((ele: any, productIndex: any) => {
                    let totalBarcodeQuantity =
                        ele?.schemeQuantity * ele?.productQuantity
                    return (
                        <div
                            key={productIndex}
                            className="bg-white shadow-md rounded-md overflow-hidden border-[1px] border-gray-500 my-5"
                        >
                            <div className="p-4">
                                <div className="font-bold text-sm">
                                    {ele?.productGroupName}
                                </div>

                                <div className="flex gap-x-6 text-sm">
                                    <div className="text-gray-700">
                                        Product Quantity :
                                    </div>
                                    <div>{ele?.productQuantity}</div>
                                </div>

                                <div className="flex gap-x-6 text-sm">
                                    <div className="text-gray-700">
                                        Total Quantity :
                                    </div>
                                    <div>
                                        {totalBarcodeQuantity} {' / '}
                                        {ele?.barcode?.length}
                                    </div>
                                </div>

                                <div className="grid grid-cols-5 gap-x-4">
                                    {ele?.barcode?.map(
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
                                                handleRemoveBarcode={() => {
                                                    handleRemoveBarcode(
                                                        barcode?.barcodeNumber
                                                    )
                                                }}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-end items-end ">
                {products.length ? (
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
                ) : null}
            </div>
        </React.Fragment>
    )
}

export default DispatchingBarcodes
