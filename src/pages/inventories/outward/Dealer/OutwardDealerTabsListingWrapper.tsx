/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:OutwardDealerTabsListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { IconType } from 'react-icons'
// import { HiDotsHorizontal } from 'react-icons/hi'
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { IoRemoveCircle } from 'react-icons/io5'

// |-- Internal Dependencies --|
// import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useParams } from 'react-router-dom'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { soApprovedGroupListResponseType } from 'src/models/OutwardRequest.model'
import OutwardRequestListing from './OutwardDealerTabs'
// import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
// import { soApprovedListResponseType } from 'src/models/OutwardRequest.model'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'
// import OutwardRequestListing from './OutwardDealerTabs'

// |-- Internal Dependencies --|

// |-- Redux --|
import { useDispatch, useSelector } from 'react-redux'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { AlertText } from 'src/pages/callerpage/components/constants'
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
import { useGetPaginationSaleOrderByGroupQuery } from 'src/services/SalesOrderService'

// |-- Redux --|F
// import {
//   setIsTableLoading,
//   setItems,
//   setTotalItems,
// } from "src/redux/slices/OutwardRequestSlice";
// import { AppDispatch, RootState } from "src/redux/store";

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

// type BarcodeListDocumentsType = {
//     _id: string
//     groupName: string
//     quantity: number
//     barcodes: BarcodeListResponseType[]
// }

const OutwardDealerTabsListingWrapper = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [barcodeNumber, setBarcodeNumber] = useState<any>([])
    const [barcodeList, setBarcodeList] = useState<any>([])
    const [selectedItemsTobeDispatch, setSelectedItemsTobeDispatch] =
        useState<soApprovedGroupListResponseType | null>(null)
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const dealerId = params.dealerId
    console.log('dealerIddealerIddealerId', dealerId)
    const salesOrderState: any = useSelector(
        (state: RootState) => state.saleOrder
    )
    const { page, rowsPerPage, searchValue, items } = salesOrderState
    const { customized } = useSelector((state: RootState) => state?.auth)

    const {
        data: soData,
        isFetching: soIsFetching,
        isLoading: soIsLoading,
    } = useGetPaginationSaleOrderByGroupQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['soNumber', 'dealerLabel'],
        page: page,
        filterBy: [
            {
                fieldName: 'dealerId',
                value: dealerId,
            },
            {
                fieldName: 'dhApproved',
                value: true,
            },
            {
                fieldName: 'accApproved',
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
            flex: 'flex-[1_1_0%]',
            renderCell: (row: soApprovedGroupListResponseType) => (
                <span> {row?._id} </span>
            ),
        },
        {
            field: 'dealerLabel',
            headerName: 'Dealer Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: soApprovedGroupListResponseType) => (
                <span> {row?.dealerName} </span>
            ),
        },
        {
            field: 'items',
            headerName: 'items',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: soApprovedGroupListResponseType) => {
                return (
                    <span>
                        {row?.documents?.map((item) => {
                            return (
                                <>
                                    {item?.productSalesOrder?.groupName} <br />
                                </>
                            )
                        })}
                    </span>
                )
            },
        },
        {
            field: 'quantity',
            headerName: 'quantity',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: soApprovedGroupListResponseType) => {
                return (
                    <span>
                        {row?.documents?.map((item) => {
                            return (
                                <>
                                    {item?.productSalesOrder?.quantity} <br />
                                </>
                            )
                        })}
                    </span>
                )
            },
        },
        {
            field: 'status',
            headerName: 'status',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: soApprovedGroupListResponseType) => (
                <span>
                    {row?.documents?.map((item) => {
                        return (
                            <>
                                {item?.status} <br />
                            </>
                        )
                    })}
                </span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Dispatch',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: soApprovedGroupListResponseType) => (
                <ActionPopup
                    handleOnAction={() => {}}
                    moduleName={UserModuleNameTypes.saleOrder}
                    children={
                        <>
                            <button
                                onClick={() => {
                                    setIsShow(true)
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
                        let newBarc = [...barcodeList]
                        if (!newBarc[index]) {
                            newBarc[index] = [...res?.data?.data]
                        } else {
                            newBarc[index] = [
                                ...newBarc[index],
                                ...res?.data?.data,
                            ]
                            const uniqueArray = Array.from(
                                new Set(
                                    newBarc[index].map((obj: any) => obj._id)
                                )
                            ).map((id) =>
                                newBarc[index].find(
                                    (obj: any) => obj._id === id
                                )
                            )
                            newBarc[index] = [...uniqueArray]
                        }

                        setBarcodeList([...newBarc])
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
                console.log('barcodeDispatch res => ', res)
            })
            .catch((err: any) => {
                console.error(err)
            })
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

    console.log('barcode list =>', barcodeList)

    return (
        <>
            <OutwardRequestListing columns={columns} rows={items} />
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
                                    <div className="font-bold">So Number</div>
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
                                                        Item
                                                    </span>
                                                    <span>:</span>
                                                    <span className="font-bold">
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
                                                    <span>:</span>
                                                    <span className="font-bold">
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
                                    isLoading={barcodeDispatchInfo?.isLoading}
                                    loadingText="Dispatching"
                                    onClick={() => handleDispatchBarcode()}
                                    className="bg-primary-main text-white flex items-center py-1 px-4 rounded"
                                >
                                    Save
                                </ATMLoadingButton>
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default OutwardDealerTabsListingWrapper
