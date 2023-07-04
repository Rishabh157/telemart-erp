/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:StepAddAddressWrapper.tsx
// Type: View-Tab Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../AddDealerWarehouseWarpper'
import StepAddAddress from './StepAddAddress'
import { Field } from 'src/models/FormField/FormField.model'
import { useGetAllStateByCountryQuery } from 'src/services/StateService'
import { useGetAllDistrictByStateQuery } from 'src/services/DistricService'
import { useGetAllPincodeByDistrictQuery } from 'src/services/PinCodeService'

// |-- Redux --|
import { setAllPincodes } from 'src/redux/slices/pincodeSlice'
import { setAllDistrict } from 'src/redux/slices/districtSlice'
import { setAllStates } from 'src/redux/slices/statesSlice'
import { RootState, AppDispatch } from 'src/redux/store'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    allCountry: any
}

export type FieldType = Field<
    | 'counrtyOptions'
    | 'stateOptions'
    | 'districtOptions'
    | 'pincodeOptions'
    | 'billingCounrtyOptions'
    | 'billingStateOptions'
    | 'billingDistrictOptions'
    | 'billingPincodeOptions'
>

const formFields: {
    sectionName: string
    fields: FieldType[]
}[] = [
    {
        sectionName: 'Regd. Address',
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
        sectionName: 'Billing Address',
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
            {
                name: 'billing_address.gstNumber',
                label: 'GST Number',
                placeholder: 'GST Number',
            },
            {
                name: 'billing_address.gstCertificate',
                label: 'GST Certificate',
                placeholder: 'GST Certificate',
                type: 'file-picker',
            },
        ],
    },
]

const StepAddAddressWrapper = ({ formikProps, allCountry }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [billingStateData, setBillingStateData] = useState<any>()
    const [billingDistrictData, setBillingDistrictData] = useState<any>()
    const [billingPincodeData, setBillingPincodeData] = useState<any>()

    //registraion
    const {
        data: stateData,
        isLoading: stateIsLoading,
        isFetching: stateIsFetching,
    } = useGetAllStateByCountryQuery(formikProps.values.regd_address.country, {
        skip: !formikProps.values.regd_address.country,
    })
    //billing
    const {
        data: StateDataB,
        isLoading: stateIsLoadingB,
        isFetching: stateIsFetchingB,
    } = useGetAllStateByCountryQuery(
        formikProps.values.billing_address.country,
        {
            skip: !formikProps.values.billing_address.country,
        }
    )
    //registraion
    const {
        data: districtData,
        isLoading: districtIsLoading,
        isFetching: districtIsFetching,
    } = useGetAllDistrictByStateQuery(formikProps.values.regd_address.state, {
        skip: !formikProps.values.regd_address.state,
    })
    //billing
    const {
        data: districtDataB,
        isLoading: districtIsLoadingB,
        isFetching: districtIsFetchingB,
    } = useGetAllDistrictByStateQuery(
        formikProps.values.billing_address.state,
        {
            skip: !formikProps.values.billing_address.state,
        }
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

    const { allStates }: any = useSelector((state: RootState) => state.states)
    const { allDistricts }: any = useSelector(
        (state: RootState) => state.district
    )
    const { allPincodes }: any = useSelector(
        (state: RootState) => state.pincode
    )

    //registration
    useEffect(() => {
        dispatch(setAllStates(stateData?.data))
    }, [stateData, stateIsLoading, stateIsFetching])
    //billing
    useEffect(() => {
        setBillingStateData(StateDataB?.data)
    }, [StateDataB, stateIsLoadingB, stateIsFetchingB])
    //registration
    useEffect(() => {
        dispatch(setAllDistrict(districtData?.data))
    }, [districtData, districtIsLoading, districtIsFetching])
    //billing
    useEffect(() => {
        setBillingDistrictData(districtDataB?.data)
    }, [districtDataB, districtIsLoadingB, districtIsFetchingB])
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
