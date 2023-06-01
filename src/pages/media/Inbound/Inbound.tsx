import { Divider } from '@mui/material'
import React, { useEffect } from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMRadioButton from 'src/components/UI/atoms/formFields/ATMRadioButton/ATMRadioButton'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import { FormikProps } from 'formik'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from './InboundWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { setAllPincodes } from 'src/redux/slices/pincodeSlice'
import { useGetAlldispositionOneunauthQuery } from 'src/services/configurations/DispositiononeServices'
import { setAllItems } from 'src/redux/slices/configuration/dispositionOneSlice'
import { useGetAlldispositionTwounauthQuery } from 'src/services/configurations/DispositionTwoServices'
import { setItems as setDispositionTwoItems } from 'src/redux/slices/configuration/dispositionTwoSlice'
// import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { useGetAllPincodeUnauthQuery } from 'src/services/PinCodeService'
// import { GRNListResponse } from 'src/models'
import { useInboundSchemeQuery } from 'src/services/SchemeService'
import { setTotalItems, setSearchValue } from 'src/redux/slices/schemeSlice'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'
// import { SchemeListResponse } from 'src/models/scheme.model'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    schemeColumn: columnTypes[] | []
    dropdownOptions: {
        counrtyOptions: SelectOption[]
        stateOptions?: SelectOption[] | []
        districtOptions?: SelectOption[] | []
        pincodeOptions?: SelectOption[] | []
        dispositionOneOptions?: SelectOption[] | []
        dispositionTwoOptions?: SelectOption[] | []
        tehsilOptions?: SelectOption[] | []
        areaOptions?: SelectOption[] | []
        channelOptions?: SelectOption[] | []
    }
}

