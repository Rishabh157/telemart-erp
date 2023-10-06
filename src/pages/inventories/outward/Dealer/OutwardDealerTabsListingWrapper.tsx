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
import { HiDotsVertical } from 'react-icons/hi'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { soApprovedListResponseType } from 'src/models/OutwardRequest.model'
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
import { useGetPaginationSaleOrderQuery } from 'src/services/SalesOrderService'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/saleOrderSlice'

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

const OutwardDealerTabsListingWrapper = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [barcodeNumber, setBarcodeNumber] = useState<string>('')
    const [barcodeList, setBarcodeList] = useState<string[]>([])

    const [soNumber, setSoNumber] = useState<string>('')
    const [dealerName, seetDealerName] = useState<string>('')
    const [quantity, setQuantity] = useState<string[]>([])
    const [productItems, setProductItems] = useState<string[]>([])

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
    } = useGetPaginationSaleOrderQuery({
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
            renderCell: (row: soApprovedListResponseType) => (
                <span> {row?.soNumber} </span>
            ),
        },
        {
            field: 'dealerLabel',
            headerName: 'Dealer Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: soApprovedListResponseType) => (
                <span> {row?.dealerLabel} </span>
            ),
        },
        {
            field: 'items',
            headerName: 'items',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: soApprovedListResponseType) => {
                return <span> {row?.productSalesOrder?.groupName} </span>
            },
        },
        {
            field: 'items',
            headerName: 'quantity',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: soApprovedListResponseType) => {
                return <span> {row.productSalesOrder?.quantity} </span>
            },
        },
        {
            field: 'actions',
            headerName: 'Dispatch',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: soApprovedListResponseType) => (
                <ActionPopup
                    handleOnAction={() => {}}
                    moduleName={UserModuleNameTypes.saleOrder}
                    children={
                        <>
                            <button
                                onClick={() => {
                                    setIsShow(true)
                                    setSoNumber(row.soNumber)
                                    seetDealerName(row.dealerLabel)
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

    useEffect(() => {
        if (barcodeNumber.length === 8) {
            barcodeList.length !== 10 &&
                setBarcodeList((pre) => [...pre, barcodeNumber])
        }
    }, [barcodeNumber])

    // const groupSoNumber = items?.filter(
    //     (product: soApprovedListResponseType) => {
    //         if (product.soNumber === product.soNumber) {
    //             console.log('console.log')
    //         }
    //     }
    // )

    return (
        <>
            <OutwardRequestListing columns={columns} rows={items} />
            <DialogLogBox
                isOpen={isShow}
                buttonClass="cursor-pointer"
                maxWidth="lg"
                handleClose={() => setIsShow(!isShow)}
                component={
                    <div className="p-4 pb-6">
                        <div className="grid grid-cols-2">
                            <div>
                                <div className="flex gap-4 items-center">
                                    <div className="font-bold">So Number</div>
                                    {':'}
                                    <div className="font-bold">{soNumber}</div>
                                </div>
                            </div>

                            <div>
                                <div className="flex gap-4 items-center">
                                    <div className="font-bold">Item</div>
                                    {':'}
                                    <div className="font-bold">KKK</div>
                                </div>
                            </div>

                            <div>
                                <div className="flex gap-4 items-center">
                                    <div className="font-bold">Dealer Name</div>
                                    {':'}
                                    <div className="font-bold">
                                        {dealerName}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex gap-4 items-center">
                                    <div className="font-bold">Quantity</div>
                                    {':'}
                                    <div className="font-bold">
                                        10 / {barcodeList.length}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <ATMTextField
                                    name=""
                                    value={barcodeNumber}
                                    maxLength={8}
                                    label="Barcode Number"
                                    placeholder="enter barcode number"
                                    className="shadow bg-white rounded w-[50%] "
                                    onChange={(e) => {
                                        setBarcodeNumber(e.target.value)
                                    }}
                                />
                            </div>
                            {barcodeList?.length === 10 && (
                                <div className="flex items-end ml-4">
                                    <ATMLoadingButton
                                        isLoading={false}
                                        loadingText="Applying"
                                        onClick={() => {}}
                                        className="w-[20%] bg-primary-main text-white flex items-center py-1 px-4 rounded"
                                    >
                                        Save
                                    </ATMLoadingButton>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-4 gap-x-4">
                            {barcodeList.map(
                                (barcode: any, barcodeIndex: number) => {
                                    return (
                                        <div
                                            key={barcode._id}
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
                                                    {true && (
                                                        <span className="text-white bg-red-500 px-2 text-[11px] rounded-full inline-flex items-center py-[1px] font-medium">
                                                            Used
                                                        </span>
                                                    )}
                                                    <div className="text-[12px] text-slate-500">
                                                        Barcode No.
                                                    </div>
                                                    <div>{barcode}</div>
                                                </div>
                                                <div>
                                                    <HiDotsVertical />
                                                </div>
                                            </div>

                                            <div className="text-primary-main font-medium grow flex items-end">
                                                {barcode?.productGroupLabel}
                                            </div>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default OutwardDealerTabsListingWrapper
