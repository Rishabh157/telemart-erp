// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { Field } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditVendorWrapper'
import StepEditAddress from './StepEditAddress'

// |-- Redux --|
import useCountries from 'src/hooks/useCountry'
import useStateDistricts from 'src/hooks/useDistrictsByState'
import usePincodesByDistrict from 'src/hooks/usePincodesByDistrict'
import useStatesByCountry from 'src/hooks/useStatesByCountry'
import { setAllDistrict } from 'src/redux/slices/districtSlice'
import { setAllPincodes } from 'src/redux/slices/pincodeSlice'
import { setAllStates } from 'src/redux/slices/statesSlice'
import { AppDispatch, RootState } from 'src/redux/store'

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
        sectionName: 'Registration  Address',
        fields: [
            {
                name: 'regd_address.phone',
                label: 'Phone',
                placeholder: 'Phone',
                required: true,
            },
            {
                name: 'regd_address.address',
                label: 'Address',
                placeholder: 'Address',
                required: true,
            },
            {
                name: 'regd_address.country',
                label: 'Country',
                placeholder: 'Country',
                type: 'select',
                optionAccessKey: 'counrtyOptions',
                required: true,
            },
            {
                name: 'regd_address.state',
                label: 'State',
                placeholder: 'State',
                type: 'select',
                optionAccessKey: 'stateOptions',
                required: true,
            },
            {
                name: 'regd_address.district',
                label: 'District',
                placeholder: 'District',
                type: 'select',
                optionAccessKey: 'districtOptions',
                required: true,
            },
            {
                name: 'regd_address.pincode',
                label: 'Pincode',
                placeholder: 'Pincode',
                type: 'select',
                optionAccessKey: 'pincodeOptions',
                required: true,
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
                name: 'billing_address.phone',
                label: 'Phone',
                placeholder: 'Phone',
                required: true,
            },
            {
                name: 'billing_address.address',
                label: 'Address',
                placeholder: 'Address',
                required: true,
            },
            {
                name: 'billing_address.country',
                label: 'Country',
                placeholder: 'Country',
                type: 'select',
                optionAccessKey: 'billingCounrtyOptions',
                required: true,
            },
            {
                name: 'billing_address.state',
                label: 'State',
                placeholder: 'State',
                type: 'select',
                optionAccessKey: 'billingStateOptions',
                required: true,
            },
            {
                name: 'billing_address.district',
                label: 'District',
                placeholder: 'District',
                type: 'select',
                optionAccessKey: 'billingDistrictOptions',
                required: true,
            },
            {
                name: 'billing_address.pincode',
                label: 'Pincode',
                placeholder: 'Pincode',
                type: 'select',
                optionAccessKey: 'billingPincodeOptions',
                required: true,
            },
        ],
    },
]

const StepEditAddressWrapper = ({ formikProps }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [billingStateData, setBillingStateData] = useState<any>()
    const [billingDistrictData, setBillingDistrictData] = useState<any>()
    const [billingPincodeData, setBillingPincodeData] = useState<any>()

    const { country: allCountry } = useCountries()

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateByCountry])
    //billing state
    useEffect(() => {
        if (StateDataB) {
            setBillingStateData(StateDataB)
        }
    }, [StateDataB])

    //registration
    useEffect(() => {
        if (stateDistricts) {
            dispatch(setAllDistrict(stateDistricts))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateDistricts])
    //billing
    useEffect(() => {
        if (districtDataB) {
            setBillingDistrictData(districtDataB)
        }
    }, [districtDataB])
    //registration
    useEffect(() => {
        dispatch(setAllPincodes(pincodeByDistrict))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincodeByDistrict])
    //billing
    useEffect(() => {
        setBillingPincodeData(pincodeDataB)
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

    return (
        <StepEditAddress
            formikProps={formikProps}
            formFields={formFields}
            dropdownOptions={dropdownOptions}
        />
    )
}

export default StepEditAddressWrapper
