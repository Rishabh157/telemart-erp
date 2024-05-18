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
import { BarcodeListResponseType } from 'src/models'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'
import { useGetWarehouseBarcodeMutation } from 'src/services/BarcodeService'
import { useDispatchGPOOrdersToWarehouseMutation } from 'src/services/OrderService'
import { showToast } from 'src/utils'
import { courierCompanyEnum } from 'src/utils/constants/enums'

type Props = {
    courierType: courierCompanyEnum
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

    const handleBarcodeSubmit = (barcodeNumber: string, index: number) => {
        getBarCode({
            warehouseId: (warehouseId as string) || '',
            barcode: barcodeNumber,
            status: courierType,
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    if (res?.data?.data) {
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
            let prevBarcode = [...ele?.barcode] || []

            const isAlredyExist = prevBarcode?.some((barcode: any) => {
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
                    ele?.schemeQuantity !== ele?.barcode?.length
                        ? [...prevBarcode, barcodeObj]
                        : [...prevBarcode],
            }
        })
        setProducts(newData)
    }

    // remove barcode
    const handleRemoveBarcode = (barcodeNumber: string) => {
        const newData = products?.map((ele: any) => {
            let prevBarcode = [...ele?.barcode] || []

            const filteredObj = prevBarcode?.filter(
                (item: any) => item?.barcodeNumber !== barcodeNumber
            )

            // remove the specific barcode and set the previouse barcode
            return {
                ...ele,
                barcode: [...filteredObj],
            }
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
                if (res?.data?.status) {
                    dispatch(setFieldCustomized(false))
                    navigate(`/gpo/invoice?orderNumber=${orderNumber}`, {
                        state: { pathname: pathname },
                    })
                    setOrderNumber(null)
                    setBarcodeNumber('')
                    setProducts([])
                } else {
                    showToast('error', res?.data?.message)
                }
            })
            .catch((err: any) => {
                console.error(err)
            })
    }

    const handleDisableDispatchButton = () => {
        const schemeQ = products.reduce((sum: number, product: any) => {
            return (sum += product.schemeQuantity)
        }, 0)
        const barcodeLength = products.reduce((sum: number, product: any) => {
            return (sum += product?.barcode?.length)
        }, 0)
        return schemeQ === barcodeLength
    }

    useEffect(() => {
        const schemeQ = products.reduce((sum: number, product: any) => {
            return (sum += product.schemeQuantity)
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
                                Customer Name
                            </span>
                            {' : '}
                            <span className="font-semibold text-sm">
                                {products?.[0]?.customerName}
                            </span>
                        </div>

                        <div className="flex gap-x-6">
                            <span className="font-semibold text-sm">
                                Order Number
                            </span>
                            {' : '}
                            <span className="font-semibold text-sm">
                                {orderNumber}
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
                    return (
                        <div
                            key={productIndex}
                            className="bg-white shadow-md rounded-md overflow-hidden border-[1px] border-gray-500 my-5"
                        >
                            <div className="p-4">
                                <div className="font-bold text-lg mb-2">
                                    {ele?.productGroupName}
                                </div>
                                <div className="flex gap-x-6 mb-2">
                                    <div className="text-gray-700">
                                        Quantity :
                                    </div>
                                    <div>
                                        {products?.[0]?.schemeQuantity} {' / '}
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
