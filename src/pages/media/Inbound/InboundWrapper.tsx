import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from 'src/redux/store'
// import { useNavigate } from 'react-router-dom'
import { number, object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import Inbound from './Inbound'
import { useGetAllCountryUnauthQuery } from 'src/services/CountryService'
import { setAllCountry } from 'src/redux/slices/countrySlice'
import {
    useAddInboundCallerMutation,
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
        countryId: string | null
        stateId: string | null
        districtId: string | null
        tehsilId: string | null
        areaId: string | null
        pincodeId: string | null
        expectedDeliveryDate: string
        profileDeliveredBy: string
        complaintDetails: string
        complaintNo: string
    }
    personalInformation: {
        agentName: string
        name: string
        age: number
        address: string
        relation: string
        agentDistrictId: string | null
        landmark: string
        whatsappNo: string
        gender: string
        prepaid: boolean
        emailId: string
        channel: string
        remark: string
    }
    dispositionLevelTwoId: string | null
    dispositionLevelThreeId: string | null
    schemeId: string | null
    alternateNo: string
}

const InbouundWrapper = () => {
    const columns: columnTypes[] = [
        {
            field: 'schemeName',
            headerName: '',
            flex: 'flex-[2_2_0%]',
            renderCell: (row: SchemeListResponse) => (
                <span> {row.schemeName} </span>
            ),
            extraClasses: 'p-0 m-0 ',
        },
        {
            field: 'schemePrice',
            headerName: '',
            flex: 'flex-[0.3_0.3_0%]',
            renderCell: (row: SchemeListResponse) => {
                return <span> {row?.schemePrice} </span>
            },
            extraClasses: 'p-0 m-0 ',
        },
    ]
    // const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [AddInbopundCaller] = useAddInboundCallerMutation()
    const [UpdateInbopundCaller] = useUpdateInboundCallerMutation()
    let DidNO = '452001'
    let MobileNO = '9893432611'

    const initialValues: FormInitialValues = {
        generalInformation: {
            didNo: DidNO,
            inOutBound: 'Manual',
            incomingCallerNo: MobileNO,
            mobileNo: MobileNO,
        },
        addressInformation: {
            deliveryCharges: 0,
            discount: 0,
            total: 0,
            countryId: null,
            stateId: null,
            districtId: null,
            tehsilId: null,
            areaId: null,
            pincodeId: null,
            expectedDeliveryDate: '',
            profileDeliveredBy: '',
            complaintDetails: '',
            complaintNo: '',
        },
        personalInformation: {
            agentName: '',
            name: '',
            age: 0,
            address: '',
            relation: '',
            agentDistrictId: null,
            landmark: '',
            whatsappNo: '',
            gender: 'OTHER',
            prepaid: false,
            emailId: '',
            channel: 'Sony',
            remark: '',
        },

        alternateNo: '',
        dispositionLevelTwoId: null,
        dispositionLevelThreeId: null,
        schemeId: null,
    }

    // Form Validation Schema
    const validationSchema = object({
        generalInformation: object().shape({
            didNo: string().required('Required !'),
            inOutBound: string().required('Required !'),
            incomingCallerNo: string().required('Required !'),
            mobileNo: string().required('Required !'),
        }),
        addressInformation: object().shape({
            deliveryCharges: number().required('Required !'),
            discount: number().required('Required !'),
            total: number().required('Required !'),
            countryId: string().required('Required !'),
            stateId: string().required('Required !'),
            districtId: string().required('Required !'),
            tehsilId: string().required('Required !'),
            pincodeId: string().required('Required !'),
            areaId: string().required('Required !'),
        }),
        personalInformation: object().shape({
            // agentName: string().required('Required !'),
            // name: string().required('Required !'),
            age: number().required('Required !'),
            // address: string().required('Required !'),
            relation: string().required('Required !'),
            agentDistrictId: string().required('Required !'),
            // landmark: string().required('Required !'),
            // alternateNo: string().required('Required !'),
            gender: string().required('Required !'),
            // emailId: string().required('Required !'),
            // channel: string().required('Required !'),
            // remark: string().required('Required !'),
        }),
        dispositionLevelTwoId: string().required('Required'),
        dispositionLevelThreeId: string().required('Required'),
        schemeId: string().required('Required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        const callDetails: any = localStorage.getItem('callerData')
        let callDataItem = JSON.parse(callDetails)
    
        const valuesInbound = {
            ...values.generalInformation,
            ...values.addressInformation,
            ...values.personalInformation,
        }
        setApiStatus(true)
        setTimeout(() => {
            UpdateInbopundCaller({
                body: {
                    ...valuesInbound,
                    alternateNo1: values.alternateNo,
                    schemeId: values.schemeId,
                    dispositionLevelTwoId: values.dispositionLevelTwoId,
                    dispositionLevelThreeId: values.dispositionLevelThreeId,
                },
                id: callDataItem?.orderID,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'InboundCaller added successfully!'
                        )
                        localStorage.removeItem('callerData')
                        // navigate('/media/inbound')
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
    useEffect(() => {
        const callDetails: any = localStorage.getItem('callerData')
        let callDataItem = JSON.parse(callDetails)
        if (!callDataItem) {
            const valuesInbound = {
                ...initialValues.generalInformation,
                ...initialValues.addressInformation,
                ...initialValues.personalInformation,
            }
            // setApiStatus(true)

            AddInbopundCaller({
                ...valuesInbound,
                alternateNo1: initialValues.alternateNo,
                schemeId: initialValues.schemeId,
                dispositionLevelTwoId: initialValues.dispositionLevelTwoId,
                dispositionLevelThreeId: initialValues.dispositionLevelThreeId,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        if (res?.data?.data?._id) {
                            let CallData = {
                                orderID: res?.data?.data?._id,
                                MobileNO: MobileNO,
                                DidNO: DidNO,
                            }
                            localStorage.setItem(
                                'callerData',
                                JSON.stringify(CallData)
                            )
                        }
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                // setApiStatus(false)
            })
        }
        // eslint-disable-next-line
    }, [])

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
                        didItems={didItems}
                    />
                )
            }}
        </Formik>
    )
}

export default InbouundWrapper
