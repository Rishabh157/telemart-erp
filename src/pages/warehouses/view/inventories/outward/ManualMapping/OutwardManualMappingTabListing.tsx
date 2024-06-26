// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { OrderListResponse } from 'src/models'

// |-- Redux --|
import { setSearchValue } from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import { handleValidNumberForSearch } from 'src/utils/methods/numberMethods'

// |-- Types --|
type Props = {
    orderInfo: OrderListResponse | null
}

const OutwardManualMappingTabListing = ({ orderInfo }: Props) => {
    const dispatch = useDispatch<AppDispatch>()

    const outwardCustomerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { searchValue } = outwardCustomerState

    return (
        <div className="h-[calc(100vh-350px)] bg-white">
            <div className="border flex flex-col h-[calc(100%)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    rows={orderInfo as any}
                    searchValue={searchValue}
                    placeholder="Search Order No."
                    onSearch={(newValue) => {
                        handleValidNumberForSearch(newValue) &&
                            dispatch(setSearchValue(newValue))
                    }}
                    isHiddenPagination={true}
                />

                {/* Table */}
                <div className="grow overflow-auto max-h-[calc(100%-10px)]">
                    {orderInfo !== null ? (
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className="mb-4 text-sm">
                                <div className="grid grid-cols-2 gap-x-4">
                                    <div>
                                        <p className="text-gray-600">
                                            Order Number:
                                        </p>
                                        <p className="font-semibold text-primary-main">
                                            #{orderInfo?.orderNumber}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">
                                            Customer Name:
                                        </p>
                                        <p className="font-semibold">
                                            {orderInfo?.customerName}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 mt-4">
                                    <div>
                                        <p className="text-gray-600">State:</p>
                                        <p className="font-semibold">
                                            {orderInfo?.stateLabel}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">
                                            District:
                                        </p>
                                        <p className="font-semibold">
                                            {orderInfo?.districtLabel}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 mt-4">
                                    <div>
                                        <p className="text-gray-600">Tehsil:</p>
                                        <p className="font-semibold">
                                            {orderInfo?.tehsilLabel}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">
                                            Pincode:
                                        </p>
                                        <p className="font-semibold">
                                            {orderInfo?.pincodeLabel}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 mt-4">
                                    <div>
                                        <p className="text-gray-600">Area:</p>
                                        <p className="font-semibold">
                                            {orderInfo?.areaLabel}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">
                                            Current Status:
                                        </p>
                                        <p className="font-semibold text-yellow-600">
                                            {orderInfo?.status}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 mt-4">
                                    <div>
                                        <p className="text-gray-600">
                                            Scheme name & Quantity:
                                        </p>
                                        <p className="font-semibold">
                                            {orderInfo?.schemeName} /{' '}
                                            {orderInfo?.shcemeQuantity}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">
                                            Mobile Number:
                                        </p>
                                        <p className="font-semibold">
                                            {orderInfo?.mobileNo}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 mt-4">
                                    <div>
                                        <p className="text-gray-600">
                                            Agent Name:
                                        </p>
                                        <p className="font-semibold">
                                            {orderInfo?.agentName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">
                                            Ordered Date:
                                        </p>
                                        <p className="font-semibold">
                                            {orderInfo?.createdAt
                                                ? formatedDateTimeIntoIst(
                                                      orderInfo?.createdAt || ''
                                                  )
                                                : '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default OutwardManualMappingTabListing
