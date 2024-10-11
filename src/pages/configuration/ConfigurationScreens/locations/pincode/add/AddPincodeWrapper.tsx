// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { object, string, array } from 'yup'
import { Formik } from 'formik'
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AddPincodeDialog from './AddPincodeDialog'
import { useAddPincodeMutation } from 'src/services/PinCodeService'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    onClose: () => void
}
export type FormInitialValues = {
    countryId?: string
    stateId?: string
    districtId?: string
    tehsilId?: string
    pincode: string
    preferredCourier: any[]
    isFixed: boolean
}

const AddPincodeWrapper = ({ onClose }: Props) => {
    const [AddPincode] = useAddPincodeMutation()
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state?.country
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state?.states
    )
    const {
        selectedLocationTehsil,
        // preffredCourier
    }: any = useSelector(
        (state: RootState) => state?.tehsils
    )
    const { selectedLocationDistrict }: any = useSelector(
        (state: RootState) => state?.district
    )

    const [apiStatus, setApiStatus] = useState(false)
    const initialValues: FormInitialValues = {
        pincode: '',
        preferredCourier: [],
        isFixed: false,
    }

    const validationSchema = object({
        pincode: string().required('Pincode is required'),
        preferredCourier: array()
            .of(object())
            .required('Preferred courier is required')
            .min(1, 'At least one courier is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        const formatedPriority = values?.preferredCourier?.map(
            (ele: any, ind: number) => ({
                courierId: ele?.value,
                courierName: ele?.label,
                priority: ind + 1,
            })
        )
        setTimeout(() => {
            AddPincode({
                pincode: values.pincode,
                stateId: selectedLocationState || '',
                preferredCourier: formatedPriority || [],
                isFixed: values.isFixed,
                tehsilId: selectedLocationTehsil || '',
                districtId: selectedLocationDistrict || '',
                countryId: selectedLocationCountries || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        onClose()
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

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddPincodeDialog
                        onClose={onClose}
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        formType="ADD"
                    />
                )
            }}
        </Formik>
    )
}

export default AddPincodeWrapper
