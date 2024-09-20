// |-- External Dependencies --|
import { DealersListResponse } from 'src/models'
import { CircularProgress } from '@mui/material'

// |-- Types --|
type Props = {
    items: DealersListResponse | null
    isLoading: boolean
}

const DealerGeneralInformationTab = ({ items, isLoading }: Props) => {

    return (

        <div className="px-4 h-[calc(100vh-55px)] bg-white">

            {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center z-10 bg-slate-100 opacity-50">
                    <CircularProgress />
                </div>
            )}

            <div className="flex flex-col gap-2  ">

                {/* General Information */}
                <div className='bg-white shadow border p-4 rounded-lg'>
                    <p className='border-l-[3px] border-fuchsia-600 px-2 py-1 font font-medium text-md bg-white text-fuchsia-600'>
                        General Information
                    </p>

                    <div className='grid grid-cols-12 md:gap-8 xs:gap-4 md:py-0 xs:py-4'>
                        <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                            <div className='flex flex-col gap-4 px-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Dealer Name
                                    </span>
                                    <span className='text-sm font-semibold capitalize'>{items?.firstName + ' ' + items?.lastName}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Dealer Code
                                    </span>
                                    <span className='text-sm font-bold text-primary-main uppercase'>{items?.dealerCode}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Auto mapping
                                    </span>
                                    <span className='text-sm font-bold'>{items?.isAutoMapping ? 'YES' : 'NO'}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Zonal Manager
                                    </span>
                                    <span className='text-sm font-bold'>{items?.zonalManagerLabel || '-'}</span>
                                </div>
                            </div>
                        </div>

                        <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                            <div className='flex flex-col gap-4 px-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Credit limit
                                    </span>
                                    <span className='text-sm font-bold'>{items?.creditLimit}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Opeaning balance
                                    </span>
                                    <span className='text-sm font-bold'>{items?.openingBalance}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Quantity quotient
                                    </span>
                                    <span className='text-sm font-bold'>{items?.quantityQuotient || '-'}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Zonal Executive
                                    </span>
                                    <span className='text-sm font-bold'>{items?.zonalExecutiveLabel || '-'}</span>
                                </div>
                            </div>
                        </div>

                        <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                            <div className='flex flex-col gap-4 px-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Dealer category
                                    </span>
                                    <span className='text-sm font-bold text-green-600 uppercase'>{items?.dealersCategoryName}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Firm name
                                    </span>
                                    <span className='text-sm font-bold capitalize'>{items?.firmName}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Email
                                    </span>
                                    <span className='text-sm font-bold'>
                                        {items?.email || '-'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-12 gap-6">
                    <div className='p-4 xl:col-span-4 md:col-span-6 xs:col-span-12 shadow mt-3 bg-white rounded-lg'>
                        <p className='border-l-[3px] border-indigo-600 px-2 py-1 font font-medium text-md bg-white text-indigo-600'>
                            Regd. Address
                        </p>
                        <div className='flex flex-col gap-4 px-3 py-4'>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Phone
                                </span>
                                <span className='text-sm font-semibold text-primary-main'>
                                    {items?.registrationAddress?.phone || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Country
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.registrationCountryName || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    State
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.registrationStateName || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    District
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.registrationDistrictName || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Pincode
                                </span>
                                <span className='text-sm font-semibold text-primary-main'>
                                    {items?.registrationPincodeName || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Address
                                </span>
                                <span
                                    className='text-sm font-semibold w-[70%] truncate text-end capitalize'
                                    title={items?.registrationAddress?.address}
                                >
                                    {items?.registrationAddress?.address || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    GST No.
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.registrationAddress?.gstNumber || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Gst Certificate
                                </span>
                                <span className='text-sm font-semibold'>
                                    {items?.registrationAddress?.gstCertificate ? (
                                        <a
                                            className="text-primary-main hover:underline"
                                            href={items?.registrationAddress?.gstCertificate}
                                            download // this enables the download of the linked file
                                            target="_blank" // optional: opens in new tab
                                            rel="noreferrer"
                                        >
                                            PDF
                                        </a>
                                    ) : (
                                        'NA'
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='p-4 xl:col-span-4 md:col-span-6 xs:col-span-12 shadow mt-3 bg-white rounded-lg'>
                        <p className='border-l-[3px] border-indigo-600 px-2 py-1 font font-medium text-md bg-white text-indigo-600'>
                            Billing Address
                        </p>
                        <div className='flex flex-col gap-4 px-3 py-4'>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Phone
                                </span>
                                <span className='text-sm font-semibold text-primary-main'>
                                    {items?.billingAddress?.phone || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Country
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.billingAddressCountryName || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    State
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.billingAddressStateName || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    District
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.billingAddressDistrictName || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Pincode
                                </span>
                                <span className='text-sm font-semibold text-primary-main'>
                                    {items?.billingAddressPincodeName || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Address
                                </span>
                                <span
                                    className='text-sm font-semibold w-[70%] truncate text-end capitalize'
                                    title={items?.billingAddress?.address}
                                >
                                    {items?.billingAddress?.address || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    GST No.
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.billingAddress?.gstNumber || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Gst Certificate
                                </span>
                                <span className='text-sm font-semibold'>
                                    {items?.billingAddress?.gstCertificate ? (
                                        <a
                                            className="text-primary-main hover:underline"
                                            href={items?.billingAddress?.gstCertificate}
                                            download // this enables the download of the linked file
                                            target="_blank" // optional: opens in new tab
                                            rel="noreferrer"
                                        >
                                            PDF
                                        </a>
                                    ) : (
                                        'NA'
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='p-4 xl:col-span-4 md:col-span-6 xs:col-span-12 shadow mt-3 bg-white rounded-lg'>
                        <p className='border-l-[3px] border-indigo-600 px-2 py-1 font font-medium text-md bg-white text-indigo-600'>
                            Documents
                        </p>

                        <div className='flex flex-col gap-4 px-3 py-4'>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    GST No.
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.document?.gstNumber || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Gst Certificate
                                </span>
                                <span className='text-sm font-semibold'>
                                    {items?.document?.gstCertificate ? (
                                        <a
                                            className="text-primary-main hover:underline"
                                            href={items?.document?.gstCertificate}
                                            download // this enables the download of the linked file
                                            target="_blank" // optional: opens in new tab
                                            rel="noreferrer"
                                        >
                                            PDF
                                        </a>
                                    ) : (
                                        'NA'
                                    )}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Aadhar No.
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.document?.adharCardNumber || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Aadhar Certificate
                                </span>
                                <span className='text-sm font-semibold'>
                                    {items?.document?.adharCard ? (
                                        <a
                                            className="text-primary-main hover:underline"
                                            href={items?.document?.adharCard}
                                            download // this enables the download of the linked file
                                            target="_blank" // optional: opens in new tab
                                            rel="noreferrer"
                                        >
                                            PDF
                                        </a>
                                    ) : (
                                        'NA'
                                    )}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Pan No.
                                </span>
                                <span className='text-sm font-semibold'>
                                    {items?.document?.panNumber || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    PAN Certificate
                                </span>
                                <span className='text-sm font-semibold'>
                                    {items?.document?.panCard ? (
                                        <a
                                            className="text-primary-main hover:underline"
                                            href={items?.document?.panCard}
                                            download // this enables the download of the linked file
                                            target="_blank" // optional: opens in new tab
                                            rel="noreferrer"
                                        >
                                            PDF
                                        </a>
                                    ) : (
                                        'NA'
                                    )}
                                </span>
                            </div>
                        </div>

                        <p className='border-l-[3px] border-indigo-600 px-2 py-1 font font-medium text-md bg-white text-indigo-600'>
                            Other Documents
                        </p>
                        <div className='flex flex-col gap-4 px-3 py-4'>
                            {items?.otherDocument?.map((ele, index) => (
                                <div key={index} className='flex justify-between items-center'>
                                    <span className='text-neutral capitalize font-medium text-sm'>
                                        {ele?.documentName || 'NA'}
                                    </span>
                                    <span className='text-sm font-semibold'>
                                        {ele?.documentName ? (
                                            <a
                                                className="text-primary-main hover:underline"
                                                href={ele?.documentName}
                                                download // this enables the download of the linked file
                                                target="_blank" // optional: opens in new tab
                                                rel="noreferrer"
                                            >
                                                PDF
                                            </a>
                                        ) : 'NA'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {items?.contactInformation?.map((ele, index) => (
                        <div
                            key={index}
                            className='p-4 xl:col-span-4 md:col-span-6 xs:col-span-12 shadow mt-3 bg-white rounded-lg'>

                            <p className='border-l-[3px] border-indigo-600 px-2 py-1 font font-medium text-md bg-white text-indigo-600'>
                                Contact Information - {index + 1}
                            </p>

                            <div className='flex flex-col gap-4 px-3 py-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Name
                                    </span>
                                    <span className='text-sm capitalize font-semibold'>
                                        {ele?.name || '-'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Email
                                    </span>
                                    <span className='text-sm font-semibold'>
                                        {ele?.email || '-'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Mobile Number
                                    </span>
                                    <span className='text-sm text-primary-main font-semibold'>
                                        {ele?.mobileNumber || '-'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Landline
                                    </span>
                                    <span className='text-sm text-primary-main font-semibold'>
                                        {ele?.landLine || '-'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Department
                                    </span>
                                    <span
                                        className='text-sm font-semibold capitalize'
                                    >
                                        {ele?.department || '-'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Designation
                                    </span>
                                    <span
                                        className='text-sm font-semibold capitalize'
                                    >
                                        {ele?.designation || '-'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default DealerGeneralInformationTab
