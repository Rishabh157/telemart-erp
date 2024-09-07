// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { IconType } from 'react-icons'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import OutwardRequestListing from './InwardCustomerTabs'
// import { HiDotsHorizontal } from 'react-icons/hi'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useParams } from 'react-router-dom'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import {
    useGetCustomerReturnBarcodeMutation,
    useAddCustomerInwardBarcodesMutation,
    useGetBarcodeByOrderNumberQuery,
} from 'src/services/BarcodeService'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { showToast } from 'src/utils'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { BarcodeListResponseType } from 'src/models'
import BarcodeCard from 'src/components/UI/Barcode/BarcodeCard'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import { AlertText } from 'src/pages/callerpage/components/constants'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { getCustomerInwardBarcodeOptionTypes } from 'src/utils/constants/customeTypes'
import { barcodeStatusEnum } from 'src/utils/constants/enums'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { useGetCustomerWarehouseReturnQuery } from 'src/services/WareHouseService'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

type CustomerWarehouseReturnOrders = {
    ccRemark: string
    companyId: string
    createdAt: string
    schemeName: string
    schemeQuantity: number
    isActive: boolean
    isCompleted: boolean
    isDeleted: boolean
    orderNumber: number
    requestType: string
    updatedAt: string
    warehouseId: string
    barcodeData: {
        barcodeId: string
        barcode: string
        _id: string
    }[]
    productInfo: {
        productGroupName: string
        quantity: number
        _id: string
    }[]
    __v: number
    _id: string
}

