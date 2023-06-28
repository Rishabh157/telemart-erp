import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from 'src/redux/store'
// import { useNavigate } from 'react-router-dom'
import { array, boolean, number, object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useGetAllCountryUnauthQuery } from 'src/services/CountryService'
import { setAllCountry } from 'src/redux/slices/countrySlice'
import {
    useAddInboundCallerMutation,
    useGetPaginationInboundCallerQuery,
    useUpdateInboundCallerMutation,
} from 'src/services/media/InboundCallerServices'
import { useGetAllTehsilUnauthQuery } from 'src/services/TehsilService'
import { setAllStates } from 'src/redux/slices/statesSlice'
import { useGetByAllStateUnauthQuery } from 'src/services/StateService'
import { setAllTehsils } from 'src/redux/slices/tehsilSlice'
import { setAllDistrict } from 'src/redux/slices/districtSlice'
import { useGetAllDistrictUnauthQuery } from 'src/services/DistricService'

import { SchemeListResponse } from 'src/models/scheme.model'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { CountryListResponse } from 'src/models/Country.model'
import { StateListResponse } from 'src/models/State.model'
import { DistrictListResponse } from 'src/models/District.model'
import { TehsilListResponse } from 'src/models/Tehsil.model'
// import { AreaListResponse } from 'src/models/Area.model'
import { setItems } from 'src/redux/slices/media/channelManagementSlice'
import { setSelectedItem as setDidItems } from 'src/redux/slices/media/didManagementSlice'
import { useGetByDidNumberQuery } from 'src/services/media/DidManagementServices'
import { InbooundCallerListResponse } from 'src/models/configurationModel/InboundCaller.model'
import {
    setIsTableLoading,
    setTotalItems,
    setItems as setCallItems,
} from 'src/redux/slices/media/inboundCallerSlice'
import CallerPage from './CallerPage'

import { useAddCallerFormMutation } from 'src/services/CallerService'
import { CallerResponse } from 'src/models'

export type FormInitialValues = {
    didNo: string
    ageGroup: string
    mobileNo: string
    alternateNo: string
    autoFillingShippingAddress: string
    callType: string
    campaign: string
    customerName: string
    deliveryTimeAndDate: string
    countryId: string
    stateId: string
    districtId: string
    tehsilId: string
    schemeId: string
    schemeName: string
    pincodeId: string
    pincodeSecondId: string
    // villageId?: string | null
    areaId: null
    emailId: string
    flagStatus: string
    gender: string
    houseNumber: string
    incomingCallerNo: string
    landmark: string
    medicalIssue: string[]
    orderFor: string
    paymentMode: string
    productGroupId: string
    // isRecording?: boolean
    reciversName: string
    remark: string
    shcemeQuantity: number
    socialMedia: {
        facebook: string
        instagram: string
    }
    streetNumber: string
    typeOfAddress: string
    whatsappNo: string
    price: number
    deliveryCharges: number
    totalAmount: number
    dispositionLevelTwoId: string
    dispositionLevelThreeId: string
}

