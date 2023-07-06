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
    useGetAllSchemeListByPgiQuery,
    useGetSchemeByIdQuery,
} from 'src/services/SchemeService'
import { useGetAllProductGroupUnAuthQuery } from 'src/services/ProductGroupService'
import { setAllPincodes } from 'src/redux/slices/pincodeSlice'
import { useGetAllAreaUnauthQuery } from 'src/services/AreaService'
import { setItems as setAreaItems } from 'src/redux/slices/areaSlice'
import { AreaListResponse } from 'src/models/Area.model'
import { useGetAllUnAuthDispositionThreeQuery } from 'src/services/configurations/DispositionThreeServices'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
// import ATMOtpInput from 'src/components/UI/atoms/ATMOtpInput/ATMOtpInput'
// import { useNavigate } from 'react-router-dom'

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
    isLoading: boolean
}

type ProductGroupResponse = {
    _id: string
    groupName: string
    dealerSalePrice: number
    gst: number
    cgst: number
    sgst: number
    igst: number
    utgst: number
    companyId: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
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

const startTimesOptions: SelectOption[] = [
    {
        label: '1:00',
        value: '1:00',
    },
    {
        label: '2:00',
        value: '2:00',
    },
    {
        label: '3:00',
        value: '3:00',
    },

    {
        label: '4:00',
        value: '4:00',
    },

    {
        label: '5:00',
        value: '5:00',
    },
    {
        label: '6:00',
        value: '6:00',
    },
    {
        label: '7:00',
        value: '7:00',
    },

    {
        label: '8:00',
        value: '8:00',
    },
    {
        label: '9:00',
        value: '9:00',
    },
    {
        label: '10:00',
        value: '10:00',
    },
    {
        label: '11:00',
        value: '11:00',
    },
    {
        label: '12:00',
        value: '12:00',
    },
    {
        label: '13:00',
        value: '13:00',
    },
    {
        label: '14:00',
        value: '14:00',
    },
    {
        label: '15:00',
        value: '15:00',
    },
    {
        label: '16:00',
        value: '16:00',
    },
    {
        label: '17:00',
        value: '17:00',
    },
    {
        label: '18:00',
        value: '18:00',
    },
    {
        label: '19:00',
        value: '19:00',
    },
    {
        label: '20:00',
        value: '20:00',
    },
    {
        label: '21:00',
        value: '21:00',
    },
    {
        label: '22:00',
        value: '22:00',
    },
    {
        label: '23:00',
        value: '23:00',
    },
    {
        label: '24:00',
        value: '24:00',
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
    isLoading,
}) => {
    const companyId = '645b7733266c589640740832'
    const [isFacebookId, setFacebookId] = useState(false)
    const [isInstagramId, setInstagramId] = useState(false)
    const [schemeDetails, setSchemeDetails] = useState<SchemeDetailsPropTypes>({
        schemeName: '',
        price: 0,
        quantity: 1,
        deliveryCharges: 0,
        totalAmount: 0,
    })
    const [productsGroupOptions, setProductsGroupOptions] = useState<
        SelectOption[] | []
    >([])
    const [schemeListOptions, setSchemeListOptions] = useState<
        SelectOption[] | []
    >([])
    const [endTimeOptions, setEndTimeOptions] = useState<SelectOption[] | []>(
        []
    )

    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [pinCodeSearch, setPinCodeSearch] = useState<string>('')
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

    // Get Product Group Data
    const {
        data: productGroupData,
        isLoading: isProductGroupLoading,
        isFetching: isProductGroupFetching,
    } = useGetAllProductGroupUnAuthQuery(companyId)

    useEffect(() => {
        if (!isProductGroupLoading && !isProductGroupFetching) {
            if (productGroupData?.status) {
                const productGroupOptionsList = productGroupData?.data?.map(
                    (products: ProductGroupResponse) => {
                        return {
                            label: products?.groupName,
                            value: products?._id,
                        }
                    }
                )
                setProductsGroupOptions(productGroupOptionsList)
            }
        }
    }, [productGroupData, isProductGroupLoading, isProductGroupFetching])

    // GET SCHEME LIST BY companyId AND productsGroupId
    const {
        data: schemeListData,
        isFetching: isSchemeListFetching,
        isLoading: isSchemeListLoading,
    } = useGetAllSchemeListByPgiQuery(
        {
            companyId: companyId,
            productGroupId: formikProps?.values?.productGroupId,
        },
        {
            skip: !formikProps?.values?.productGroupId,
        }
    )

    useEffect(() => {
        if (!isSchemeListFetching && !isSchemeListLoading) {
            const schemeList = schemeListData?.data?.map((products: any) => {
                return {
                    label: products?.schemeName,
                    value: products?._id,
                }
            })
            setSchemeListOptions(schemeList)
        }
    }, [schemeListData, isSchemeListFetching, isSchemeListLoading])

    // GET SINGLE SCHEME BY ID
    const {
        data: singleSchemeData,
        isFetching: isSingleSchemeFetching,
        isLoading: isSingleSchemeLoading,
    } = useGetSchemeByIdQuery(values.schemeId, {
        skip: !formikProps?.values?.schemeId,
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

    // Disposition Three Data
    const {
        data: dispositionThreedata,
        isLoading: dispositionThreeIsLoading,
        isFetching: dispositionThreeIsFetching,
    } = useGetAllUnAuthDispositionThreeQuery(
        formikProps.values.dispositionLevelTwoId,
        { skip: !formikProps?.values?.dispositionLevelTwoId }
    )

    // Disposition Two Data
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

    // Area Options
    const {
        data: areaData,
        isLoading: areaIsLoading,
        isFetching: areaIsFetching,
    } = useGetAllAreaUnauthQuery(formikProps?.values?.pincodeId, {
        skip: !formikProps?.values?.pincodeId,
    })

    useEffect(() => {
        if (!areaIsFetching && !areaIsLoading) {
            dispatch(setAreaItems(areaData?.data))
        }
        // eslint-disable-next-line
    }, [areaData, areaIsLoading, areaIsFetching, dispatch])

    useEffect(() => {
        if (formikProps?.values?.pincodeId && areaData?.data) {
            let v: string[] | string =
                formikProps?.values?.autoFillingShippingAddress.split('\n')
            let areaName = areaData?.data[0]?.area
            v.splice(2, 0, areaName)
            let cv: string = v.toString()
            let dv = cv?.replaceAll(',', '\n')
            setFieldValue('areaId', areaData?.data[0]?._id || '')
            setFieldValue('areaLabel', areaName || '')
            setFieldValue('autoFillingShippingAddress', dv || '')
        }
        // eslint-disable-next-line
    }, [allArea, formikProps?.values?.pincodeId])
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

    // const handleSetPinCodeName = (id: string) => {
    //     dropdownOptions?.pincodeOptions?.find((pinCode: any) => {
    //         if (pinCode?.value === id) {
    //             setFieldValue('pincodeName', pinCode?.label)
    //         }
    //     })
    // }

    const handleEndTime = (value: string) => {
        // find the index of value parameter from the startTimesOptions array.
        const indexOfSelectedTime = startTimesOptions?.findIndex(
            (option: SelectOption) => option.value === value
        )

        // check if index is valid then we slice the lefted timeList, after startTime selected.
        if (indexOfSelectedTime !== -1) {
            const sliceEndTimeList = startTimesOptions?.slice(
                indexOfSelectedTime + 1
            )
            setEndTimeOptions(sliceEndTimeList)
        } else {
            setEndTimeOptions([])
        }
    }

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

    useEffect(() => {
        setFieldValue('totalAmount', schemeDetails.totalAmount)
        setFieldValue('shcemeQuantity', schemeDetails.quantity)
        setFieldValue('schemeName', schemeDetails.schemeName)
        setFieldValue('price', schemeDetails.price)
        setFieldValue('deliveryCharges', schemeDetails.deliveryCharges)

        // eslint-disable-next-line
    }, [schemeDetails])

    // handle change function that increase & decrease product quantity
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
                <div className="col-span-2 items-center mt-3 text-sm font-semibold">
                    Search By Scheme
                </div>
                <div className="col-span-3 px-2">
                    <div className="mr-2 -mt-4">
                        <ATMSelectSearchable
                            // isSubmitting
                            size="xs"
                            name="productGroupId"
                            selectLabel="select product"
                            value={values.productGroupId || ''}
                            options={productsGroupOptions || []}
                            onChange={(e) => {
                                setFieldValue('productGroupId', e)
                            }}
                        />
                    </div>
                </div>
                <div className="col-span-3 px-2 pb-4">
                    <div className="mr-2 -mt-4">
                        <ATMSelectSearchable
                            size="xs"
                            name="schemeId"
                            selectLabel="select scheme"
                            value={values.schemeId || ''}
                            options={schemeListOptions || []}
                            onChange={(e) => {
                                setFieldValue('schemeId', e)
                                setSchemeDetails((prevSchemeDetails) => ({
                                    ...prevSchemeDetails,
                                    quantity: 1,
                                }))
                            }}
                            // isSubmitting
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
                                        componentClass="mt-2"
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
                                                e?.label || ''
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
                            setFieldValue('stateId', e.value)
                            setFieldValue('stateLabel', e.label)
                            setFieldValue(
                                'autoFillingShippingAddress',
                                `${values.pincodeLabel}\n${e.label}`
                            )
                        }}
                    />
                    <ATMSelectSearchable
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
                            //     e.label
                            // )
                            // setFieldValue(
                            //     'autoFillingShippingAddress',
                            //     `${values.pincodeLabel}\n${values.stateLabel}\n${e.label}`
                            // )
                        }}
                    />
                </div>

                <div className="col-span-4 py-2 px-8   border-r-[1px]">
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
                            setFieldValue('areaId', e.value)
                            setFieldValue('areaLabel', e.label)
                            setFieldValue(
                                'autoFillingShippingAddress',
                                `${values.pincodeLabel}\n${values.stateLabel}\n${e.label}`
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
                            setFieldValue('districtId', e.value)
                            setFieldValue('districtLabel', e.label)
                            setFieldValue(
                                'autoFillingShippingAddress',
                                `${values.pincodeLabel}\n${values.stateLabel}\n${values.areaLabel}\n${e.label}`
                            )
                        }}
                    />
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
                            setFieldValue('tehsilId', e.value)
                            setFieldValue('tehsilLabel', e.label)
                            setFieldValue(
                                'autoFillingShippingAddress',
                                `${values.pincodeLabel}\n${values.stateLabel}\n${values.areaLabel}\n${values.districtLabel}\n${e.label}`
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
                        componentClass="mt-2"
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

                    <div className="grid grid-cols-12 mt-1">
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
                                        options={endTimeOptions}
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
                    <div className="-mt-2">
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
                        selectLabel="select order for"
                        labelDirection="horizontal"
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
                        labelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        selectLabel="select age group"
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
                        labelDirection="horizontal"
                        // isSubmitting
                        name="emailId"
                        placeholder="enter email"
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
                                        // labelDirection="horizontal"
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
                                    // labelDirection="horizontal"
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
                    <div className="h-[165px]">
                        <ATMSelectSearchable
                            isMenuOpen
                            isMulti
                            name="medicalIssue"
                            value={values.medicalIssue}
                            labelDirection="horizontal"
                            selectLabel="select medical issue"
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
                        <div className="col-span-3"></div>
                        <div className="col-span-9 bg-slate-300 px-6 border-[1px]">
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
                            minRows={11}
                            onChange={(value) => {
                                setFieldValue('remark', value)
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Disposition Section  */}
            <div className="grid grid-cols-12 items-center border-[1px] px-3 pb-6 mt-1 border-grey-700 z-50">
                <div className="col-span-3 px-3">
                    <ATMSelectSearchable
                        required
                        label="Disposition Level 1"
                        componentClass="mt-2"
                        selectLabel="select disposition level 1"
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
                <div className="col-span-3 px-3">
                    <ATMSelectSearchable
                        required
                        label="Disposition Level 2"
                        componentClass="mt-2"
                        selectLabel="select disposition level 2"
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
                        // disabled={!dirty || isSubmitting}
                        isLoading={isLoading}
                        text="Save"
                        type="submit"
                        className="py-2 h-[35px]"
                        onClick={() => formikProps.handleSubmit()}
                    />
                </div>
            </div>

            {/* Data Table  */}

            <div className="border-[1px] pb-2 mt-1 border-grey-700 pt-2">
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
