import { Button, Divider } from '@mui/material'
import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ChannelCategoryListing from '../channelCategory/list/ChannelCategoryListing'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMRadioButton from 'src/components/UI/atoms/formFields/ATMRadioButton/ATMRadioButton'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
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
                                        name=""
                                        label="DID NO"
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                        onChange={() => {}}
                                        value=""
                                    />
                                    {/* <p>title</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <ATMTextField
                                        name=""
                                        label="IN /OutBound"
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                        onChange={() => {}}
                                        value=""
                                    />
                                    {/* <p>title</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <ATMTextField
                                        name=""
                                        label="In Comming Caller No"
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                        onChange={() => {}}
                                        value=""
                                    />
                                    {/* <p>title</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <ATMTextField
                                        name=""
                                        label="Mobile No"
                                        onChange={() => {}}
                                        value=""
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
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
                                <div className="flex flex-col gap-2 ">
                                    <ATMTextField
                                        name=""
                                        label="Search By Schema"
                                        onChange={() => {}}
                                        value=""
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                    {/* <p className="">Search by schema</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-fit border border-gray-300"
                                    /> */}
                                </div>
                            </div>
                        </div>

                        <Divider />

                        {/* //Delivery information */}
                        <div className="bg-gray-50 p-2 rounded-md text-20 col-span-4 mb-2">
                            <p className="bg-gray-50 p-2 rounded-md text-20 col-span-4 mb-2">
                                Address informtion
                            </p>
                            {/* <ATMTextField
                                name=""
                                label="Address informtion"
                                onChange={() => {}}
                                value=""
                                size="xs"
                                className="-mt-0  shadow bg-white rounded"
                            /> */}

                            <div className="grid grid-cols-4 gap-4">
                                <div className="flex flex-col gap-1 w-full">
                                    {/* <p>Delivery charges</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                    <ATMTextField
                                        name=""
                                        label="Delivery charges"
                                        onChange={() => {}}
                                        value=""
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    {/* <p>Discount</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                    <ATMTextField
                                        name=""
                                        label="Discount"
                                        onChange={() => {}}
                                        value=""
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    {/* <p>total</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                    <ATMTextField
                                        name=""
                                        label="Total"
                                        onChange={() => {}}
                                        value=""
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    {/* <p>country</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                    <ATMSelectSearchable
                                        options={[]}
                                        name=""
                                        label="Country"
                                        required
                                        value=""
                                        onChange={() => {}}
                                        size="small"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    {/* <p>state</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                    <ATMSelectSearchable
                                        options={[]}
                                        name=""
                                        label="State"
                                        required
                                        value=""
                                        onChange={() => {}}
                                        size="small"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    {/* <p>city</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                    <ATMSelectSearchable
                                        options={[]}
                                        name=""
                                        label="City"
                                        required
                                        value=""
                                        onChange={() => {}}
                                        size="small"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    {/* <p>tehsil</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                    <ATMSelectSearchable
                                        options={[]}
                                        name=""
                                        label="Tehsil"
                                        required
                                        value=""
                                        onChange={() => {}}
                                        size="small"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    {/* <p>Pincode</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                    <ATMSelectSearchable
                                        options={[]}
                                        name=""
                                        label="Pincode"
                                        required
                                        value=""
                                        onChange={() => {}}
                                        size="small"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    {/* <p>Area</p>
                                    <input
                                        placeholder="input area"
                                        className="px-3 py-.5 rounded w-full border border-gray-300"
                                    /> */}
                                    <ATMSelectSearchable
                                        options={[]}
                                        name=""
                                        label="Area"
                                        required
                                        value=""
                                        onChange={() => {}}
                                        size="small"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>
                                {/* <div className="grid grid-cols-4 gap-4 col-span-3"> */}
                                <div className="flex flex-col gap-1 w-full">
                                    {/* <p>Expected delivery date</p>
                                    <p className="font-bold">text</p> */}
                                    <ATMTextField
                                        name=""
                                        label="Expected delivery date"
                                        onChange={() => {}}
                                        value=""
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    {/* <p>Profile delivered by</p>
                                    <p className="font-bold">text</p> */}
                                    <ATMTextField
                                        name=""
                                        label="Profile delivered by"
                                        onChange={() => {}}
                                        value=""
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <p>Complaint details</p>
                                    <p className="text-red-500 font-bold">NO</p>
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
                                {/* <p>Agent name</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                /> */}
                                <ATMTextField
                                    name=""
                                    label="Agent Name"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                {/* <p>Name</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                /> */}
                                <ATMTextField
                                    name=""
                                    label="Name"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                {/* <p>age</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                /> */}
                                <ATMTextField
                                    name=""
                                    label="Age"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full col-span-3">
                                {/* <p>Address</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                /> */}
                                <ATMTextArea
                                    name=""
                                    value=""
                                    label="Remarks"
                                    onChange={() => {}}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                {/* <p>relation</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                /> */}
                                <ATMSelectSearchable
                                    options={[]}
                                    name=""
                                    label="Relation"
                                    required
                                    value=""
                                    onChange={() => {}}
                                    size="small"
                                    // className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                {/* <p>city</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                /> */}
                                <ATMTextField
                                    name=""
                                    label="City"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                {/* <p>landmark</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                /> */}
                                <ATMTextField
                                    name=""
                                    label="City"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                {/* <p>whatsapp no.</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                /> */}
                                <ATMTextField
                                    name=""
                                    label="City"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                {/* <p>gender</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                /> */}
                                <ATMRadioButton
                                    name=""
                                    label="Gender"
                                    options={[]}
                                    value={''}
                                    onChange={(e) => {}}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                {/* <p>prepaid</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                /> */}
                                <ATMTextField
                                    name=""
                                    label="prepaid"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                {/* <p>email</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                /> */}
                                <ATMTextField
                                    name=""
                                    label="Email"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                {/* <p>channel</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                /> */}
                                <ATMSelectSearchable
                                    options={[]}
                                    name=""
                                    label="Relation"
                                    required
                                    value=""
                                    onChange={() => {}}
                                    size="small"
                                    // className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full col-span-3">
                                {/* <p>other remark</p>
                                <input
                                    placeholder="input area"
                                    className="px-3 py-.5 rounded w-full border border-gray-300"
                                /> */}
                                <ATMTextArea
                                    name=""
                                    value=""
                                    label="Remarks"
                                    onChange={() => {}}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Divider />

                <div>
                    <div className="flex gap-4 items-center">
                        <div className="flex flex-col gap-1 w-fit">
                            {/* <p>Disposition Level 1</p>
                            <input
                                placeholder="input area"
                                className="px-3 py-.5 rounded w-full border border-gray-300"
                            /> */}
                            <ATMSelectSearchable
                                options={[]}
                                name=""
                                label="Disposition Level 1"
                                required
                                value=""
                                onChange={() => {}}
                                size="small"
                                // className="-mt-0  shadow bg-white rounded"
                            />
                        </div>

                        <div className="flex flex-col gap-1 w-fit">
                            {/* <p>Disposition Level 2</p>
                            <input
                                placeholder="input area"
                                className="px-3 py-.5 rounded w-full border border-gray-300"
                            /> */}
                            <ATMSelectSearchable
                                options={[]}
                                name=""
                                label="Disposition Level 2"
                                required
                                value=""
                                onChange={() => {}}
                                size="small"
                                // className="-mt-0  shadow bg-white rounded"
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
                <Divider />
                <div>
                    <ATMTable columns={[]} rows={[]} onRowSelect={() => {}} />
                </div>
            </div>
        </>
    )
}

export default Inbound
