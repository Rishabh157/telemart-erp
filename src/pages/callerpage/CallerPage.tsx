import React, { useState } from 'react'
import { TbBrandNetflix } from 'react-icons/tb'
import CallerButton from './components/CallerButton'
import Navbar from './components/Navbar'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import ATMOtpInput from 'src/components/UI/atoms/ATMOtpInput/ATMOtpInput'
import ATMRadioButton from 'src/components/UI/atoms/formFields/ATMRadioButton/ATMRadioButton'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { FormInitialValues } from './CallerPageWrapper'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormikProps } from 'formik'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    column: any[]
    rows: any[]
    apiStatus: boolean
    schemeColumn: columnTypes[] | []
    dropdownOptions: {
        counrtyOptions: SelectOption[]
        stateOptions?: SelectOption[] | []
        districtOptions?: SelectOption[] | []
        pincodeOptions?: SelectOption[] | []
        dispositionThreeOptions?: SelectOption[] | []
        dispositionTwoOptions?: SelectOption[] | []
        tehsilOptions?: SelectOption[] | []
        areaOptions?: SelectOption[] | []
        OutBoundOptions?: SelectOption[] | []
    }
    didItems: any
}

const CallerPage: React.FC<Props> = ({
    formikProps,
    apiStatus,
    dropdownOptions,
    schemeColumn,
    didItems,
    column,
    rows,
}) => {
    console.log(
        formikProps,
        apiStatus,
        dropdownOptions,
        schemeColumn,
        didItems,
        column,
        rows
    )

    const [quantity, setQuantity] = useState<number>(1)
    const [multiSelect, setMultiSelect] = useState<any[]>([])
    const [otp, setotp] = useState(new Array(10).fill(''))

    const columns: columnTypes[] = [
        {
            field: 'order',
            headerName: 'ORDER NO',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-white',
        },
        {
            field: 'enq',
            headerName: 'ENQ NO',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-white',
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-white',
        },
        {
            field: 'name',
            headerName: 'NAME',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-white',
        },
        {
            field: 'city',
            headerName: 'CITY',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-white',
        },
        {
            field: 'pincode',
            headerName: 'PINCODE',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-white',
        },
        {
            field: 'phone',
            headerName: 'PHONE',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-white',
        },
        {
            field: 'disposition',
            headerName: 'DISPOSITION',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-white',
        },
        {
            field: 'scheme',
            headerName: 'SCHEME',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-white',
        },
        {
            field: 'shippingCharge',
            headerName: 'SHIPPING CHARGE',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-white',
        },
        {
            field: 'discount',
            headerName: 'DISCOUNT',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-white',
        },
        {
            field: 'amount',
            headerName: 'AMOUNT',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-white',
        },
        {
            field: 'remarks',
            headerName: 'REMARKS',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-white',
        },
        {
            field: 'compl',
            headerName: 'COMPL',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-white',
        },
    ]

    return (
        <div className="bg-white px-4 h-[2000px]">
            <div className="flex justify-between py-1">
                <div className="logo-img">
                    <TbBrandNetflix size={40} color="red" />
                </div>
                <div className="flex gap-x-2 items-center">
                    <div className="text-[#6F9EA7] text-[15px]">
                        Logged in ID : Sandeep
                    </div>
                    <div>
                        <CallerButton
                            text="Sales"
                            type="button"
                            onClick={() => alert('Sales...')}
                        />
                    </div>
                </div>
            </div>

            <Navbar />

            <div className="flex items-center mt-1 px-2">
                <div className="mt-2 text-sm font-semibold">
                    Search By Scheme
                </div>
                <div className="px-2 flex">
                    <div className="mr-2 -mt-4">
                        <ATMSelectSearchable
                            // isSubmitting
                            // label="Zonal Manager"
                            size="xs"
                            name=""
                            value={''}
                            options={[
                                { label: 'one', value: 'one' },
                                { label: 'two', value: 'two' },
                            ]}
                            onChange={(e) => {
                                // setFieldValue('zonalManagerId', e)
                            }}
                        />
                    </div>

                    <div className="mr-2 -mt-4">
                        <ATMSelectSearchable
                            // isSubmitting
                            // label="Zonal Manager"
                            size="xs"
                            name=""
                            value={''}
                            options={[
                                { label: 'one', value: 'one' },
                                { label: 'four', value: 'four' },
                            ]}
                            onChange={(e) => {
                                // setFieldValue('zonalManagerId', e)
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-[#87527C] mt-2">
                <div className="grid grid-cols-12 p-2">
                    <div className="col-span-4">
                        <h2 className="text-[15px] font-bold text-white">
                            SCHEME
                        </h2>
                    </div>
                    <div className="col-span-2">
                        <h2 className="text-[15px] font-bold text-white">
                            PRICE
                        </h2>
                    </div>
                    <div className="col-span-2">
                        <h2 className="text-[15px] font-bold text-white pl-3">
                            QTY
                        </h2>
                    </div>
                    <div className="col-span-2">
                        <h2 className="text-[15px] font-bold text-white">
                            DELIVERY CHARGES
                        </h2>
                    </div>
                    <div className="col-span-2">
                        <h2 className="text-[15px] font-bold text-white">
                            TOTAL AMOUNT
                        </h2>
                    </div>
                </div>

                <div className="bg-yellow-500">
                    <div className="grid grid-cols-12 p-2">
                        <div className="col-span-4">
                            <h2 className="text-[15px] font-bold text-white">
                                DHUN AADHAR PLUS US 3700
                            </h2>
                        </div>
                        <div className="col-span-2">
                            <h2 className="text-[15px] font-bold text-white">
                                3700.00
                            </h2>
                        </div>
                        <div className="col-span-2">
                            <h2 className="text-[15px] font-bold text-white">
                                <button
                                    className="mr-4 text-[18px]"
                                    onClick={() => {
                                        if (quantity <= 0) {
                                            alert(
                                                'Quantity Can Not Be In Nagetive Value'
                                            )
                                        } else {
                                            setQuantity((pre) => quantity - 1)
                                        }
                                    }}
                                >
                                    {' '}
                                    -{' '}
                                </button>
                                {quantity}
                                <button
                                    className="ml-4 text-[18px]"
                                    onClick={() =>
                                        setQuantity((pre) => quantity + 1)
                                    }
                                >
                                    +
                                </button>
                            </h2>
                        </div>
                        <div className="col-span-2">
                            <h2 className="text-[15px] font-bold text-white">
                                0.00
                            </h2>
                        </div>
                        <div className="col-span-2">
                            <h2 className="text-[15px] font-bold text-white">
                                3700
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#87527C] p-2 mt-1">
                <h2 className="text-[15px] font-bold text-white">
                    DELEVERY ADDRESS
                </h2>
            </div>

            {/* Delivery Address Section */}
            <div className="grid grid-cols-12 border-[1px] mt-1 border-grey-700   ">
                <div className="col-span-4 py-2  gap-x-4 border-r-[1px] px-6 border-grey-800">
                    <div className="grid grid-cols-12 gap-2 ">
                        <div className="col-span-8  ">
                            <ATMSelectSearchable
                                componentClass="  mt-2"
                                label="Pincode"
                                size="xs"
                                LabelDirection="horizontal"
                                classDirection="grid grid-cols-12"
                                labelSpan="col-span-6"
                                inputSpan="col-span-6"
                                // isSubmitting
                                name=""
                                value={''}
                                options={dropdownOptions.pincodeOptions || []}
                                onChange={(e) => {
                                    // setFieldValue('zonalManagerId', e)
                                }}
                            />
                        </div>
                        <div className="col-span-4 ">
                            <ATMSelectSearchable
                                componentClass="mt-2"
                                size="xs"
                                name=""
                                value={''}
                                options={[
                                    { label: 'one', value: 'one' },
                                    { label: 'two', value: 'two' },
                                    { label: 'three', value: 'three' },
                                    { label: 'four', value: 'four' },
                                ]}
                                onChange={(e) => {
                                    // setFieldValue('zonalManagerId', e)
                                }}
                            />
                        </div>
                    </div>
                    <ATMSelectSearchable
                        componentClass="mt-2"
                        label="State"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        options={dropdownOptions.stateOptions || []}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />
                    <ATMSelectSearchable
                        componentClass="  mt-2"
                        label="City/Village"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        options={dropdownOptions.areaOptions || []}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />
                </div>
                <div className="col-span-4 py-2 px-8   border-r-[1px]">
                    <ATMSelectSearchable
                        componentClass="  mt-2"
                        label="Area"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        options={dropdownOptions.areaOptions || []}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />
                    <ATMSelectSearchable
                        componentClass="  mt-2"
                        label="District"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        options={dropdownOptions.districtOptions || []}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />{' '}
                    <ATMSelectSearchable
                        componentClass="  mt-2"
                        label="Tehsil/Taluka"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        options={dropdownOptions.tehsilOptions || []}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />
                </div>

                {/* Delevery Duration */}
                <div className="col-span-4 py-2 p-2 pl-8 flex justify-center items-center">
                    <div className="px-14">
                        <div className="bg-gray-200 p-3 text-[#34727F] font-semibold text-center text-[15px]">
                            Expected Delivery In
                        </div>
                        <div className="bg-[#407C86] p-2 text-white font-bold text-center">
                            4 to 24 Hrs
                        </div>
                    </div>
                </div>
            </div>

            {/*  Billing Address */}
            <div className="grid grid-cols-12 border-[1px] mt-1 border-grey-700">
                <div className="col-span-6 py-2  gap-x-4 border-r-[1px] px-6 border-grey-800">
                    <ATMSelectSearchable
                        componentClass="mt-2"
                        LabelDirection="horizontal"
                        label="Type of Address"
                        size="xs"
                        name=""
                        value={''}
                        options={[
                            { label: 'one', value: 'one' },
                            { label: 'two', value: 'two' },
                            { label: 'three', value: 'three' },
                            { label: 'four', value: 'four' },
                        ]}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />
                    <ATMSelectSearchable
                        componentClass="  mt-2"
                        label="Recivers Name"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        options={[
                            { label: 'indore', value: 'one' },
                            { label: 'betul', value: 'two' },
                            { label: 'bhanwarkua', value: 'three' },
                            { label: 'mumbai', value: 'four' },
                        ]}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />
                    <ATMSelectSearchable
                        componentClass="  mt-2"
                        label="Prefferred Delivery Time & Date"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        options={[
                            { label: 'indore', value: 'one' },
                            { label: 'betul', value: 'two' },
                            { label: 'bhanwarkua', value: 'three' },
                            { label: 'mumbai', value: 'four' },
                        ]}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />

                    <ATMTextField
                        extraClassField="mt-0"
                        label="House/Flat/Shop/Office No."
                        size="xs"
                        LabelDirection="horizontal"
                        // classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />
                    <ATMTextField
                        extraClassField="mt-0"
                        label="Street/Sector/Building/Appartment"
                        size="xs"
                        LabelDirection="horizontal"
                        // classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />
                    <ATMTextField
                        extraClassField="mt-0"
                        label="Landmark"
                        size="xs"
                        LabelDirection="horizontal"
                        // classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />

                    <ATMTextField
                        extraClassField="mt-0"
                        label="Alternate Mobile No"
                        value={''}
                        size="xs"
                        LabelDirection="horizontal"
                        name=""
                        // isSubmitting
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />

                    {/* <div className="grid grid-cols-12 mt-2">
                        <div className="col-span-4 pt-2 text-slate-700 text-sm font-medium">
                            Alternate Mobile No
                        </div>
                        <div className="col-span-8 px-">
                            <ATMOtpInput
                                length={10}
                                values={otp}
                                setValues={setotp}
                                onChange={(e) => console.log(e)}
                            />
                        </div>
                    </div> */}

                    <ATMTextField
                        extraClassField="mt-0"
                        label="WhatsApp Number"
                        value={''}
                        size="xs"
                        LabelDirection="horizontal"
                        name=""
                        // classDirection="grid grid-cols-3"
                        // isSubmitting
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />
                </div>
                <div className="col-span-6 py-2 px-8 border-r-[1px]">
                    <div className="-mt-2">
                        <ATMTextArea
                            name=""
                            value={''}
                            placeholder="AUTOFILL SHIPPING ADDRESS"
                            minRows={9}
                            onChange={(value) => {}}
                        />
                    </div>

                    <div className="-mt-4">
                        <ATMSwitchButton
                            label="Recording"
                            name=""
                            value={true}
                            title1="ON"
                            title2="OFF"
                            onChange={(e) => {
                                // console.log(e)
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Other Details */}
            <div className="bg-[#87527C] p-2">
                <h2 className="text-[15px] font-bold text-white">
                    OTHER DETAILS
                </h2>
            </div>

            <div className="grid grid-cols-12 border-[1px] mt-1 border-grey-700">
                <div className="col-span-6 py-2  gap-x-4 border-r-[1px] px-6 border-grey-800">
                    <div className="grid grid-cols-12">
                        <div className="col-span-4 pt-1">
                            Gander <span className="text-red-500"> * </span>
                        </div>
                        <div className="col-span-4">
                            <div className="-mt-5">
                                <ATMRadioButton
                                    name=""
                                    value={'MALE'}
                                    options={[
                                        {
                                            label: 'MALE (MR.)',
                                            value: 'MALE',
                                        },
                                        {
                                            label: 'FEMALE (Ms.)',
                                            value: 'FEMALE',
                                        },
                                    ]}
                                    onChange={(e) => {
                                        // setFieldValue('type', e)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <ATMSelectSearchable
                        componentClass="  mt-2"
                        label="Order For"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        options={[
                            { label: 'indore', value: 'one' },
                            { label: 'betul', value: 'two' },
                            { label: 'bhanwarkua', value: 'three' },
                            { label: 'mumbai', value: 'four' },
                        ]}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />
                    <ATMSelectSearchable
                        componentClass="  mt-2"
                        label="Age Group"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        options={[
                            { label: 'indore', value: 'one' },
                            { label: 'betul', value: 'two' },
                            { label: 'bhanwarkua', value: 'three' },
                            { label: 'mumbai', value: 'four' },
                        ]}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />

                    <ATMTextField
                        extraClassField="mt-0"
                        label="Email-ID"
                        size="xs"
                        labelSize="small"
                        LabelDirection="horizontal"
                        // classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />

                    <div className="grid grid-cols-12">
                        <div className="col-span-4">Social Media</div>
                        <div className="col-span-8 flex gap-x-4 px-1 items-center">
                            <ATMCheckbox
                                extraClasses="mt-2"
                                required
                                label="Facebook"
                                name=""
                                // labelClass="font-semibold text-sm"
                                checked={true}
                                onChange={(e) => {
                                    // setFieldValue('personalInformation.prepaid', e)
                                }}
                            />
                            <ATMCheckbox
                                extraClasses="mt-2"
                                required
                                label="Instagram"
                                name=""
                                // labelClass="font-semibold text-sm"
                                checked={false}
                                onChange={(e) => {
                                    // setFieldValue('personalInformation.prepaid', e)
                                }}
                            />

                            <ATMTextField
                                extraClassField="mt-2"
                                size="xs"
                                // LabelDirection="horizontal"
                                // classDirection="grid grid-cols-3"
                                placeholder="Name id"
                                // isSubmitting
                                name=""
                                value={''}
                                onChange={(e) => {
                                    // setFieldValue('zonalManagerId', e)
                                }}
                            />
                        </div>
                    </div>

                    <ATMSelectSearchable
                        isMenuOpen
                        isMulti
                        name={``}
                        value={multiSelect}
                        LabelDirection="horizontal"
                        size="small"
                        onChange={(value) => {
                            // setFieldValue(`details[${index}].pincodes`, value)
                            setMultiSelect(value)
                        }}
                        options={[
                            {
                                label: 'COD',
                                value: 'COD',
                            },
                            {
                                label: 'Online (UPI only)',
                                value: 'UPI',
                            },
                            {
                                label: 'Online (UPI only)',
                                value: 'edfrest',
                            },
                            {
                                label: 'Online (UPI only)',
                                value: 'ewrrwe',
                            },
                            {
                                label: 'Online (UPI only)',
                                value: 'rwewerwer',
                            },
                            {
                                label: 'Online (UPI only)',
                                value: 'fdgdfgh',
                            },
                            {
                                label: 'Online (UPI only)',
                                value: 'sdg',
                            },
                        ]}
                        label="Any Other Medical Issue"
                        // isMulti={true}
                        selectClass={'-mt-4 select-margin'}
                    />
                </div>

                <div className="col-span-6 py-2 px-8 border-r-[1px]">
                    <div className="grid grid-cols-12">
                        <div className="col-span-6"></div>
                        <div className="col-span-6 bg-slate-300 px-6 border-[1px]">
                            <div className="-mt-6 p-4">
                                <ATMRadioButton
                                    label="Payment Mode :"
                                    name=""
                                    value={'COD'}
                                    className="mt-1"
                                    options={[
                                        {
                                            label: 'COD',
                                            value: 'COD',
                                        },
                                        {
                                            label: 'Online (UPI only)',
                                            value: 'UPI',
                                        },
                                    ]}
                                    onChange={(e) => {
                                        // setFieldValue('type', e)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="-mt-2">
                        <ATMTextArea
                            name=""
                            value={''}
                            placeholder="Other Remarks"
                            minRows={6}
                            onChange={(value) => {}}
                        />
                    </div>
                </div>
            </div>

            {/* Disposition Section  */}
            <div className="grid grid-cols-12 items-center border-[1px] px-3 pb-2 mt-1 border-grey-700 z-50">
                <div className="col-span-2 px-3">
                    <ATMSelectSearchable
                        required
                        label="Disposition Level 1"
                        componentClass="mt-2"
                        size="xs"
                        name=""
                        value={''}
                        // isSubmitting
                        options={dropdownOptions.dispositionTwoOptions || []}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />
                </div>
                <div className="col-span-2 px-3">
                    <ATMSelectSearchable
                        required
                        label="Disposition Level 2"
                        componentClass="mt-2"
                        size="xs"
                        name=""
                        value={''}
                        // isSubmitting
                        options={dropdownOptions.dispositionThreeOptions || []}
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                        }}
                    />
                </div>
                <div className="col-span-1 px-3 pt-6">
                    <CallerButton text="Save" className="py-2" />
                </div>
            </div>

            {/* Data Table  */}

            <div className="border-[1px] pb-2 mt-1 border-grey-700">
                <ATMTable
                    headerClassName="bg-[#87527c]"
                    columns={columns}
                    rows={[]}
                />
            </div>
        </div>
    )
}

export default CallerPage
