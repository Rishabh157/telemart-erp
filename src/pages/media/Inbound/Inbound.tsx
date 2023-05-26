import { Button, Divider } from '@mui/material'
import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ChannelCategoryListing from '../channelCategory/list/ChannelCategoryListing'
// import MediaLayout from '../MediaLayout'

const Inbound = () => {
    return (
        <>
            <div className="container-fluid p-5 flex flex-col gap-4">
                <div className="h-fit w-full flex gap-5">
                    <div className="w-3/5 flex flex-col gap-4">
                       
                        <div>
                            <p className="bg-gray-50 p-2 rounded-md text-20 col-span-4 mb-2">
                                Gerneral informtion
                            </p>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1 w-full">
                                    <ATMTextField
                                    name=''
                                    label='DID NO'
                                    size='xs'
                                    className='-mt-0  shadow bg-white rounded'
                                    onChange={()=>{}}
                                    value=''
                                    
                                    />
                                    {/* <p>title</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                <ATMTextField
                                    name=''
                                    label='IN /OutBound'
                                    size='xs'
                                    className='-mt-0  shadow bg-white rounded'
                                    onChange={()=>{}}
                                    value=''
                                    
                                    />
                                    {/* <p>title</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                <ATMTextField
                                    name=''
                                    label='In Comming Caller No' 
                                    size='xs'
                                    className='-mt-0  shadow bg-white rounded'
                                    onChange={()=>{}}
                                    value=''
                                    
                                    />
                                    {/* <p>title</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                <ATMTextField
                                    name=''
                                    label='Mobile No'
                                    onChange={()=>{}}
                                    value=''
                                    size='xs'
                                    className='-mt-0  shadow bg-white rounded'
                                    
                                    />
                                    {/* <p>title</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                </div>
                            </div>
                        </div>

                        {/* //Search by schema */}
                        <div className="bg-blue-50 rounded-xl px-3 py-2">
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 w-full">
                                    <p className="">Search by schema</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-fit border border-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        <Divider />

                        {/* //Delivery information */}
                        <div className="">
                            <p className="bg-gray-50 p-2 rounded-md text-20 col-span-4 mb-2">
                                Address informtion
                            </p>

                            <div className="grid grid-cols-4 gap-4">
                                <div className="flex flex-col gap-1 w-full">
                                    <p>Delivery charges</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <p>Discount</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <p>total</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <p>country</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <p>state</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <p>city</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <p>tehsil</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <p>Pincode</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <p>Area</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    />
                                </div>
                                {/* <div className="grid grid-cols-4 gap-4 col-span-3"> */}
                                    <div className="flex flex-col gap-1 w-full">
                                        <p>Expected delivery date</p>
                                        <p className="font-bold">text</p>
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <p>Profile delivered by</p>
                                        <p className="font-bold">text</p>
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <p>Complaint details</p>
                                        <p className="text-red-500 font-bold">
                                            NO
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <p>Complaint No.</p>
                                        <p className="text-red font-bold">
                                            1321354894518
                                        </p>
                                    </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>

                    {/* //Address information */}
                    <div className="w-2/5 bg-white flex flex-col gap-2 pl-4 border-l">
                        <p className="bg-gray-50 p-2 rounded-md text-20">
                            Personal informtion
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1 w-full">
                                <p>Agent name</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <p>Name</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <p>age</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full col-span-3">
                                <p>Address</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <p>relation</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <p>city</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <p>landmark</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <p>whatsapp no.</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <p>gender</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <p>prepaid</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <p>email</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <p>channel</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full col-span-3">
                                <p>other remark</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Divider />

                <div>
                    <div className="flex gap-4 items-center">
                        <div className="flex flex-col gap-1 w-fit">
                            <p>Disposition Level 1</p>
                            <input
                                placeholder="input area"
                                className="px-3 py-.5 rounded w-full border border-gray-300"
                            />
                        </div>

                        <div className="flex flex-col gap-1 w-fit">
                            <p>Disposition Level 2</p>
                            <input
                                placeholder="input area"
                                className="px-3 py-.5 rounded w-full border border-gray-300"
                            />
                        </div>

                        <div className="flex flex-col gap-1 w-fit">
                            <p>Free Prediction</p>
                        </div>

                        <div className="flex px-4 py-1 w-fit bg-blue-900 text-white justify-center rounded-md items-center">
                            Save
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inbound