const CallerPageWrapper = () => {
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

    const inboundCallerState: any = useSelector(
        (state: RootState) => state.inboundCaller
    )
    const { page, rowsPerPage, searchValue, items } = inboundCallerState
    const {
        data: Calldata,
        isFetching: callisFetching,
        isLoading: callisLoading,
    } = useGetPaginationInboundCallerQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['didNo'],
        page: page,
        filterBy: [
            {
                fieldName: 'mobileNo',
                value: ['9893432611'],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    useEffect(() => {
        if (!callisFetching && !callisLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setCallItems(Calldata?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callisLoading, callisFetching, Calldata])

    // const navigate = useNavigate()
    // const [AddInbopundCaller] = useAddInboundCallerMutation()
    // const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [AddCallerForm] = useAddCallerFormMutation()
    let DidNO = '452001'
    let MobileNO = '9893432611'

    const initialValues: FormInitialValues = {
        campaign: 'DHUANDHAAR',
        callType: 'INBOUND',
        incomingCallerNo: '9988776655',
        customerName: 'AJAY CHORE',
        didNo: '111.',
        flagStatus: 'STATUS',
        productGroupId: '',
        schemeId: '',
        schemeName: '',
        shcemeQuantity: 1,
        price: 0,
        deliveryCharges: 0,
        totalAmount: 0,
        // DELEVERY ADDRESS SELECT OPTIONS
        countryId: '646b2f49f8ba85987b718ad8',
        pincodeId: '',
        pincodeSecondId: '',
        stateId: '',
        // villageId: '' || null,
        areaId: '' || null,
        districtId: '',
        tehsilId: '',

        // DELEVERY ADDRESS SELECT OPTIONS BOTTOM FIELDS
        typeOfAddress: '',
        reciversName: '',
        deliveryTimeAndDate: '',
        houseNumber: '',
        streetNumber: '',
        landmark: '',
        mobileNo: '9667865476',
        whatsappNo: '',
        autoFillingShippingAddress: '',
        // isRecording: false,
        gender: '',
        orderFor: '',
        ageGroup: '',
        emailId: '',
        socialMedia: {
            facebook: '',
            instagram: '',
        },
        medicalIssue: [],
        paymentMode: '',
        remark: '',
        dispositionLevelTwoId: '',
        dispositionLevelThreeId: '',
        alternateNo: '',
    }

    // Form Validation Schema
    // const validationSchema = object({
    //     // DELEVERY ADDRESS SELECT OPTIONS
    //     countryId: string(),
    //     pincodeId: string(),
    //     pincodeSecondId: string(),
    //     stateId: string(),
    //     areaId: string(),
    //     districtId: string(),
    //     tehsilId: string(),

    //     // DELEVERY ADDRESS SELECT OPTIONS BOTTOM FIELDS
    //     typeOfAddress: string(),
    //     reciversName: string(),
    //     deliveryTimeAndDate: string(),
    //     houseNumber: string(),
    //     streetNumber: string(),
    //     landmark: string(),
    //     mobileNo: string(),
    //     whatsappNo: string()
    //         .min(10, 'mobile number is not valid')
    //         .max(10, 'mobile number is not valid'),
    //     autoFillingShippingAddress: string(),
    //     isRecording: boolean(),
    //     gender: string(),
    //     orderFor: string(),
    //     ageGroup: string(),
    //     emailId: string(),
    //     medicalIssue: array().of(string()),
    //     remark: string(),
    //     dispositionLevelTwoId: string(),
    //     dispositionLevelThreeId: string(),
    //     alternateNo: string()
    //         .min(10, 'mobile number is not valid')
    //         .max(10, 'mobile number is not valid'),
    // })

    const onSubmitHandler = (values: FormInitialValues) => {

      
        console.log('Submit Form', values)

        AddCallerForm({
            ...values,
        }).then((res: any) => {
            console.log(res)
            // if ('data' in res) {
            //     if (res?.data?.status) {
            //         showToast(
            //             'success',
            //             'InboundCaller added successfully!'
            //         )
            //         localStorage.removeItem('callerData')
            //         // navigate('/media/inbound')
            //     } else {
            //         showToast('error', res?.data?.message)
            //     }
            // } else {
            //     showToast('error', 'Something went wrong')
            // }
            // setApiStatus(false)
        })

        // setApiStatus(true)
    }

    // useEffect(() => {
    //     const callDetails: any = localStorage.getItem('callerData')
    //     let callDataItem = JSON.parse(callDetails)
    //     if (!callDataItem) {
    //         const valuesInbound = {
    //             ...initialValues,
    //         }
    //         setApiStatus(true)

    //         AddInbopundCaller({
    //             ...valuesInbound,
    //             alternateNo1: initialValues.alternateNo,
    //             schemeId: initialValues.schemeId,
    //             dispositionLevelTwoId: initialValues.dispositionLevelTwoId,
    //             dispositionLevelThreeId: initialValues.dispositionLevelThreeId,
    //         }).then((res: any) => {
    //             if ('data' in res) {
    //                 if (res?.data?.status) {
    //                     if (res?.data?.data?._id) {
    //                         let CallData = {
    //                             orderID: res?.data?.data?._id,
    //                             MobileNO: MobileNO,
    //                             DidNO: DidNO,
    //                         }
    //                         localStorage.setItem(
    //                             'callerData',
    //                             JSON.stringify(CallData)
    //                         )
    //                     }
    //                 } else {
    //                     showToast('error', res?.data?.message)
    //                 }
    //             } else {
    //                 showToast('error', 'Something went wrong')
    //             }
    //             // setApiStatus(false)
    //         })
    //     }
    //     // eslint-disable-next-line
    // }, [])

    const dispatch = useDispatch<AppDispatch>()

    const { data, isLoading, isFetching } = useGetAllCountryUnauthQuery('')

    //country
    const { allCountry }: any = useSelector((state: RootState) => state.country)
    const { allStates }: any = useSelector((state: RootState) => state.states)

    const { allDistricts }: any = useSelector(
        (state: RootState) => state.district
    )
    const { allTehsils }: any = useSelector((state: RootState) => state.tehsils)

    const { selectedItem: didItems }: any = useSelector(
        (state: RootState) => state.didManagement
    )
    useEffect(() => {
        if (!isLoading && !isFetching) dispatch(setAllCountry(data?.data))
    }, [data, isLoading, isFetching, dispatch])
    // did
    //state
    const {
        data: didData,
        isLoading: didIsLoading,
        isFetching: didIsFetching,
    } = useGetByDidNumberQuery(DidNO)

    useEffect(() => {
        if (!didIsLoading && !didIsFetching)
            dispatch(setDidItems(didData?.data))
    }, [didData, didIsLoading, didIsFetching, dispatch])

    //state
    const {
        data: stateData,
        isLoading: stateIsLoading,
        isFetching: stateIsFetching,
    } = useGetByAllStateUnauthQuery('')

    useEffect(() => {
        if (!stateIsLoading && !stateIsFetching)
            dispatch(setAllStates(stateData?.data))
    }, [stateData, stateIsLoading, stateIsFetching, dispatch])

    // district
    const {
        data: districtData,
        isLoading: districtIsLoading,
        isFetching: districtIsFetching,
    } = useGetAllDistrictUnauthQuery('')

    useEffect(() => {
        dispatch(setAllDistrict(districtData?.data))
    }, [districtData, districtIsLoading, districtIsFetching, dispatch])

    // tehsil
    const {
        data: tehsilData,
        isFetching: tehsilIsFetching,
        isLoading: tehsilIsLoading,
    } = useGetAllTehsilUnauthQuery('')

    useEffect(() => {
        if (!tehsilIsFetching && !tehsilIsLoading) {
            dispatch(setAllTehsils(tehsilData?.data))
        }
    }, [tehsilData, dispatch, tehsilIsFetching, tehsilIsLoading])

    //channel
    const {
        data: channelData,
        isFetching: channelIsFetching,
        isLoading: channelIsLoading,
    } = useGetAllTehsilUnauthQuery('')

    useEffect(() => {
        if (!channelIsFetching && !channelIsLoading) {
            dispatch(setItems(channelData?.data))
        }
    }, [channelData, channelIsLoading, channelIsFetching, dispatch])

    //registration

    const dropdownOptions = {
        counrtyOptions: allCountry?.map((ele: CountryListResponse) => {
            return { label: ele?.countryName, value: ele?._id }
        }),
        stateOptions: allStates?.map((ele: StateListResponse) => {
            return { label: ele?.stateName, value: ele?._id }
        }),

        districtOptions: allDistricts?.map((ele: DistrictListResponse) => {
            return { label: ele?.districtName, value: ele?._id }
        }),
        tehsilOptions: allTehsils?.map((ele: TehsilListResponse) => {
            return { label: ele?.tehsilName, value: ele?._id }
        }),

        channelOptions: allDistricts?.map((ele: DistrictListResponse) => {
            return { label: ele?.districtName, value: ele?._id }
        }),
    }

    return (
        <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <CallerPage
                        // apiStatus={apiStatus}
                        formikProps={formikProps}
                        dropdownOptions={dropdownOptions}
                        schemeColumn={columns}
                        didItems={didItems}
                        column={columns}
                        rows={items}
                    />
                )
            }}
        </Formik>
    )
}

export default CallerPageWrapper
