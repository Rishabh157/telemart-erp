// |-- External Dependencies --|
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// |-- Redux --|
import BarcodeCard from 'src/components/UI/Barcode/BarcodeCard'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import { BarcodeListResponseType, OrderListResponse } from 'src/models'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'
import { useGetAllBarcodeOfDealerOutWardDispatchMutation } from 'src/services/BarcodeService'
import { useDispatchManualOrdersMutation } from 'src/services/OrderService'
import { showToast } from 'src/utils'
import { barcodeStatusEnum } from 'src/utils/constants/enums'
import { setSearchValue } from 'src/redux/slices/ListingPaginationSlice'
import { useUpdateBarcodeFreezedStatus } from 'src/hooks/useUpdateBarcodeFreezedStatus'

type Props = {
    items: OrderListResponse
}

const DispatchingBarcodesOfManualMapping = ({ items }: Props) => {
    // state
    const [barcodeNumber, setBarcodeNumber] = useState<any>([])
    const [barcodeList, setBarcodeList] = useState<any>([])
    const [products, setProducts] = useState<any[]>([])
    const dispatch = useDispatch<AppDispatch>()

    const [getBarCode] = useGetAllBarcodeOfDealerOutWardDispatchMutation()
    const [barcodeDispatch, barcodeDispatchInfo] =
        useDispatchManualOrdersMutation()
        const { updateStatus } = useUpdateBarcodeFreezedStatus()

    const handleBarcodeSubmit = (
        barcodeNumber: string,
        index: number,
        productGroupId: string
    ) => {
        getBarCode({
            id: barcodeNumber,
            groupId: productGroupId,
            status: barcodeStatusEnum.atWarehouse,
            isSendingToDealer: false
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    if (res?.data?.data) {
                        updateStatus({
                            status: true,
                            barcodes: [barcodeNumber],
                        })
                        let newBarcode = [...barcodeList]
                        if (!newBarcode[index]) {
                            newBarcode[index] = [...res?.data?.data]
                        } else {
                            newBarcode[index] = [
                                ...newBarcode[index],
                                ...res?.data?.data,
                            ]
                            const uniqueArray = Array.from(
                                new Set(
                                    newBarcode[index].map((obj: any) => obj._id)
                                )
                            ).map((id) =>
                                newBarcode[index].find(
                                    (obj: any) => obj._id === id
                                )
                            )
                            newBarcode[index] = [...uniqueArray]
                        }

                        setBarcodeList([...newBarcode])
                    }
                } else {
                    // showToast('error', 'barcode number is not matched')
                }
            })
            .catch((err) => console.error(err))
    }

    // remove barcode
    const handleRemoveBarcode = (barcodeNumber: string, ind: number) => {
        // eslint-disable-next-line array-callback-return
        const filteredObj = barcodeList[ind]?.filter((item: any) => {
            if (item?.barcodeNumber !== barcodeNumber) {
                return item
            }
        })
        let barcode = [...barcodeList]
        barcode[ind] = [...filteredObj]
        updateStatus({
            status: false,
            barcodes: [barcodeNumber],
        })
        setBarcodeList(barcode)
    }

    // final submitting
    const handleDispatchBarcode = () => {
        const filterValue = barcodeList
            ?.flat(1)
            ?.map((ele: BarcodeListResponseType) => {
                return {
                    barcodeId: ele?._id,
                    barcode: ele?.barcodeNumber,
                }
            })

        barcodeDispatch({
            orderNumber: items?.orderNumber,
            barcodes: [...filterValue],
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    dispatch(setFieldCustomized(false))
                    setBarcodeNumber('')
                    setProducts([])
                    setBarcodeList([])
                    dispatch(setSearchValue(''))
                    showToast('success', 'Order dispatched successfully')
                } else {
                    showToast('error', res?.data?.message)
                }
            })
            .catch((err: any) => {
                console.error(err)
            })
    }

    const handleDisableDispatchButton = (): boolean => {
        let totalBarcodeIn = barcodeList?.flat(1)?.length
        const totalSchemeProducts = items?.schemeProducts?.reduce(
            (sum, product) => {
                const totalSum = product.productQuantity * items?.shcemeQuantity
                return sum + totalSum
            },
            0
        )
        return totalSchemeProducts === totalBarcodeIn
    }

    useEffect(() => {
        const barcodeOfProducts = items?.schemeProducts?.map((product) => {
            return {
                productGroupId: product?.productGroupId,
                productGroupName: product?.productGroupName,
                productQuantity: product?.productQuantity,
            }
        })

        setProducts(barcodeOfProducts)
    }, [items])

    React.useEffect(() => {
        return () => {
            if (barcodeList?.length) {
                const barcodeNumbers = barcodeList?.map(
                    (barcode: any) => barcode.barcodeNumber
                )
                updateStatus({
                    status: false,
                    barcodes: [...barcodeNumbers],
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [barcodeList])

    return (
        <React.Fragment>
            <div className="border-b-slate-300 border-[1px] shadow  rounded">
                {products?.map((ele: any, productIndex: number) => {
                    const totalQuantity =
                        items?.shcemeQuantity * ele?.productQuantity
                    return (
                        <div
                            key={productIndex}
                            className="bg-white shadow-md rounded-md overflow-hidden p-4 my-4 border-[1px] border-gray-500"
                        >
                            <div className="mt-2 grid grid-cols-4 gap-x-4">
                                <ATMTextField
                                    disabled={
                                        barcodeList[productIndex]?.length ===
                                        totalQuantity
                                    }
                                    name=""
                                    value={barcodeNumber[productIndex]}
                                    label="Barcode Number"
                                    placeholder="enter barcode number"
                                    className="shadow bg-white rounded w-[50%]"
                                    onChange={(e) => {
                                        if (e.target.value?.length > 6) {
                                            handleBarcodeSubmit(
                                                e.target.value,
                                                productIndex,
                                                ele?.productGroupId
                                            )
                                        }
                                        setBarcodeNumber((prev: any) => {
                                            const updatedArray = [...prev] // Create a copy of the previous array
                                            updatedArray[productIndex] =
                                                e.target.value // Set the value at the desired index
                                            return updatedArray // Return the updated array
                                        })
                                    }}
                                />
                            </div>
                            <div className="pt-4">
                                <div className="font-bold  mb-2 text-sm">
                                    {ele?.productGroupName}
                                </div>
                                <div className="flex gap-x-6 mb-2">
                                    <div className="text-gray-700 text-sm">
                                        Products Quantity :
                                    </div>
                                    <div>
                                        {totalQuantity} {''}
                                        {barcodeList[productIndex]?.length
                                            ? ` / ${barcodeList[productIndex]?.length}`
                                            : null}
                                    </div>
                                </div>

                                <div className="grid grid-cols-5 gap-x-4">
                                    {barcodeList[productIndex]?.map(
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
                                                        barcode?.barcodeNumber,
                                                        productIndex
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
                <div className="flex justify-end items-end ">
                    {products?.length ? (
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
            </div>
        </React.Fragment>
    )
}

export default DispatchingBarcodesOfManualMapping