const InwardCustomerTabsListingWrapper = () => {
    useUnmountCleanup()
    const [isShow, setIsShow] = useState<boolean>(false)
    // const [orderNumber, setOrderNumber] = useState<boolean>(null)
    const [barcodeNumber, setBarcodeNumber] = useState<any>([])
    // const [barcodeCondition, setBarcodeCondition] = useState<string>()
    const [barcodeList, setBarcodeList] = useState<any>([])
    const [selectedItemsTobeDispatch, setSelectedItemsTobeDispatch] =
        useState<CustomerWarehouseReturnOrders | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const warehouseId = params.id
    const salesOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = salesOrderState
    const { customized, userData } = useSelector(
        (state: RootState) => state?.auth
    )

    const { items } = useGetCustomListingData<CustomerWarehouseReturnOrders>({
        useEndPointHook: useGetCustomerWarehouseReturnQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['orderNumber', 'requestStatus', 'ccRemark', 'requestType'],
            page: page,
            filterBy: [
                { fieldName: 'warehouseId', value: warehouseId },
                { fieldName: 'companyId', value: userData?.companyId },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const { items: orderBarcodes } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetBarcodeByOrderNumberQuery(
            {
                orderNumber: selectedItemsTobeDispatch?.orderNumber as number,
            },
            { skip: !selectedItemsTobeDispatch?.orderNumber }
        ),
    })

    // set initial barcode
    React.useEffect(() => {
        orderBarcodes?.length &&
            setBarcodeList(
                orderBarcodes?.map((ele: BarcodeListResponseType) => ({
                    ...ele,
                    condition: barcodeStatusEnum.atWarehouse,
                }))
            )
    }, [orderBarcodes])

    const [getBarCode] = useGetCustomerReturnBarcodeMutation()
    const [barcodeDispatch, barcodeDispatchInfo] =
        useAddCustomerInwardBarcodesMutation()

    // remove barcode
    const handleRemoveBarcode = (barcodeNumber: string) => {
        setBarcodeList(
            barcodeList?.filter(
                (item: BarcodeListResponseType) =>
                    item.barcodeNumber !== barcodeNumber && item
            )
        )
    }

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

    const handleBarcodeSubmit = (barcodeNumber: string) => {
        dispatch(setFieldCustomized(true))
        getBarCode({
            id: barcodeNumber,
            status: barcodeStatusEnum.delivered,
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    if (res?.data?.data) {
                        const isExist = barcodeList?.some((ele: any) => {
                            return (
                                ele.barcodeNumber ===
                                res?.data?.data?.[0]?.barcodeNumber
                            )
                        })
                        if (!isExist) {
                            setBarcodeList((prev: any) => [
                                ...prev,
                                ...res?.data?.data,
                            ])
                        } else {
                            showToast('error', 'Already existed barcode')
                        }
                    }
                }
            })
            .catch((err) => console.error(err))
    }

    const handleDispatchBarcode = () => {
        const filterValue = barcodeList?.map((ele: BarcodeListResponseType) => {
            if (!ele) return ele
            return {
                barcode: ele?.barcodeNumber,
                condition: ele?.condition,
            }
        })

        barcodeDispatch({
            id: selectedItemsTobeDispatch?._id,
            warehouseId: warehouseId,
            body: {
                barcode: filterValue || [],
                orderNumber: selectedItemsTobeDispatch?.orderNumber,
            },
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

    const columns: columnTypes[] = [
        {
            field: 'action',
            headerName: 'Action',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => (
                !row?.isCompleted && <ActionPopup
                    handleOnAction={() => { }}
                    // moduleName={UserModuleNameTypes.saleOrder}
                    isCustomBtn={true}
                    customBtnText="Dispatch"
                    handleCustomActionButton={() => {
                        setIsShow(true)
                        setSelectedItemsTobeDispatch(row)
                    }}
                />
            ),
        },
        {
            field: 'orderNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_CUSTOMER_LIST_ORDER_NUMBER,
            headerName: 'Order No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[200px]',
            renderCell: (row: CustomerWarehouseReturnOrders) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
        },
        {
            field: 'requestType',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_CUSTOMER_LIST_ORDER_REF_NUMBER,
            headerName: 'Request Type',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: CustomerWarehouseReturnOrders) => (
                <span>{row.requestType || '-'}</span>
            ),
        },
        {
            field: 'schemeName',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_CUSTOMER_LIST_ORDER_REF_NUMBER,
            headerName: 'Barcode Quantity',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: CustomerWarehouseReturnOrders) => (
                <span>{row.schemeName || '-'}</span>
            ),
        },
        {
            field: 'ccRemark',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_CUSTOMER_LIST_INQUIRY_NUMBER,
            headerName: 'Remark',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: CustomerWarehouseReturnOrders) => (
                <span>{row?.ccRemark}</span>
            ),
        },
        {
            field: 'createdAt',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_CUSTOMER_LIST_FIRSTCALL_REMARK,
            headerName: 'Created Date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: CustomerWarehouseReturnOrders) => (
                <span>{formatedDateTimeIntoIst(row?.createdAt)}</span>
            ),
        },
    ]

    const getActualInwardingBarcodeLenght = (
        schemeQuantity: number,
        productInfo: any
    ) => {
        let totalProductBarcode = productInfo?.reduce(
            (acc: number, ele: any) => {
                return (acc += schemeQuantity * ele?.quantity)
            },
            0
        )
        return totalProductBarcode
    }

    // total barcode of product5
    const totalBarcodeOfProducts = getActualInwardingBarcodeLenght(
        selectedItemsTobeDispatch?.schemeQuantity || 0,
        selectedItemsTobeDispatch?.productInfo
    )

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
                                <div className="flex items-center gap-1">
                                    <div className="font-bold">
                                        Order Number
                                    </div>
                                    {':'}
                                    <div >
                                        {selectedItemsTobeDispatch?.orderNumber}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pb-6 border-b-slate-300 border-[1px] shadow p-4 my-4 rounded">
                            <div className="grid grid-cols-4 mt-2">
                                <div>
                                    {/* <div> */}
                                    <span className="font-bold">Item Name</span>
                                    <span className="px-4">:</span>
                                    <span>
                                        {selectedItemsTobeDispatch?.productInfo?.map(
                                            (ele: any) => ele?.productGroupName
                                        )}
                                    </span>
                                    {/* </div> */}

                                    <div>
                                        <span className="font-bold">
                                            Quantity
                                        </span>
                                        <span className="pl-[2.23rem] pr-[1rem]">
                                            :
                                        </span>
                                        <span>
                                            {totalBarcodeOfProducts}
                                            {barcodeList?.length ? (
                                                <> / {barcodeList?.length}</>
                                            ) : (
                                                ''
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 mt-2 gap-x-4">
                                <ATMTextField
                                    name=""
                                    disabled={
                                        totalBarcodeOfProducts ===
                                        barcodeList?.length
                                    }
                                    value={barcodeNumber}
                                    label="Barcode Number"
                                    placeholder="enter barcode number"
                                    className="shadow bg-white rounded w-[50%] "
                                    onChange={(e) => {
                                        if (e.target.value?.length > 6) {
                                            handleBarcodeSubmit(e.target.value)
                                        }
                                        setBarcodeNumber(e.target.value)
                                    }}
                                />
                            </div>

                            <div className="grid grid-cols-4 gap-x-4">
                                {barcodeList?.map(
                                    (
                                        barcode: BarcodeListResponseType,
                                        barcodeIndex: number
                                    ) => (
                                        <div key={barcodeIndex}>
                                            <BarcodeCard
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
                                            <ATMSelectSearchable
                                                name=""
                                                componentClass="mt-0"
                                                label="Barcode Condition"
                                                selectLabel="Select barcode condition"
                                                value={barcode.condition}
                                                options={getCustomerInwardBarcodeOptionTypes()}
                                                onChange={(newValue) => {
                                                    // Make a copy of barcodeList
                                                    const updatedBarcodeList = [
                                                        ...barcodeList,
                                                    ]
                                                    // Ensure barcodeIndex is defined and within bounds
                                                    if (
                                                        barcodeIndex !==
                                                        undefined &&
                                                        barcodeIndex >= 0 &&
                                                        barcodeIndex <
                                                        updatedBarcodeList.length
                                                    ) {
                                                        // Retrieve the object at barcodeIndex
                                                        const updatedBarcodeObj =
                                                        {
                                                            ...updatedBarcodeList[
                                                            barcodeIndex
                                                            ],
                                                        }

                                                        // Update the 'condition' property of the object
                                                        updatedBarcodeObj.condition =
                                                            newValue

                                                        // Update the object at barcodeIndex in the copied array
                                                        updatedBarcodeList[
                                                            barcodeIndex
                                                        ] = updatedBarcodeObj

                                                        // Update state with the modified array
                                                        setBarcodeList(
                                                            updatedBarcodeList
                                                        )
                                                    } else {
                                                        showToast(
                                                            'error',
                                                            'Invalid barcode'
                                                        )
                                                    }
                                                }}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="flex items-end justify-end ">
                            <div>
                                <ATMLoadingButton
                                    // disabled={
                                    //     !(
                                    //         totalBarcodeOfProducts ===
                                    //         barcodeList?.length
                                    //     )
                                    // }
                                    isLoading={barcodeDispatchInfo?.isLoading}
                                    loadingText="Dispatching"
                                    onClick={() => handleDispatchBarcode()}
                                    className="flex items-center px-4 py-1 text-white rounded bg-primary-main"
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

export default InwardCustomerTabsListingWrapper
