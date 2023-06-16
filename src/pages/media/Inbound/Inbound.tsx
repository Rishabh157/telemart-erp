import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
import { useGetAllUnAuthDispositionThreeQuery } from 'src/services/configurations/DispositionThreeServices'
import { setAllItems } from 'src/redux/slices/configuration/dispositionThreeSlice'
import { useGetAllUnAuthdispositionTwoQuery } from 'src/services/configurations/DispositionTwoServices'
import { setItems as setDispositionTwoItems } from 'src/redux/slices/configuration/dispositionTwoSlice'
import { useGetAllPincodeUnauthQuery } from 'src/services/PinCodeService'
import { useInboundSchemeQuery } from 'src/services/SchemeService'
import { setTotalItems, setSearchValue } from 'src/redux/slices/schemeSlice'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'
import { useGetAllAreaUnauthQuery } from 'src/services/AreaService'
import { setItems as setAreaItems } from 'src/redux/slices/areaSlice'
import { AreaListResponse } from 'src/models/Area.model'
import { useNavigate } from 'react-router-dom'

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

const Inbound: React.FC<Props> = ({
    formikProps,
    apiStatus,
    dropdownOptions,
    schemeColumn,
    didItems,
    column,
    rows,
}) => {
    const { values, setFieldValue } = formikProps

    const [selectedRows, setSelectedRows] = useState([])

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const { allItems: allDispositionItems }: any = useSelector(
        (state: RootState) => state.dispositionThree
    )
    const { items: allArea }: any = useSelector(
        (state: RootState) => state.areas
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
        data: dispositionThreedata,
        isLoading: dispositionThreeIsLoading,
        isFetching: dispositionThreeIsFetching,
    } = useGetAllUnAuthDispositionThreeQuery(
        formikProps.values.dispositionLevelTwoId,
        { skip: !formikProps.values.dispositionLevelTwoId }
    )

    const {
        data: dispositionTwodata,
        isLoading: dispositionTwoIsLoading,
        isFetching: dispositionTwoIsFetching,
    } = useGetAllUnAuthdispositionTwoQuery('')

    const { items: dispositionTwoItems }: any = useSelector(
        (state: RootState) => state.dispositionTwo
    )

    useEffect(() => {
        if (!dispositionThreeIsLoading && !dispositionThreeIsFetching) {
            dispatch(setAllItems(dispositionThreedata?.data))
        }
    }, [
        dispositionThreedata,
        dispatch,
        dispositionThreeIsLoading,
        dispositionThreeIsFetching,
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
    useEffect(() => {
        if (didItems) {
            setFieldValue('personalInformation.channel', didItems?.channelLabel)
        }
    }, [didItems, setFieldValue])

    //area
    const {
        data: areaData,
        isLoading: areaIsLoading,
        isFetching: areaIsFetching,
    } = useGetAllAreaUnauthQuery(
        formikProps.values?.addressInformation?.pincodeId,
        { skip: !formikProps.values?.addressInformation?.pincodeId }
    )

    useEffect(() => {
        if (!areaIsFetching && !areaIsLoading) {
            dispatch(setAreaItems(areaData?.data))
        }
    }, [areaData, areaIsLoading, areaIsFetching, dispatch])

    dropdownOptions = {
        ...dropdownOptions,

        dispositionThreeOptions: allDispositionItems?.map((ele: any) => {
            return { label: ele?.dispositionName, value: ele?._id }
        }),
        dispositionTwoOptions: dispositionTwoItems?.map((ele: any) => {
            return { label: ele?.dispositionName, value: ele?._id }
        }),
        pincodeOptions: allPincodes?.map((ele: any) => {
            return { label: ele?.pincode, value: ele?._id }
        }),
        areaOptions: allArea?.map((ele: AreaListResponse) => {
            return { label: ele?.area, value: ele?._id }
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
            value: 'MALE',
        },
        {
            label: 'Female',
            value: 'FEMALE',
        },
        {
            label: 'Other',
            value: 'OTHER',
        },
    ]

    const RelationOption = [
        {
            label: 'Manager',
            value: 'male',
        },
        {
            label: 'Female',
            value: 'sales',
        },
    ]
    const OutBoundOptions = [
        {
            label: 'Manual',
            value: 'male',
        },
        {
            label: 'Automatic',
            value: 'sales',
        },
    ]

    return (
        <>
            <div className="container-fluid px-5 py-2 flex flex-col gap-4 mt-0">
                <div className="flex justify-between items-center h-[45px]">
                    <button
                        type="button"
                        onClick={() => navigate('/media/channel-group')}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        Go Back
                    </button>
                </div>
                <div className="h-fit w-full flex gap-5">
                    <div className="w-3/5 flex flex-col gap-x-4 gap-y-2 ">
                        <div className="pb-5">
                            <p className="bg-gray-50 p-2 rounded-md text-20 col-span-4 mb-2">
                                General information
                            </p>
                            <div className="flex gap-x-4 gap-y-2">
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMTextField
                                        name="generalInformation.didNo"
                                        labelClass="font-semibold text-sm "
                                        label="DID NO"
                                        size="xs"
                                        className="mt-1  shadow bg-white rounded"
                                        onChange={(e) => {
                                            setFieldValue(
                                                'generalInformation.didNo',
                                                e.target.value
                                            )
                                        }}
                                        value={values.generalInformation.didNo}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full  -mt-6">
                                    <ATMSelectSearchable
                                        name="generalInformation.inOutBound"
                                        labelClass="font-semibold text-sm"
                                        label="IN /OutBound"
                                        size="xs"
                                        options={OutBoundOptions || []}
                                        // className="mt-1  shadow bg-white rounded"
                                        onChange={(e) => {
                                            setFieldValue(
                                                'generalInformation.inOutBound',
                                                e
                                            )
                                        }}
                                        value={
                                            values.generalInformation.inOutBound
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full  -mt-3">
                                    <ATMTextField
                                        name="generalInformation.incomingCallerNo"
                                        labelClass="font-semibold text-xs"
                                        label="In Comming Caller No"
                                        size="xs"
                                        className="mt-1  shadow bg-white rounded"
                                        onChange={(e) => {
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
                                        className="mt-1  shadow bg-white rounded"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* //Search by schema */}
                        <div className="bg-blue-50 rounded-xl px-3 py-1 ">
                            <div className=" gap-2 grid grid-cols-4 ">
                                <div className="flex flex-col gap-2 col-span-1 -mt-4 mr-4 mb-0 pb-0">
                                    <ATMTextField
                                        name="schemeId"
                                        labelClass="font-semibold text-sm"
                                        label="Search By Scheme"
                                        onChange={(e) => {
                                            dispatch(
                                                setSearchValue(e.target.value)
                                            )
                                        }}
                                        value={searchValue}
                                        size="xs"
                                        className="mt-1  shadow bg-white rounded"
                                    />
                                </div>

                                <div className=" w-full col-span-3 mb-0 pb-0">
                                    <div className="flex items-center">
                                        <div className="flex-[2_2_0%] px-4  items-center text-start">
                                            Scheme Name
                                        </div>
                                        <div className="flex-[0.3_0.3_0%] px-5  items-center  text-start">
                                            Price
                                        </div>
                                    </div>
                                    <div className="overflow-scroll h-[14vh]  ">
                                        <ATMTable
                                            rowClassName="px-2 hover:bg-blue-100 text-light "
                                            headerClassName="p-0 m-0 bg-white rounded  "
                                            onRowClick={(row) => {
                                                setFieldValue(
                                                    'schemeId',
                                                    row._id
                                                )
                                            }}
                                            rowExtraClasses={(row) => {
                                                return row?._id ===
                                                    values?.schemeId
                                                    ? 'bg-green-200'
                                                    : 'bg-white'
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
                                </div>
                                <div className="col-span-3"></div>
                            </div>
                        </div>

                        <Divider />

                        {/* //Delivery information */}
                        <div className="bg-gray-50 p-2 rounded-md text-20 col-span-4 mb-2">
                            <p className="bg-gray-50 p-2 rounded-md text-20 col-span-4 mb-2">
                                Address information
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
                                        className="mt-1  shadow bg-white rounded"
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
                                        className="mt-1  shadow bg-white rounded"
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
                                        className="mt-1  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full -mt-5">
                                    <ATMSelectSearchable
                                        selectClass="mt-1"
                                        options={dropdownOptions.counrtyOptions}
                                        name="addressInformation.countryId"
                                        labelClass="font-semibold text-sm"
                                        label="Country"
                                        required
                                        value={
                                            values.addressInformation
                                                .countryId as string
                                        }
                                        onChange={(e) => {
                                            setFieldValue(
                                                'addressInformation.countryId',
                                                e
                                            )
                                        }}
                                        size="xs"
                                        // className="mt-1  shadow bg-white rounded"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMSelectSearchable
                                        selectClass="mt-1"
                                        options={
                                            dropdownOptions.stateOptions || []
                                        }
                                        name="addressInformation.stateId"
                                        labelClass="font-semibold text-sm"
                                        label="State"
                                        required
                                        value={
                                            values.addressInformation
                                                .stateId as string
                                        }
                                        onChange={(e) => {
                                            setFieldValue(
                                                'addressInformation.stateId',
                                                e
                                            )
                                        }}
                                        size="xs"
                                        // className="mt-1  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMSelectSearchable
                                        selectClass="mt-1"
                                        options={
                                            dropdownOptions.districtOptions ||
                                            []
                                        }
                                        name="addressInformation.districtId"
                                        labelClass="font-semibold text-sm"
                                        label="District"
                                        required
                                        value={
                                            values.addressInformation
                                                .districtId as string
                                        }
                                        onChange={(e) => {
                                            setFieldValue(
                                                'addressInformation.districtId',
                                                e
                                            )
                                        }}
                                        size="xs"
                                        // className="mt-1  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMSelectSearchable
                                        selectClass="mt-1"
                                        options={
                                            dropdownOptions.tehsilOptions || []
                                        }
                                        name="addressInformation.tehsilId"
                                        labelClass="font-semibold text-sm"
                                        label="Tehsil"
                                        required
                                        value={
                                            values.addressInformation
                                                .tehsilId as string
                                        }
                                        onChange={(e) => {
                                            setFieldValue(
                                                'addressInformation.tehsilId',
                                                e
                                            )
                                        }}
                                        size="xs"
                                        // className="mt-1  shadow bg-white rounded"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full  -mt-4">
                                    <ATMSelectSearchable
                                        selectClass="mt-1"
                                        options={
                                            dropdownOptions.pincodeOptions || []
                                        }
                                        name="addressInformation.pincodeId"
                                        labelClass="font-semibold text-sm"
                                        label="Pincode"
                                        required
                                        value={
                                            values.addressInformation
                                                .pincodeId as string
                                        }
                                        onChange={(newValue: string) => {
                                            handleClick(newValue)
                                        }}
                                        size="xs"
                                        // className="mt-1  shadow bg-white rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-4 gap-4 col-span-4">
                                    <div className="flex flex-col gap-1 w-full  -mt-4">
                                        <ATMSelectSearchable
                                            selectClass="mt-1"
                                            options={
                                                dropdownOptions.areaOptions ||
                                                []
                                            }
                                            name="addressInformation.areaId"
                                            labelClass="font-semibold text-sm"
                                            label="Area"
                                            required
                                            value={
                                                values.addressInformation
                                                    .areaId as string
                                            }
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'addressInformation.areaId',
                                                    e
                                                )
                                            }}
                                            size="xs"
                                            // className="mt-1  shadow bg-white rounded"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1 w-full mt-2">
                                        <p className="font-semibold text-sm">
                                            Expected Delivery Date
                                        </p>
                                        <p className=" font-normal">20/05/23</p>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full mt-2">
                                        <p className="font-semibold text-sm">
                                            Profile Delivered by
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
                            Personal information
                        </p>

                        <div className="grid grid-cols-3 gap-4 ">
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
                                    className="mt-1  shadow bg-white rounded"
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
                                    className="mt-1  shadow bg-white rounded"
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
                                    className="mt-1  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4 col-span-3">
                                <ATMTextArea
                                    minRows={2}
                                    name="personalInformation.address"
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
                                    selectClass="mt-1"
                                    options={RelationOption}
                                    name="personalInformation.relation"
                                    labelClass="font-semibold text-sm"
                                    label="Relation"
                                    required
                                    value={values.personalInformation.relation}
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.relation',
                                            e
                                        )
                                    }}
                                    size="xs"
                                    // className="mt-1  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMSelectSearchable
                                    selectClass="mt-1"
                                    options={
                                        dropdownOptions.districtOptions || []
                                    }
                                    name="personalInformation.agentDistrictId"
                                    labelClass="font-semibold text-sm"
                                    label="District"
                                    required
                                    value={
                                        values.personalInformation
                                            .agentDistrictId as string
                                    }
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.agentDistrictId',
                                            e
                                        )
                                    }}
                                    size="xs"
                                    // className="mt-1  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-3">
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
                                    className="mt-1  shadow bg-white rounded"
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
                                    className="mt-1  shadow bg-white rounded"
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
                                    className="mt-1  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full -mt-4">
                                <ATMRadioButton
                                    name="personalInformation.gender"
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
                                    className="mt-0"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="personalInformation.channel"
                                    labelClass="font-semibold text-sm"
                                    label="Channel"
                                    disabled={true}
                                    value={values.personalInformation.channel}
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.channel',
                                            e.target.value
                                        )
                                    }}
                                    size="xs"
                                    className="mt-1  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4">
                                <ATMTextField
                                    name="personalInformation.emailId"
                                    labelClass="font-semibold text-sm"
                                    label="Email"
                                    onChange={(e) => {
                                        setFieldValue(
                                            'personalInformation.emailId',
                                            e.target.value
                                        )
                                    }}
                                    value={
                                        values.personalInformation
                                            .emailId as string
                                    }
                                    size="xs"
                                    className="mt-1  shadow bg-white rounded"
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

                                    // size="xs"
                                    // className="mt-1  shadow bg-white rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full  -mt-4 col-span-3">
                                <ATMTextArea
                                    name="personalInformation.remark"
                                    minRows={2}
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
                                    selectClass="mt-1"
                                    options={
                                        dropdownOptions.dispositionTwoOptions ||
                                        []
                                    }
                                    name="dispositionLevelTwoId"
                                    labelClass="font-semibold text-sm"
                                    label="Disposition Level 1"
                                    required
                                    value={
                                        values.dispositionLevelTwoId as string
                                    }
                                    onChange={(e) => {
                                        setFieldValue(
                                            'dispositionLevelTwoId',
                                            e
                                        )
                                    }}
                                    size="xs"
                                    // className="mt-1  shadow bg-white rounded"
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <ATMSelectSearchable
                                    selectClass="mt-1"
                                    options={
                                        dropdownOptions.dispositionThreeOptions ||
                                        []
                                    }
                                    name="dispositionLevelThreeId"
                                    labelClass="font-semibold text-sm"
                                    label="Disposition Level 2"
                                    required
                                    value={
                                        values.dispositionLevelThreeId as string
                                    }
                                    onChange={(e) => {
                                        setFieldValue(
                                            'dispositionLevelThreeId',
                                            e
                                        )
                                    }}
                                    size="xs"
                                    // className="mt-1  shadow bg-white rounded"
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
                <div className="w-full h-36 overflow-auto">
                    <ATMTable
                        columns={column}
                        rows={rows}
                        isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        extraClasses="h-36 overflow-auto"
                    />
                </div>
            </div>
        </>
    )
}

export default Inbound
