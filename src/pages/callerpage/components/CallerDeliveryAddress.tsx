import React, { useEffect } from 'react'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { RootState } from 'src/redux/store'
import CallerButton from './CallerButton'
import { FormInitialValues } from '../salesInbound/SalesPageWrapper'
// import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { endTimesOptions, startTimesOptions } from './constants'
import { SelectOption } from 'src/models/FormField/FormField.model'
import AddressDialog from './AddressDialog'
import { useDispatch, useSelector } from 'react-redux'

//  Country
// import { useGetAllCountryUnauthQuery } from 'src/services/CountryService'
// import { CountryListResponse } from 'src/models/Country.model'
// import { setAllCountry } from 'src/redux/slices/countrySlice'

//  State
import { useGetByAllStateUnauthQuery } from 'src/services/StateService'
import { StateListResponse } from 'src/models/State.model'
import { setAllStates } from 'src/redux/slices/statesSlice'

//  District
import { useGetAllDistrictUnauthQuery } from 'src/services/DistricService'
import { DistrictListResponse } from 'src/models/District.model'
import { setAllDistrict } from 'src/redux/slices/districtSlice'

// Taluka/Tehsil
import { useGetAllTehsilUnauthQuery } from 'src/services/TehsilService'
import { TehsilListResponse } from 'src/models/Tehsil.model'
import { setAllTehsils } from 'src/redux/slices/tehsilSlice'

// Pincode
import { useGetAllPincodeByTehsilUnauthQuery } from 'src/services/PinCodeService'
import { PincodeListResponse } from 'src/models/Pincode.model'
import { setAllPincodes } from 'src/redux/slices/pincodeSlice'

// Area
import { useGetAllAreaUnauthQuery } from 'src/services/AreaService'
import { AreaListResponse } from 'src/models/Area.model'
import { setItems as setAreaItems } from 'src/redux/slices/areaSlice'

// Get All Info By Pincode
import { useGetAllInfoByPincodeMutation } from 'src/services/PinCodeService'
import { showToast } from 'src/utils'

type Props = {
    // dropdownOptions: dropdownOptions
    values: FormInitialValues
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void
}

const addressOptions = [
    { label: 'Home', value: 'home' },
    { label: 'Office', value: 'office' },
    { label: 'Other', value: 'other' },
]

