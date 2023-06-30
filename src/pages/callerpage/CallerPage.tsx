import React, { useState, useEffect } from 'react'
import { TbBrandNetflix } from 'react-icons/tb'
import CallerButton from './components/CallerButton'
import Navbar from './components/Navbar'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMRadioButton from 'src/components/UI/atoms/formFields/ATMRadioButton/ATMRadioButton'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { FormInitialValues } from './CallerPageWrapper'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { setAllItems } from 'src/redux/slices/configuration/dispositionThreeSlice'
import { useGetAllUnAuthdispositionTwoQuery } from 'src/services/configurations/DispositionTwoServices'
import { setItems as setDispositionTwoItems } from 'src/redux/slices/configuration/dispositionTwoSlice'
import { useGetAllPincodeUnauthQuery } from 'src/services/PinCodeService'
import {
    useInboundSchemeQuery,
    useGetSchemeByIdQuery,
} from 'src/services/SchemeService'
import { setAllPincodes } from 'src/redux/slices/pincodeSlice'
import { setTotalItems } from 'src/redux/slices/schemeSlice'
import { useGetAllAreaUnauthQuery } from 'src/services/AreaService'
import { setItems as setAreaItems } from 'src/redux/slices/areaSlice'
import { AreaListResponse } from 'src/models/Area.model'
import { useGetAllUnAuthDispositionThreeQuery } from 'src/services/configurations/DispositionThreeServices'
// import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
// import ATMOtpInput from 'src/components/UI/atoms/ATMOtpInput/ATMOtpInput'
// import { useNavigate } from 'react-router-dom'
// import { showToast } from 'src/utils'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    column: any[]
    rows: any[]
    apiStatus?: boolean
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

interface SchemeDetailsPropTypes {
    schemeName: string
    price: number
    quantity: number
    deliveryCharges: number
    totalAmount: number
}

// Static Option For Gander Radio Box , Payment Mode Option & Medical issue
const genderOption: SelectOption[] = [
    {
        label: 'Male',
        value: 'MALE',
    },
    {
        label: 'Female',
        value: 'FEMALE',
    },
]

const paymentModeOptions: SelectOption[] = [
    {
        label: 'COD',
        value: 'COD',
    },
    {
        label: 'Online (UPI only)',
        value: 'UPI/ONLINE',
    },
]

const medicalOptions: SelectOption[] = [
    {
        label: 'diabetes',
        value: 'diabetes',
    },
    {
        label: 'cancer',
        value: 'cancer',
    },
    {
        label: 'joint pain',
        value: 'jointPain',
    },
]

