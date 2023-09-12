import React, { useEffect } from 'react'
import { AppDispatch, RootState } from 'src/redux/store'
// import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
// import { useGetAllCountryUnauthQuery } from 'src/services/CountryService'
// import { setAllCountry } from 'src/redux/slices/countrySlice'
import { useGetAllTehsilUnauthQuery } from 'src/services/TehsilService'
import { setAllStates } from 'src/redux/slices/statesSlice'
import { useGetByAllStateUnauthQuery } from 'src/services/StateService'
import { setAllTehsils } from 'src/redux/slices/tehsilSlice'
import { setAllDistrict } from 'src/redux/slices/districtSlice'
import { useGetAllDistrictUnauthQuery } from 'src/services/DistricService'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
// import { CountryListResponse } from 'src/models/Country.model'
import { StateListResponse } from 'src/models/State.model'
import { DistrictListResponse } from 'src/models/District.model'
import { TehsilListResponse } from 'src/models/Tehsil.model'
import CallerPage from './CallerPage'
import {
    useAddCallerFormMutation,
    useUpdateCallerFormMutation,
} from 'src/services/CallerService'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/inboundCallerSlice'

import { setItems as setDidItems } from 'src/redux/slices/media/didManagementSlice'
import { useGetPaginationInboundCallerQuery } from 'src/services/media/InboundCallerServices'
import { CallerResponse } from 'src/models'
import { useLocation } from 'react-router-dom'
import { useGetByDidNumberQuery } from 'src/services/media/DidManagementServices'

export type FormInitialValues = {
    agentName: string | null
    // companyId: string | null
    // agentId: string | null
    didNo: string
    ageGroup: string
    mobileNo: string
    alternateNo: string
    autoFillingShippingAddress: string
    callType: string
    campaign: string
    customerName: string
    preffered_delivery_start_time: string
    preffered_delivery_end_time: string
    preffered_delivery_date: string
    countryId: string | null
    countryLabel: string
    stateId: string | null
    stateLabel: string
    districtId: string | null
    districtLabel: string
    tehsilId: string | null
    tehsilLabel: string
    schemeId: string | null
    schemeName: string
    pincodeId: string | null
    pincodeLabel: string | null
    // villageId?: string | null
    areaId: string | null
    areaLabel: string
    emailId: string
    flagStatus: string
    gender: string
    houseNumber: string
    incomingCallerNo: string
    landmark: string
    medicalIssue: string[]
    orderFor: string[]
    orderForOther?: string | null
    paymentMode: string
    productGroupId: string | null
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
    dispositionLevelTwoId: string | null
    dispositionLevelThreeId: string | null
}