const CallerDeliveryAddress = ({
    // dropdownOptions,
    setFieldValue,
    values,
}: Props) => {
    const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false)
    const [pinCodeSearch, setPinCodeSearch] = React.useState<string>('')
    const [endTimeOptionsList, setEndTimeOptionsList] = React.useState<
        SelectOption[] | []
    >([])

    // const [isRecording, setIsRecording] = React.useState<boolean>(false)

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { allStates }: any = useSelector((state: RootState) => state.states)
    const { allDistricts }: any = useSelector(
        (state: RootState) => state.district
    )
    const { allTehsils }: any = useSelector((state: RootState) => state.tehsils)
    const { allPincodes }: any = useSelector(
        (state: RootState) => state.pincode
    )
    const { items: allArea }: any = useSelector(
        (state: RootState) => state.areas
    )

    // set State
    const {
        data: stateData,
        isLoading: stateIsLoading,
        isFetching: stateIsFetching,
    } = useGetByAllStateUnauthQuery('')

    useEffect(() => {
        if (!stateIsLoading && !stateIsFetching)
            dispatch(setAllStates(stateData?.data))
    }, [stateData, stateIsLoading, stateIsFetching, dispatch])

    // set Districts
    const {
        data: districtData,
        isLoading: districtIsLoading,
        isFetching: districtIsFetching,
    } = useGetAllDistrictUnauthQuery(values.stateId || '', {
        skip: !values.stateId,
    })

    useEffect(() => {
        dispatch(setAllDistrict(districtData?.data))
    }, [districtData, districtIsLoading, districtIsFetching, dispatch])

    // set Tehsil
    const {
        data: tehsilData,
        isFetching: tehsilIsFetching,
        isLoading: tehsilIsLoading,
    } = useGetAllTehsilUnauthQuery(values.districtId || '', {
        skip: !values.districtId,
    })

    useEffect(() => {
        if (!tehsilIsFetching && !tehsilIsLoading) {
            dispatch(setAllTehsils(tehsilData?.data))
        }
    }, [tehsilData, dispatch, tehsilIsFetching, tehsilIsLoading])

    // set Pincode
    const {
        data: pinCodeData,
        isFetching: pinCodeFetching,
        isLoading: pinCodeLoading,
    } = useGetAllPincodeByTehsilUnauthQuery(values.tehsilId || '', {
        skip: !values.tehsilId,
    })

    useEffect(() => {
        if (!pinCodeLoading && !pinCodeFetching) {
            dispatch(setAllPincodes(pinCodeData?.data))
        }
    }, [pinCodeData, dispatch, pinCodeFetching, pinCodeLoading])

    // Area Options
    const {
        data: areaData,
        isLoading: areaIsLoading,
        isFetching: areaIsFetching,
    } = useGetAllAreaUnauthQuery(values?.pincodeId || '', {
        skip: !values?.pincodeId,
    })

    useEffect(() => {
        if (!areaIsFetching && !areaIsLoading) {
            dispatch(setAreaItems(areaData?.data))
        }
        // eslint-disable-next-line
    }, [areaData, areaIsLoading, areaIsFetching, dispatch])

    // All Option By Pincode

    const [getAllInfoByPincode] = useGetAllInfoByPincodeMutation()

    const handlePincodeSearch = () => {
        getAllInfoByPincode(pinCodeSearch)
            .then((res: any) => {
                if (res?.data?.status) {
                    // value id
                    setFieldValue('stateId', res?.data?.stateData[0]?._id)
                    setFieldValue('districtId', res?.data?.districtData[0]?._id)
                    setFieldValue('tehsilId', res?.data?.tehsilData[0]?._id)
                    setFieldValue('pincodeId', res?.data?.pincodeData?._id)
                    setFieldValue('areaId', res?.data?.areaData[0]?._id)
                    // lable
                    setFieldValue(
                        'stateLabel',
                        res?.data?.stateData[0]?.stateName
                    )
                    setFieldValue(
                        'districtLabel',
                        res?.data?.districtData[0]?.districtName
                    )
                    setFieldValue(
                        'tehsilLabel',
                        res?.data?.tehsilData[0]?.tehsilName
                    )
                    setFieldValue(
                        'pincodeLabel',
                        res?.data?.pincodeData?.pincode
                    )
                    setFieldValue('areaLabel', res?.data?.areaData[0]?.area)
                } else {
                    showToast('error', res?.data?.message)
                    setFieldValue('stateId', '')
                    setFieldValue('districtId', '')
                    setFieldValue('tehsilId', '')
                    setFieldValue('pincodeId', '')
                    setFieldValue('areaId', '')
                }
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const handleAutoFillShippingAddress = (values: FormInitialValues) => {
        const addressLabels = `${
            values.stateLabel ? values.stateLabel + '\n' : ''
        }${values.districtLabel ? values.districtLabel + '\n' : ''}${
            values.tehsilLabel ? values.tehsilLabel + '\n' : ''
        }${values.pincodeLabel ? values.pincodeLabel + '\n' : ''}${
            values.areaLabel ? values.areaLabel + '\n' : ''
        }${values.houseNumber ? values.houseNumber + '\n' : ''}${
            values.streetNumber ? values.streetNumber + '\n' : ''
        }${values.landmark ? values.landmark + '\n' : ''}`
        return addressLabels
    }

    // handle address related fields

    const handleRemoveAddressRelated = (type: string) => {
        switch (type) {
            case 'stateId':
                // id's
                setFieldValue('districtId', '')
                setFieldValue('tehsilId', '')
                setFieldValue('pincodeId', '')
                setFieldValue('areaId', '')
                // labels
                setFieldValue('stateLabel', '')
                setFieldValue('districtLabel', '')
                setFieldValue('tehsilLabel', '')
                setFieldValue('pincodeLabel', '')
                setFieldValue('areaLabel', '')

                // dispatch
                dispatch(setAllDistrict([]))
                dispatch(setAllTehsils([]))
                dispatch(setAllPincodes([]))
                dispatch(setAreaItems([]))

                break
            case 'districtId':
                // id's
                setFieldValue('tehsilId', '')
                setFieldValue('pincodeId', '')
                setFieldValue('areaId', '')
                // lables
                setFieldValue('districtLabel', '')
                setFieldValue('tehsilLabel', '')
                setFieldValue('pincodeLabel', '')
                setFieldValue('areaLabel', '')

                // dispatch
                dispatch(setAllTehsils([]))
                dispatch(setAllPincodes([]))
                dispatch(setAreaItems([]))
                break
            case 'tehsilId':
                // id's
                setFieldValue('pincodeId', '')
                setFieldValue('areaId', '')
                // lables
                setFieldValue('tehsilLabel', '')
                setFieldValue('pincodeLabel', '')
                setFieldValue('areaLabel', '')

                // dispatch
                dispatch(setAllPincodes([]))
                dispatch(setAreaItems([]))

                break
            case 'pincodeId':
                // id's
                setFieldValue('areaId', '')
                // lables
                setFieldValue('pincodeLabel', '')
                setFieldValue('areaLabel', '')

                // dispatch
                dispatch(setAreaItems([]))
                break
            default:
                break
        }
    }

    //  selected option dropdowns options
    const dropdownOptions = {
        stateOptions: allStates?.map((ele: StateListResponse) => {
            return { label: ele?.stateName, value: ele?._id }
        }),
        districtOptions: allDistricts?.map((ele: DistrictListResponse) => {
            return { label: ele?.districtName, value: ele?._id }
        }),
        tehsilOptions: allTehsils?.map((ele: TehsilListResponse) => {
            return { label: ele?.tehsilName, value: ele?._id }
        }),
        pincodeOptions: allPincodes?.map((ele: PincodeListResponse) => {
            return { label: ele?.pincode, value: ele?._id }
        }),
        areaOptions: allArea?.map((ele: AreaListResponse) => {
            return { label: ele?.area, value: ele?._id }
        }),
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

    useEffect(() => {
        handleEndTime(values?.preffered_delivery_start_time)
    }, [values?.preffered_delivery_start_time])

    return (
        <>
            <div className="bg-[#87527C] py-1 px-2">
                <h2 className="text-[10px] font-bold text-white">
                    DELIVERY ADDRESS
                </h2>
            </div>

            {/* Delivery Address Section */}
            <div className="grid grid-cols-12 border-[1px] border-grey-700">
                {/* FOR SHOWING 2 INPUT FIELDS */}
                <div className="col-span-6 pb-1  gap-x-2 border-r-[1px] px-2 border-grey-800">
                    <div className="grid grid-cols-12">
                        <div className="col-span-2 flex items-center">
                            <span className="text-slate-700 text-xs font-medium mb-1">
                                Pincode
                            </span>
                        </div>
                        <div className="col-span-10">
                            <div className="grid grid-cols-12 gap-x-2">
                                <div className="col-span-6">
                                    <ATMSelectSearchable
                                        fontSizeOptionsClass='13px'
                                        fontSizePlaceHolder="14px"
                                        minHeight="25px"
                                        componentClass=""
                                        size="xxs"
                                        name="pincodeId"
                                        selectLabel=" pincode"
                                        value={values.pincodeId || ''}
                                        isValueWithLable={true}
                                        options={
                                            dropdownOptions.pincodeOptions || []
                                        }
                                        onChange={(e) => {
                                            // handlePinCode(e?.value || '')
                                            setFieldValue(
                                                'pincodeId',
                                                e?.value || ''
                                            )
                                            setFieldValue(
                                                'pincodeLabel',
                                                e?.label || ''
                                            )
                                            if (!e.value) {
                                                handleRemoveAddressRelated(
                                                    'pincodeId'
                                                )
                                            }
                                        }}
                                    />
                                </div>
                                <div className="col-span-4">
                                    <ATMTextField
                                        size="xxs"
                                        labelSize="xxs"
                                        maxLength={6}
                                        minLength={6}
                                        extraClassField="mt-1"
                                        className="py-[13px] rounded"
                                        placeholder=" pincode"
                                        name=""
                                        value={pinCodeSearch}
                                        onChange={(e) =>
                                            setPinCodeSearch(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-span-2 mt-[3px]">
                                    <CallerButton
                                        text="Search"
                                        type="button"
                                        className="text-[13px]"
                                        onClick={() =>
                                            pinCodeSearch === ''
                                                ? setIsOpenDialog(true)
                                                : handlePincodeSearch()
                                        }
                                    />
                                </div>
                                <AddressDialog
                                    isShow={isOpenDialog}
                                    onClose={() => setIsOpenDialog(false)}
                                />
                            </div>
                        </div>
                    </div>

                    <ATMSelectSearchable
                        fontSizePlaceHolder="14px"
                        fontSizeOptionsClass='13px'
                        minHeight="25px"
                        componentClass="mt-1"
                        label="State"
                        size="xxs"
                        labelSize="xxs"
                        labelClass="text-slate-700 text-xs font-medium mb-1"
                        labelDirection="horizontal"
                        selectLabel=" state"
                        classDirection="grid grid-cols-3"
                        name="stateId"
                        value={values.stateId || ''}
                        options={dropdownOptions.stateOptions || []}
                        isValueWithLable
                        onChange={(e) => {
                            setFieldValue('stateId', e?.value || '')
                            setFieldValue('stateLabel', e?.label || '')
                            if (!e.value) {
                                handleRemoveAddressRelated('stateId')
                            }
                        }}
                    />
                    <ATMSelectSearchable
                        fontSizePlaceHolder="14px"
                        fontSizeOptionsClass='13px'
                        minHeight="25px"
                        componentClass="mt-1"
                        label="District"
                        size="xxs"
                        labelSize="xxs"
                        labelClass="text-slate-700 text-xs font-medium mb-1"
                        selectLabel=" district"
                        labelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        name="districtId"
                        value={values.districtId || ''}
                        options={dropdownOptions.districtOptions || []}
                        isValueWithLable
                        onChange={(e) => {
                            setFieldValue('districtId', e?.value || '')
                            setFieldValue('districtLabel', e?.label || '')
                            if (!e.value) {
                                handleRemoveAddressRelated('districtId')
                            }
                        }}
                    />
                </div>

                <div className="col-span-4 pb-1 px-2 border-r-[1px]">
                    <ATMSelectSearchable
                        fontSizePlaceHolder="14px"
                        fontSizeOptionsClass='13px'
                        minHeight="25px"
                        componentClass="mt-1"
                        label="Tehsil/Taluka"
                        size="xxs"
                        labelSize="xxs"
                        selectLabel=" tehsil/taluka"
                        labelDirection="horizontal"
                        labelClass="text-slate-700 text-xs font-medium"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name="tehsilId"
                        value={values.tehsilId || ''}
                        options={dropdownOptions.tehsilOptions || []}
                        isValueWithLable
                        onChange={(e) => {
                            setFieldValue('tehsilId', e?.value || '')
                            setFieldValue('tehsilLabel', e?.label || '')
                            if (!e.value) {
                                handleRemoveAddressRelated('tehsilId')
                            }
                        }}
                    />

                    <ATMSelectSearchable
                        fontSizePlaceHolder="14px"
                        fontSizeOptionsClass='13px'
                        minHeight="25px"
                        componentClass="mt-1"
                        label="Area"
                        size="xxs"
                        labelSize="xxs"
                        selectLabel=" area"
                        labelDirection="horizontal"
                        labelClass="text-slate-700 text-xs font-medium"
                        classDirection="grid grid-cols-3"
                        name="areaId"
                        value={values.areaId || ''}
                        options={dropdownOptions.areaOptions || []}
                        isValueWithLable
                        onChange={(e) => {
                            setFieldValue('areaId', e?.value || '')
                            setFieldValue('areaLabel', e?.label || '')
                        }}
                    />
                </div>

                {/* Delevery Duration */}
                <div className="col-span-2 pl-4 flex justify-center items-center">
                    <div className="px-2">
                        <div className="bg-gray-200 p-2 text-[#34727F] font-semibold text-center text-[12px]">
                            Expected Delivery In
                        </div>
                        <div className="bg-[#407C86] p-2 text-xs text-white font-bold text-center">
                            4 to 24 Hrs
                        </div>
                    </div>
                </div>
            </div>

            {/*  Billing Address */}
            <div className="grid grid-cols-12 border-[1px] mt-1 border-grey-700">
                <div className="col-span-6 pb-1 gap-x-4 border-r-[1px] px-2 border-grey-800">
                    <ATMSelectSearchable
                        fontSizePlaceHolder="14px"
                        fontSizeOptionsClass='13px'
                        minHeight="25px"
                        componentClass="mt-1"
                        labelDirection="horizontal"
                        labelSize="xxs"
                        label="Type of Address"
                        size="xxs"
                        selectLabel="select address"
                        labelClass="text-slate-700 text-xs font-medium"
                        name="typeOfAddress"
                        value={values.typeOfAddress || ''}
                        options={addressOptions}
                        onChange={(e) => {
                            setFieldValue('typeOfAddress', e)
                        }}
                    />

                    <ATMTextField
                        label="Customer Name"
                        labelSize="xxs"
                        size="xxs"
                        extraClassField="mt-0"
                        labelDirection="horizontal"
                        labelClass="text-slate-700 text-xs font-medium mt-2"
                        name="reciversName"
                        placeholder="enter customer name"
                        value={values.reciversName || ''}
                        onChange={(e) => {
                            setFieldValue('reciversName', e.target.value)
                        }}
                    />

                    <div className="grid grid-cols-12">
                        <div className="col-span-4 pt-2">
                            <label className="text-slate-700 text-xs font-medium">
                                Prefferred Delivery Time And Date
                            </label>
                        </div>
                        <div className="col-span-8 pl-1">
                            <div className="grid grid-cols-12 gap-x-1">
                                <div className="col-span-5">
                                    <ATMSelectSearchable
                                        fontSizePlaceHolder="14px"
                                        fontSizeOptionsClass='13px'
                                        minHeight="25px"
                                        componentClass="mt-1"
                                        size="xxs"
                                        selectLabel="start time"
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
                                <div className="col-span-2 flex justify-center items-center mt-2">
                                    <span className="text-slate-700 text-[10px] font-medium">
                                        TO
                                    </span>
                                </div>
                                <div className="col-span-5">
                                    <ATMSelectSearchable
                                        fontSizeOptionsClass='13px'
                                        fontSizePlaceHolder="14px"
                                        minHeight="25px"
                                        componentClass="mt-1"
                                        size="xxs"
                                        labelSize="xxs"
                                        selectLabel="end time"
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
                                        inputSize="11px"
                                        name="preffered_delivery_date"
                                        value={values.preffered_delivery_date}
                                        size="xxs"
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
                        extraClassField="-mt-4"
                        label="House/Flat/Shop/Office No."
                        size="xxs"
                        labelSize="xxs"
                        placeholder="enter house/flat/shop/office no."
                        labelClass="text-slate-700 text-sm font-medium mt-2"
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
                        size="xxs"
                        labelSize="xxs"
                        labelDirection="horizontal"
                        placeholder="enter street/sector/building/appartment"
                        labelClass="text-slate-700 text-sm font-medium mt-1"
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
                        size="xxs"
                        labelSize="xxs"
                        placeholder="enter landmark"
                        labelClass="text-slate-700 text-sm font-medium mt-2"
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
                        labelSize="xxs"
                        placeholder="enter alternate mobile number"
                        labelClass="text-slate-700 text-sm font-medium mt-2"
                        value={values.alternateNo}
                        maxLength={10}
                        size="xxs"
                        labelDirection="horizontal"
                        name="alternateNo"
                        onChange={(e) => {
                            const inputValue = e.target.value
                            if (!isNaN(Number(inputValue))) {
                                setFieldValue('alternateNo', e.target.value)
                            }
                        }}
                    />

                    <ATMTextField
                        extraClassField="mt-0"
                        label="WhatsApp Number"
                        placeholder="enter whatsapp number"
                        value={values.whatsappNo}
                        size="xxs"
                        labelSize="xxs"
                        labelDirection="horizontal"
                        labelClass="text-slate-700 text-sm font-medium mt-1"
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
                <div className="col-span-6 pb-1 px-2 border-r-[1px]">
                    <div className="-mt-3">
                        <ATMTextArea
                            isDisable={true}
                            name="autoFillingShippingAddress"
                            value={handleAutoFillShippingAddress(values) || ''}
                            placeholder="AUTOFILL SHIPPING ADDRESS"
                            className="placeholder:text-sm text-xs"
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
                    {/* <div className="-mt-4">
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
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default CallerDeliveryAddress
