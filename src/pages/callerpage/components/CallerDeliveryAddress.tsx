import React from 'react'
import { useSelector } from 'react-redux'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { RootState } from 'src/redux/store'
import CallerButton from './CallerButton'
import { FormInitialValues } from '../CallerPageWrapper'
import { dropdownOptions } from '../CallerPage'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { endTimesOptions, startTimesOptions } from './constants'
import { SelectOption } from 'src/models/FormField/FormField.model'

type Props = {
    dropdownOptions: dropdownOptions
    values: FormInitialValues
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void
}

const CallerDeliveryAddress = ({
    dropdownOptions,
    setFieldValue,
    values,
}: Props) => {
    const [pinCodeSearch, setPinCodeSearch] = React.useState<string>('')
    const [endTimeOptionsList, setEndTimeOptionsList] = React.useState<
        SelectOption[] | []
    >([])

    const [isRecording, setIsRecording] = React.useState<boolean>(false)
    const { allPincodes }: any = useSelector(
        (state: RootState) => state.pincode
    )

    function handlePinCode(newValue: string) {
        var newarray = allPincodes?.find((ele: any) => {
            return ele._id === newValue
        })

        // set values with id
        setFieldValue('pincodeId', newarray?._id ? newarray?._id : '')
        setFieldValue('tehsilId', newarray?.tehsilId ? newarray?.tehsilId : '')
        setFieldValue(
            'districtId',
            newarray?.districtId ? newarray?.districtId : ''
        )
        if (!newarray) {
            setFieldValue('areaId', newarray || '')
        }
        setFieldValue('stateId', newarray?.stateId ? newarray?.stateId : '')
        setFieldValue(
            'countryId',
            newarray?.countryId ? newarray?.countryId : ''
        )

        // set values with label
        setFieldValue(
            'pincodeLabel',
            newarray?.pincode ? newarray?.pincode : ''
        )
        setFieldValue('stateLabel', newarray?.StateLable || '')
        setFieldValue(
            'districtLabel',
            newarray?.DistrictLable ? newarray?.DistrictLable : ''
        )
        setFieldValue('stateId', newarray?.stateId ? newarray?.stateId : '')
        setFieldValue(
            'tehsilLabel',
            newarray?.tehsilLable ? newarray?.tehsilLable : ''
        )

        setFieldValue(
            'autoFillingShippingAddress',
            newarray?._id
                ? `${newarray?.pincode}\n${newarray?.StateLable}\n${newarray?.DistrictLable}\n${newarray?.tehsilLable}`
                : ''
        )
    }

    // handle endTimeOption list accrdoing to start time
    const handleEndTime = (value: string) => {
        switch (value) {
            case '9_AM':
                setEndTimeOptionsList(endTimesOptions?.slice(0))
                break
            case '12_PM':
                setEndTimeOptionsList(endTimesOptions?.slice(1))
                break
            case '3_PM':
                setEndTimeOptionsList(endTimesOptions?.slice(2))
                break
            case '6_PM':
                setEndTimeOptionsList(endTimesOptions?.slice(3))
                break
            default:
                setEndTimeOptionsList(endTimesOptions)
                break
        }
    }
    return (
        <>
            <div className="bg-[#87527C] p-2">
                <h2 className="text-[15px] font-bold text-white">
                    DELIVERY ADDRESS
                </h2>
            </div>

            {/* Delivery Address Section */}
            <div className="grid grid-cols-12 border-[1px] mt-1 border-grey-700">
                {/* FOR SHOWING 2 INPUT FIELDS */}
                {/*  */}

                <div className="col-span-6 py-2  gap-x-4 border-r-[1px] px-6 border-grey-800">
                    {/* FOR SINGLE PINCODE SELECT FIELD */}
                    {/* <ATMSelectSearchable
                        required
                        componentClass="mt-2"
                        label="Pincode"
                        size="xs"
                        labelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name="pincodeId"
                        value={values.pincodeId || ''}
                        options={dropdownOptions.pincodeOptions || []}
                        onChange={(e) => {
                            handlePinCode(e)
                            handleSetPinCodeName(e)
                        }}
                    /> */}

                    <div className="grid grid-cols-12">
                        <div className="col-span-4 pt-2">
                            <span className="text-slate-700 text-sm font-medium">
                                Pincode
                            </span>
                        </div>
                        <div className="col-span-8 pr-1">
                            <div className="grid grid-cols-12 gap-x-2">
                                <div className="col-span-5">
                                    <ATMSelectSearchable
                                        componentClass="mt-1"
                                        size="xs"
                                        name="pincodeId"
                                        selectLabel="select pincode"
                                        value={values.pincodeId || ''}
                                        options={
                                            dropdownOptions.pincodeOptions || []
                                        }
                                        isValueWithLable={true}
                                        onChange={(e) => {
                                            handlePinCode(e?.value || '')
                                            setFieldValue(
                                                'pincodeLabel',
                                                e?.label || '' || ''
                                            )
                                        }}
                                    />
                                </div>
                                <div className="col-span-5">
                                    <ATMTextField
                                        size="xs"
                                        extraClassField="mt-2"
                                        placeholder="Search pincode"
                                        name=""
                                        value={pinCodeSearch}
                                        onChange={(e) =>
                                            setPinCodeSearch(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-span-2 pt-2">
                                    <CallerButton
                                        text="Search"
                                        type="button"
                                        className="text-[12px] h-[30px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <ATMSelectSearchable
                        componentClass="mt-2"
                        label="State"
                        size="xs"
                        labelDirection="horizontal"
                        selectLabel="select state"
                        classDirection="grid grid-cols-3"
                        name="stateId"
                        value={values.stateId || ''}
                        options={dropdownOptions.stateOptions || []}
                        isValueWithLable
                        onChange={(e) => {
                            setFieldValue('stateId', e?.value || '')
                            setFieldValue('stateLabel', e?.label || '')
                            setFieldValue(
                                'autoFillingShippingAddress',
                                `${values?.pincodeLabel}\n${e?.label || ''}`
                            )
                        }}
                    />
                       <ATMSelectSearchable
                        componentClass="mt-2"
                        label="District"
                        size="xs"
                        selectLabel="select district"
                        labelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        name="districtId"
                        value={values.districtId || ''}
                        options={dropdownOptions.districtOptions || []}
                        isValueWithLable
                        onChange={(e) => {
                            setFieldValue('districtId', e?.value || '')
                            setFieldValue('districtLabel', e?.label || '')
                            setFieldValue(
                                'autoFillingShippingAddress',
                                `${values.pincodeLabel}\n${
                                    values.stateLabel
                                }\n${values.areaLabel}\n${e?.label || ''}`
                            )
                        }}
                    />
                    {/* <ATMSelectSearchable
                        componentClass="mt-2"
                        label="City/Village"
                        size="xs"
                        selectLabel="select city/village"
                        labelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        options={[]}
                        isValueWithLable
                        onChange={(e) => {
                            // setFieldValue('zonalManagerId', e)
                            // setFieldValue(
                            //     'stateLabel',
                            //     e?.label|| ''
                            // )
                            // setFieldValue(
                            //     'autoFillingShippingAddress',
                            //     `${values.pincodeLabel}\n${values.stateLabel}\n${e?.label|| ''}`
                            // )
                        }}
                    /> */}
                </div>

                <div className="col-span-4 py-2 px-8   border-r-[1px]">
                   
                 
                    <ATMSelectSearchable
                        componentClass="mt-2"
                        label="Tehsil/Taluka"
                        size="xs"
                        selectLabel="select tehsil/taluka"
                        labelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name="tehsilId"
                        value={values.tehsilId || ''}
                        options={dropdownOptions.tehsilOptions || []}
                        isValueWithLable
                        onChange={(e) => {
                            setFieldValue('tehsilId', e?.value || '')
                            setFieldValue('tehsilLabel', e?.label || '')
                            setFieldValue(
                                'autoFillingShippingAddress',
                                `${values.pincodeLabel}\n${
                                    values.stateLabel
                                }\n${values.areaLabel}\n${
                                    values.districtLabel
                                }\n${e?.label || ''}`
                            )
                        }}
                    />
                     <ATMSelectSearchable
                        componentClass="  mt-2"
                        label="Area"
                        size="xs"
                        selectLabel="select area"
                        labelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        name="areaId"
                        value={values.areaId || ''}
                        options={dropdownOptions.areaOptions || []}
                        isValueWithLable
                        onChange={(e) => {
                            setFieldValue('areaId', e?.value || '')
                            setFieldValue('areaLabel', e?.label || '')
                            setFieldValue(
                                'autoFillingShippingAddress',
                                `${values.pincodeLabel}\n${
                                    values.stateLabel
                                }\n${e?.label || ''}`
                            )
                        }}
                    />
                </div>

                {/* Delevery Duration */}
                <div className="col-span-2 py-2 p-2 pl-8 flex justify-center items-center">
                    <div className="px-4">
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
                        componentClass="mt-1"
                        labelDirection="horizontal"
                        label="Type of Address"
                        size="xs"
                        selectLabel="select address"
                        name="typeOfAddress"
                        value={values.typeOfAddress || ''}
                        options={[
                            { label: 'Home', value: 'home' },
                            { label: 'Office', value: 'office' },
                            { label: 'Other', value: 'other' },
                        ]}
                        onChange={(e) => {
                            setFieldValue('typeOfAddress', e)
                        }}
                    />

                    <ATMTextField
                        label="Recivers Name"
                        size="xs"
                        extraClassField="mt-0"
                        labelDirection="horizontal"
                        name="reciversName"
                        placeholder="recivers name"
                        value={values.reciversName || ''}
                        onChange={(e) => {
                            setFieldValue('reciversName', e.target.value)
                        }}
                    />

                    <div className="grid grid-cols-12">
                        <div className="col-span-4 pt-2">
                            <label className="text-slate-700 text-sm font-medium">
                                Prefferred Delivery Time And Date
                            </label>
                        </div>
                        <div className="col-span-8 pl-1">
                            <div className="grid grid-cols-12 gap-x-1">
                                <div className="col-span-5">
                                    <ATMSelectSearchable
                                        componentClass="mt-1"
                                        size="xs"
                                        selectLabel="select start time"
                                        name="preffered_delivery_start_time"
                                        value={
                                            values.preffered_delivery_start_time ||
                                            ''
                                        }
                                        options={startTimesOptions}
                                        onChange={(e) => {
                                            handleEndTime(e)
                                            setFieldValue(
                                                'preffered_delivery_start_time',
                                                e
                                            )
                                        }}
                                    />
                                </div>
                                <div className="col-span-2 flex justify-center items-center">
                                    <span className="text-slate-700 text-sm font-medium">
                                        TO
                                    </span>
                                </div>
                                <div className="col-span-5">
                                    <ATMSelectSearchable
                                        componentClass="mt-1"
                                        size="xs"
                                        selectLabel="select end time"
                                        name="preffered_delivery_end_time"
                                        value={
                                            values.preffered_delivery_end_time ||
                                            ''
                                        }
                                        options={endTimeOptionsList}
                                        onChange={(e) => {
                                            setFieldValue(
                                                'preffered_delivery_end_time',
                                                e
                                            )
                                        }}
                                    />
                                </div>
                                <div className="col-span-12 mt-2 mb-4">
                                    <ATMDatePicker
                                        name="preffered_delivery_date"
                                        value={values.preffered_delivery_date}
                                        size="xs"
                                        labelClass="font-medium"
                                        dateTimeFormat="MM/DD/YYYY"
                                        minDate
                                        onChange={(e) => {
                                            setFieldValue(
                                                'preffered_delivery_date',
                                                e
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <ATMTextField
                        extraClassField="-mt-1"
                        label="House/Flat/Shop/Office No."
                        size="xs"
                        placeholder="enter house/flat/shop/office no."
                        labelDirection="horizontal"
                        name="houseNumber"
                        value={values.houseNumber || ''}
                        onChange={(e) => {
                            setFieldValue('houseNumber', e.target.value)
                            setFieldValue(
                                'autoFillingShippingAddress',
                                `${values.pincodeLabel}\n${values.stateLabel}\n${values.areaLabel}\n${values.districtLabel}\n${values.tehsilLabel}\n${e.target.value}`
                            )
                        }}
                    />
                    <ATMTextField
                        extraClassField="mt-0"
                        label="Street/Sector/Building/ Appartment"
                        size="xs"
                        labelDirection="horizontal"
                        placeholder="enter street/sector/building/appartment"
                        name="streetNumber"
                        value={values.streetNumber || ''}
                        onChange={(e) => {
                            setFieldValue('streetNumber', e.target.value)
                            setFieldValue(
                                'autoFillingShippingAddress',
                                `${values.pincodeLabel}\n${values.stateLabel}\n${values.areaLabel}\n${values.districtLabel}\n${values.tehsilLabel}\n${values.houseNumber}\n${e.target.value}`
                            )
                        }}
                    />
                    <ATMTextField
                        extraClassField="mt-0"
                        label="Landmark"
                        size="xs"
                        placeholder="enter landmark"
                        labelDirection="horizontal"
                        name="landmark"
                        value={values.landmark}
                        onChange={(e) => {
                            setFieldValue('landmark', e.target.value)
                            setFieldValue(
                                'autoFillingShippingAddress',
                                `${values.pincodeLabel}\n${values.stateLabel}\n${values.areaLabel}\n${values.districtLabel}\n${values.tehsilLabel}\n${values.houseNumber}\n${values.streetNumber}\n${e.target.value}`
                            )
                        }}
                    />

                    <ATMTextField
                        extraClassField="mt-0"
                        label="Alternate Mobile No"
                        placeholder="enter alternate mobile number"
                        value={values.alternateNo}
                        maxLength={10}
                        size="xs"
                        labelDirection="horizontal"
                        name="alternateNo"
                        onChange={(e) => {
                            const inputValue = e.target.value
                            if (!isNaN(Number(inputValue))) {
                                setFieldValue('alternateNo', e.target.value)
                            }
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
                                onChange={(e) =>  e}
                            />
                        </div>
                    </div> */}

                    <ATMTextField
                        extraClassField="mt-0"
                        label="WhatsApp Number"
                        placeholder="enter whatsapp number"
                        value={values.whatsappNo}
                        size="xs"
                        labelDirection="horizontal"
                        name="whatsappNo"
                        maxLength={10}
                        // isSubmitting
                        onChange={(e) => {
                            const inputValue = e.target.value
                            if (!isNaN(Number(inputValue))) {
                                setFieldValue('whatsappNo', e.target.value)
                            }
                        }}
                    />
                </div>
                <div className="col-span-6 py-2 px-8 border-r-[1px]">
                    <div className="-mt-3">
                        <ATMTextArea
                            name="autoFillingShippingAddress"
                            value={values.autoFillingShippingAddress || ''}
                            placeholder="AUTOFILL SHIPPING ADDRESS"
                            minRows={9}
                            readOnly={true}
                            onChange={(value) =>
                                setFieldValue(
                                    'autoFillingShippingAddress',
                                    value
                                )
                            }
                        />
                    </div>

                    {/* FOR MOBILE INPUT FIELD */}
                    <div className="-mt-4">
                        <ATMSwitchButton
                            label="Recording"
                            name=""
                            // value={values || false}
                            value={isRecording}
                            title1="ON"
                            title2="OFF"
                            onChange={(e) => {
                                setIsRecording(e)
                                // setFieldValue('isRecording', e)
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CallerDeliveryAddress
