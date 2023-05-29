import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { number, object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import Inbound from './Inbound'
import { useGetAllCountryQuery, useGetAllCountryUnauthQuery } from 'src/services/CountryService'
import { setAllCountry } from 'src/redux/slices/countrySlice'
import { useAddInboundCallerMutation } from 'src/services/media/InboundCallerServices'

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
        country: string
        state: string
        city: string
        tehsil: string
        pincode: string
        area: string
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
        city: string
        landmark: string
        alternateNo1: string
        gender: string
        prepaid: string
        email: string
        channel: string
        otherRemarks: string
    }
    dispositionLevelOne: string

    dispositionLevelTwo: string
}

const InbouundWrapper = () => {
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
            country: '',
            state: '',
            city: '',
            tehsil: '',
            pincode: '',
            area: '',
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
            city: '',
            landmark: '',
            alternateNo1: '',
            gender: '',
            prepaid: '',
            email: '',
            channel: '',
            otherRemarks: '',
        },
        dispositionLevelOne: '',
        dispositionLevelTwo: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        generalInformation: object().shape({
            didNo: string().required(),
            inOutBound: string().required(),
            incomingCallerNo: string().required(),
            mobileNo: string().required(),
        }),
        addressInformation: object().shape({
            deliveryCharges: number().required(),
            discount: number().required(),
            total: number().required(),
            country: string().required(),
            state: string().required(),
            city: string().required(),
            tehsil: string().required(),
            pincode: string().required(),
            area: string().required(),
            expectedDeliveryDate: string().required(),
            profileDeliveredBy: string().required(),
            complaintDetails: string().required(),
            complaintNo: string().required(),
        }),
        personalInformation: object().shape({
            agentName: string().required(),
            name: string().required(),
            age: string().required(),
            address: string().required(),
            realtion: string().required(),
            city: string().required(),
            landmark: string().required(),
            alternateNo1: string().required(),
            gender: string().required(),
            prepaid: string().required(),
            email: string().required(),
            channel: string().required(),
            otherRemarks: string().required(),
        }),
        dispositionLevelOne: string().required(),
        dispositionLevelTwo: string().required(),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddInbopundCaller({
                generalInformation: {
                    didNo: values.generalInformation.didNo,
                    inOutBound: values.generalInformation.inOutBound,
                    incomingCallerNo:
                        values.generalInformation.incomingCallerNo,
                    mobileNo: values.generalInformation.mobileNo,
                },
                addressInformation: {
                    deliveryCharges: values.addressInformation.deliveryCharges,
                    discount: values.addressInformation.discount,
                    total: values.addressInformation.total,
                    country: values.addressInformation.country,
                    state: values.addressInformation.state,
                    city: values.addressInformation.city,
                    tehsil: values.addressInformation.tehsil,
                    pincode: values.addressInformation.pincode,
                    area: values.addressInformation.area,
                    expectedDeliveryDate:
                        values.addressInformation.expectedDeliveryDate,
                    profileDeliveredBy:
                        values.addressInformation.profileDeliveredBy,
                    complaintDetails:
                        values.addressInformation.complaintDetails,
                    complaintNo: values.addressInformation.complaintNo,
                },
                personalInformation: {
                    agentName: values.personalInformation.agentName,
                    name: values.personalInformation.name,
                    age: values.personalInformation.age,
                    address: values.personalInformation.address,
                    realtion: values.personalInformation.realtion,
                    city: values.personalInformation.city,
                    landmark: values.personalInformation.landmark,
                    alternateNo1: values.personalInformation.alternateNo1,
                    gender: values.personalInformation.gender,
                    prepaid: values.personalInformation.prepaid,
                    email: values.personalInformation.email,
                    channel: values.personalInformation.channel,
                    otherRemarks: values.personalInformation.otherRemarks,
                },
                dispositionLevelOne: values.dispositionLevelOne,
                dispositionLevelTwo: values.dispositionLevelTwo,
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

    const { allCountry }: any = useSelector((state: RootState) => state.country)

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setAllCountry(data?.data))
        }
    }, [data, isLoading, isFetching, dispatch])

    //registration

    const dropdownOptions = {
        counrtyOptions: allCountry?.map((ele: any) => {
            return { label: ele?.countryName, value: ele?._id }
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
                    />
                )
            }}
        </Formik>
    )
}

export default InbouundWrapper
