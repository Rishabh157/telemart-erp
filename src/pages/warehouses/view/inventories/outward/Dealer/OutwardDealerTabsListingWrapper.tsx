// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { IconType } from 'react-icons'
import { Formik, FormikProps } from 'formik'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import { useNavigate, useParams } from 'react-router-dom'
import BarcodeCard from 'src/components/UI/Barcode/BarcodeCard'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import {
    BarcodeListResponseType,
    OutwardRequestDealerListResponse,
} from 'src/models'
import { SaleOrderStatus } from 'src/models/OutwardRequest.model'
import { AlertText } from 'src/pages/callerpage/components/constants'
import { showToast } from 'src/utils'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import OutwardRequestListing from './OutwardDealerTabs'

// |-- Redux --|
import { useDispatch, useSelector } from 'react-redux'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    useGetAllBarcodeOfDealerOutWardDispatchMutation,
    useUpdateBarcodeFreezeStatusMutation,
    useDispatchDealerBarcodeMutation,
} from 'src/services/BarcodeService'
import { useGetPaginationSaleOrderByGroupQuery } from 'src/services/SalesOrderService'
import { barcodeStatusEnum } from 'src/utils/constants/enums'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetTransportQuery } from 'src/services/transportServiceses'
import { getTransportTypeOptions } from 'src/utils/constants/customeTypes'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'
import { CircularProgress } from '@mui/material'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

type FormInitialValues = {
    transportnameId: string
    transporterGST: string
    mode: string
    distance: string
    vehicleNumber: string
    vehicleType: string
    transportDocNo: string
    documnetDate: string
    roadPermitNumber: string
    lrNo: string
    totalWeight: string
    totalPackages: string
    fileUrl: string
}

