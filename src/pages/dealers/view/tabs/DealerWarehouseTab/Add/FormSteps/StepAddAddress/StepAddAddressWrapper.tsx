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

// |-- Redux --|
import { setAllPincodes } from 'src/redux/slices/pincodeSlice'
import { setAllDistrict } from 'src/redux/slices/districtSlice'
import { setAllStates } from 'src/redux/slices/statesSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import useStatesByCountry from 'src/hooks/useStatesByCountry'
import useStateDistricts from 'src/hooks/useDistrictsByState'
import usePincodesByDistrict from 'src/hooks/usePincodesByDistrict'
import useAllInfoByPincode from 'src/hooks/useAllInfoByPincode'

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

const StepAddAddressWrapper = ({ formikProps, allCountry }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [billingStateData, setBillingStateData] = useState<any>()
    const [billingDistrictData, setBillingDistrictData] = useState<any>()
    const [billingPincodeData, setBillingPincodeData] = useState<any>()

    //registraion

    const { stateByCountry } = useStatesByCountry(
        formikProps.values.regd_address.country
    )

    //billing
    const { stateByCountry: StateDataB } = useStatesByCountry(
        formikProps.values.billing_address.country
    )

    //registraion

    const { stateDistricts } = useStateDistricts(
        formikProps.values.regd_address.state
    )
    //billing district
    const { stateDistricts: districtDataB } = useStateDistricts(
        formikProps.values.billing_address.state
    )
    //registration
    //registration
    const { pincodeByDistrict } = usePincodesByDistrict(
        formikProps.values.regd_address.district
    )
    //billing
    const { pincodeByDistrict: pincodeDataB } = usePincodesByDistrict(
        formikProps.values.billing_address.district
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
        if (stateByCountry) {
            dispatch(setAllStates(stateByCountry))
        }
    }, [stateByCountry, dispatch])
    //billing state
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
        formikProps.values.regd_address.pincodeSearch
    )

    useEffect(() => {
        if (!isDataLoading) {
            if (pincodeData !== null) {
                setIsOpenSearchPincode((prev: any) => {
                    return {
                        ...prev,
                        'regd_address.pincode': false,
                    }
                })
                formikProps.setFieldValue(
                    'regd_address.country',
                    pincodeData?.countryId
                )
                formikProps.setFieldValue(
                    'regd_address.state',
                    pincodeData?.stateId
                )
                formikProps.setFieldValue(
                    'regd_address.district',
                    pincodeData?.districtId
                )
                formikProps.setFieldValue(
                    'regd_address.pincode',
                    pincodeData?._id
                )
            } else {
                setIsOpenSearchPincode((prev: any) => {
                    return {
                        ...prev,
                        'regd_address.pincode': true,
                    }
                })
            }
        }
    }, [pincodeData, isDataLoading])

    // For Billing Address autofill
    const {
        pincodeData: pincodeDataBilling,
        isDataLoading: isLoadingPincodeDataBilling,
    } = useAllInfoByPincode(formikProps.values.billing_address.pincodeSearch)

    useEffect(() => {
        if (!isLoadingPincodeDataBilling) {
            if (pincodeDataBilling !== null) {
                setIsOpenSearchPincode((prev: any) => {
                    return {
                        ...prev,
                        'billing_address.pincode': false,
                    }
                })
                formikProps.setFieldValue(
                    'billing_address.country',
                    pincodeDataBilling?.countryId
                )
                formikProps.setFieldValue(
                    'billing_address.state',
                    pincodeDataBilling?.stateId
                )
                formikProps.setFieldValue(
                    'billing_address.district',
                    pincodeDataBilling?.districtId
                )
                formikProps.setFieldValue(
                    'billing_address.pincode',
                    pincodeDataBilling?._id
                )
            } else {
                setIsOpenSearchPincode((prev: any) => {
                    return {
                        ...prev,
                        'billing_address.pincode': true,
                    }
                })
            }
        }
    }, [pincodeDataBilling, isLoadingPincodeDataBilling])

    const handleAutoSearchPincode = (
        name: string,
        newValue: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (name === 'billing_address.pincode') {
            formikProps.setFieldValue(
                'billing_address.pincodeSearch',
                newValue.target.value
            )
        } else {
            formikProps.setFieldValue(
                'regd_address.pincodeSearch',
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
