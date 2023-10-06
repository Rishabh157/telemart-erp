/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:OutwardDealerTabsListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { IconType } from 'react-icons'
// import { HiDotsHorizontal } from 'react-icons/hi'
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { IoRemoveCircle } from 'react-icons/io5'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { soApprovedGroupListResponseType } from 'src/models/OutwardRequest.model'
import OutwardRequestListing from './OutwardDealerTabs'
import { useParams } from 'react-router-dom'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'

// |-- Internal Dependencies --|

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useGetPaginationSaleOrderByGroupQuery } from 'src/services/SalesOrderService'
import { useGetAllBarcodeOfDealerOutWardDispatchMutation } from 'src/services/BarcodeService'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/saleOrderSlice'
import { showToast } from 'src/utils'

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

const OutwardDealerTabsListingWrapper = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [barcodeNumber, setBarcodeNumber] = useState<string>('')
    const [barcodeList, setBarcodeList] = useState<BarcodeListResponseType[]>(
        []
    )

    const [selectedItemsTobeDispatch, setSelectedItemsTobeDispatch] = useState<
        soApprovedGroupListResponseType[]
    >([])
    // const [quantity, setQuantity] = useState<string[]>([])
    // const [productItems, setProductItems] = useState<string[]>([])

    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const dealerId = params.dealerId
    const salesOrderState: any = useSelector(
        (state: RootState) => state.saleOrder
    )
    const { page, rowsPerPage, searchValue, items } = salesOrderState

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
                                    setSelectedItemsTobeDispatch([row])
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

    const handleBarcodeSubmit = () => {
        getBarCode(barcodeNumber)
            .then((res: any) => {
                if (res?.data?.status) {
                    setBarcodeList((pre) => [...pre, ...res?.data?.data])
                }
                // else {
                //     showToast('error', 'barcode number is not matched')
                // }
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        if (barcodeNumber?.length >= 6) {
            handleBarcodeSubmit()
        }
    }, [barcodeNumber])

    console.log('selectedItemsTobeDispatch', barcodeList)

    return (
        <>
            <OutwardRequestListing columns={columns} rows={items} />
            <DialogLogBox
                isOpen={isShow}
                buttonClass="cursor-pointer"
                maxWidth="lg"
                handleClose={() => {
                    setIsShow(!isShow)
                    setSelectedItemsTobeDispatch([])
                }}
                component={
                    <div className="px-4 pt-2 pb-6">
                        {selectedItemsTobeDispatch?.map(
                            (
                                ele: soApprovedGroupListResponseType,
                                ind: number
                            ) => {
                                return (
                                    <>
                                        {/* SO NO. & DEALER NAME */}
                                        <div className="grid grid-cols-4 border-b-[1px] border-black">
                                            <div>
                                                <div className="flex gap-4 items-center">
                                                    <div className="font-bold">
                                                        So Number
                                                    </div>
                                                    {':'}
                                                    <div className="font-bold">
                                                        {ele?._id}
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex gap-4 items-center">
                                                    <div className="font-bold">
                                                        Dealer Name
                                                    </div>
                                                    {':'}
                                                    <div className="font-bold">
                                                        {ele?.dealerName}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {ele?.documents?.map(
                                            (document, docIndex) => {
                                                return (
                                                    <div
                                                        className="pb-6 border-b-[1px] border-black last:border-none"
                                                        key={docIndex}
                                                    >
                                                        <div className="grid grid-cols-4 mt-2">
                                                            <div>
                                                                <div className="flex gap-4 items-center">
                                                                    <div className="font-bold">
                                                                        Item
                                                                    </div>
                                                                    {':'}
                                                                    <div className="font-bold">
                                                                        {
                                                                            document
                                                                                ?.productSalesOrder
                                                                                ?.groupName
                                                                        }
                                                                    </div>
                                                                </div>

                                                                <div className="flex gap-4 items-center">
                                                                    <div className="font-bold">
                                                                        Quantity
                                                                    </div>
                                                                    {':'}
                                                                    <div className="font-bold">
                                                                        {
                                                                            document
                                                                                ?.productSalesOrder
                                                                                ?.quantity
                                                                        }{' '}
                                                                        /{' '}
                                                                        {
                                                                            barcodeList.length
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 grid grid-cols-12 gap-x-4">
                                                            <div className="col-span-3">
                                                                <ATMTextField
                                                                    name=""
                                                                    value={
                                                                        barcodeNumber
                                                                    }
                                                                    maxLength={
                                                                        8
                                                                    }
                                                                    label="Barcode Number"
                                                                    placeholder="enter barcode number"
                                                                    className="shadow bg-white rounded w-[50%] "
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setBarcodeNumber(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-span-2 flex items-end">
                                                                <ATMLoadingButton
                                                                    isLoading={
                                                                        false
                                                                    }
                                                                    loadingText="Dispatching"
                                                                    onClick={() => {}}
                                                                    className="bg-primary-main text-white flex items-center py-1 px-4 rounded"
                                                                >
                                                                    Save
                                                                </ATMLoadingButton>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-4 gap-x-4">
                                                            {barcodeList?.map(
                                                                (
                                                                    barcode: BarcodeListResponseType,
                                                                    barcodeIndex: number
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                barcodeIndex
                                                                            }
                                                                            onClick={() => {
                                                                                // onBarcodeClick(barcode)
                                                                            }}
                                                                            className={`flex flex-col gap-2 my-4 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer ${
                                                                                barcode?.isUsed
                                                                                    ? ' border-red-500'
                                                                                    : 'border-slate-200'
                                                                            }`}
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
                                    </>
                                )
                            }
                        )}

                        {/*  */}
                    </div>
                }
            />
        </>
    )
}

export default OutwardDealerTabsListingWrapper
