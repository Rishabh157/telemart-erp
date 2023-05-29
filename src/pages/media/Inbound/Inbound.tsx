import { Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMRadioButton from 'src/components/UI/atoms/formFields/ATMRadioButton/ATMRadioButton'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { FormikProps } from 'formik'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from './InboundWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { setAllStates } from 'src/redux/slices/statesSlice'
import { setAllDistrict } from 'src/redux/slices/districtSlice'
import { setAllPincodes } from 'src/redux/slices/pincodeSlice'
import { useGetAllDistrictByStateQuery } from 'src/services/DistricService'
import { useGetAllStateByCountryQuery } from 'src/services/StateService'
import { useGetAlldispositionOneunauthQuery } from 'src/services/configurations/DispositiononeServices'
import { setAllItems } from 'src/redux/slices/configuration/dispositionOneSlice'
import { useGetAlldispositionTwounauthQuery } from 'src/services/configurations/DispositionTwoServices'
import { setItems as setDispositionTwoItems } from 'src/redux/slices/configuration/dispositionTwoSlice'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        counrtyOptions: SelectOption[]
        stateOptions?: SelectOption[] | []
        districtOptions?: SelectOption[] | []
        pincodeOptions?: SelectOption[] | []
        dispositionOneOptions?: SelectOption[] | []
        dispositionTwoOptions?: SelectOption[] | []
    }
}
type FieldType = Field<
    | 'counrtyOptions'
    | 'stateOptions'
    | 'districtOptions'
    | 'pincodeOptions'
    | 'dispositionOneOptions'
