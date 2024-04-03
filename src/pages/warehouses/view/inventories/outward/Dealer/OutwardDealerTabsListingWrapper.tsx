/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:OutwardDealerTabsListingWrapper.tsx
// Type: List Component
// Last Updated: OCTOBER 23, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { IconType } from 'react-icons'

// |-- Internal Dependencies --|
import { useNavigate, useParams } from 'react-router-dom'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import {
    OutwardRequestDealerListResponse,
    BarcodeListResponseType,
} from 'src/models'
import { SaleOrderStatus } from 'src/models/OutwardRequest.model'
import OutwardRequestListing from './OutwardDealerTabs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'
import { showToast } from 'src/utils'
import BarcodeCard from 'src/components/UI/Barcode/BarcodeCard'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { AlertText } from 'src/pages/callerpage/components/constants'

// |-- Redux --|
import { useDispatch, useSelector } from 'react-redux'
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

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

const OutwardDealerTabsListingWrapper = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [barcodeNumber, setBarcodeNumber] = useState<any>([])
    const [barcodeQuantity, setBarcodeQuantity] = useState<number>(0)
    const [barcodeList, setBarcodeList] = useState<any>([])
    const [selectedItemsTobeDispatch, setSelectedItemsTobeDispatch] =
        useState<OutwardRequestDealerListResponse | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const params = useParams()
    const warehouseId = params.id
    const salesOrderState: any = useSelector(
        (state: RootState) => state.saleOrder
    )
    const { page, rowsPerPage, searchValue, items } = salesOrderState
    const { customized, userData } = useSelector(
        (state: RootState) => state?.auth
    )

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
                fieldName: 'companyWareHouseId',
                value: warehouseId,
            },
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
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
            field: 'actions',
            headerName: 'Dispatch',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: OutwardRequestDealerListResponse) =>
                row?.documents[0]?.status === SaleOrderStatus.complete ? (
                    'Dispatched'
                ) : row?.documents[0]?.status === SaleOrderStatus.dispatched ? (
                    ''
                ) : (
                    <ActionPopup
                        handleOnAction={() => {}}
                        moduleName={UserModuleNameTypes.saleOrder}
                        isCustomBtn={true}
                        customBtnText="Dispatch"
                        handleCustomActionButton={() => {
                            setIsShow(true)
                            const totalQuantity = row?.documents?.reduce(
                                (sum, ele) => {
                                    return (sum +=
                                        ele?.productSalesOrder?.quantity)
                                },
                                0
                            )
                            setBarcodeQuantity(totalQuantity)
                            setSelectedItemsTobeDispatch(row)
                        }}
                    />
                ),
            
        },
        {
            field: 'soNumber',
            headerName: 'So Number',
            flex: 'flex-[0.6_0.6_0%]',
            renderCell: (row: OutwardRequestDealerListResponse) => (
                <span> {row?._id} </span>
            ),
        },
        {
            field: 'dealerLabel',
            headerName: 'Dealer Name',
            flex: 'flex-[0.6_0.6_0%]',
            align: 'center',
            renderCell: (row: OutwardRequestDealerListResponse) => (
                <span
                    className="underline text-primary-main"
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                        navigate(
                            `/dealers/${row?.documents[0]?.dealerId}/general-information`
                        )
                    }
                >
                    {capitalizeFirstLetter(row?.dealerName || '')}
                </span>
            ),
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: OutwardRequestDealerListResponse) => {
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
            renderCell: (row: OutwardRequestDealerListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.createdAt)} </span>
            },
        },
        {
            field: 'updatedAt',
            headerName: 'Updated Date',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: OutwardRequestDealerListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.updatedAt)} </span>
            },
        },
        {
            field: 'status',
            headerName: 'status',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: OutwardRequestDealerListResponse) => (
                <span>{row?.documents[0]?.status}</span>
            ),
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
        getBarCode({
            id: barcodeNumber,
            groupId: productGroupId,
            status: 'AT_WAREHOUSE',
            companyId: userData?.companyId as string,
        })
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
                wareHouseLabel,
                productGroupLabel,
                vendorId,
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
                        <div className="grid grid-cols-4 pb-2 border-slate-300 border-b-[1px]">
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
                                        className="pb-6 border-b-slate-300 border-[1px] shadow p-4 my-4 rounded"
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
                                                            <>
                                                                {' '}
                                                                /{' '}
                                                                {
                                                                    barcodeList[
                                                                        docIndex
                                                                    ]?.length
                                                                }
                                                            </>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-2 grid grid-cols-4 gap-x-4">
                                            <ATMTextField
                                                disabled={
                                                    barcodeList[docIndex]
                                                        ?.length ===
                                                    document?.productSalesOrder
                                                        ?.quantity
                                                }
                                                name=""
                                                value={barcodeNumber[docIndex]}
                                                label="Barcode Number"
                                                placeholder="enter barcode number"
                                                className="shadow bg-white rounded w-[50%] "
                                                onChange={(e) => {
                                                    if (
                                                        e.target.value?.length >
                                                        6
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
                                                            ] = e.target.value // Set the value at the desired index
                                                            return updatedArray // Return the updated array
                                                        }
                                                    )
                                                }}
                                            />
                                        </div>

                                        <div className="grid grid-cols-4 gap-x-4">
                                            {barcodeList[docIndex]?.map(
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
                                                                docIndex
                                                            )
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                )
                            }
                        )}

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
                    </div>
                }
            />
        </>
    )
}

export default OutwardDealerTabsListingWrapper
