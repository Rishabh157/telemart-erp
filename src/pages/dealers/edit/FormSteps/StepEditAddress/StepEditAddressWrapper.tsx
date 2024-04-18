
// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../EditDealerWrapper'
import StepAddAddress from './StepEditAddress'
import { Field } from 'src/models/FormField/FormField.model'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllStates } from 'src/redux/slices/statesSlice'
import { setAllDistrict } from 'src/redux/slices/districtSlice'
import { setAllPincodes } from 'src/redux/slices/pincodeSlice'
import useCountries from 'src/hooks/useCountry'
import useStatesByCountry from 'src/hooks/useStatesByCountry'
import useStateDistricts from 'src/hooks/useDistrictsByState'
import usePincodesByDistrict from 'src/hooks/usePincodesByDistrict'

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
                required: true,
            },
            {
                name: 'registrationAddress.countryId',
                label: 'Country',
                placeholder: 'Country',
                type: 'select',
                optionAccessKey: 'counrtyOptions',
            },
            {
                name: 'registrationAddress.stateId',
                label: 'State',
                placeholder: 'State',
                type: 'select',
                optionAccessKey: 'stateOptions',
            },
            {
                name: 'registrationAddress.districtId',
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
                required: true,
            },
            {
                name: 'registrationAddress.pincodeId',
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
                required: true,
            },
            {
                name: 'billingAddress.countryId',
                label: 'Country',
                placeholder: 'Country',
                type: 'select',
                optionAccessKey: 'billingCounrtyOptions',
            },
            {
                name: 'billingAddress.stateId',
                label: 'State',
                placeholder: 'State',
                type: 'select',
                optionAccessKey: 'billingStateOptions',
            },
            {
                name: 'billingAddress.districtId',
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
                required: true,
            },
            {
                name: 'billingAddress.pincodeId',
                label: 'Pincode',
                placeholder: 'Pincode',
                type: 'select',
                optionAccessKey: 'billingPincodeOptions',
            },
        ],
    },
]

const StepEditAddressWrapper = ({ formikProps }: Props) => {
    const dispatch = useDispatch<AppDispatch>()

    const [billingStateData, setBillingStateData] = useState<any>()
    const [billingDistrictData, setBillingDistrictData] = useState<any>()
    const [billingPincodeData, setBillingPincodeData] = useState<any>()
    const { allStates }: any = useSelector((state: RootState) => state.states)
    const { allDistricts }: any = useSelector(
        (state: RootState) => state.district
    )
    const { allPincodes }: any = useSelector(
        (state: RootState) => state.pincode
    )

    //hooks call
    const { country:allCountry } = useCountries()
    //REGSITRATION state hook
    const { stateByCountry } = useStatesByCountry(
        formikProps.values.registrationAddress.countryId
    )
    //billing state hook
    const { stateByCountry: StateDataB } = useStatesByCountry(
        formikProps.values.billingAddress.countryId
    )
    // //registraion

    const { stateDistricts } = useStateDistricts(
        formikProps.values.registrationAddress.stateId
    )
    //billing district
    const { stateDistricts: districtDataB } = useStateDistricts(
        formikProps.values.billingAddress.stateId
    )
    //registration
    const { pincodeByDistrict } = usePincodesByDistrict(
        formikProps.values.registrationAddress.districtId
    )
    //billing
    const { pincodeByDistrict: pincodeDataB } = usePincodesByDistrict(
        formikProps.values.billingAddress.districtId
    )


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
    }, [pincodeByDistrict, dispatch])
    //billing
    useEffect(() => {
        if (pincodeDataB) {
            setBillingPincodeData(pincodeDataB)
        }
    }, [pincodeDataB, dispatch])

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
