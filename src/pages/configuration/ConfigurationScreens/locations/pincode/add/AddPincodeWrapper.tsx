/// ==============================================
// Filename:AddPicodeWrapper.tsx
// Type: Add Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { object, string } from 'yup'
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
    pincode: string
    preferredCourier: string
}

const AddPincodeWrapper = ({ onClose }: Props) => {
    const [AddPincode] = useAddPincodeMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state?.country
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state?.states
    )
    const { selectedLocationTehsil }: any = useSelector(
        (state: RootState) => state?.tehsils
    )
    const { selectedLocationDistrict }: any = useSelector(
        (state: RootState) => state?.district
    )

    const [apiStatus, setApiStatus] = useState(false)
    const initialValues: FormInitialValues = {
        pincode: '',
        preferredCourier: '',
    }
    const validationSchema = object({
        pincode: string().required('Required'),
        preferredCourier: string().required('Required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddPincode({
                pincode: values.pincode,
                preferredCourier: values.preferredCourier,
                stateId: selectedLocationState || '',
                tehsilId: selectedLocationTehsil || '',
                districtId: selectedLocationDistrict || '',
                countryId: selectedLocationCountries || '',
                companyId: userData?.companyId || '',
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
                    />
                )
            }}
        </Formik>
    )
}

export default AddPincodeWrapper
