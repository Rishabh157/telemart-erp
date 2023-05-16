import React, { useState, useEffect } from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from '../../EditDealerWrapper'
import StepAddAddress from './StepEditAddress'
import { Field } from 'src/models/FormField/FormField.model'
import { useGetAllStateByCountryQuery } from 'src/services/StateService'
import { useGetAllCountryQuery } from 'src/services/CountryService'
import { useGetAllDistrictByStateQuery } from 'src/services/DistricService'
import { useGetAllPincodeByDistrictQuery } from 'src/services/PinCodeService'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { setAllCountry } from 'src/redux/slices/countrySlice'
import { setAllStates } from 'src/redux/slices/statesSlice'
import { setAllDistrict } from 'src/redux/slices/districtSlice'
import { setAllPincodes } from 'src/redux/slices/pincodeSlice'

type Props = {
    formikProps: FormikProps<FormInitialValues>
}

// export type DropdownOptions = {
//   counrtyOptions: SelectOption[];
//   stateOptions: SelectOption[];
//   districtOptions: SelectOption[];
//   pincodeOptions: SelectOption[];

// };

//export type FieldType = Field<"counrtyOptions" | "stateOptions" | "districtOptions" | "pincodeOptions">

const formFields: {
    sectionName: string
    fields: Field<
        | 'counrtyOptions'
        | 'stateOptions'
        | 'districtOptions'
        | 'pincodeOptions'
        | 'billingCounrtyOptions'
        | 'billingStateOptions'
        | 'billingDistrictOptions'
        | 'billingPincodeOptions'
    >[]
}[] = [
    {
        sectionName: 'Regd Address',
        fields: [
            {
                name: 'registrationAddress.phone',
                label: 'Phone',
                placeholder: 'Phone',
            },
            {
                name: 'registrationAddress.address',
                label: 'Address',
                placeholder: 'Address',
            },
            {
                name: 'registrationAddress.country',
                label: 'Country',
                placeholder: 'Country',
                type: 'select',
                optionAccessKey: 'counrtyOptions',
            },
            {
                name: 'registrationAddress.state',
                label: 'State',
                placeholder: 'State',
                type: 'select',
                optionAccessKey: 'stateOptions',
            },
            {
                name: 'registrationAddress.district',
                label: 'District',
                placeholder: 'District',
                type: 'select',
                optionAccessKey: 'districtOptions',
            },
            {
                name: 'registrationAddress.pincode',
                label: 'Pincode',
                placeholder: 'Pincode',
                type: 'select',
                optionAccessKey: 'pincodeOptions',
            },
        ],
    },

    {
        sectionName: 'Billing Address',
        fields: [
            {
                name: 'billingAddress.phone',
                label: 'Phone',
                placeholder: 'Phone',
            },
            {
                name: 'billingAddress.address',
                label: 'Address',
                placeholder: 'Address',
            },
            {
                name: 'billingAddress.country',
                label: 'Country',
                placeholder: 'Country',
                type: 'select',
                optionAccessKey: 'billingCounrtyOptions',
            },
            {
                name: 'billingAddress.state',
                label: 'State',
                placeholder: 'State',
                type: 'select',
                optionAccessKey: 'billingStateOptions',
            },
            {
                name: 'billingAddress.district',
                label: 'District',
                placeholder: 'District',
                type: 'select',
                optionAccessKey: 'billingDistrictOptions',
            },
            {
                name: 'billingAddress.pincode',
                label: 'Pincode',
                placeholder: 'Pincode',
                type: 'select',
                optionAccessKey: 'billingPincodeOptions',
            },
        ],
    },
]

// const counrtyOptions = [{ label: "India", value: "india" }];
// const stateOptions = [{ label: "Madhya Pradesh", value: "MP" }];
// const districtOptions = [{ label: "Indore", value: "indore" }];
// const pincodeOptions = [{ label: "452001", value: "452001" }];

