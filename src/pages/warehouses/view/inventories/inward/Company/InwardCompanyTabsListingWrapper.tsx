/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:InwardCompanyTabsListingWrapper.tsx
// Type: List Component
// Last Updated: OCTOBER 13, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useParams } from 'react-router-dom'
import { IconType } from 'react-icons'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import {
    OutwardRequestWarehouseToCompanyListResponse,
    BarcodeListResponseType,
} from 'src/models'
import { SaleOrderStatus } from 'src/models/OutwardRequest.model'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { AlertText } from 'src/pages/callerpage/components/constants'
import InwardCompanyTabs from './InwardCompanyTabs'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import BarcodeCard from 'src/components/UI/Barcode/BarcodeCard'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/warehouseTransferSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetAllBarcodeOfDealerOutWardDispatchMutation } from 'src/services/BarcodeService'
import { useInwardWarehouseToWarehouseBarcodeMutation } from 'src/services/WarehouseTransferService'
import { useGetPaginationWarehouseToComapnyByGroupQuery } from 'src/services/WarehouseToComapnyService'

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

const InwardCompanyTabsListingWrapper = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [barcodeNumber, setBarcodeNumber] = useState<any>([])
    const [barcodeQuantity, setBarcodeQuantity] = useState<number>(0)
    const [barcodeList, setBarcodeList] = useState<any>([])
    const [selectedItemsTobeDispatch, setSelectedItemsTobeDispatch] =
        useState<OutwardRequestWarehouseToCompanyListResponse | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const warehouseTransferState: any = useSelector(
        (state: RootState) => state.warehouseTransfer
    )
    const { page, rowsPerPage, searchValue, items } = warehouseTransferState
    const { customized, userData }: any = useSelector(
        (state: RootState) => state?.auth
    )

    const params = useParams()
    const warehouseId = params.id

    const { data, isFetching, isLoading } =
        useGetPaginationWarehouseToComapnyByGroupQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['wtcNumber'],
            page: page,
            filterBy: [
                {
                    fieldName: 'toCompanyId',
                    value: userData?.companyId as string,
                },

                {
                    fieldName: 'toWarehouseId',
                    value: warehouseId,
                },
                // {
                //     fieldName: 'toCompanyId',
                //     value: '652e1a7197ffa95e3cea8af3',
                // },
                // {
                //     fieldName: 'secondApproved',
                //     value: true,
                // },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }
    }, [isLoading, isFetching, data, dispatch])

    const [getBarCode] = useGetAllBarcodeOfDealerOutWardDispatchMutation()
    const [barcodeDispatch, barcodeDispatchInfo] =
        useInwardWarehouseToWarehouseBarcodeMutation()

    const columns: columnTypes[] = [
        
        {
            field: 'actions',
            headerName: 'Action',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) =>
                row?.documents[0].status === SaleOrderStatus.complete ? (
                    'At Warehouse'
                ) : row?.documents[0].status !== SaleOrderStatus.dispatched ? (
                    ''
                ) : (
                    <ActionPopup
                        handleOnAction={() => {}}
                        moduleName={UserModuleNameTypes.saleOrder}
                        isCustomBtn={true}
                        customBtnText="Inward"
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
            field: 'wtNumber',
            headerName: 'WTC Number',
            flex: 'flex-[0.6_0.6_0%]',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => (
                <span> {row?._id} </span>
            ),
        },
        {
            field: 'fromWarehouse',
            headerName: 'From Warehouse',
            flex: 'flex-[0.6_0.6_0%]',
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => (
                <span> {row?.fromWarehouseLabel} </span>
            ),
        },
        {
            field: 'toWarehouse',
            headerName: 'To Warehouse',
            flex: 'flex-[0.6_0.6_0%]',
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => (
                <span> {row?.toWarehouseLabel} </span>
            ),
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => {
                return (
                    <div className="w-full">
                        {row?.documents?.map((item, ind) => {
                            return (
                                <div
                                    key={ind}
                                    className="grid grid-cols-3 border border-slate-400 mb-1 rounded text-center"
                                >
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
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.createdAt)} </span>
            },
        },
        {
            field: 'updatedAt',
            headerName: 'Updated Date',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.updatedAt)} </span>
            },
        },
        {
            field: 'status',
            headerName: 'status',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToCompanyListResponse) => (
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
            status: 'WTC',
            companyId: userData?.companyId,
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
                wtwId,
                companyId,
                productGroupLabel,
                // wareHouseId,
                vendorId,
                outerBoxbarCodeNumber,
                barcodeNumber,
                createdAt,
                isActive,
                isDeleted,
                updatedAt,
                status,
                __v,
                ...rest
            } = ele
            return {
                ...rest,
                toCompanyId: null,
                fromCompanyId: userData?.companyId,
                wareHouseId: warehouseId,
            }
        })

        const wId = selectedItemsTobeDispatch?.documents?.map(
            (ele: any) => ele?._id as string
        )
        barcodeDispatch({
            barcodedata: [...filterValue],
            wId: [...(wId as string[])],
            from: 'WTC',
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    showToast('success', 'added successfully')
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
            <InwardCompanyTabs columns={columns} rows={items} />
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
                        <div className="grid grid-cols-4 pb-2 border-slate-300 border-b-[1px] ">
                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className="font-bold">WTC Number</div>
                                    {':'}
                                    <div className="">
                                        {selectedItemsTobeDispatch?._id}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className="font-bold">
                                        From Warehouse Name
                                    </div>
                                    {':'}
                                    <div className="">
                                        {capitalizeFirstLetter(
                                            selectedItemsTobeDispatch?.fromWarehouseLabel ||
                                                ''
                                        )}
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
                                    loadingText="Inward"
                                    onClick={() => handleDispatchBarcode()}
                                    className="bg-primary-main text-white flex items-center py-1 px-4 rounded"
                                >
                                    Inward
                                </ATMLoadingButton>
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default InwardCompanyTabsListingWrapper