>
const Inbound: React.FC<Props> = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}) => {
    const { values, setFieldValue } = formikProps

    const dispatch = useDispatch<AppDispatch>()
    const { allStates }: any = useSelector((state: RootState) => state.states)
    const { allDistricts }: any = useSelector(
        (state: RootState) => state.district
    )
    const { allPincodes }: any = useSelector(
        (state: RootState) => state.pincode
    )
    const { allItems: allDispositionItems }: any = useSelector(
        (state: RootState) => state.dispositionOne
    )
    const {
        data: dispositionOnedata,
        isLoading: dispositionOneIsLoading,
        isFetching: dispositionOneIsFetching,
    } = useGetAlldispositionOneunauthQuery('')
    const {
        data: dispositionTwodata,
        isLoading: dispositionTwoIsLoading,
        isFetching: dispositionTwoIsFetching,
    } = useGetAlldispositionTwounauthQuery(
        formikProps.values.dispositionLevelOne,
        { skip: !formikProps.values.dispositionLevelOne }
    )
    //console.log(formikProps.values.dispositionLevelOne, 'sdfvjhsfv')
    const { items: dispositionTwoItems }: any = useSelector(
        (state: RootState) => state.dispositionTwo
    )
    console.log(dispositionTwoItems)

    const {
        data: stateData,
        isLoading: stateIsLoading,
        isFetching: stateIsFetching,
    } = useGetAllStateByCountryQuery(
        formikProps.values.addressInformation.country,
        {
            skip: !formikProps.values.addressInformation.country,
        }
    )
    const {
        data: districtData,
        isLoading: districtIsLoading,
        isFetching: districtIsFetching,
    } = useGetAllDistrictByStateQuery(
        formikProps.values.addressInformation.state,
        {
            skip: !formikProps.values.addressInformation.state,
        }
    )
    useEffect(() => {
        dispatch(setAllStates(stateData?.data))
    }, [stateData, stateIsLoading, stateIsFetching, dispatch])

    //district
    useEffect(() => {
        dispatch(setAllDistrict(districtData?.data))
    }, [districtData, districtIsLoading, districtIsFetching, dispatch])

    useEffect(() => {
        if (!dispositionOneIsLoading && !dispositionOneIsFetching) {
            dispatch(setAllItems(dispositionOnedata?.data))
        }
    }, [
        dispositionOnedata,
        dispatch,
        dispositionOneIsLoading,
        dispositionOneIsFetching,
    ])

    useEffect(() => {
        if (!dispositionTwoIsLoading && !dispositionTwoIsFetching) {
            //console.log(dispositionTwodata)
            dispatch(setDispositionTwoItems(dispositionTwodata?.data))
        }
    }, [
        dispositionTwodata,
        dispatch,
        dispositionTwoIsLoading,
        dispositionTwoIsFetching,
    ])

    dropdownOptions = {
        ...dropdownOptions,

        stateOptions: allStates?.map((ele: any) => {
            return { label: ele?.stateName, value: ele?._id }
        }),

        districtOptions: allDistricts?.map((ele: any) => {
            return { label: ele?.districtName, value: ele?._id }
        }),
        pincodeOptions: allPincodes?.map((ele: any) => {
            return { label: ele?.pincode, value: ele?._id }
        }),
        dispositionOneOptions: allDispositionItems?.map((ele: any) => {
            return { label: ele?.dispositionName, value: ele?._id }
        }),
        dispositionTwoOptions: dispositionTwoItems?.map((ele: any) => {
            return { label: ele?.dispositionName, value: ele?._id }
        }),
    }

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
                                        name="didNo"
                                        labelClass="font-semibold text-sm "
                                        label="DID NO"
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                        onChange={(e) => {
                                            console.log(e.target.value)
                                            setFieldValue(
                                                'generalInformation.didNo',
                                                e.target.value
                                            )
                                        }}
                                        value={values.generalInformation.didNo}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name="inOutBound"
                                        labelClass="font-semibold text-sm"
                                        label="IN /OutBound"
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                        onChange={(e) => {
                                            setFieldValue('inOutBound', e)
                                        }}
                                        value={
                                            values.generalInformation.inOutBound
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name="incomingCallerNo"
                                        labelClass="font-semibold text-sm"
                                        label="In Comming Caller No"
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                        onChange={(e) => {
                                            setFieldValue('incomingCallerNo', e)
                                        }}
                                        value={
                                            values.generalInformation
                                                .incomingCallerNo
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name="mobileNo"
                                        labelClass="font-semibold text-sm"
                                        label="Mobile No"
                                        onChange={(e) => {
                                            setFieldValue('mobileNo', e)
                                        }}
                                        value={
                                            values.generalInformation.mobileNo
                                        }
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* //Search by schema */}
                        <div className="bg-blue-50 rounded-xl px-3 py-2">
                            <div className=" gap-4 grid grid-cols-4">
                                <div className="flex flex-col gap-2 col-span-1 -mt-4 ">
                                    <ATMTextField
                                        name=""
                                        labelClass="font-semibold text-sm"
                                        label="Search By Schema"
                                        onChange={() => {}}
                                        value={''}
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>
                                <div>
                                    <ATMTable
                                        columns={[]}
                                        rows={[]}
                                        onRowSelect={() => {}}
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
                                        name="deliveryCharges"
                                        labelClass="font-semibold text-sm"
                                        label="Delivery charges"
                                        onChange={(e) => {
                                            setFieldValue('deliveryCharges', e)
                                        }}
                                        value={
                                            values.addressInformation
                                                .deliveryCharges
                                        }
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name="discount"
                                        labelClass="font-semibold text-sm"
                                        label="Discount"
                                        onChange={() => {}}
                                        value={
                                            values.addressInformation.discount
                                        }
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name="total"
                                        labelClass="font-semibold text-sm"
                                        label="Total"
                                        onChange={() => {}}
                                        value={values.addressInformation.total}
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full -mt-4">
                                    <ATMSelectSearchable
                                        options={dropdownOptions.counrtyOptions}
                                        name="country"
                                        labelClass="font-semibold text-sm"
                                        label="Country"
                                        required
                                        value={
                                            values.addressInformation.country
                                        }
                                        onChange={(e) => {
                                            setFieldValue('country', e)
                                        }}
                                        size="xs"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMSelectSearchable
                                        options={
                                            dropdownOptions.stateOptions || []
                                        }
                                        name="state"
                                        labelClass="font-semibold text-sm"
                                        label="State"
                                        required
                                        value={values.addressInformation.state}
                                        onChange={(e) => {
                                            setFieldValue('state', e)
                                        }}
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
                                        options={
                                            dropdownOptions.pincodeOptions || []
                                        }
                                        name="pincode"
                                        labelClass="font-semibold text-sm"
                                        label="Pincode"
                                        required
                                        value={
                                            values.addressInformation.pincode
                                        }
                                        onChange={(e) => {
                                            setFieldValue('pincode', e)
                                        }}
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

                                    <div className="flex flex-col gap-1 w-full ">
                                        <ATMDatePicker
                                            name="expectedDeliveryDate"
                                            value={
                                                values.addressInformation
                                                    .expectedDeliveryDate
                                            }
                                            label="expectedDeliveryDate"
                                            dateTimeFormat="LLL"
                                            onChange={() => {}}
                                            size="xs"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1 w-full  -mt-4">
                                        <ATMTextField
                                            name="profileDeliveredBy"
                                            labelClass="font-semibold text-sm"
                                            label="Profile delivered by"
                                            onChange={() => {}}
                                            value={
                                                values.addressInformation
                                                    .profileDeliveredBy
                                            }
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
                                    name="agentName"
                                    labelClass="font-semibold text-sm"
                                    label="Agent Name"
                                    onChange={(e) => {
                                        setFieldValue('agentName', e)
                                    }}
                                    value={values.personalInformation.agentName}
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="name"
                                    labelClass="font-semibold text-sm"
                                    label="Name"
                                    onChange={(e) => {
                                        setFieldValue('name', e)
                                    }}
                                    value={values.personalInformation.name}
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="age"
                                    labelClass="font-semibold text-sm"
                                    label="Age"
                                    onChange={(e) => {
                                        setFieldValue('age', e)
                                    }}
                                    value={values.personalInformation.age}
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4 col-span-3">
                                <ATMTextArea
                                    minRows={1}
                                    name="address"
                                    labelClass="font-semibold text-sm"
                                    value={values.personalInformation.address}
                                    label="Address"
                                    onChange={(e) => {
                                        setFieldValue('address', e)
                                    }}
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
                                <ATMTextField
                                    name="landmark"
                                    labelClass="font-semibold text-sm"
                                    label="Landmark"
                                    onChange={(e) => {
                                        setFieldValue('landmark', e)
                                    }}
                                    value={values.personalInformation.landmark}
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="alterNateNo1"
                                    labelClass="font-semibold text-sm"
                                    label="Alternate No.1"
                                    onChange={(e) => {
                                        setFieldValue('alterNateNo1', e)
                                    }}
                                    value={
                                        values.personalInformation.alternateNo1
                                    }
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
                                    onChange={() => {}}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="prepaid"
                                    labelClass="font-semibold text-sm"
                                    label="prepaid"
                                    onChange={(e) => {
                                        setFieldValue('prepaid', e)
                                    }}
                                    value={values.personalInformation.prepaid}
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="email"
                                    labelClass="font-semibold text-sm"
                                    label="Email"
                                    onChange={(e) => {
                                        setFieldValue('email', e)
                                    }}
                                    value={values.personalInformation.email}
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
                                    name="otherRemarks"
                                    minRows={1}
                                    labelClass="font-bold text-sm"
                                    value={
                                        values.personalInformation.otherRemarks
                                    }
                                    label="Remarks"
                                    onChange={(e) => {
                                        setFieldValue('otherRemarks', e)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Divider />

                <div>
                    <div className=" gap-4 grid-cols-5 grid px-4 -mt-4">
                        <div className="col-span-3 w-full flex gap-4">
                            <div className="flex flex-col gap-1  w-full  ">
                                <ATMSelectSearchable
                                    options={
                                        dropdownOptions.dispositionOneOptions ||
                                        []
                                    }
                                    name="dispositionLevelOne"
                                    labelClass="font-semibold text-sm"
                                    label="Disposition Level 1"
                                    required
                                    value={values.dispositionLevelOne}
                                    onChange={(e) => {
                                        console.log(e)
                                        setFieldValue('dispositionLevelOne', e)
                                    }}
                                    size="xs"
                                    // className="-mt-0  shadow bg-white rounded"
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <ATMSelectSearchable
                                    options={
                                        dropdownOptions.dispositionTwoOptions ||
                                        []
                                    }
                                    name="dispositionLevelTwo"
                                    labelClass="font-semibold text-sm"
                                    label="Disposition Level 2"
                                    required
                                    value={values.dispositionLevelTwo}
                                    onChange={(e) => {
                                        setFieldValue('dispositionLevelTwo', e)
                                    }}
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
