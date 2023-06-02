import React, { useState } from 'react'
import AddPincodeDialog from './AddPincodeDialog'
import { object, string } from 'yup'
import { useAddPincodeMutation } from 'src/services/PinCodeService'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { showToast } from 'src/utils'
import { Formik } from 'formik'

type Props = {
    onClose: () => void
}
export type FormInitialValues = {
    pincode: string
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
    }
    const validationSchema = object({
        pincode: string().required('Required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddPincode({
                pincode: values.pincode,
                stateId: selectedLocationState?.value || '',
                tehsilId: selectedLocationTehsil?.value || '',
                districtId: selectedLocationDistrict?.value || '',
                countryId: selectedLocationCountries?.value || '',
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
        <>
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
        </>
    )
}

export default AddPincodeWrapper
