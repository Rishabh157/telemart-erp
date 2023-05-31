import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { number, object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import Inbound from './Inbound'
import { useGetAllCountryUnauthQuery } from 'src/services/CountryService'
import { setAllCountry } from 'src/redux/slices/countrySlice'
import { useAddInboundCallerMutation } from 'src/services/media/InboundCallerServices'
import { useGetAllTehsilUnauthQuery } from 'src/services/TehsilService'
import { setAllStates } from 'src/redux/slices/statesSlice'
import { useGetByAllStateUnauthQuery } from 'src/services/StateService'
import { setAllTehsils } from 'src/redux/slices/tehsilSlice'
import { setAllDistrict } from 'src/redux/slices/districtSlice'
import { useGetAllDistrictUnauthQuery } from 'src/services/DistricService'
import { useGetAllAreaUnauthQuery } from 'src/services/AreaService'
import { setItems as setAreaItems } from 'src/redux/slices/areaSlice'
import { SchemeListResponse } from 'src/models/scheme.model'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { CountryListResponse } from 'src/models/Country.model'
import { StateListResponse } from 'src/models/State.model'
import { DistrictListResponse } from 'src/models/District.model'
import { TehsilListResponse } from 'src/models/Tehsil.model'
import { AreaListResponse } from 'src/models/Area.model'
import { setItems } from 'src/redux/slices/media/channelManagementSlice'

export type FormInitialValues = {
    generalInformation: {
        didNo: string
        inOutBound: string
        incomingCallerNo: string
        mobileNo: string
    }
    addressInformation: {
        deliveryCharges: number
        discount: number
        total: number
        countryId: string
        stateId: string
        districtId: string
        tehsilId: string
        areaId: string
        pincodeId:string
        expectedDeliveryDate: string
        profileDeliveredBy: string
        complaintDetails: string
        complaintNo: string
    }
    personalInformation: {
        agentName: string
        name: string
        age: string
        address: string
        realtion: string
        agentDistrictId: string
        landmark: string
        whatsappNo: string
        gender: string
        prepaid: boolean | string
        email: string
        channelId: string
        remark: string
    }
    dispositionLevelTwoId: string
    dispositionLevelThreeId: string
    schemeId: string
    alternateNo: string
}

const InbouundWrapper = () => {
    const columns: columnTypes[] = [
        {
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[2_2_0%]',
            renderCell: (row: SchemeListResponse) => (
                <span> {row.schemeName} </span>
            ),
            extraClasses: 'p-0 m-0',
        },
        {
            field: 'schemePrice',
            headerName: 'Price',
            flex: 'flex-[0.3_0.3_0%]',
            renderCell: (row: SchemeListResponse) => {
                return <span> {row?.schemePrice} </span>
            },
            extraClasses: 'p-0 m-0',
        },
    ]
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [AddInbopundCaller] = useAddInboundCallerMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        generalInformation: {
            didNo: '',
            inOutBound: '',
            incomingCallerNo: '',
            mobileNo: '',
        },
        addressInformation: {
            deliveryCharges: 0,
            discount: 0,
            total: 0,
            countryId: "",
            stateId: "",
            districtId: "",
            tehsilId: "",
            areaId: "",
            pincodeId:"",
            expectedDeliveryDate: '',
            profileDeliveredBy: '',
            complaintDetails: '',
            complaintNo: '',
        },
        personalInformation: {
            agentName: '',
            name: '',
            age: '',
            address: '',
            realtion: '',
            agentDistrictId: '',
            landmark: '',
          
            whatsappNo: '',
            gender: '',
            prepaid: '',
            email: '',
            channelId: '',
            remark: '',
        },

        alternateNo: '',
        dispositionLevelTwoId: '',
        dispositionLevelThreeId: '',
        schemeId: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        generalInformation: object().shape({
            didNo: string().required('Required !'),
            // inOutBound: string().required('Required !'),
            // incomingCallerNo: string().required('Required !'),
            // mobileNo: string().required('Required !'),
        }),
        addressInformation: object().shape({
            deliveryCharges: number().required('Required !'),
            // discount: number().required('Required !'),
            // total: number().required('Required !'),
            // country: string().required('Required !'),
            // state: string().required('Required !'),
            // city: string().required('Required !'),
            // tehsil: string().required('Required !'),
            // pincode: string().required('Required !'),
            // area: string().required('Required !'),
            // expectedDeliveryDate: string().required('Required !'),
            // profileDeliveredBy: string().required('Required !'),
            // complaintDetails: string().required('Required !'),
            // complaintNo: string().required('Required !'),
        }),
        personalInformation: object().shape({
            // agentName: string().required('Required !'),
            // name: string().required('Required !'),
            // age: string().required('Required !'),
            // address: string().required('Required !'),
            // realtion: string().required('Required !'),
            // city: string().required('Required !'),
            // landmark: string().required('Required !'),
            // alternateNo: string().required('Required !'),
            // gender: string().required('Required !'),
            // email: string().required('Required !'),
            // channel: string().required('Required !'),
            // otherRemarks: string().required('Required !'),
        }),
        // dispositionLevelOne: string().required('Required'),
        // dispositionLevelTwo: string().required('Required'),
        // schemeId: string().required('Required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        const valuesInbound = {
            ...values.generalInformation,
            ...values.addressInformation,
            ...values.personalInformation,
        }
        setApiStatus(true)  
        setTimeout(() => {
            AddInbopundCaller({
                ...valuesInbound,
                alternateNo1: values.alternateNo,
                schemeId: values.schemeId,
                dispositionLevelTwoId: values.dispositionLevelTwoId,
                dispositionLevelThreeId: values.dispositionLevelThreeId,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'InboundCaller added successfully!'
                        )
                        navigate('/media/inbound')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                setApiStatus(false)
            })
        }, 1000)
    }
    const dispatch = useDispatch<AppDispatch>()

    const { data, isLoading, isFetching } = useGetAllCountryUnauthQuery('')

    //country
    const { allCountry }: any = useSelector((state: RootState) => state.country)
    const { allStates }: any = useSelector((state: RootState) => state.states)

    const { allDistricts }: any = useSelector(
        (state: RootState) => state.district
    )

    useEffect(() => {
        if (!isLoading && !isFetching) dispatch(setAllCountry(data?.data))
    }, [data, isLoading, isFetching, dispatch])

    const { allTehsils }: any = useSelector((state: RootState) => state.tehsils)
    const { items: allArea }: any = useSelector(
        (state: RootState) => state.areas
    )


    const { items: Channelitems }: any = useSelector(
        (state: RootState) => state.channelGroup
    )
    console.log("Channelitems",Channelitems)
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

    //area
    const {
        data: areaData,
        isLoading: areaIsLoading,
        isFetching: areaIsFetching,
    } = useGetAllAreaUnauthQuery('')

    useEffect(() => {
        if (!areaIsFetching && !areaIsLoading) {
            dispatch(setAreaItems(areaData?.data))
        }
    }, [areaData, areaIsLoading, areaIsFetching, dispatch])

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
        counrtyOptions: allCountry?.map((ele:CountryListResponse) => {
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
        areaOptions: allArea?.map((ele:AreaListResponse) => {
            return { label: ele?.area, value: ele?._id }
        }),
        channelOptions: allDistricts?.map((ele: DistrictListResponse) => {
            return { label: ele?.districtName, value: ele?._id }
        }),
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <Inbound
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        dropdownOptions={dropdownOptions}
                        schemeColumn={columns}
                    />
                )
            }}
        </Formik>
    )
}

export default InbouundWrapper
