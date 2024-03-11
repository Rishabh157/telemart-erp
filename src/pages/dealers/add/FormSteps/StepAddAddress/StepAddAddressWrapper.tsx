/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:StepAddAddressWrapper.tsx
// Type: ADD Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../AddDealerWrapper'
import StepAddAddress from './StepAddAddress'
import { Field } from 'src/models/FormField/FormField.model'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllCountry } from 'src/redux/slices/countrySlice'
import { setAllStates } from 'src/redux/slices/statesSlice'
import { setAllDistrict } from 'src/redux/slices/districtSlice'
import { setAllPincodes } from 'src/redux/slices/pincodeSlice'
import useCountries from 'src/hooks/useCountry'
import useStatesByCountry from 'src/hooks/useStatesByCountry'
import useStateDistricts from 'src/hooks/useDistrictsByState'
import usePincodesByDistrict from 'src/hooks/usePincodesByDistrict'
import useAllInfoByPincode from 'src/hooks/useAllInfoByPincode'

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
        sectionName: 'Regd. Address',
        fields: [
            {
                name: 'registrationAddress.phone',
                label: 'Phone',
                placeholder: 'Phone',
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
                name: 'registrationAddress.address',
                label: 'Address',
                type: 'textarea',
                placeholder: 'Address',
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
        sectionName: 'Billing Address',
        fields: [
            {
                name: 'billingAddress.phone',
                label: 'Phone',
                placeholder: 'Phone',
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
                name: 'billingAddress.address',
                label: 'Address',
                type: 'textarea',
                placeholder: 'Address',
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

const StepAddAddressWrapper = ({ formikProps }: Props) => {
    const dispatch = useDispatch<AppDispatch>()

    const [billingStateData, setBillingStateData] = useState<any>()
    const [billingDistrictData, setBillingDistrictData] = useState<any>()
    const [billingPincodeData, setBillingPincodeData] = useState<any>()

    const { country } = useCountries()
    //REGSITRATION
    const { stateByCountry } = useStatesByCountry(
        formikProps.values.registrationAddress.country
    )
    //billing state
    const { stateByCountry: StateDataB } = useStatesByCountry(
        formikProps.values.billingAddress.country
    )
    //registraion
    const { stateDistricts } = useStateDistricts(
        formikProps.values.registrationAddress.state
    )
    //billing district
    const { stateDistricts: districtDataB } = useStateDistricts(
        formikProps.values.billingAddress.state
    )
    //registration
    const { pincodeByDistrict } = usePincodesByDistrict(
        formikProps.values.registrationAddress.district
    )
    //billing
    const { pincodeByDistrict: pincodeDataB } = usePincodesByDistrict(
        formikProps.values.billingAddress.district
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
        if (stateByCountry) {
            dispatch(setAllStates(stateByCountry))
        }
    }, [stateByCountry, dispatch])

    useEffect(() => {
        if (StateDataB) {
            setBillingStateData(StateDataB)
        }
    }, [StateDataB, dispatch])

    //registration
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
        if (pincodeByDistrict) {
            dispatch(setAllPincodes(pincodeByDistrict))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincodeByDistrict])
    //billing
    useEffect(() => {
        if (pincodeDataB) {
            setBillingPincodeData(pincodeDataB)
        }
    }, [pincodeDataB])

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
    const [isOpenSearchPincode, setIsOpenSearchPincode] = React.useState<any>({
        'billingAddress.pincode': false,
        'registrationAddress.pincode': false,
    })

    // For Regd./Billing address autofill
    const { pincodeData, isDataLoading } = useAllInfoByPincode(
        formikProps.values.registrationAddress.pincodeSearch
    )

    useEffect(() => {
        if (!isDataLoading) {
            if (pincodeData !== null) {
                setIsOpenSearchPincode((prev: any) => {
                    return {
                        ...prev,
                        'registrationAddress.pincode': false,
                    }
                })
                formikProps.setFieldValue(
                    'registrationAddress.country',
                    pincodeData?.countryId
                )
                formikProps.setFieldValue(
                    'registrationAddress.state',
                    pincodeData?.stateId
                )
                formikProps.setFieldValue(
                    'registrationAddress.district',
                    pincodeData?.districtId
                )
                formikProps.setFieldValue(
                    'registrationAddress.pincode',
                    pincodeData?._id
                )
            } else {
                setIsOpenSearchPincode((prev: any) => {
                    return {
                        ...prev,
                        'registrationAddress.pincode': true,
                    }
                })
            }
        }
    }, [pincodeData, isDataLoading])

    // For Billing Address autofill
    const {
        pincodeData: pincodeDataBilling,
        isDataLoading: isLoadingPincodeDataBilling,
    } = useAllInfoByPincode(formikProps.values.billingAddress.pincodeSearch)

    useEffect(() => {
        if (!isLoadingPincodeDataBilling) {
            if (pincodeDataBilling !== null) {
                setIsOpenSearchPincode((prev: any) => {
                    return {
                        ...prev,
                        'billingAddress.pincode': false,
                    }
                })
                formikProps.setFieldValue(
                    'billingAddress.country',
                    pincodeDataBilling?.countryId
                )
                formikProps.setFieldValue(
                    'billingAddress.state',
                    pincodeDataBilling?.stateId
                )
                formikProps.setFieldValue(
                    'billingAddress.district',
                    pincodeDataBilling?.districtId
                )
                formikProps.setFieldValue(
                    'billingAddress.pincode',
                    pincodeDataBilling?._id
                )
            } else {
                setIsOpenSearchPincode((prev: any) => {
                    return {
                        ...prev,
                        'billingAddress.pincode': true,
                    }
                })
            }
        }
    }, [pincodeDataBilling, isLoadingPincodeDataBilling])

    const handleAutoSearchPincode = (
        name: string,
        newValue: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (name === 'billingAddress.pincode') {
            formikProps.setFieldValue(
                'billingAddress.pincodeSearch',
                newValue.target.value
            )
        } else {
            formikProps.setFieldValue(
                'registrationAddress.pincodeSearch',
                newValue.target.value
            )
        }
    }

    return (
        <>
            <StepAddAddress
                formikProps={formikProps}
                formFields={formFields}
                dropdownOptions={dropdownOptions}
                handleAutoSearchPincode={handleAutoSearchPincode}
                isOpenSearchPincode={isOpenSearchPincode}
                setIsOpenSearchPincode={setIsOpenSearchPincode}
            />
        </>
    )
}

export default StepAddAddressWrapper
