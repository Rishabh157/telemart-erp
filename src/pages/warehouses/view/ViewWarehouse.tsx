// |-- Built-in Dependencies --|
import React from 'react'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'

// |-- Types --|
type Props = {
    items: any
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Warehouse',
        path: '/warehouse',
    },
    {
        label: 'View Warehouse',
    },
]

const ViewWarehouse = ({ items }: Props) => {
    return (
        <div className=" px-4 h-[calc(100vh-55px)] bg-white">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1 ">
                    <ATMPageHeading> Warehouse</ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium pl-2">
                            {' '}
                            All Details{' '}
                        </div>
                        {/* BUTTON - Add SO */}
                        <div></div>
                    </div>

                    {/* Form */}
                    <div className="grow py-8 px-3 ">
                        <div className=" text-lg pb-2 font-medium text-primary-main pl-2">
                            Basic Details
                        </div>
                        <div className="grid grid-cols-4 gap-3 pl-6 py-6 border border-l-2">
                            <h1 className="text-gray-800">Warehouse Name </h1>
                            <p className="text-slate-600">
                                {items?.wareHouseName}
                            </p>
                            <h1 className="text-gray-800">Warehouse Code </h1>
                            <p className="text-slate-600">
                                {items?.wareHouseCode}
                            </p>
                            <h1 className="text-gray-800">Country </h1>
                            <p className="text-slate-600">
                                {items?.wareHouseCountryName}
                            </p>
                            <h1 className="text-gray-800">Email </h1>
                            <p className="text-slate-600">{items?.email}</p>
                        </div>
                    </div>

                    {/*  Registered Address  */}
                    <div className="grow py-8 px-3">
                        <div className=" text-lg pb-2 font-medium text-primary-main pl-2">
                            Registered Address
                        </div>
                        <div className="grid grid-cols-4 gap-3 pl-6 py-6 border border-l-2">
                            <h1 className="text-gray-800">Address </h1>
                            <p className="text-slate-600">
                                {items?.registrationAddress?.address}
                            </p>
                            <h1 className="text-gray-800">Country</h1>
                            <p className="text-slate-600">
                                {items?.registrationCountryName}
                            </p>
                            <h1 className="text-gray-800">District </h1>
                            <p className="text-slate-600">
                                {items?.registrationDistrictName}
                            </p>
                            <h1 className="text-gray-800">Phone</h1>
                            <p className="text-slate-600">
                                {items?.registrationAddress?.phone}
                            </p>
                            <h1 className="text-gray-800">Pincode </h1>
                            <p className="text-slate-600">
                                {items?.registrationPincodeName}
                            </p>
                            <h1 className="text-gray-800">State</h1>
                            <p className="text-slate-600">
                                {items?.registrationStateName}
                            </p>
                        </div>
                    </div>

                    {/*  Billing Address  */}
                    <div className="grow px-3 py-8">
                        <div className=" text-lg pb-2 font-medium text-primary-main pl-2">
                            Billing Address
                        </div>
                        <div className="grid grid-cols-4 gap-2 pl-6 py-6 border border-l-2">
                            <h1 className="text-gray-800">Address </h1>
                            <p className="text-slate-600">
                                {items?.billingAddress?.address}
                            </p>
                            <h1 className="text-gray-800">Country</h1>
                            <p className="text-slate-600">
                                {items?.billingAddressCountryName}
                            </p>
                            <h1 className="text-gray-800">District </h1>
                            <p className="text-slate-600">
                                {items?.billingAddressDistrictName}
                            </p>
                            <h1 className="text-gray-800">Phone</h1>
                            <p className="text-slate-600">
                                {items?.billingAddress?.phone}
                            </p>
                            <h1 className="text-gray-800">Pincode </h1>
                            <p className="text-slate-600">
                                {items?.billingAddressPincodeName}
                            </p>
                            <h1 className="text-gray-800">State</h1>
                            <p className="text-slate-600">
                                {items?.billingAddressStateName}
                            </p>
                        </div>
                    </div>

                    {/*  Contact Information  */}
                    <div className="grow px-3 py-8">
                        <div className=" text-lg pb-2 font-medium text-primary-main pl-2">
                            Contact Information
                        </div>
                        <div className="grid grid-cols-2 grow py-6 ">
                            {items?.contactInformation?.map((item: any) => (
                                <div
                                    className="grid grid-cols-2 gap-3 pl-6  border border-l-2 grow py-6"
                                    key={item._id}
                                >
                                    <h1 className="text-gray-800">Name</h1>
                                    <p className="text-slate-600">
                                        {item.name}
                                    </p>
                                    <h1 className="text-gray-800">
                                        Department{' '}
                                    </h1>
                                    <p className="text-slate-600">
                                        {item.department}
                                    </p>
                                    <h1 className="text-gray-800">
                                        Designation
                                    </h1>
                                    <p className="text-slate-600">
                                        {item.designation}
                                    </p>
                                    <h1 className="text-gray-800">Email </h1>
                                    <p className="text-slate-600">
                                        {item.email}
                                    </p>
                                    <h1 className="text-gray-800">LandLine</h1>
                                    <p className="text-slate-600">
                                        {item.landLine}
                                    </p>
                                    <h1 className="text-gray-800">
                                        Mobile Number{' '}
                                    </h1>
                                    <p className="text-slate-600 ">
                                        {item.mobileNumber}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // {items?.contactInformation  }
    )
}

export default ViewWarehouse