const StepEditAddressWrapper = ({ formikProps }: Props) => {
    const dispatch = useDispatch()

    const [billingStateData, setBillingStateData] = useState<any>()
    const [billingDistrictData, setBillingDistrictData] = useState<any>()
    const [billingPincodeData, setBillingPincodeData] = useState<any>()

    const { data, isLoading, isFetching } = useGetAllCountryQuery('')

    //REGSITRATION
    const {
        data: stateData,
        isLoading: stateIsLoading,
        isFetching: stateIsFetching,
    } = useGetAllStateByCountryQuery(
        formikProps.values.registrationAddress.country,
        {
            skip: !formikProps.values.registrationAddress.country,
        }
    )
    //billing
    const {
        data: StateDataB,
        isLoading: stateIsLoadingB,
        isFetching: stateIsFetchingB,
    } = useGetAllStateByCountryQuery(
        formikProps.values.billingAddress.country,
        {
            skip: !formikProps.values.billingAddress.country,
        }
    )
    //registraion
    const {
        data: districtData,
        isLoading: districtIsLoading,
        isFetching: districtIsFetching,
    } = useGetAllDistrictByStateQuery(
        formikProps.values.registrationAddress.state,
        {
            skip: !formikProps.values.registrationAddress.state,
        }
    )
    //billing
    const {
        data: districtDataB,
        isLoading: districtIsLoadingB,
        isFetching: districtIsFetchingB,
    } = useGetAllDistrictByStateQuery(formikProps.values.billingAddress.state, {
        skip: !formikProps.values.billingAddress.state,
    })
    //registration
    const {
        data: pincodeData,
        isLoading: pincodeIsLoading,
        isFetching: pincodeIsFetching,
    } = useGetAllPincodeByDistrictQuery(
        formikProps.values.registrationAddress.country,
        {
            skip: !formikProps.values.registrationAddress.country,
        }
    )
    //billing
    const {
        data: pincodeDataB,
        isLoading: pincodeIsLoadingB,
        isFetching: pincodeIsFetchingB,
    } = useGetAllPincodeByDistrictQuery(
        formikProps.values.billingAddress.country,
        {
            skip: !formikProps.values.billingAddress.country,
        }
    )

    const { allCountry }: any = useSelector((state: RootState) => state.country)
    const { allStates }: any = useSelector((state: RootState) => state.states)
    const { allDistricts }: any = useSelector(
        (state: RootState) => state.district
    )
    const { allPincodes }: any = useSelector(
        (state: RootState) => state.pincode
    )

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setAllCountry(data?.data))
        }
    }, [data, isLoading, isFetching, dispatch])

    //registration
    useEffect(() => {
        dispatch(setAllStates(stateData?.data))
    }, [stateData, stateIsLoading, stateIsFetching, dispatch])
    //billing
    useEffect(() => {
        setBillingStateData(StateDataB?.data)
    }, [StateDataB, stateIsLoadingB, stateIsFetchingB, dispatch])
    //registration
    useEffect(() => {
        dispatch(setAllDistrict(districtData?.data))
    }, [districtData, districtIsLoading, districtIsFetching, dispatch])
    //billing
    useEffect(() => {
        setBillingDistrictData(districtDataB?.data)
    }, [districtDataB, districtIsLoadingB, districtIsFetchingB, dispatch])
    //registration
    useEffect(() => {
        dispatch(setAllPincodes(pincodeData?.data))
    }, [pincodeData, pincodeIsLoading, pincodeIsFetching, dispatch])
    //billing
    useEffect(() => {
        setBillingPincodeData(pincodeDataB?.data)
    }, [pincodeDataB, pincodeIsLoadingB, pincodeIsFetchingB, dispatch])

    const counrtyOptions = allCountry?.map((ele: any) => {
        return { label: ele?.countryName, value: ele?._id }
    })
    const stateOptions = allStates?.map((ele: any) => {
        return { label: ele?.stateName, value: ele?._id }
    })
    const districtOptions = allDistricts?.map((ele: any) => {
        return { label: ele?.districtName, value: ele?._id }
    })
    const pincodeOptions = allPincodes?.map((ele: any) => {
        return { label: ele?.pincode, value: ele?._id }
    })
    const billingCounrtyOptions = allCountry?.map((ele: any) => {
        return { label: ele?.countryName, value: ele?._id }
    })
    const billingStateOptions = billingStateData?.map((ele: any) => {
        return { label: ele?.stateName, value: ele?._id }
    })
    const billingDistrictOptions = billingDistrictData?.map((ele: any) => {
        return { label: ele?.districtName, value: ele?._id }
    })
    const billingPincodeOptions = billingPincodeData?.map((ele: any) => {
        return { label: ele?.pincode, value: ele?._id }
    })

    const dropdownOptions = {
        counrtyOptions,
        stateOptions,
        districtOptions,
        pincodeOptions,
        billingCounrtyOptions,
        billingStateOptions,
        billingDistrictOptions,
        billingPincodeOptions,
    }

    return (
        <>
            <StepAddAddress
                formikProps={formikProps}
                formFields={formFields}
                dropdownOptions={dropdownOptions}
            />
        </>
    )
}

export default StepEditAddressWrapper
