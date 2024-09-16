/* eslint-disable array-callback-return */
// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Chip, Stack } from '@mui/material'
import { IconType } from 'react-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import BarcodeCard from 'src/components/UI/Barcode/BarcodeCard'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import {
    BarcodeListResponseType,
    InwardDealerRequstListResponse,
} from 'src/models'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { showToast } from 'src/utils'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import OutwardRequestListing from './InwardDealerTabs'
import { barcodeStatusEnum } from 'src/utils/constants/enums'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import {
    useGetPaginationInwardDealerOrderQuery,
    useInwardDealerBarcodeMutation,
    useUpdateInwardDealerApprovalMutation,
} from 'src/services/InwardDealerServices'

import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { useGetAllBarcodeOfDealerOutWardDispatchMutation } from 'src/services/BarcodeService'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

const InwardDealerTabsListingWrapper = () => {
    useUnmountCleanup()
    const [isShow, setIsShow] = useState<boolean>(false)
    const [barcodeNumber, setBarcodeNumber] = useState<any>([])
    const [barcodeQuantity, setBarcodeQuantity] = useState<number>(0)
    const [barcodeList, setBarcodeList] = useState<any>([])
    const [selectedItemsTobeDispatch, setSelectedItemsTobeDispatch] =
        useState<InwardDealerRequstListResponse | null>(null)
    const { id: warehouseId } = useParams()

    const dispatch = useDispatch<AppDispatch>()

    const inwardDealerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = inwardDealerState
    const { customized, userData } = useSelector(
        (state: RootState) => state?.auth
    )

    const { items } = useGetCustomListingData({
        useEndPointHook: useGetPaginationInwardDealerOrderQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['dtwNumber'],
            page: page,
            filterBy: [
                {
                    fieldName: 'toWarehouseId',
                    value: warehouseId,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const [getBarCode] = useGetAllBarcodeOfDealerOutWardDispatchMutation()
    const [barcodeDispatch, barcodeDispatchInfo] =
        useInwardDealerBarcodeMutation()
    const [updateInwardDealerApproval] = useUpdateInwardDealerApprovalMutation()

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Inward',
            flex: 'flex-[1_0.1_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return row?.documents[0].status !== 'DISPATCHED' ? (
                    ''
                ) : (
                    <ActionPopup
                        isCustomBtn={true}
                        customBtnText="Inward"
                        handleOnAction={() => { }}
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
                )
            },
        },
        {
            field: 'dtwNumber',
            headerName: 'DTW Number',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_DEALER_LIST_DTW_NUMBER,
            flex: 'flex-[0.8_0.8_0%]',
            renderCell: (row: InwardDealerRequstListResponse) => (
                <span> {row?._id} </span>
            ),
        },
        {
            field: 'toWarehouseLabel',
            headerName: 'To Warehouse',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_DEALER_LIST_TOWAREHOUSE_LABEL,
            flex: 'flex-[0.8_0.8_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => (
                <span> {row?.toWarehouseLabel} </span>
            ),
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_DEALER_LIST_ITEMS,
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
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
            field: 'firstApproved',
            headerName: 'First Status',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_DEALER_LIST_FIRST_APPROVAL,
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return (
                    <span>
                        {row?.firstApproved
                            ? 'Done'
                            : row?.firstApproved === null
                                ? 'Pending'
                                : 'Rejected'}
                    </span>
                )
            },
        },
        {
            field: 'firstApprovedActionBy',
            headerName: 'First Approved By',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_DEALER_LIST_FIRST_APPROVAL_BY,
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return <span> {row?.firstApprovedActionBy} </span>
            },
        },
        {
            field: 'firstApprovedAt',
            headerName: 'First Approved Date',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_DEALER_LIST_FIRST_APPROVAL_DATE,
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return <span> {row?.firstApprovedAt} </span>
            },
        },
        {
            field: 'secondApprovedActionByStatus',
            headerName: 'Second Status',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_DEALER_LIST_SECOND_APPROVAL,
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return (
                    <span>
                        {' '}
                        {row?.secondApproved
                            ? 'Done'
                            : row?.secondApproved === null
                                ? 'Pending'
                                : 'Rejected'}
                    </span>
                )
            },
        },
        {
            field: 'secondApprovedActionBy',
            headerName: 'Second Approved By',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_DEALER_LIST_SECOND_APPROVAL_BY,
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return <span> {row?.secondApprovedActionBy} </span>
            },
        },
        {
            field: 'secondApprovedAt',
            headerName: 'Second Approved Date',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_DEALER_LIST_SECOND_APPROVAL_DATE,
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return <span> {row?.secondApprovedAt} </span>
            },
        },
        {
            field: 'createdAt',
            headerName: 'Inserted Date',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_DEALER_LIST_INSERTED_DATE,
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return (
                    <span>
                        {formatedDateTimeIntoIst(row?.documents[0]?.createdAt)}
                    </span>
                )
            },
        },
        {
            field: 'updatedAt',
            headerName: 'Updated Date',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_DEALER_LIST_UPDATED_DATE,
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return (
                    <span>
                        {' '}
                        {formatedDateTimeIntoIst(
                            row?.documents[0]?.updatedAt
                        )}{' '}
                    </span>
                )
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_DEALER_LIST_STATUS,
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return (
                    <span>
                        {row?.documents[0]?.status === 'DISPATCHED'
                            ? 'DEALER DISPATCHED'
                            : row?.documents[0]?.status}
                    </span>
                )
            },
        },
        {
            field: 'Approved',
            headerName: 'Approval',
            flex: 'flex-[1.0_1.0_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return (
                    <div>
                        {!row?.firstApproved ? (
                            <Stack direction="row" spacing={1}>
                                {row?.firstApproved === null ? (
                                    <Chip
                                        label="First Pending"
                                        color="warning"
                                        variant="outlined"
                                        size="small"
                                        clickable={false}
                                    />
                                ) : (
                                    <Chip
                                        label="First Rejected"
                                        color="error"
                                        variant="outlined"
                                        size="small"
                                        clickable={false}
                                    />
                                )}
                            </Stack>
                        ) : (
                            <Stack direction="row" spacing={1}>
                                {row?.secondApproved === null ? (
                                    <button
                                        id="btn"
                                        className="overflow-hidden cursor-pointer z-0"
                                        onClick={() => {
                                            showConfirmationDialog({
                                                title: 'Second Approval',
                                                text: 'Do you want to Approve ?',
                                                showCancelButton: true,
                                                showDenyButton: true,
                                                denyButtonText: 'Reject',
                                                next: (res) => {
                                                    if (res.isConfirmed) {
                                                        return handleSecondComplete(
                                                            row?._id,
                                                            res?.isConfirmed,
                                                            'Approval'
                                                        )
                                                    }
                                                    if (res.isDenied) {
                                                        return handleSecondComplete(
                                                            row?._id,
                                                            !res.isDenied,
                                                            'Rejected'
                                                        )
                                                    }
                                                },
                                            })
                                        }}
                                    >
                                        <Chip
                                            label="Second Pending"
                                            color="warning"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                ) : row?.secondApproved ? (
                                    <Chip
                                        label="Second Approved"
                                        color="success"
                                        variant="outlined"
                                        size="small"
                                        clickable={false}
                                    />
                                ) : (
                                    <Chip
                                        label="Second Rejected"
                                        color="error"
                                        variant="outlined"
                                        size="small"
                                        clickable={false}
                                    />
                                )}
                            </Stack>
                        )}
                    </div>
                )
            },
        },
    ]

    // Second level Approval
    const handleSecondComplete = (
        _id: string,
        value: boolean,
        message: string
    ) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        updateInwardDealerApproval({
            body: {
                secondApproved: value,
                type: 'SECOND',
                secondApprovedById: userData?.userId,
                secondApprovedAt: currentDate,
                secondApprovedActionBy: userData?.userName,
            },
            id: _id,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', ` ${message} is successfully!`)
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    const handleReload = () => {
        if (customized) {
            const confirmValue: boolean = window.confirm(
                'Your changes have not been saved. To stay on the page so that you can save your changes, click Cancel.'
            )
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

    const f = (
        barcodeNumber: string,
        index: number,
        productGroupId: string
    ) => {
        dispatch(setFieldCustomized(true))
        getBarCode({
            id: barcodeNumber,
            groupId: productGroupId,
            status: barcodeStatusEnum.dtw,
            isSendingToDealer: false
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    if (res?.data?.data && res?.data?.data[0] !== null) {
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
            .catch((err: any) => console.error(err))
    }

    const handleDispatchBarcode = () => {
        const filterValue = barcodeList?.flat(1)?.map((ele: any) => {
            const {
                vendorLabel,
                isUsedFresh,
                upperBarcodeNumber,
                invoiceNumber,
                wareHouseLabel,
                dtw,
                companyId,
                barcodeNumber,
                productGroupLabel,
                vendorId,
                createdAt,
                outerBoxbarCodeNumber,
                isActive,
                isDeleted,
                updatedAt,
                cartonBoxId,
                status,
                __v,
                expiryDate,
                isFreezed,
                ...rest
            } = ele
            return {
                ...rest,
                // toCompanyId: null,
                fromCompanyId: userData?.companyId,
                // wareHouseId: warehouseId,
            }
        })

        const wId = selectedItemsTobeDispatch?.documents?.map(
            (ele: any) => ele?._id as string
        )
        barcodeDispatch({
            barcodedata: [...filterValue],
            wId: [...(wId as string[])],
            from: barcodeStatusEnum.dtw,
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    showToast('success', 'Successfully Completed')
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
            {/* <SideNavLayout> */}
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
                    <div className="px-4 pt-2 pb-6 overflow-auto">
                        {/* SO NO. & DEALER NAME */}
                        <div className="grid grid-cols-4 pb-2 border-slate-300 border-b-[1px]">
                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className="font-bold">DTW NUMBER</div>
                                    {':'}
                                    <div >
                                        {selectedItemsTobeDispatch?._id}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className="font-bold">
                                        From Warehouse
                                    </div>
                                    {':'}
                                    <div >
                                        {capitalizeFirstLetter(
                                            selectedItemsTobeDispatch?.fromWarehouseLabel ||
                                            ''
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedItemsTobeDispatch?.documents?.map(
                            (document: any, docIndex: number) => {
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
                                                        f(
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
            {/* </SideNavLayout> */}
        </>
    )
}

export default InwardDealerTabsListingWrapper
