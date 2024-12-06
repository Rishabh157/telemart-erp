// |-- Built-in Dependencies --|
import React, { useState } from 'react'
import { CircularProgress } from '@mui/material'
import moment from 'moment'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { OrderListResponse } from 'src/models'

// |-- Redux --|
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAllAssignsDealerSchemeByDealerIdQuery } from 'src/services/DealerSchemeService'
import { useUpdateOrderSchemeAndQuantityMutation } from 'src/services/OrderService'
import { showToast } from 'src/utils'
import { ATMDealerDisplay } from 'src/components/UI/atoms/ATMDisplay/ATMDisplay'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

// |-- Types --|
type Props = {
    items: OrderListResponse
    isLoading: boolean
}

const OrderSchemChangeRequest = ({ items, isLoading }: Props) => {

    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [values, setValues] = useState({
        schemeId: '',
        shcemeQuantity: 0
    })

    const [updateOrder] = useUpdateOrderSchemeAndQuantityMutation();

    const dispatch = useDispatch<AppDispatch>()
    const state: any = useSelector((state: RootState) => state.listingPagination)
    const { page, rowsPerPage, totalItems, searchValue } = state

    const { options, isOptionsLoading } = useCustomOptions({
        useEndPointHook: useGetAllAssignsDealerSchemeByDealerIdQuery(items?.assignDealerId, {
            skip: !items?.assignDealerId
        }),
        keyName: 'schemeName',
        value: 'schemeId',
    })

    const handleUpdateOrder = () => {
        setApiStatus(true)
        setTimeout(() => {
            updateOrder({
                orderNumber: items?.orderNumber,
                schemeId: values?.schemeId,
                shcemeQuantity: values?.shcemeQuantity,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Scheme updated successfully!')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', res?.error?.data?.message)
                }
                setApiStatus(false)
            })
        }, 1000)
    }


    React.useEffect(() => {
        setValues({
            schemeId: items?.schemeId,
            shcemeQuantity: items?.shcemeQuantity
        })
    }, [items])

    return (
        <div className="h-[calc(100vh-60px)] px-4">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]  p-1">
                <ATMPageHeading>Order Scheme Update</ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white ">
                {/*Table Header */}
                <ATMTableHeader
                    searchValue={searchValue}
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={[]}
                    isHiddenPagination
                    onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    children={
                        (values.schemeId && values.shcemeQuantity) && (
                            <div className="grid grid-cols-3 gap-x-3">
                                <ATMSelectSearchable
                                    required
                                    componentClass='mt-0'
                                    name=""
                                    label=""
                                    value={values?.schemeId}
                                    options={options || []}
                                    isLoading={isOptionsLoading}
                                    onChange={(e: any) => {
                                        setValues((pre) => (
                                            { ...pre, schemeId: e }
                                        ))
                                    }}
                                />

                                <ATMTextField
                                    required
                                    name=''
                                    type="number"
                                    label=""
                                    placeholder="Enter Quantity"
                                    min={0}
                                    value={values?.shcemeQuantity}
                                    className="mt-0 rounded"
                                    extraClassField='mt-1'
                                    onChange={(e) => {
                                        setValues((prev) => ({
                                            ...prev,
                                            shcemeQuantity: parseInt(e.target.value) || 1,
                                        }));
                                    }}
                                />

                                <div className='mt-1'>
                                    <button
                                        type="button"
                                        disabled={apiStatus}
                                        onClick={() => {
                                            showConfirmationDialog({
                                                title: 'Update Scheme & Quantity',
                                                text: 'Do you really want to update scheme and quantity',
                                                showCancelButton: true,
                                                next: (res: any) => {
                                                    return res.isConfirmed && handleUpdateOrder()

                                                },
                                            })
                                        }}
                                        className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${apiStatus ? 'opacity-50' : ''}`}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )

                    }
                />

                {/* Table */}
                <div className="grow overflow-auto">
                    <div className="px-4 h-[calc(100vh-55px)] bg-white">

                        {isLoading && (
                            <div className="absolute inset-0 flex justify-center items-center z-10 bg-slate-100 opacity-50">
                                <CircularProgress />
                            </div>
                        )}

                        {items !== null ? (<div className="p-4 flex flex-col gap-2">
                            {/* General Information */}
                            <div className='bg-white shadow border p-4 rounded-lg hidden'>

                                {/* Information */}
                                <p className='border-l-[3px] border-fuchsia-600 px-2 py-1 font font-medium text-md bg-white text-fuchsia-600'>
                                    General Information
                                </p>

                                <div className='grid grid-cols-12 md:gap-8 xs:gap-4 md:py-0 xs:py-4'>
                                    <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                                        <div className='flex flex-col gap-4 px-4'>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-neutral font-medium text-sm'>
                                                    Order Number
                                                </span>
                                                <span className='text-sm text-primary-main font-semibold'># {items?.orderNumber}</span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-neutral font-medium text-sm'>
                                                    Call Type
                                                </span>
                                                <span className='text-sm font-bold uppercase'>{items?.callType}</span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-neutral font-medium text-sm'>
                                                    Status
                                                </span>
                                                <span className='text-sm font-bold text-green-600 uppercase'>
                                                    {items?.status}
                                                </span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-neutral font-medium text-sm'>
                                                    Order Type
                                                </span>
                                                <span className='text-sm font-bold'>
                                                    {items?.orderType}
                                                </span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-neutral font-medium text-sm'>
                                                    Agent Name
                                                </span>
                                                <span className='text-sm font-bold capitalize'>{items?.agentName}</span>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                                        <div className='flex flex-col gap-4 px-4'>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-neutral font-medium text-sm'>
                                                    DID Number
                                                </span>
                                                <span className='text-sm font-bold'>{items?.didNo ?? 'NA'}</span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-neutral font-medium text-sm'>
                                                    Campaign
                                                </span>
                                                <span className='text-sm font-bold'>{items?.campaign?.replaceAll('_', ' ')}</span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-neutral font-medium text-sm'>
                                                    Mobile Number
                                                </span>
                                                <span className='text-sm font-bold'>{items?.mobileNo}</span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-neutral font-medium text-sm'>
                                                    Alternate Number
                                                </span>
                                                <span className='text-sm font-bold'>{items?.alternateNo || 'NA'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                                        <div className='flex flex-col gap-4 px-4'>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-neutral font-medium text-sm'>
                                                    Assigne To {items?.assignDealerId === null ? 'Warehouse' : 'Dealer'}
                                                </span>
                                                <span className='text-sm font-bold'>
                                                    {items?.assignDealerId === null ? items?.assignWarehouseLabel : `${items?.assignDealerLabel} + (${items?.assignDealerCode})`}
                                                </span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-neutral font-medium text-sm'>
                                                    Customer Name
                                                </span>
                                                <span className='text-sm font-bold capitalize'>{items?.customerName || '-'}</span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-neutral font-medium text-sm'>
                                                    Customer Email
                                                </span>
                                                <span className='text-sm font-bold'>{items?.emailId || 'NA'}</span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-neutral font-medium text-sm'>
                                                    Whatsapp Number
                                                </span>
                                                <span className='text-sm font-bold'>{items?.whatsappNo || 'NA'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cards Tabs */}
                            <div className="grid grid-cols-12 gap-6">

                                {/*  Address */}
                                <div className='p-4 xl:col-span-4 md:col-span-6 xs:col-span-12 shadow mt-3 bg-white rounded-lg'>

                                    {/* Heading */}
                                    <p className='border-l-[3px] border-fuchsia-600 px-2 py-1 font font-medium text-md bg-white text-fuchsia-600'>
                                        Order Details
                                    </p>

                                    <div className='flex flex-col gap-4 px-3 py-4'>

                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Customer Name
                                            </span>
                                            <span className='text-sm capitalize text-primary-main font-semibold'>
                                                {items?.customerName || 'N/A'}
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Mobile Number
                                            </span>
                                            <span className='text-sm text-primary-main font-semibold'>
                                                {items?.mobileNo || '-'}
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Assign Dealer
                                            </span>
                                            <span className='text-sm capitalize font-semibold'>
                                                {/* {items?.assignDealerLabel || 'N/A'} */}
                                                <ATMDealerDisplay dealerCode={items?.assignDealerCode} dealerLabel={items?.assignDealerLabel} />
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                State
                                            </span>
                                            <span className='text-sm capitalize font-semibold'>
                                                {items?.stateLabel}
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                District
                                            </span>
                                            <span className='text-sm capitalize font-semibold'>
                                                {items?.districtLabel}
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Tehsil
                                            </span>
                                            <span className='text-sm capitalize font-semibold'>
                                                {items?.tehsilLabel}
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Pincode
                                            </span>
                                            <span className='text-sm font-semibold'>
                                                {items?.pincodeLabel}
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Full Address
                                            </span>
                                            <span
                                                className='text-sm font-semibold w-[70%] truncate capitalize'
                                                title={items?.autoFillingShippingAddress}
                                            >
                                                {items?.autoFillingShippingAddress}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Scheme Products & Price Details */}
                                <div className='p-4 xl:col-span-4 md:col-span-6 xs:col-span-12 shadow mt-3 bg-white rounded-lg'>

                                    {/* Heading */}
                                    <p className='border-l-[3px] border-indigo-600 px-2 py-1 font font-medium text-md bg-white text-indigo-600'>
                                        Scheme Products & Price Details
                                    </p>

                                    <div className='flex flex-col gap-4 px-3 py-4'>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Scheme Name
                                            </span>
                                            <span className='text-sm text-[#ce7909] font-semibold'>
                                                {items?.schemeName || '-'}
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Scheme Quantity
                                            </span>
                                            <span className='text-sm text-primary-main font-semibold'>
                                                {items?.shcemeQuantity}
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                HSN Code
                                            </span>
                                            <span className='text-sm font-semibold'>
                                                {items?.hsnCode || '-'}
                                            </span>
                                        </div>

                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Payment Mode
                                            </span>
                                            <span className='text-sm font-semibold text-green-500'>
                                                {items?.paymentMode}
                                            </span>
                                        </div>

                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Price
                                            </span>
                                            <span className='text-sm text-primary-main font-semibold'>
                                                &#x20B9; {items?.price || 0} /-
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Delivery Charges
                                            </span>
                                            <span className='text-sm text-primary-main font-semibold'>
                                                &#x20B9; {items?.deliveryCharges || 0} /-
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Total Amount
                                            </span>
                                            <span className='text-sm text-primary-main font-semibold'>
                                                &#x20B9; {items?.totalAmount || 0} /-
                                            </span>
                                        </div>
                                    </div>
                                </div>


                                {/* Reason Of Order */}
                                <div className='p-4 xl:col-span-4 md:col-span-6 xs:col-span-12 shadow mt-3 bg-white rounded-lg'>

                                    {/* Heading */}
                                    <p className='border-l-[3px] border-indigo-600 px-2 py-1 font font-medium text-md bg-white text-indigo-600'>
                                        Delivery Details
                                    </p>

                                    <div className='flex flex-col gap-4 px-3 py-4'>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Delivery Boy
                                            </span>
                                            <span className='text-sm text-primary-main font-semibold'>
                                                {items?.deliveredBy ?
                                                    items?.deliveredBy?.replaceAll('_', ' ') + ' - ' + items?.preffered_delivery_end_time?.replaceAll('_', ' ')
                                                    : 'NA'
                                                }
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Preffered Time
                                            </span>
                                            <span className='text-sm text-primary-main font-semibold'>
                                                {items?.preffered_delivery_start_time ?
                                                    items?.preffered_delivery_start_time?.replaceAll('_', ' ') + ' - ' + items?.preffered_delivery_end_time?.replaceAll('_', ' ')
                                                    : 'NA'
                                                }
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Preffered Date
                                            </span>
                                            <span className='text-sm text-primary-main font-semibold'>
                                                {items?.preffered_delivery_date ? moment(items?.preffered_delivery_date).format('DD-MM-YYYY') : 'NA'}
                                            </span>
                                        </div>

                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Delivery Time And Date
                                            </span>
                                            <span className='text-sm font-bold'>{items?.deliveryTimeAndDate || 'NA'}</span>
                                        </div>

                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Type of Address
                                            </span>
                                            <span className='text-sm font-bold'>{items?.typeOfAddress || 'NA'}</span>
                                        </div>

                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                AWB Number
                                            </span>
                                            <span className='text-sm font-bold'>{items?.awbNumber || 'NA'}</span>
                                        </div>

                                        <div className='flex justify-between items-center'>
                                            <span className='text-neutral font-medium text-sm'>
                                                Preship Cancelation Date
                                            </span>
                                            <span className='text-sm font-bold'>
                                                {items?.preShipCancelationDate ? items?.preShipCancelationDate : 'NA'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>) : null}
                    </div>
                </div>

                {/* Pagination */}
                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={[]}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div >
    )
}

export default OrderSchemChangeRequest