const OutwardDealerTabsListingWrapper = () => {
    useUnmountCleanup()
    const [isShow, setIsShow] = useState<boolean>(false)
    const [barcodeNumber, setBarcodeNumber] = useState<any>([])
    const [barcodeQuantity, setBarcodeQuantity] = useState<number>(0)
    const [barcodeList, setBarcodeList] = useState<any>([])
    const [imageApiStatus, setImageApiStatus] = useState<boolean>(false)

    // Upload File Mutation
    const [uploadFile] = useAddFileUrlMutation()

    const [selectedItemsTobeDispatch, setSelectedItemsTobeDispatch] =
        useState<OutwardRequestDealerListResponse | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const params = useParams()
    const warehouseId = params.id
    const salesOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = salesOrderState
    const { customized, userData } = useSelector(
        (state: RootState) => state?.auth
    )

    const { items } = useGetCustomListingData<OutwardRequestDealerListResponse>(
        {
            useEndPointHook: useGetPaginationSaleOrderByGroupQuery({
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
            }),
        }
    )

    const { options: transportNameOptions } = useCustomOptions({
        useEndPointHook: useGetTransportQuery(userData?.companyId),
        keyName: 'transportName',
        value: '_id',
    })

    const [getBarCode] = useGetAllBarcodeOfDealerOutWardDispatchMutation()
    const [updateBarcodeStatus] = useUpdateBarcodeFreezeStatusMutation()

    const [barcodeDispatch, barcodeDispatchInfo] =
        useDispatchDealerBarcodeMutation()

    // Form Initial Values
    const initialValues: FormInitialValues = {
        transportnameId: '',
        transporterGST: '',
        mode: '',
        distance: '',
        vehicleNumber: '',
        vehicleType: 'REGULAR',
        transportDocNo: '',
        documnetDate: '',
        roadPermitNumber: '',
        lrNo: '',
        totalWeight: '',
        totalPackages: '',
        fileUrl: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        transportnameId: string().required('Please select a transportname'),
        transporterGST: string().required('Please select a transporter GST'),
        mode: string().required('Please select a mode'),
        distance: string().required('Please select a distance'),
        vehicleNumber: string().required('Please select a vehicle no.'),
        vehicleType: string().required(
            'Please select a transport document no.'
        ),
        transportDocNo: string().required(
            'Please select a transport document no.'
        ),
        documnetDate: string().required('Please select a documnet date'),
        roadPermitNumber: string(),
        lrNo: string(),
        totalWeight: string(),
        totalPackages: string(),
        fileUrl: string(),
    })

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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_DEALER_LIST_SO_NUMBER,
            renderCell: (row: OutwardRequestDealerListResponse) => (
                <span> {row?._id} </span>
            ),
        },
        {
            field: 'dealerLabel',
            headerName: 'Dealer Name',
            flex: 'flex-[0.6_0.6_0%]',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_DEALER_LIST_DEALER_NAME,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_DEALER_LIST_ITEMS,
            align: 'center',
            renderCell: (row: OutwardRequestDealerListResponse) => {
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_DEALER_LIST_INSERTED_DATE,
            align: 'center',
            renderCell: (row: OutwardRequestDealerListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.createdAt)} </span>
            },
        },
        {
            field: 'updatedAt',
            headerName: 'Updated Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_DEALER_LIST_UPDATED_DATE,
            align: 'center',
            renderCell: (row: OutwardRequestDealerListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.updatedAt)} </span>
            },
        },
        {
            field: 'status',
            headerName: 'status',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_DEALER_LIST_STATUS,
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
            } else {
                updateBarcodeStatus({
                    barcodeNumber,
                    status: false,
                })
                    .then((res) => {
                        // console.log('object from remove', res)
                    })
                    .catch((err) => console.error(err))
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
            status: barcodeStatusEnum.atWarehouse,
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
                    updateBarcodeStatus({
                        barcodeNumber,
                        status: true,
                    })
                        .then((res) => {
                            // console.log('object', res)
                        })
                        .catch((err) => console.error(err))
                } else {
                    // showToast('error', 'barcode number is not matched')
                }
            })
            .catch((err) => console.error(err))
    }

    const onSubmitHandler = (values: FormInitialValues) => {
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
            ...values,
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

    const handleFileUpload = async (file: File, setFieldValue: any) => {
        let fileUrl = ''
        let formData = new FormData()

        setImageApiStatus(true)
        formData.append(
            'type',
            file.type?.includes('image') ? 'IMAGE' : 'DOCUMENT'
        )
        formData.append('bucketName', 'SAPTEL_CRM')
        formData.append('file', file || '', file?.name)

        try {
            // call the file manager api
            const res = await uploadFile(formData)
            if ('data' in res) {
                setImageApiStatus(false)
                fileUrl = BASE_URL_FILE_PICKER + '/' + res?.data?.file_path
                setFieldValue('fileUrl', fileUrl)
                return fileUrl
            }
        } catch (error) {
            console.error('Error uploading file:', error)
            // Handle error here if needed
        }
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
                                    <div className="capitalize">
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

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmitHandler}
                        >
                            {(formikProps: FormikProps<FormInitialValues>) => {
                                const { values, setFieldValue, handleSubmit } =
                                    formikProps

                                return (
                                    <>
                                        <div>
                                            <div className="text-lg pb-2 font-medium text-primary-main">
                                                Transport Details
                                            </div>

                                            <div className="grid grid-cols-4 gap-x-8">
                                                <ATMSelectSearchable
                                                    required
                                                    label="Transport Name"
                                                    name="transportnameId"
                                                    value={
                                                        values.transportnameId
                                                    }
                                                    options={
                                                        transportNameOptions
                                                    }
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'transportnameId',
                                                            e
                                                        )
                                                    }}
                                                />

                                                <ATMTextField
                                                    required
                                                    name="transporterGST"
                                                    value={
                                                        values.transporterGST
                                                    }
                                                    label="Transporter GST"
                                                    placeholder="transporter GST"
                                                    className="mt-0 rounded"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'transporterGST',
                                                            e?.target?.value
                                                        )
                                                    }}
                                                />

                                                <ATMSelectSearchable
                                                    required
                                                    label="Mode"
                                                    name="mode"
                                                    value={values.mode}
                                                    options={getTransportTypeOptions()}
                                                    onChange={(e) => {
                                                        setFieldValue('mode', e)
                                                    }}
                                                />

                                                <ATMTextField
                                                    required
                                                    name="distance"
                                                    value={values.distance}
                                                    label="Distance"
                                                    placeholder="Distance"
                                                    className="mt-0 rounded"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'distance',
                                                            e?.target?.value
                                                        )
                                                    }}
                                                />

                                                <ATMTextField
                                                    required
                                                    name="vehicleNumber"
                                                    value={values.vehicleNumber}
                                                    label="Vehicle No."
                                                    placeholder="Distance"
                                                    className="mt-0 rounded"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'vehicleNumber',
                                                            e?.target?.value
                                                        )
                                                    }}
                                                />

                                                <ATMSelectSearchable
                                                    required
                                                    label="Vehicle Type"
                                                    name="vehicleType"
                                                    value={values.vehicleType}
                                                    options={[
                                                        {
                                                            label: 'Regular',
                                                            value: 'REGULAR',
                                                        },
                                                    ]}
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'vehicleType',
                                                            e
                                                        )
                                                    }}
                                                />

                                                <ATMTextField
                                                    required
                                                    name="transportDocNo"
                                                    value={
                                                        values.transportDocNo
                                                    }
                                                    label="Transport document no."
                                                    placeholder="Distance"
                                                    className="mt-0 rounded"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'transportDocNo',
                                                            e?.target?.value
                                                        )
                                                    }}
                                                />

                                                <div className="mt-5">
                                                    <ATMDatePicker
                                                        required
                                                        label="Document Date"
                                                        name="documnetDate"
                                                        textTransform="capitalize"
                                                        className="mt-0"
                                                        dateTimeFormat="DD/MM/YYYY"
                                                        value={
                                                            values.documnetDate
                                                        }
                                                        minDate={
                                                            'values?.callBackFrom.value'
                                                        }
                                                        onChange={(
                                                            newValue
                                                        ) => {
                                                            setFieldValue(
                                                                'documnetDate',
                                                                newValue
                                                            )
                                                        }}
                                                    />
                                                </div>

                                                <ATMTextField
                                                    name=""
                                                    value={values.totalWeight}
                                                    label="Total weight"
                                                    placeholder="Total weight"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'totalWeight',
                                                            e?.target?.value
                                                        )
                                                    }}
                                                    className="mt-0 rounded"
                                                />

                                                <ATMTextField
                                                    name=""
                                                    value={
                                                        values.roadPermitNumber
                                                    }
                                                    label="Road Permit No."
                                                    placeholder="Road permin no."
                                                    className="mt-0 rounded"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'roadPermitNumber',
                                                            e?.target?.value
                                                        )
                                                    }}
                                                />

                                                <ATMTextField
                                                    name=""
                                                    value={values.lrNo}
                                                    label="LR No."
                                                    placeholder="Lr no."
                                                    className="mt-0 rounded"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'lrNo',
                                                            e?.target?.value
                                                        )
                                                    }}
                                                />

                                                <ATMTextField
                                                    name=""
                                                    value={values.totalPackages}
                                                    label="Total packages"
                                                    placeholder="Total packages"
                                                    className="mt-0 rounded"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'totalPackages',
                                                            e?.target?.value
                                                        )
                                                    }}
                                                />

                                                <div className="w-ful mt-5">
                                                    <ATMFilePickerWrapper
                                                        name=""
                                                        label="File Upload"
                                                        placeholder={
                                                            'Select File'
                                                        }
                                                        selectedFile={
                                                            values.fileUrl
                                                        }
                                                        onSelect={(
                                                            newFile: any
                                                        ) => {
                                                            handleFileUpload(
                                                                newFile,
                                                                setFieldValue
                                                            )
                                                        }}
                                                        // isSubmitting={false}
                                                    />
                                                    {imageApiStatus ? (
                                                        <div className="mt-3">
                                                            <CircularProgress
                                                                size={18}
                                                            />
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end items-end mt-4">
                                            <div>
                                                <ATMLoadingButton
                                                    disabled={
                                                        !handleDisableDispatchButton()
                                                    }
                                                    isLoading={
                                                        barcodeDispatchInfo?.isLoading
                                                    }
                                                    loadingText="Dispatching"
                                                    onClick={
                                                        handleSubmit as any
                                                    }
                                                    className="bg-primary-main text-white flex items-center py-1 px-4 rounded"
                                                >
                                                    Dispatch
                                                </ATMLoadingButton>
                                            </div>
                                        </div>
                                    </>
                                )
                            }}
                        </Formik>
                    </div>
                }
            />
        </>
    )
}

export default OutwardDealerTabsListingWrapper