const CallerPageWrapper = () => {
    const locationUrl = useLocation()
    const queryParams = new URLSearchParams(locationUrl.search)
    const phoneNumber = queryParams.get('phone')
    const agentName = queryParams.get('username')
    const didNumber = queryParams.get('didnumber')
    const campaignId = queryParams.get('campaign')
    const calltype = queryParams.get('calltype')

    const columns: columnTypes[] = [
        {
            field: 'ageGroup',
            headerName: 'ORDER NO',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            renderCell: (row: CallerResponse) => <span>{row.ageGroup} </span>,
        },
        {
            field: 'didNo',
            headerName: 'ENQ NO',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            renderCell: (row: CallerResponse) => <span> {row.didNo} </span>,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            renderCell: (row: CallerResponse) => (
                <span> {row.flagStatus} </span>
            ),
        },
        {
            field: 'name',
            headerName: 'NAME',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            renderCell: (row: CallerResponse) => <span> {row.agentName} </span>,
        },
        {
            field: 'city',
            headerName: 'CITY',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            renderCell: (row: CallerResponse) => (
                <span> {row.districtLabel} </span>
            ),
        },
        {
            field: 'pincode',
            headerName: 'PINCODE',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            renderCell: (row: CallerResponse) => (
                <span> {row.pincodeLabel} </span>
            ),
        },
        {
            field: 'alternateNo',
            headerName: 'PHONE',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            renderCell: (row: CallerResponse) => <span> {row.mobileNo} </span>,
        },
        {
            field: 'disposition',
            headerName: 'DISPOSITION',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            renderCell: (row: CallerResponse) => (
                <span> {row.dispositionLevelThreeLabel} </span>
            ),
        },
        {
            field: 'scheme',
            headerName: 'SCHEME',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            renderCell: (row: CallerResponse) => (
                <span> {row.schemeName} </span>
            ),
        },
        {
            field: 'shippingCharge',
            headerName: 'SHIPPING CHARGE',
            flex: 'flex-[4_4_0%]',
            align: 'center',
            renderCell: (row: CallerResponse) => (
                <span> {row.deliveryCharges} </span>
            ),
        },
        {
            field: 'discount',
            headerName: 'DISCOUNT',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            renderCell: (row: CallerResponse) => <span> null </span>,
        },
        {
            field: 'amount',
            headerName: 'AMOUNT',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            renderCell: (row: CallerResponse) => (
                <span> {row.totalAmount} </span>
            ),
        },
        {
            field: 'remark',
            headerName: 'REMARKS',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            renderCell: (row: CallerResponse) => <span> {row.remark} </span>,
        },
        {
            field: 'compl',
            headerName: 'COMPL',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            renderCell: (row: CallerResponse) => <span> </span>,
        },
    ]

    const inboundCallerState: any = useSelector(
        (state: RootState) => state.inboundCaller
    )

    const { page, rowsPerPage, searchValue, items } = inboundCallerState

    // Table Data with MobileNo filtered

    const [AddCallerForm] = useAddCallerFormMutation()
    const [UpdateCallerForm, UpdateCallerFormInfo] =
        useUpdateCallerFormMutation()

    
    const initialValues: FormInitialValues = {
        agentName: agentName,
        campaign:campaignId as string,
        callType:calltype as string,
        incomingCallerNo: '',
        customerName: '',
        didNo: didNumber as string,
        flagStatus: '',
        productGroupId: null,
        schemeId: null,
        schemeName: '',
        shcemeQuantity: 1,
        price: 0,
        deliveryCharges: 0,
        totalAmount: 0,
        // DELEVERY ADDRESS SELECT OPTIONS
        countryId: null,
        countryLabel: '',
        pincodeId: null,
        pincodeLabel: '',
        stateId: null,
        stateLabel: '',
        // villageId: null,
        areaId: null,
        areaLabel: '',
        districtId: null,
        districtLabel: '',
        tehsilId: null,
        tehsilLabel: '',
        // DELEVERY ADDRESS SELECT OPTIONS BOTTOM FIELDS
        typeOfAddress: '',
        reciversName: '',
        preffered_delivery_start_time: '',
        preffered_delivery_end_time: '',
        preffered_delivery_date: '',
        houseNumber: '',
        streetNumber: '',
        landmark: '',
        mobileNo: phoneNumber as string,
        whatsappNo: '',
        autoFillingShippingAddress: '',
        // isRecording: false,
        gender: 'MALE',
        orderFor: [],
        orderForOther: '',
        ageGroup: '',
        emailId: '',
        socialMedia: {
            facebook: '',
            instagram: '',
        },
        medicalIssue: [],
        paymentMode: 'COD',
        remark: '',
        dispositionLevelTwoId: null,
        dispositionLevelThreeId: null,
        alternateNo: '',
    }

    // Form validation schema
    // eslint-disable-next-line
    const validationSchema = object({
        productGroupId: string().required('product group id is required'),
        // DELEVERY ADDRESS SELECT OPTIONS
        countryId: string(),
        pincodeId: string(),
        stateId: string(),
        areaId: string(),
        districtId: string(),
        tehsilId: string(),

        // DELEVERY ADDRESS SELECT OPTIONS BOTTOM FIELDS
        typeOfAddress: string(),
        reciversName: string(),
        deliveryTimeAndDate: string(),
        houseNumber: string(),
        streetNumber: string(),
        landmark: string(),
        mobileNo: string(),
        whatsappNo: string()
            .min(10, 'mobile number is not valid')
            .max(10, 'mobile number is not valid'),
        autoFillingShippingAddress: string(),
        // isRecording: boolean(),
        gender: string(),
        orderFor: string(),
        orderForOtherText: string(),
        ageGroup: string(),
        emailId: string().email('invalid email'),
        // medicalIssue: array().of(string()),
        remark: string(),
        dispositionLevelTwoId: string().required(
            'disposition level one is required'
        ),
        dispositionLevelThreeId: string().required(
            'disposition level two is required'
        ),
        alternateNo: string()
            .min(10, 'mobile number is not valid')
            .max(10, 'mobile number is not valid'),
    })

    const {
        data: callerListingData,
        isFetching: isCallerFetching,
        isLoading: isCallerLoading,
    } = useGetPaginationInboundCallerQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['didNo'],
        page: page,
        filterBy: [
            {
                fieldName: 'mobileNo',
                value: phoneNumber,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    useEffect(() => {
        if (!isCallerFetching && !isCallerLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(callerListingData?.data || []))
            dispatch(setTotalItems(callerListingData?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCallerLoading, isCallerFetching, callerListingData])
    const dispatch = useDispatch<AppDispatch>()

    // const { data, isLoading, isFetching } = useGetAllCountryUnauthQuery('')

    // country
    const { allStates }: any = useSelector((state: RootState) => state.states)
    const { allDistricts }: any = useSelector(
        (state: RootState) => state.district
    )
    const { allTehsils }: any = useSelector((state: RootState) => state.tehsils)
    const { selectedItem: didItems }: any = useSelector(
        (state: RootState) => state.didManagement
    )

    // // Set Countries
    // useEffect(() => {
    //     if (!isLoading && !isFetching) {
    //         dispatch(setAllCountry(data?.data))
    //     }
    // }, [data, isLoading, isFetching, dispatch])

    // Set did Number
    const {
        data: didData,
        isLoading: didIsLoading,
        isFetching: didIsFetching,
    } = useGetByDidNumberQuery(didNumber, {
        skip: !didNumber,
    })

    useEffect(() => {
        if (!didIsLoading && !didIsFetching)
            dispatch(setDidItems(didData?.data))
    }, [didData, didIsLoading, didIsFetching, dispatch])

    // Set States

    // Set States
    const {
        data: stateData,
        isLoading: stateIsLoading,
        isFetching: stateIsFetching,
    } = useGetByAllStateUnauthQuery('')

    useEffect(() => {
        if (!stateIsLoading && !stateIsFetching)
            dispatch(setAllStates(stateData?.data))
    }, [stateData, stateIsLoading, stateIsFetching, dispatch])

    // Set Districts
    const {
        data: districtData,
        isLoading: districtIsLoading,
        isFetching: districtIsFetching,
    } = useGetAllDistrictUnauthQuery('')

    useEffect(() => {
        dispatch(setAllDistrict(districtData?.data))
    }, [districtData, districtIsLoading, districtIsFetching, dispatch])

    // Set Tehsil
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

    // Set Area
    const {
        data: areaListData,
        isFetching: areaIsFetching,
        isLoading: areaIsLoading,
    } = useGetAllTehsilUnauthQuery('')

    useEffect(() => {
        if (!areaIsFetching && !areaIsLoading) {
            dispatch(setAllTehsils(areaListData?.data))
        }
    }, [areaListData, dispatch, areaIsFetching, areaIsLoading])

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
    }

    // Caller Page Save Button Form Updation
    const onSubmitHandler = (values: FormInitialValues, { resetForm }: any) => {
        const callerDetails: any = localStorage.getItem('callerPageData')
        let callerDataItem = JSON.parse(callerDetails)
        // setApiStatus(true)
        setTimeout(() => {
            UpdateCallerForm({
                body: {
                    ...values,
                    companyId: callerDataItem?.companyId,
                    agentId: callerDataItem?.agentId,
                },
                id: callerDataItem?.orderID,
            }).then((res: any) => {
                if ('data' in res) {
                    // resetForm({ isSubmitting: false, dirty: false })
                    if (res?.data?.status) {
                        showToast('success', 'caller added successfully!')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                // setApiStatus(false)
            })
        }, 1000)
    }

    //  Add Form when page loaded & set 'callerPageData' key in LocalStorage
    useEffect(() => {
        const callDetails: any = localStorage.getItem('callerPageData')
        let callDataItem = JSON.parse(callDetails)

        const { ...rest } = initialValues
        // use object destructuring to remove the _id property

        if (!callDataItem) {
            AddCallerForm({
                ...rest,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        if (res?.data?.data?._id) {
                            let callerData = {
                                orderID: res?.data?.data?._id,
                                mobileNo: initialValues.mobileNo,
                                didNo: initialValues.didNo,
                                companyId: res?.data?.data?.companyId,
                                agentId: res?.data?.data?.agentId,
                            }
                            localStorage.setItem(
                                'callerPageData',
                                JSON.stringify(callerData)
                            )
                        }
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
            })
        }
        // setApiCalled(true)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <form autoComplete="off">
                            <CallerPage
                                // apiStatus={apiStatus}
                                isLoading={UpdateCallerFormInfo.isLoading}
                                formikProps={formikProps}
                                dropdownOptions={dropdownOptions}
                                schemeColumn={columns}
                                didItems={didItems}
                                column={columns}
                                rows={items}
                            />
                        </form>
                    )
                }}
            </Formik>
        </>
    )
}

export default CallerPageWrapper
