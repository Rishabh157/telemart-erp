import { Divider } from '@mui/material'
import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMRadioButton from 'src/components/UI/atoms/formFields/ATMRadioButton/ATMRadioButton'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { FormikProps } from 'formik'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from './InboundWrapper'



type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        channelOptions: SelectOption[]
        schemeDataOption: SelectOption[]
    }
}
const Inbound: React.FC<Props> = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}) => {
    const { values, setFieldValue } = formikProps
    return (
        <>
            <div className="container-fluid px-5 py-2 flex flex-col gap-4 mt-0">
                <div className="h-fit w-full flex gap-5">
                    <div className="w-3/5 flex flex-col gap-4">
                        <div>
                            <p className="bg-gray-50 p-2 rounded-md text-20 col-span-4 mb-2">
                                Gerneral informtion
                            </p>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name=""
                                        labelClass="font-semibold text-sm "
                                        label="DID NO"
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                        onChange={() => {}}
                                        value=""
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name=""
                                        labelClass="font-semibold text-sm"
                                        label="IN /OutBound"
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                        onChange={() => {}}
                                        value=""
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name=""
                                        labelClass="font-semibold text-sm"
                                        label="In Comming Caller No"
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                        onChange={() => {}}
                                        value=""
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name=""
                                        labelClass="font-semibold text-sm"
                                        label="Mobile No"
                                        onChange={() => {}}
                                        value=""
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* //Search by schema */}
                        <div className="bg-blue-50 rounded-xl px-3 py-2">
                            <div className="flex gap-4 grid grid-cols-4">
                                <div className="flex flex-col gap-2 col-span-1 -mt-4 ">
                                    <ATMTextField
                                        name=""
                                        labelClass="font-semibold text-sm"
                                        label="Search By Schema"
                                        onChange={() => {}}
                                        value=""
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>
                                <div className="col-span-3"></div>
                            </div>
                        </div>

                        <Divider />

                        {/* //Delivery information */}
                        <div className="bg-gray-50 p-2 rounded-md text-20 col-span-4 mb-2">
                            <p className="bg-gray-50 p-2 rounded-md text-20 col-span-4 mb-2">
                                Address informtion
                            </p>

                            <div className="grid grid-cols-4 gap-4">
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name=""
                                        labelClass="font-semibold text-sm"
                                        label="Delivery charges"
                                        onChange={() => {}}
                                        value=""
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name=""
                                        labelClass="font-semibold text-sm"
                                        label="Discount"
                                        onChange={() => {}}
                                        value=""
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name=""
                                        labelClass="font-semibold text-sm"
                                        label="Total"
                                        onChange={() => {}}
                                        value=""
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMSelectSearchable
                                        options={[]}
                                        name=""
                                        labelClass="font-semibold text-sm"
                                        label="Country"
                                        required
                                        value=""
                                        onChange={() => {}}
                                        size="xs"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMSelectSearchable
                                        options={[]}
                                        name=""
                                        labelClass="font-semibold text-sm"
                                        label="State"
                                        required
                                        value=""
                                        onChange={() => {}}
                                        size="xs"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMSelectSearchable
                                        options={[]}
                                        name=""
                                        labelClass="font-semibold text-sm"
                                        label="City"
                                        required
                                        value=""
                                        onChange={() => {}}
                                        size="xs"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMSelectSearchable
                                        options={[]}
                                        name=""
                                        labelClass="font-semibold text-sm"
                                        label="Tehsil"
                                        required
                                        value=""
                                        onChange={() => {}}
                                        size="xs"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMSelectSearchable
                                        options={[]}
                                        name=""
                                        labelClass="font-semibold text-sm"
                                        label="Pincode"
                                        required
                                        value=""
                                        onChange={() => {}}
                                        size="xs"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4 col-span-4">
                                    <div className="flex flex-col gap-1 w-full  -mt-4">
                                        <ATMSelectSearchable
                                            options={[]}
                                            name=""
                                            labelClass="font-semibold text-sm"
                                            label="Area"
                                            required
                                            value=""
                                            onChange={() => {}}
                                            size="xs"
                                            // className="-mt-0  shadow bg-white rounded"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1 w-full  -mt-4">
                                        <ATMTextField
                                            name=""
                                            labelClass="font-semibold text-sm"
                                            label="Expected delivery date"
                                            onChange={() => {}}
                                            value=""
                                            size="xs"
                                            className="-mt-0  shadow bg-white rounded"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1 w-full  -mt-4">
                                        <ATMTextField
                                            name=""
                                            labelClass="font-semibold text-sm"
                                            label="Profile delivered by"
                                            onChange={() => {}}
                                            value=""
                                            size="xs"
                                            className="-mt-0  shadow bg-white rounded"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <p>Complaint details</p>
                                        <p className="text-red-500 font-bold">
                                            NO
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full  ">
                                        <p>Complaint No.</p>
                                        <p className="text-red font-bold">
                                            1321354894518
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* //Address information */}
                    <div className="w-2/5 bg-white flex flex-col gap-2 pl-4 border-l">
                        <p className="bg-gray-50 p-2 rounded-md text-20">
                            Personal informtion
                        </p>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name=""
                                    labelClass="font-semibold text-sm"
                                    label="Agent Name"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name=""
                                    labelClass="font-semibold text-sm"
                                    label="Name"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name=""
                                    labelClass="font-semibold text-sm"
                                    label="Age"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4 col-span-3">
                                <ATMTextArea
                                    minRows={1}
                                    name=""
                                    labelClass="font-semibold text-sm"
                                    value=""
                                    label="Adress"
                                    onChange={() => {}}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMSelectSearchable
                                    options={[]}
                                    name=""
                                    labelClass="font-semibold text-sm"
                                    label="Relation"
                                    required
                                    value=""
                                    onChange={() => {}}
                                    size="xs"
                                    // className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name=""
                                    labelClass="font-semibold text-sm"
                                    label="City"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name=""
                                    labelClass="font-semibold text-sm"
                                    label="City"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name=""
                                    labelClass="font-semibold text-sm"
                                    label="City"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMRadioButton
                                    name=""
                                    // labelClass='font-bold text-sm'
                                    label="Gender"
                                    options={[]}
                                    value={''}
                                    onChange={(e) => {}}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name=""
                                    labelClass="font-semibold text-sm"
                                    label="prepaid"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name=""
                                    labelClass="font-semibold text-sm"
                                    label="Email"
                                    onChange={() => {}}
                                    value=""
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMSelectSearchable
                                    options={[]}
                                    name=""
                                    labelClass="font-semibold text-sm"
                                    label="Relation"
                                    required
                                    value=""
                                    onChange={() => {}}
                                    size="xs"
                                    // className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4 col-span-3">
                                <ATMTextArea
                                    name=""
                                    minRows={1}
                                    labelClass="font-bold text-sm"
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
                    <div className="flex gap-4 grid-cols-5 grid px-4 -mt-4">
                        <div className="col-span-3 w-full flex gap-4">
                            <div className="flex flex-col gap-1 w-fit w-full ">
                                <ATMSelectSearchable
                                    options={[]}
                                    name=""
                                    labelClass="font-semibold text-sm"
                                    label="Disposition Level 1"
                                    required
                                    value=""
                                    onChange={() => {}}
                                    size="xs"
                                    // className="-mt-0  shadow bg-white rounded"
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-fit w-full">
                                <ATMSelectSearchable
                                    options={[]}
                                    name=""
                                    labelClass="font-semibold text-sm"
                                    label="Disposition Level 2"
                                    required
                                    value=""
                                    onChange={() => {}}
                                    size="xs"
                                    // className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                        </div>
                        <div className="col-start-4 col-end-6 flex gap-4 justify-between mt-5  items-center">
                            <div className=" flex gap-1 w-full justify-center items-center">
                                <p>Free Prediction</p>
                            </div>

                            <div className=" px-4 py-1 flex bg-blue-900 text-white justify-center rounded-md items-center  ">
                                Save
                            </div>
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