const CallerPage: React.FC<Props> = ({
    formikProps,
    apiStatus,
    dropdownOptions,
    schemeColumn,
    didItems,
    column,
    rows,
}) => {
    const [isFacebookId, setFacebookId] = useState(false)
    const [isInstagramId, setInstagramId] = useState(false)
    const [schemeDetails, setSchemeDetails] = useState<SchemeDetailsPropTypes>({
        schemeName: '',
        price: 0,
        quantity: 1,
        deliveryCharges: 0,
        totalAmount: 0,
    })

    const [firstSchemesOptionsList, setFirstSchemesOptionsList] = useState<
        SelectOption[] | []
    >([])

    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate()

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

    // get all Scheme
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

    // get single scheme by id
    const {
        data: singleSchemeData,
        isFetching: isSingleSchemeFetching,
        isLoading: isSingleSchemeLoading,
    } = useGetSchemeByIdQuery(values.productGroupId, {
        skip: !formikProps.values.productGroupId,
    })

    useEffect(() => {
        if (!isSingleSchemeLoading && !isSingleSchemeFetching) {
            setSchemeDetails((prevSchemeDetails) => ({
                ...prevSchemeDetails,
                schemeName: singleSchemeData?.data?.schemeName || '',
                price: singleSchemeData?.data?.schemePrice || 0,
                quantity: 1,
                deliveryCharges: singleSchemeData?.data?.deliveryCharges || 0,
                totalAmount:
                    singleSchemeData?.data?.schemePrice +
                        singleSchemeData?.data?.deliveryCharges || 0,
            }))
        }
    }, [
        singleSchemeData,
        isSingleSchemeLoading,
        isSingleSchemeFetching,
        values.productGroupId,
    ])

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

    //area
    const {
        data: areaData,
        isLoading: areaIsLoading,
        isFetching: areaIsFetching,
    } = useGetAllAreaUnauthQuery(formikProps.values?.pincodeId, {
        skip: !formikProps.values?.pincodeId,
    })

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

    function handlePinCode(newValue: string) {
        var newarray = allPincodes?.find((ele: any) => {
            return ele._id === newValue
        })
        setFieldValue('pincodeId', newarray?._id)
        setFieldValue('tehsilId', newarray?.tehsilId)
        setFieldValue('districtId', newarray?.districtId)
        setFieldValue('stateId', newarray?.stateId)
        setFieldValue('countryId', newarray?.countryId)
    }

    useEffect(() => {
        if (Array.isArray(schemeitems)) {
            const schemeOptionRename = schemeitems?.map((ele) => {
                return {
                    label: ele?.schemeName,
                    value: ele?._id,
                }
            })
            setFirstSchemesOptionsList(schemeOptionRename)
        } else {
            setFirstSchemesOptionsList([])
        }
    }, [schemeitems])

    useEffect(() => {
        setFieldValue('totalAmount', schemeDetails.totalAmount)
        setFieldValue('shcemeQuantity', schemeDetails.quantity)
        setFieldValue('schemeName', schemeDetails.schemeName)
        setFieldValue('price', schemeDetails.price)
        setFieldValue('deliveryCharges', schemeDetails.deliveryCharges)

        // eslint-disable-next-line
    }, [schemeDetails])

    const handleQuantity = (type: string) => {
        switch (type) {
            case '+':
                setSchemeDetails((prevSchemeDetails) => ({
                    ...prevSchemeDetails,
                    quantity: prevSchemeDetails.quantity + 1,
                    totalAmount:
                        (prevSchemeDetails.quantity + 1) *
                            prevSchemeDetails.price +
                        prevSchemeDetails.deliveryCharges,
                }))
                break
            case '-':
                setSchemeDetails((prevSchemeDetails) => ({
                    ...prevSchemeDetails,
                    quantity: prevSchemeDetails.quantity - 1,
                    totalAmount:
                        (prevSchemeDetails.quantity - 1) *
                            prevSchemeDetails.price +
                        prevSchemeDetails.deliveryCharges,
                }))
                break
        }
    }

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

            <div className="grid grid-cols-12 mt-1 px-2">
                <div className="col-span-1 items-center mt-2 text-sm font-semibold">
                    Search By Scheme
                </div>
                <div className="col-span-5 px-2">
                    <div className="mr-2 -mt-4">
                        <ATMSelectSearchable
                            size="xs"
                            name="productGroupId"
                            value={values.productGroupId || ''}
                            // isSubmitting
                            options={firstSchemesOptionsList || []}
                            onChange={(e) => {
                                setFieldValue('schemeId', e)
                                setFieldValue('productGroupId', e)
                                setSchemeDetails((prevSchemeDetails) => ({
                                    ...prevSchemeDetails,
                                    quantity: 1,
                                }))
                            }}
                        />
                    </div>
                </div>
                <div className="col-span-5 px-2 hidden">
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

            {values.schemeId ? (
                <React.Fragment>
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
                                        {schemeDetails?.schemeName}
                                    </h2>
                                </div>
                                <div className="col-span-2">
                                    <h2 className="text-[15px] font-bold text-white">
                                        {schemeDetails?.price}.00
                                    </h2>
                                </div>
                                <div className="col-span-2">
                                    <h2 className="relative flex items-center justify-start text-[15px] font-bold text-white">
                                        <button
                                            disabled={
                                                schemeDetails.quantity > 1
                                                    ? false
                                                    : true
                                            }
                                            className={`w-[28px] h-[28px] bg-[#f9f9f9] border-[#c2c2c2] border-[1px] rounded-full mr-4 text-[18px]  ${
                                                schemeDetails.quantity > 1
                                                    ? 'text-[black]'
                                                    : 'text-[#c2c2c2]'
                                            }`}
                                            onClick={() => handleQuantity('-')}
                                        >
                                            -
                                        </button>
                                        <span className="absolute left-10">
                                            {schemeDetails.quantity}
                                        </span>
                                        <button
                                            className="w-[28px] h-[28px] bg-[#f9f9f9] border-[#c2c2c2] border-[1px] rounded-full ml-4 text-[18px] text-black "
                                            onClick={() => handleQuantity('+')}
                                        >
                                            +
                                        </button>
                                    </h2>
                                </div>
                                <div className="col-span-2">
                                    <h2 className="text-[15px] font-bold text-white">
                                        {schemeDetails?.deliveryCharges}.00
                                    </h2>
                                </div>
                                <div className="col-span-2">
                                    <h2 className="text-[15px] font-bold text-white">
                                        {schemeDetails?.totalAmount}.00
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            ) : null}

            <div className="bg-[#87527C] p-2 mt-1">
                <h2 className="text-[15px] font-bold text-white">
                    DELEVERY ADDRESS
                </h2>
            </div>

            {/* Delivery Address Section */}
            <div className="grid grid-cols-12 border-[1px] mt-1 border-grey-700   ">
                <div className="col-span-4 py-2  gap-x-4 border-r-[1px] px-6 border-grey-800">
                    <ATMSelectSearchable
                        componentClass="mt-2"
                        label="Pincode"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name="pincodeId"
                        value={values.pincodeId || ''}
                        options={dropdownOptions.pincodeOptions || []}
                        onChange={(e) => {
                            handlePinCode(e)
                        }}
                    />

                    <ATMSelectSearchable
                        componentClass="mt-2"
                        label="State"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        name="stateId"
                        value={values.stateId || ''}
                        // isSubmitting
                        options={dropdownOptions.stateOptions || []}
                        onChange={(e) => {
                            setFieldValue('stateId', e)
                        }}
                    />
                    <ATMSelectSearchable
                        componentClass="mt-2"
                        label="City/Village"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name=""
                        value={''}
                        options={[]}
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
                        name="areaId"
                        value={values.areaId || ''}
                        options={dropdownOptions.areaOptions || []}
                        onChange={(e) => {
                            setFieldValue('areaId', e)
                        }}
                    />
                    <ATMSelectSearchable
                        componentClass="mt-2"
                        label="District"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name="districtId"
                        value={values.districtId || ''}
                        options={dropdownOptions.districtOptions || []}
                        onChange={(e) => {
                            setFieldValue('districtId', e)
                        }}
                    />{' '}
                    <ATMSelectSearchable
                        componentClass="mt-2"
                        label="Tehsil/Taluka"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name="tehsilId"
                        value={values.tehsilId || ''}
                        options={dropdownOptions.tehsilOptions || []}
                        onChange={(e) => {
                            setFieldValue('tehsilId', e)
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
                        name="typeOfAddress"
                        value={values.typeOfAddress || ''}
                        options={[
                            { label: 'landmark', value: 'one' },
                            { label: 'street', value: 'two' },
                        ]}
                        onChange={(e) => {
                            setFieldValue('typeOfAddress', e)
                        }}
                    />
                    <ATMSelectSearchable
                        componentClass="mt-2"
                        label="Recivers Name"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name="reciversName"
                        value={values.reciversName || ''}
                        options={[{ label: 'redio', value: 'one' }]}
                        onChange={(e) => {
                            setFieldValue('reciversName', e)
                        }}
                    />
                    <ATMSelectSearchable
                        componentClass="mt-2"
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
                        // isSubmitting
                        name="houseNumber"
                        value={values.houseNumber || ''}
                        onChange={(e) => {
                            setFieldValue('houseNumber', e.target.value)
                            setFieldValue(
                                'autoFillingShippingAddress',
                                e.target.value
                            )
                        }}
                    />
                    <ATMTextField
                        extraClassField="mt-0"
                        label="Street/Sector/Building/Appartment"
                        size="xs"
                        LabelDirection="horizontal"
                        // isSubmitting
                        name="streetNumber"
                        value={values.streetNumber || ''}
                        onChange={(e) => {
                            setFieldValue('streetNumber', e.target.value)
                            setFieldValue(
                                'autoFillingShippingAddress',
                                `${values.houseNumber}\,${e.target.value}`
                            )
                        }}
                    />
                    <ATMTextField
                        extraClassField="mt-0"
                        label="Landmark"
                        size="xs"
                        LabelDirection="horizontal"
                        // isSubmitting
                        name="landmark"
                        value={values.landmark}
                        onChange={(e) => {
                            setFieldValue('landmark', e.target.value)
                            setFieldValue(
                                'autoFillingShippingAddress',
                                `${values.houseNumber}\,${values.streetNumber}\,${e.target.value}`
                            )
                        }}
                    />

                    <ATMTextField
                        extraClassField="mt-0"
                        label="Alternate Mobile No"
                        value={values.alternateNo}
                        size="xs"
                        LabelDirection="horizontal"
                        name="alternateNo"
                        // isSubmitting
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
                        value={values.whatsappNo}
                        size="xs"
                        LabelDirection="horizontal"
                        name="whatsappNo"
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
                    <div className="-mt-2">
                        <ATMTextArea
                            name="autoFillingShippingAddress"
                            value={values.autoFillingShippingAddress || ''}
                            placeholder="AUTOFILL SHIPPING ADDRESS"
                            minRows={9}
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
                            name="isRecording"
                            value={values.isRecording || false}
                            title1="ON"
                            title2="OFF"
                            onChange={(e) => {
                                setFieldValue('isRecording', e)
                            }}
                        />
                    </div> */}
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
                                    name="gender"
                                    value={values.gender}
                                    options={genderOption || []}
                                    onChange={(e) => {
                                        setFieldValue('gender', e)
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
                        name="orderFor"
                        value={values.orderFor}
                        options={[
                            { label: 'indore', value: 'one' },
                            { label: 'betul', value: 'two' },
                            { label: 'bhanwarkua', value: 'three' },
                            { label: 'mumbai', value: 'four' },
                        ]}
                        onChange={(e) => {
                            setFieldValue('orderFor', e)
                        }}
                    />
                    <ATMSelectSearchable
                        componentClass="mt-2"
                        label="Age Group"
                        size="xs"
                        LabelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        name="ageGroup"
                        value={values.ageGroup}
                        options={[
                            { label: '18-24', value: '18-24' },
                            { label: '25-29', value: '25-29' },
                            { label: '30-44', value: '30-44' },
                            { label: '45-55', value: '45-55' },
                        ]}
                        onChange={(e) => {
                            setFieldValue('ageGroup', e)
                        }}
                    />

                    <ATMTextField
                        extraClassField="mt-0"
                        label="Email-ID"
                        size="xs"
                        labelSize="small"
                        LabelDirection="horizontal"
                        // isSubmitting
                        name="emailId"
                        value={values.emailId}
                        onChange={(e) => {
                            setFieldValue('emailId', e.target.value)
                        }}
                    />

                    <div className="grid grid-cols-12">
                        <div className="col-span-4 pt-3">Social Media</div>
                        <div className="col-span-8 flex gap-x-4 px-1 items-center">
                            <ATMCheckbox
                                extraClasses="mt-2"
                                required
                                label="Facebook"
                                // labelClass="font-semibold text-sm"
                                checked={isFacebookId}
                                onChange={(e) => setFacebookId(e)}
                            />

                            {isFacebookId && (
                                <div className="ml-1">
                                    <ATMTextField
                                        extraClassField="mt-2"
                                        size="xs"
                                        placeholder="Name ID"
                                        // LabelDirection="horizontal"
                                        // isSubmitting
                                        name="socialMedia.facebook"
                                        value={
                                            values.socialMedia?.facebook || ''
                                        }
                                        onChange={(e) =>
                                            setFieldValue(
                                                'socialMedia.facebook',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            )}
                        </div>

                        <div className="col-span-4"></div>
                        <div className="col-span-8 flex gap-x-4 px-1 items-center">
                            <ATMCheckbox
                                extraClasses="mt-2"
                                required
                                label="Instagram"
                                // labelClass="font-semibold text-sm"
                                checked={isInstagramId}
                                onChange={(e) => {
                                    setInstagramId(e)
                                }}
                            />

                            {isInstagramId && (
                                <ATMTextField
                                    extraClassField="mt-2"
                                    size="xs"
                                    // LabelDirection="horizontal"
                                    // classDirection="grid grid-cols-3"
                                    placeholder="Name ID"
                                    // isSubmitting
                                    name="socialMedia.instagram"
                                    value={values.socialMedia?.instagram || ''}
                                    onChange={(e) => {
                                        setFieldValue(
                                            'socialMedia.instagram',
                                            e.target.value
                                        )
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="h-[180px]">
                        <ATMSelectSearchable
                            isMenuOpen
                            isMulti
                            name="medicalIssue"
                            value={values.medicalIssue}
                            LabelDirection="horizontal"
                            size="small"
                            // isMulti={true}
                            onChange={(value) => {
                                setFieldValue(`medicalIssue`, value)
                            }}
                            options={medicalOptions || []}
                            label="Any Other Medical Issue"
                            selectClass={'-mt-4 select-margin'}
                        />
                    </div>
                </div>

                <div className="col-span-6 py-2 px-8 border-r-[1px]">
                    <div className="grid grid-cols-12">
                        <div className="col-span-6"></div>
                        <div className="col-span-6 bg-slate-300 px-6 border-[1px]">
                            <div className="-mt-6 p-4">
                                <ATMRadioButton
                                    label="Payment Mode :"
                                    name="paymentMode"
                                    value={values.paymentMode || ''}
                                    className="mt-1"
                                    options={paymentModeOptions}
                                    onChange={(e) => {
                                        setFieldValue('paymentMode', e)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="-mt-2">
                        <ATMTextArea
                            name="remark"
                            value={values.remark}
                            placeholder="Other Remarks"
                            minRows={7}
                            onChange={(value) => {
                                setFieldValue('remark', value)
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Disposition Section  */}
            <div className="grid grid-cols-12 items-center border-[1px] px-3 pb-6 mt-1 border-grey-700 z-50">
                <div className="col-span-2 px-3">
                    <ATMSelectSearchable
                        required
                        label="Disposition Level 1"
                        componentClass="mt-2"
                        size="xs"
                        name="dispositionLevelTwoId"
                        value={values.dispositionLevelTwoId || ''}
                        // isSubmitting
                        options={dropdownOptions.dispositionTwoOptions || []}
                        onChange={(e) => {
                            setFieldValue('dispositionLevelTwoId', e)
                        }}
                    />
                </div>
                <div className="col-span-2 px-3">
                    <ATMSelectSearchable
                        required
                        label="Disposition Level 2"
                        componentClass="mt-2"
                        size="xs"
                        name="dispositionLevelThreeId"
                        value={values.dispositionLevelThreeId || ''}
                        // isSubmitting
                        options={dropdownOptions.dispositionThreeOptions || []}
                        onChange={(e) => {
                            setFieldValue('dispositionLevelThreeId', e)
                        }}
                    />
                </div>
                <div className="col-span-1 px-3 pt-6">
                    <CallerButton
                        text="Save"
                        type="submit"
                        className="py-2"
                        onClick={() => formikProps.handleSubmit()}
                    />
                </div>
            </div>

            {/* Data Table  */}

            <div className="border-[1px] pb-2 mt-1 border-grey-700">
                <ATMTable
                    headerClassName="bg-[#87527c] py-2 text-white"
                    columns={column}
                    rows={rows}
                />
            </div>
        </div>
    )
}

export default CallerPage
