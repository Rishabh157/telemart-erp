import React from 'react'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'

type Props = {
    items: any
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Order',
        path: '/order',
    },
    {
        label: 'View Order',
    },
]

const OrderView = ({ items }: Props) => {
	console.log(items)
    return (
        <div className="mt-3 h-full  ">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1 ">
                    <ATMPageHeading> Order</ATMPageHeading>
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

                    {/* General Infromation */}
										
                    <div className="grow px-3 ">
											<div className="grid grid-cols-1">
												<div className="grow py-8 px-3">
													<div className=" flex col-span-2 text-lg pb-2 font-medium text-primary-main pl-2">
															General Information
													</div>
													
													<div className="grid grid-cols-4 gap-3 pl-6 py-6 border border-l-2">													
																									
																<h1 className="text-gray-800">DID Number </h1>
																<p className="text-slate-600">
																		{items?.didNo}
																</p>
																<h1 className="text-gray-800">In/Out Bound </h1>
																<p className="text-slate-600">
																		{items?.inOutBound}
																</p>
																<h1 className="text-gray-800">Incomming Caller No </h1>
																<p className="text-slate-600">
																		{items?.incomingCallerNo}
																</p>
																<h1 className="text-gray-800">Mobile Number </h1>
																<p className="text-slate-600">{items?.mobileNo}</p>
																<h1 className="text-gray-800">Scheme Name </h1>
																<p className="text-slate-600">{items?.schemeLabel}</p>
															
													</div>
												</div>
											</div>
										</div>

										<div className="grow  px-3 ">
											<div className="grid grid-cols-2">

													{/*  Address Information  */}
													<div className="grow py-1 px-3">
														<div className=" text-lg pb-2 font-medium text-primary-main pl-2">
																Personal Information
														</div>
														<div className="grid grid-cols-2 gap-3 pl-6 py-6 border border-l-2">
															<h1 className="text-gray-800">Agent Name </h1>
															<p className="text-slate-600">
																	{items?.agentName}
															</p>
															<h1 className="text-gray-800">Name</h1>
															<p className="text-slate-600">
																	{items?.name}
															</p>
															<h1 className="text-gray-800">Age </h1>
															<p className="text-slate-600">
																	{items?.age}
															</p>
															<h1 className="text-gray-800">Address</h1>
															<p className="text-slate-600">
																	{items?.address}
															</p>                           
															<h1 className="text-gray-800">Relation</h1>
															<p className="text-slate-600">
																	{items?.realtion}
															</p>
															<h1 className="text-gray-800">District </h1>
															<p className="text-slate-600">
																	{items?.agentDistrictLabel}
															</p>
															<h1 className="text-gray-800">Landmark </h1>
															<p className="text-slate-600">
																	{items?.landmark}
															</p>
															<h1 className="text-gray-800">Alternate No </h1>
															<p className="text-slate-600">
																	{items?.alternateNo1}
															</p>
															<h1 className="text-gray-800">Whatsapp No </h1>
															<p className="text-slate-600">
																	{items?.watsappNo}
															</p>
															<h1 className="text-gray-800">Gender </h1>
															<p className="text-slate-600">
																	{items?.gender}
															</p>
															<h1 className="text-gray-800">Channel </h1>
															<p className="text-slate-600">
																	{items?.channelLabel}
															</p>
															<h1 className="text-gray-800">Email</h1>
															<p className="text-slate-600">
																	{items?.emailId}
															</p>
															<h1 className="text-gray-800">Prepaid</h1>
															<p className="text-slate-600">
																	{(items?.prepaid === false)? "No": "Yes"}
															</p>
															<h1 className="text-gray-800">Remarks</h1>
															<p className="text-slate-600">
																	{items?.remark}
															</p>
													</div>
                    		</div>

												{/*  Address Information  */}
												<div className="grow py-1 px-3">
													<div className=" text-lg pb-2 font-medium text-primary-main pl-2">
															Address Information
													</div>
													<div className="grid grid-cols-2 gap-3 pl-6 py-6 border border-l-2">
															<h1 className="text-gray-800">Delivery Charges </h1>
															<p className="text-slate-600">
																	{items?.deliveryCharges}
															</p>
															<h1 className="text-gray-800">Discount</h1>
															<p className="text-slate-600">
																	{items?.discount}
															</p>
															<h1 className="text-gray-800">Total </h1>
															<p className="text-slate-600">
																	{items?.total}
															</p>
															<h1 className="text-gray-800">Country</h1>
															<p className="text-slate-600">
																	{items?.countryLabel}
															</p>                           
															<h1 className="text-gray-800">State</h1>
															<p className="text-slate-600">
																	{items?.stateLabel}
															</p>
															<h1 className="text-gray-800">District </h1>
															<p className="text-slate-600">
																	{items?.districtLabel}
															</p>
															<h1 className="text-gray-800">Tehsil </h1>
															<p className="text-slate-600">
																	{items?.tehsilLabel}
															</p>
															<h1 className="text-gray-800">Pincode </h1>
															<p className="text-slate-600">
																	{items?.pincodeLabel}
															</p>
															<h1 className="text-gray-800">Area</h1>
															<p className="text-slate-600">
																	{items?.areaLabel}
															</p>
															<h1 className="text-gray-800">Expected Delivery Date </h1>
															<p className="text-slate-600">
																	{items?.expectedDeliveryDate}
															</p>
															<h1 className="text-gray-800">Delivered By </h1>
															<p className="text-slate-600">
																	{items?.profileDeliveredBy}
															</p>
															<h1 className="text-gray-800">Complaint Details </h1>
															<p className="text-slate-600">
																	{items?.complaintDetails}
															</p>
															<h1 className="text-gray-800">Complaint No </h1>
															<p className="text-slate-600">
																	{items?.complaintNo}
															</p>
													</div>
                    		</div>

											</div>
										</div>

                    

                    {/*  Other Information  */}
                    <div className="grow px-3 py-8">
                        <div className=" text-lg pb-2 font-medium text-primary-main pl-2">
                          Other Information
                        </div>
                        <div className="grid grid-cols-4 gap-2 pl-6 py-6 border border-l-2">
                            <h1 className="text-gray-800">Disposition Level Two </h1>
                            <p className="text-slate-600">
                                {items?.dispositionLevelTwo}
                            </p>
                            <h1 className="text-gray-800">Disposition Level Three </h1>
                            <p className="text-slate-600">
                                {items?.dispositionLevelThree}
                            </p>                           
                            
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>

        // {items?.contactInformation  }
    )
}

export default OrderView
