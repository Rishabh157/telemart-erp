/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:StepAddAddressWrapper.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../AddVendorWrapper'
import StepAddAddress from './StepAddAddress'
import { Field } from 'src/models/FormField/FormField.model'
import { useGetAllPincodeByDistrictQuery } from 'src/services/PinCodeService'

// |-- Redux --|
import { setAllPincodes } from 'src/redux/slices/pincodeSlice'
import { setAllCountry } from 'src/redux/slices/countrySlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllStates } from 'src/redux/slices/statesSlice'
import { setAllDistrict } from 'src/redux/slices/districtSlice'
import useCountries from 'src/hooks/useCountry'
import useCountryStates from 'src/hooks/useCountryStates'
import useStateDistricts from 'src/hooks/useStateDistricts'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

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
        sectionName: 'Regd  Address',
        fields: [
            {
                name: 'regd_address.phone',
                label: 'Phone',
                placeholder: 'Phone',
            },
            {
                name: 'regd_address.address',
                label: 'Address',
                placeholder: 'Address',
            },
            {
                name: 'regd_address.country',
                label: 'Country',
                placeholder: 'Country',
                type: 'select',
                optionAccessKey: 'counrtyOptions',
            },
            {
                name: 'regd_address.state',
                label: 'State',
                placeholder: 'State',
                type: 'select',
                optionAccessKey: 'stateOptions',
            },
            {
                name: 'regd_address.district',
                label: 'District',
                placeholder: 'District',
                type: 'select',
                optionAccessKey: 'districtOptions',
            },
            {
                name: 'regd_address.pincode',
                label: 'Pincode',
                placeholder: 'Pincode',
                type: 'select',
                optionAccessKey: 'pincodeOptions',
            },
        ],
    },
    {
        sectionName: '',
        fields: [
            {
                name: 'checkbox',
                label: 'As Above values',
                type: 'checkbox',
                placeholder: 'checbox',
            },
        ],
    },

    {
        sectionName: 'Billing address',
        fields: [
            {
                name: 'billing_address.phone',
                label: 'Phone',
                placeholder: 'Phone',
            },
            {
                name: 'billing_address.address',
                label: 'Address',
                placeholder: 'Address',
            },
            {
                name: 'billing_address.country',
                label: 'Country',
                placeholder: 'Country',
                type: 'select',
                optionAccessKey: 'billingCounrtyOptions',
            },
            {
                name: 'billing_address.state',
                label: 'State',
                placeholder: 'State',
                type: 'select',
                optionAccessKey: 'billingStateOptions',
            },
            {
                name: 'billing_address.district',
                label: 'District',
                placeholder: 'District',
                type: 'select',
                optionAccessKey: 'billingDistrictOptions',
            },
            {
                name: 'billing_address.pincode',
                label: 'Pincode',
                placeholder: 'Pincode',
                type: 'select',
                optionAccessKey: 'billingPincodeOptions',
            },
        ],
    },
]

const StepAddAddressWrapper = ({ formikProps }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [billingStateData, setBillingStateData] = useState<any>()
    const [billingDistrictData, setBillingDistrictData] = useState<any>()
    const [billingPincodeData, setBillingPincodeData] = useState<any>()

    const { country } = useCountries()

    //registraion

    const { countryStates } = useCountryStates(
        formikProps.values.regd_address.country
    )

    //billing
    const { countryStates: StateDataB } = useCountryStates(
        formikProps.values.billing_address.country
    )
    //registraion
    //registraion

    const { stateDistricts } = useStateDistricts(
        formikProps.values.regd_address.state
    )
    //billing district
    const { stateDistricts: districtDataB } = useStateDistricts(
        formikProps.values.billing_address.state
    )

    //registration
    const {
        data: pincodeData,
        isLoading: pincodeIsLoading,
        isFetching: pincodeIsFetching,
    } = useGetAllPincodeByDistrictQuery(
        formikProps.values.regd_address.country,
        {
            skip: !formikProps.values.regd_address.country,
        }
    )
    //billing
    const {
        data: pincodeDataB,
        isLoading: pincodeIsLoadingB,
        isFetching: pincodeIsFetchingB,
    } = useGetAllPincodeByDistrictQuery(
        formikProps.values.billing_address.country,
        {
            skip: !formikProps.values.billing_address.country,
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
        if (country) {
            dispatch(setAllCountry(country))
        }
    }, [country, dispatch])

    //registration

    useEffect(() => {
        if (countryStates) {
            dispatch(setAllStates(countryStates))
        }
    }, [countryStates, dispatch])
    //billing state
    useEffect(() => {
        if (StateDataB) {
            setBillingStateData(StateDataB)
        }
    }, [StateDataB, dispatch])

    useEffect(() => {
        if (stateDistricts) {
            dispatch(setAllDistrict(stateDistricts))
        }
    }, [stateDistricts, dispatch])
    //billing
    useEffect(() => {
        if (districtDataB) {
            setBillingDistrictData(districtDataB)
        }
    }, [districtDataB, dispatch])
    //registration
    useEffect(() => {
        dispatch(setAllPincodes(pincodeData?.data))
    }, [pincodeData, pincodeIsLoading, pincodeIsFetching])
    //billing
    useEffect(() => {
        setBillingPincodeData(pincodeDataB?.data)
    }, [pincodeDataB, pincodeIsLoadingB, pincodeIsFetchingB])

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

export default StepAddAddressWrapper
