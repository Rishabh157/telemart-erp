/* eslint-disable array-callback-return */
/// ==============================================
// Filename:OutwardDealerTabsListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { IconType } from 'react-icons'
import { Chip, Stack } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import {
    BarcodeListResponseType,
    InwardDealerRequstListResponse,
} from 'src/models'
import OutwardRequestListing from './InwardDealerTabs'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import BarcodeCard from 'src/components/UI/Barcode/BarcodeCard'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import {
    useGetPaginationInwardDealerOrderQuery,
    useInwardDealerBarcodeMutation,
    useUpdateInwardDealerApprovalMutation,
} from 'src/services/InwardDealerServices'
import {
    setItems,
    setTotalItems,
    setIsTableLoading,
} from 'src/redux/slices/InwardDealerSlice'
import { useGetAllBarcodeOfDealerOutWardDispatchMutation } from 'src/services/BarcodeService'

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

const InwardDealerTabsListingWrapper = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [barcodeNumber, setBarcodeNumber] = useState<any>([])
    const [barcodeQuantity, setBarcodeQuantity] = useState<number>(0)
    const [barcodeList, setBarcodeList] = useState<any>([])
    const [selectedItemsTobeDispatch, setSelectedItemsTobeDispatch] =
        useState<InwardDealerRequstListResponse | null>(null)
    const { id: warehouseId } = useParams()

    const dispatch = useDispatch<AppDispatch>()

    const inwardDealerState: any = useSelector(
        (state: RootState) => state.inwardDealer
    )
    const { page, rowsPerPage, searchValue, items } = inwardDealerState

    const { customized, userData } = useSelector(
        (state: RootState) => state?.auth
    )
    const {
        data: warehouseTransferData,
        isFetching: warehouseTransferIsFetching,
        isLoading: warehouseTransferIsLoading,
    } = useGetPaginationInwardDealerOrderQuery({
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
    })

    const [getBarCode] = useGetAllBarcodeOfDealerOutWardDispatchMutation()
    const [barcodeDispatch, barcodeDispatchInfo] =
        useInwardDealerBarcodeMutation()
    const [updateInwardDealerApproval] = useUpdateInwardDealerApprovalMutation()

    useEffect(() => {
        if (!warehouseTransferIsFetching && !warehouseTransferIsLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(warehouseTransferData?.data || []))
            dispatch(setTotalItems(warehouseTransferData?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }
    }, [
        warehouseTransferIsLoading,
        warehouseTransferIsFetching,
        warehouseTransferData,
        dispatch,
    ])

    const columns: columnTypes[] = [
        {
            field: 'dtwNumber',
            headerName: 'DTW Number',
            flex: 'flex-[0.8_0.8_0%]',
            renderCell: (row: InwardDealerRequstListResponse) => (
                <span> {row?._id} </span>
            ),
        },
        {
            field: 'toWarehouseLabel',
            headerName: 'To Warehouse',
            flex: 'flex-[0.8_0.8_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => (
                <span> {row?.toWarehouseLabel} </span>
            ),
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
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
            field: 'firstApprovedActionStatus',
            headerName: 'First Status',
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
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return <span> {row?.firstApprovedActionBy} </span>
            },
        },
        {
            field: 'firstApprovedAt',
            headerName: 'First Approved Date',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return <span> {row?.firstApprovedAt} </span>
            },
        },
        {
            field: 'secondApprovedActionByStatus',
            headerName: 'Second Status',
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
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return <span> {row?.secondApprovedActionBy} </span>
            },
        },
        {
            field: 'secondApprovedAt',
            headerName: 'Second Approved Date',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return <span> {row?.secondApprovedAt} </span>
            },
        },
        {
            field: 'createdAt',
            headerName: 'Inserted Date',
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
        {
            field: 'actions',
            headerName: 'Inward',
            flex: 'flex-[1_0.1_0%]',
            align: 'center',
            renderCell: (row: InwardDealerRequstListResponse) => {
                return row?.documents[0].status !== 'DISPATCHED' ? (
                    ''
                ) : (
                    <>
                        <ActionPopup
                            moduleName={UserModuleNameTypes.dealer}
                            isCustomBtn={true}
                            customBtnText="Inward"
                            handleOnAction={() => {}}
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
                    </>
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
            status: 'DTW',
            companyId: userData?.companyId as string,
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
            from: 'DTW',
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
                                    <div className="">
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
            {/* </SideNavLayout> */}
        </>
    )
}

export default InwardDealerTabsListingWrapper
