/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:OutwardRTVTabsListingWrapper.tsx
// Type: List Component
// Last Updated: OCTOBER 12, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { IconType } from 'react-icons'
import { IoRemoveCircle } from 'react-icons/io5'

// |-- Internal Dependencies --|
// import { useParams } from 'react-router-dom'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { SoApprovedGroupListResponseType } from 'src/models/OutwardRequest.model'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'

// |-- Redux --|
import { useDispatch, useSelector } from 'react-redux'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { AlertText } from 'src/pages/callerpage/components/constants'

// |-- Redux --|F
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/saleOrderSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    useDispatchDealerBarcodeMutation,
    useGetAllBarcodeOfDealerOutWardDispatchMutation,
} from 'src/services/BarcodeService'
import { useGetPaginationReturnToVendorByGroupQuery } from 'src/services/ReturnToVendorService'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import OutwardRTVTabs from './OutwardRTVTabs'

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

type BarcodeListResponseType = {
    _id: string
    productGroupId: string
    barcodeNumber: string
    barcodeGroupNumber: string
    lotNumber: string
    isUsed: boolean
    wareHouseId: string
    dealerId: string | null
    status: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    __v: number
    createdAt: string
    updatedAt: string
}

const OutwardRTVTabsListingWrapper = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [barcodeNumber, setBarcodeNumber] = useState<any>([])
    const [barcodeQuantity, setBarcodeQuantity] = useState<number>(0)
    const [barcodeList, setBarcodeList] = useState<any>([])
    const [selectedItemsTobeDispatch, setSelectedItemsTobeDispatch] =
        useState<SoApprovedGroupListResponseType | null>(null)
    // const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    // const dealerId = params.dealerId
    const salesOrderState: any = useSelector(
        (state: RootState) => state.saleOrder
    )
    const { page, rowsPerPage, searchValue, items } = salesOrderState
    const { customized } = useSelector((state: RootState) => state?.auth)

    const {
        data: soData,
        isFetching: soIsFetching,
        isLoading: soIsLoading,
    } = useGetPaginationReturnToVendorByGroupQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['rtvNumber'],
        page: page,
        filterBy: [
            // {
            //     fieldName: 'dealerId',
            //     value: dealerId,
            // },
            {
                fieldName: 'firstApproved',
                value: true,
            },
            {
                fieldName: 'secondApproved',
                value: true,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    const [getBarCode] = useGetAllBarcodeOfDealerOutWardDispatchMutation()
    const [barcodeDispatch, barcodeDispatchInfo] =
        useDispatchDealerBarcodeMutation()

    useEffect(() => {
        if (!soIsFetching && !soIsLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(soData?.data || []))
            dispatch(setTotalItems(soData?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }
    }, [soIsLoading, soIsFetching, soData, dispatch])

    const columns: columnTypes[] = [
        {
            field: 'soNumber',
            headerName: 'So Number',
            flex: 'flex-[0.6_0.6_0%]',
            renderCell: (row: SoApprovedGroupListResponseType) => (
                <span> {row?._id} </span>
            ),
        },
        {
            field: 'dealerLabel',
            headerName: 'Dealer Name',
            flex: 'flex-[0.6_0.6_0%]',
            align: 'center',
            renderCell: (row: SoApprovedGroupListResponseType) => (
                <span> {row?.dealerName} </span>
            ),
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: SoApprovedGroupListResponseType) => {
                return (
                    <div className="w-full">
                        {row?.documents?.map((item) => {
                            return (
                                <div className="grid grid-cols-3 border border-slate-400 mb-1 rounded text-center">
                                    <div className="col-span-2 border-r-[1px] border-slate-400 py-1 px-2">
                                        {item?.productSalesOrder?.groupName}
                                    </div>
                                    <div className="col-span-1 py-1 px-2">
                                        {item?.productSalesOrder?.quantity}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            },
        },
        {
            field: 'createdAt',
            headerName: 'Inserted Date',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: SoApprovedGroupListResponseType) => {
                return <span> {formatedDateTimeIntoIst(row?.createdAt)} </span>
            },
        },
        {
            field: 'updatedAt',
            headerName: 'Updated Date',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: SoApprovedGroupListResponseType) => {
                return <span> {formatedDateTimeIntoIst(row?.updatedAt)} </span>
            },
        },
        {
            field: 'status',
            headerName: 'status',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: SoApprovedGroupListResponseType) => (
                <span>{row?.documents[0]?.status}</span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Dispatch',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: SoApprovedGroupListResponseType) =>
                row?.documents?.find((ele) => ele?.status === 'COMPLETE') ? (
                    'Dispatched'
                ) : (
                    <ActionPopup
                        handleOnAction={() => {}}
                        moduleName={UserModuleNameTypes.saleOrder}
                        children={
                            <>
                                <button
                                    onClick={() => {
                                        setIsShow(true)
                                        const totalQuantity =
                                            row?.documents?.reduce(
                                                (sum, ele) => {
                                                    return (sum +=
                                                        ele?.productSalesOrder
                                                            ?.quantity)
                                                },
                                                0
                                            )
                                        setBarcodeQuantity(totalQuantity)
                                        setSelectedItemsTobeDispatch(row)
                                    }}
                                    className="block w-full text-left  hover:bg-gray-100"
                                >
                                    <div
                                        className="block px-4 py-2"
                                        onClick={() => {}}
                                    >
                                        Dispatch
                                    </div>
                                </button>
                            </>
                        }
                    />
                ),
            align: 'end',
        },
    ]

    const handleReload = () => {
        if (customized) {
            const confirmValue: boolean = window.confirm(AlertText)
            if (confirmValue) {
                dispatch(setFieldCustomized(false))
                setIsShow(!isShow)
                setSelectedItemsTobeDispatch(null)
            }
        } else {
            setIsShow(!isShow)
            setSelectedItemsTobeDispatch(null)
        }
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

        setBarcodeList(barcode)
    }

    const handleBarcodeSubmit = (
        barcodeNumber: string,
        index: number,
        productGroupId: string
    ) => {
        dispatch(setFieldCustomized(true))
        getBarCode({ id: barcodeNumber, groupId: productGroupId })
            .then((res: any) => {
                if (res?.data?.status) {
                    if (res?.data?.data) {
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

    const handleDispatchBarcode = () => {
        const filterValue = barcodeList?.flat(1)?.map((ele: any) => {
            if (!ele) return ele

            const {
                // barcodeNumber,
                createdAt,
                isActive,
                isDeleted,
                updatedAt,
                cartonBoxId,
                status,
                __v,
                ...rest
            } = ele
            return rest
        })

        const soid = selectedItemsTobeDispatch?.documents?.map(
            (ele: any) => ele?._id as string
        )
        barcodeDispatch({
            barcodedata: [...filterValue],
            soId: [...(soid as string[])] as string[],
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    showToast('success', 'dispatched successfully')
                    setIsShow(false)
                    dispatch(setFieldCustomized(false))
                } else {
                    showToast('error', res?.data?.message)
                }
            })
            .catch((err: any) => {
                console.error(err)
            })
    }

    const handleDisableDispatchButton = () => {
        return barcodeQuantity === barcodeList?.flat(1)?.length
    }

    useEffect(() => {
        if (selectedItemsTobeDispatch?.documents.length) {
            const barcode = Array(
                selectedItemsTobeDispatch?.documents.length
            ).fill(null)
            setBarcodeList(barcode)
            setBarcodeNumber(barcode)
        }
    }, [selectedItemsTobeDispatch?.documents])

    return (
        <>
            <OutwardRTVTabs columns={columns} rows={items} />
            <DialogLogBox
                isOpen={isShow}
                fullScreen={true}
                buttonClass="cursor-pointer"
                maxWidth="lg"
                handleClose={() => {
                    handleReload()
                }}
                component={
                    <div className="px-4 pt-2 pb-6">
                        {/* SO NO. & DEALER NAME */}
                        <div className="grid grid-cols-4 border-b-[1px] pb-2 border-black">
                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className="font-bold">RTV Number</div>
                                    {':'}
                                    <div className="">
                                        {selectedItemsTobeDispatch?._id}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className="font-bold">Dealer Name</div>
                                    {':'}
                                    <div className="">
                                        {selectedItemsTobeDispatch?.dealerName}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedItemsTobeDispatch?.documents?.map(
                            (document, docIndex) => {
                                return (
                                    <div
                                        className="pb-6 border-b-[1px] border-black last:border-none"
                                        key={docIndex}
                                    >
                                        <div className="grid grid-cols-4 mt-2">
                                            <div>
                                                <div>
                                                    <span className="font-bold">
                                                        Item Name
                                                    </span>
                                                    <span className="px-4">
                                                        :
                                                    </span>
                                                    <span>
                                                        {
                                                            document
                                                                ?.productSalesOrder
                                                                ?.groupName
                                                        }
                                                    </span>
                                                </div>

                                                <div>
                                                    <span className="font-bold">
                                                        Quantity
                                                    </span>
                                                    <span className="pl-[2.23rem] pr-[1rem]">
                                                        :
                                                    </span>
                                                    <span>
                                                        {
                                                            document
                                                                ?.productSalesOrder
                                                                ?.quantity
                                                        }
                                                        {barcodeList[docIndex]
                                                            ?.length ? (
                                                            <> / </>
                                                        ) : (
                                                            ''
                                                        )}
                                                        {
                                                            barcodeList[
                                                                docIndex
                                                            ]?.length
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 grid grid-cols-12 gap-x-4">
                                            <div className="col-span-3">
                                                <ATMTextField
                                                    disabled={
                                                        barcodeList[docIndex]
                                                            ?.length ===
                                                        document
                                                            ?.productSalesOrder
                                                            ?.quantity
                                                    }
                                                    name=""
                                                    value={
                                                        barcodeNumber[docIndex]
                                                    }
                                                    label="Barcode Number"
                                                    placeholder="enter barcode number"
                                                    className="shadow bg-white rounded w-[50%] "
                                                    onChange={(e) => {
                                                        if (
                                                            e.target.value
                                                                ?.length > 6
                                                        ) {
                                                            handleBarcodeSubmit(
                                                                e.target.value,
                                                                docIndex,
                                                                document
                                                                    ?.productSalesOrder
                                                                    ?.productGroupId
                                                            )
                                                        }
                                                        setBarcodeNumber(
                                                            (prev: any) => {
                                                                const updatedArray =
                                                                    [...prev] // Create a copy of the previous array
                                                                updatedArray[
                                                                    docIndex
                                                                ] =
                                                                    e.target.value // Set the value at the desired index
                                                                return updatedArray // Return the updated array
                                                            }
                                                        )
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-x-4">
                                            {barcodeList[docIndex]?.map(
                                                (
                                                    barcode: BarcodeListResponseType,
                                                    barcodeIndex: number
                                                ) => {
                                                    return (
                                                        <div
                                                            key={barcodeIndex}
                                                            onClick={() => {
                                                                // onBarcodeClick(barcode)
                                                            }}
                                                            className={`flex flex-col gap-2 my-4 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer`}
                                                        >
                                                            <div className="flex justify-between">
                                                                <div>
                                                                    {/* Used Chip */}
                                                                    {/* {true && (
                                                                                        <span className="text-white bg-red-500 px-2 text-[11px] rounded-full inline-flex items-center py-[1px] font-medium">
                                                                                            Used
                                                                                        </span>
                                                                                    )} */}
                                                                    <div className="text-[12px] text-slate-500">
                                                                        Barcode
                                                                        No.
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            barcode?.barcodeNumber
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="absolute -top-2 -right-2">
                                                                    <IoRemoveCircle
                                                                        onClick={() => {
                                                                            handleRemoveBarcode(
                                                                                barcode?.barcodeNumber,
                                                                                docIndex
                                                                            )
                                                                        }}
                                                                        fill="red"
                                                                        size={
                                                                            20
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="text-primary-main font-medium grow flex items-end">
                                                                {/* {
                                                                                    barcode?.productGroupLabel
                                                                                } */}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>
                                    </div>
                                )
                            }
                        )}

                        <div className="flex justify-end">
                            <div className="flex items-end">
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
                    </div>
                }
            />
        </>
    )
}

export default OutwardRTVTabsListingWrapper