const Inbound: React.FC<Props> = ({
    formikProps,
    apiStatus,
    dropdownOptions,
    schemeColumn,
}) => {
    const { values, setFieldValue } = formikProps

    const dispatch = useDispatch<AppDispatch>()

    const { allItems: allDispositionItems }: any = useSelector(
        (state: RootState) => state.dispositionOne
    )

    const { allPincodes }: any = useSelector(
        (state: RootState) => state.pincode
    )
    const { searchValue, totalItems: schemeitems }: any = useSelector(
        (state: RootState) => state.scheme
    )
    const {
        data: PCdata,
        isFetching: PCisFetching,
        isLoading: PCisLoading,
    } = useGetAllPincodeUnauthQuery('')

    useEffect(() => {
        if (!PCisLoading && !PCisFetching) {
            dispatch(setAllPincodes(PCdata?.data))
        }
    }, [PCdata, dispatch, PCisLoading, PCisFetching])
    const {
        data: schemeData,
        isFetching: schemeisFetching,
        isLoading: schemeisLoading,
    } = useInboundSchemeQuery({
        limit: 10,
        searchValue: searchValue,
        params: ['schemeName', 'schemeCode', 'schemePrice'],
        page: 1,
        filterBy: [
            {
                fieldName: '',
                value: [],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: false,
    })

    useEffect(() => {
        if (!schemeisLoading && !schemeisFetching) {
            dispatch(setTotalItems(schemeData?.data))
        }
    }, [schemeData, dispatch, schemeisLoading, schemeisFetching])

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
        formikProps.values.dispositionLevelTwoId,
        { skip: !formikProps.values.dispositionLevelTwoId }
    )

    const { items: dispositionTwoItems }: any = useSelector(
        (state: RootState) => state.dispositionTwo
    )

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

        dispositionOneOptions: allDispositionItems?.map((ele: any) => {
            return { label: ele?.dispositionName, value: ele?._id }
        }),
        dispositionTwoOptions: dispositionTwoItems?.map((ele: any) => {
            return { label: ele?.dispositionName, value: ele?._id }
        }),
        pincodeOptions: allPincodes?.map((ele: any) => {
            return { label: ele?.pincode, value: ele?._id }
        }),
    }

    function handleClick(newValue: string) {
        var newarray = allPincodes?.find((ele: any) => {
            return ele._id === newValue
        })
        setFieldValue('addressInformation.pincodeId', newarray?._id)
        setFieldValue('addressInformation.tehsilId', newarray?.tehsilId)
        setFieldValue('addressInformation.districtId', newarray?.districtId)
        setFieldValue('addressInformation.stateId', newarray?.stateId)
        setFieldValue('addressInformation.countryId', newarray?.countryId)
    }

    const genderOption = [
        {
            label: 'Male',
            value: 'male',
        },
        {
            label: 'Female',
            value: 'female',
        },
    ]

    const RelationOption = [
        {
            label: 'Male',
            value: 'male',
        },
        {
            label: 'Female',
            value: 'female',
        },
    ]

    return (
        <>
            <div className="container-fluid px-5 py-2 flex flex-col gap-4 mt-0">
                <div className="h-fit w-full flex gap-5">
                    <div className="w-3/5 flex flex-col gap-4 ">
                        <div className="pb-5">
                            <p className="bg-gray-50 p-2 rounded-md text-20 col-span-4 mb-2">
                                Gerneral informtion
                            </p>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name="generalInformation.didNo"
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
                                        name="generalInformation.inOutBound"
                                        labelClass="font-semibold text-sm"
                                        label="IN /OutBound"
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                        onChange={(e) => {
                                            setFieldValue(
                                                'generalInformation.inOutBound',
                                                e.target.value
                                            )
                                        }}
                                        value={
                                            values.generalInformation.inOutBound
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name="generalInformation.incomingCallerNo"
                                        labelClass="font-semibold text-xs"
                                        label="In Comming Caller No"
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                        onChange={(e) => {
                                            console.log(e)
                                            setFieldValue(
                                                'generalInformation.incomingCallerNo',
                                                e.target.value
                                            )
                                        }}
                                        value={
                                            values.generalInformation
                                                .incomingCallerNo
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name="generalInformation.mobileNo"
                                        labelClass="font-semibold text-sm"
                                        label="Mobile No"
                                        onChange={(e) => {
                                            setFieldValue(
                                                'generalInformation.mobileNo',
                                                e.target.value
                                            )
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
                        <div className="bg-blue-50 rounded-xl px-3 py-1 ">
                            <div className=" gap-2 grid grid-cols-4 ">
                                <div className="flex flex-col gap-2 col-span-1 -mt-4  mb-0 pb-0">
                                    <ATMTextField
                                        name="schemeId"
                                        labelClass="font-semibold text-sm"
                                        label="Search By Scheme"
                                        onChange={(e) => {
                                            console.log(e.target.value)
                                            dispatch(
                                                setSearchValue(e.target.value)
                                            )
                                        }}
                                        value={searchValue}
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>
                                <div className="overflow-scroll w-full col-span-3  h-[14vh]  mb-0 pb-0">
                                    <ATMTable
                                        rowClassName="px-2 bg-red-100 hover:bg-blue-100 text-light "
                                        headerClassName="p-0 m-0 bg-white rounded "
                                        onRowClick={(row) => {
                                            setFieldValue('schemeId', row._id)
                                        }}
                                        rowExtraClasses={(row) => {
                                            return row?._id === values?.schemeId
                                                ? 'bg-green-200'
                                                : ''
                                        }}
                                        noDataFoundText={
                                            'No Matching Scheme Found Please Search Again'
                                        }
                                        noDataFoundClass={'text-red-400'}
                                        columns={schemeColumn || []}
                                        rows={schemeitems || []}
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
                                        name="addressInformation.deliveryCharges"
                                        labelClass="font-semibold text-sm"
                                        label="Delivery charges"
                                        onChange={(e) => {
                                            setFieldValue(
                                                'addressInformation.deliveryCharges',
                                                e.target.value
                                            )
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
                                        name="addressInformation.discount"
                                        labelClass="font-semibold text-sm"
                                        label="Discount"
                                        onChange={(e) => {
                                            setFieldValue(
                                                'addressInformation.discount',
                                                e.target.value
                                            )
                                        }}
                                        value={
                                            values.addressInformation.discount
                                        }
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name="addressInformation.total"
                                        labelClass="font-semibold text-sm"
                                        label="Total"
                                        onChange={(e) => {
                                            setFieldValue(
                                                'addressInformation.total',
                                                e.target.value
                                            )
                                        }}
                                        value={values.addressInformation.total}
                                        size="xs"
                                        className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full -mt-4">
                                    <ATMSelectSearchable
                                        options={dropdownOptions.counrtyOptions}
                                        name="addressInformation.countryId"
                                        labelClass="font-semibold text-sm"
                                        label="Country"
                                        required
                                        value={
                                            values.addressInformation.countryId
                                        }
                                        onChange={(e) => {
                                            setFieldValue(
                                                'addressInformation.countryId',
                                                e
                                            )
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
                                        name="addressInformation.stateId"
                                        labelClass="font-semibold text-sm"
                                        label="State"
                                        required
                                        value={
                                            values.addressInformation.stateId
                                        }
                                        onChange={(e) => {
                                            setFieldValue(
                                                'addressInformation.stateId',
                                                e
                                            )
                                        }}
                                        size="xs"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMSelectSearchable
                                        options={
                                            dropdownOptions.districtOptions ||
                                            []
                                        }
                                        name="addressInformation.districtId"
                                        labelClass="font-semibold text-sm"
                                        label="District"
                                        required
                                        value={
                                            values.addressInformation.districtId
                                        }
                                        onChange={(e) => {
                                            setFieldValue(
                                                'addressInformation.districtId',
                                                e
                                            )
                                        }}
                                        size="xs"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMSelectSearchable
                                        options={
                                            dropdownOptions.tehsilOptions || []
                                        }
                                        name="addressInformation.tehsilId"
                                        labelClass="font-semibold text-sm"
                                        label="Tehsil"
                                        required
                                        value={
                                            values.addressInformation.tehsilId
                                        }
                                        onChange={(e) => {
                                            setFieldValue(
                                                'addressInformation.tehsilId',
                                                e
                                            )
                                        }}
                                        size="xs"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMSelectSearchable
                                        options={
                                            dropdownOptions.pincodeOptions || []
                                        }
                                        name="addressInformation.pincodeId"
                                        labelClass="font-semibold text-sm"
                                        label="Pincode"
                                        required
                                        value={
                                            values.addressInformation.pincodeId
                                        }
                                        onChange={(newValue: string) => {
                                            handleClick(newValue)
                                        }}
                                        size="xs"
                                        // className="-mt-0  shadow bg-white rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4 col-span-4">
                                    <div className="flex flex-col gap-1 w-full  -mt-4">
                                        <ATMSelectSearchable
                                            options={
                                                dropdownOptions.areaOptions ||
                                                []
                                            }
                                            name=""
                                            labelClass="font-semibold text-sm"
                                            label="areaId"
                                            required
                                            value={
                                                values.addressInformation.areaId
                                            }
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'addressInformation.areaId',
                                                    e
                                                )
                                            }}
                                            size="xs"
                                            // className="-mt-0  shadow bg-white rounded"
                                        />
                                    </div>

                                    {/* <div className="flex flex-col gap-1 w-full ">
                                        <ATMDatePicker
                                            name="addressInformation.expectedDeliveryDate"
                                            value={
                                                values.addressInformation
                                                    .expectedDeliveryDate
                                            }
                                            label="ExpectedDelivery Date"
                                            labelClass="font-semibold text-sm"
                                            dateTimeFormat="MM/DD/YY ddd"
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'addressInformation.expectedDeliveryDate',
                                                    e
                                                )
                                            }}
                                            size="xs"
                                        />
                                    </div> */}

                                    {/* <div className="flex flex-col gap-1 w-full  -mt-4">
                                        <ATMTextField
                                            name="profileDeliveredBy"
                                            labelClass="font-semibold text-sm"
                                            label="Profile delivered by"
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'profileDeliveredBy',
                                                    e
                                                )
                                            }}
                                            value={
                                                values.addressInformation
                                                    .profileDeliveredBy
                                            }
                                            size="xs"
                                            className="-mt-0  shadow bg-white rounded"
                                        />
                                    </div> */}
                                    <div className="flex flex-col gap-1 w-full mt-2">
                                        <p className="font-semibold text-sm">
                                            ExpectedDelivery Date
                                        </p>
                                        <p className=" font-normal">20/05/23</p>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full mt-2">
                                        <p className="font-semibold text-sm">
                                            Profile delivered by
                                        </p>
                                        <p className=" font-normal">Mayank</p>
                                    </div>

                                    <div className="flex flex-col gap-1 w-full mt-2">
                                        <p className="font-semibold text-sm">
                                            Complaint details
                                        </p>
                                        <p className="text-red-500 font-normal">
                                            NO
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full mt-2 ">
                                        <p className="font-semibold text-sm">
                                            Complaint No.
                                        </p>
                                        <p className="text-red font-normal">
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

                        <div className="grid grid-cols-3 gap-4 gap-b-5">
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="personalInformation.agentName"
                                    labelClass="font-semibold text-sm"
                                    label="Agent Name"
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.agentName',
                                            e.target.value
                                        )
                                    }}
                                    value={values.personalInformation.agentName}
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="personalInformation.name"
                                    labelClass="font-semibold text-sm"
                                    label="Name"
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.name',
                                            e.target.value
                                        )
                                    }}
                                    value={values.personalInformation.name}
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="personalInformation.age"
                                    labelClass="font-semibold text-sm"
                                    label="Age"
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.age',
                                            e.target.value
                                        )
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
                                        setFieldValue(
                                            'personalInformation.address',
                                            e
                                        )
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMSelectSearchable
                                    options={RelationOption}
                                    name=""
                                    labelClass="font-semibold text-sm"
                                    label="Relation"
                                    required
                                    value=""
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.relation',
                                            e
                                        )
                                    }}
                                    size="xs"
                                    // className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMSelectSearchable
                                    options={
                                        dropdownOptions.districtOptions || []
                                    }
                                    name="personalInformation.agentDistrictId"
                                    labelClass="font-semibold text-sm"
                                    label="District"
                                    required
                                    value={
                                        values.personalInformation
                                            .agentDistrictId
                                    }
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.agentDistrictId',
                                            e
                                        )
                                    }}
                                    size="xs"
                                    // className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="personalInformation.landmark"
                                    labelClass="font-semibold text-sm"
                                    label="Landmark"
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.landmark',
                                            e.target.value
                                        )
                                    }}
                                    value={values.personalInformation.landmark}
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="alternateNo"
                                    labelClass="font-semibold text-sm"
                                    label="Alternate No.1"
                                    onChange={(e) => {
                                        setFieldValue(
                                            'alternateNo',
                                            e.target.value
                                        )
                                    }}
                                    value={values.alternateNo}
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="personalInformation.whatsappNo"
                                    labelClass="font-semibold text-sm"
                                    label="Whatsapp No.1"
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.whatsappNo',
                                            e.target.value
                                        )
                                    }}
                                    value={
                                        values.personalInformation.whatsappNo
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
                                    options={genderOption}
                                    value={values.personalInformation.gender}
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.gender',
                                            e
                                        )
                                    }}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="personalInformation.channelId"
                                    labelClass="font-semibold text-sm"
                                    label="Channel"
                                    disabled
                                    value={values.personalInformation.channelId}
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.channelId',
                                            e
                                        )
                                    }}
                                    size="xs"
                                    // className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="personalInformation.email"
                                    labelClass="font-semibold text-sm"
                                    label="Email"
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.email',
                                            e.target.value
                                        )
                                    }}
                                    value={values.personalInformation.email}
                                    size="xs"
                                    className="-mt-0  shadow bg-white rounded"
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-full  justify-start text-center items-start ">
                                <ATMCheckbox
                                    name="personalInformation.prepaid"
                                    // labelClass="font-semibold text-sm"
                                    label="Prepaid"
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.prepaid',
                                            e
                                        )
                                    }}
                                    checked={
                                        values.personalInformation
                                            .prepaid as boolean
                                    }
                                    value={
                                        values.personalInformation
                                            .prepaid as string
                                    }
                                    // size="xs"
                                    // className="-mt-0  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4 col-span-3">
                                <ATMTextArea
                                    name="personalInformation.remark"
                                    minRows={1}
                                    labelClass="font-bold text-sm"
                                    value={values.personalInformation.remark}
                                    label="Remarks"
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.remark',
                                            e
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Divider />

                <div>
                    <div className=" gap-4 grid-cols-5 grid px-4 -mt-4">
                        <div className="col-span-3 w-full flex gap-4 pb-3">
                            <div className="flex flex-col gap-1  w-full  ">
                                <ATMSelectSearchable
                                    options={
                                        dropdownOptions.dispositionOneOptions ||
                                        []
                                    }
                                    name="dispositionLevelTwoId"
                                    labelClass="font-semibold text-sm"
                                    label="Disposition Level 1"
                                    required
                                    value={values.dispositionLevelTwoId}
                                    onChange={(e) => {
                                        console.log(e)
                                        setFieldValue(
                                            'dispositionLevelTwoId',
                                            e
                                        )
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
                                    name="dispositionLevelThreeId"
                                    labelClass="font-semibold text-sm"
                                    label="Disposition Level 2"
                                    required
                                    value={values.dispositionLevelThreeId}
                                    onChange={(e) => {
                                        setFieldValue(
                                            'dispositionLevelThreeId',
                                            e
                                        )
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

                            <div className=" px-4 py-1 flex      justify-center rounded-md items-center  ">
                                <button
                                    type="button"
                                    disabled={apiStatus}
                                    onClick={() => formikProps.handleSubmit()}
                                    className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main  ${
                                        apiStatus ? 'opacity-50' : ''
                                    }`}
                                >
                                    save
                                </button>
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
