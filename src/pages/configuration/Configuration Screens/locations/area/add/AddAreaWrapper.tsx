import React, { useState } from 'react'
import AddAreaDialog from './AddAreaDialog'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useAddAreaMutation } from 'src/services/AreaService'

type Props = {
    onClose: () => void
}

export type FormInitialValues = {
    area: string
}

const AddAreaWrapper = ({ onClose }: Props) => {
    const [AddArea] = useAddAreaMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state?.country
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state?.states
    )
    const { selectedLocationDistrict }: any = useSelector(
        (state: RootState) => state?.district
    )
    const { selectedLocationPincode }: any = useSelector(
        (state: RootState) => state.pincode
    )
    const { selectedLocationTehsil }: any = useSelector(
        (state: RootState) => state.tehsils
    )

    const initialValues: FormInitialValues = {
        area: '',
    }
    const validationSchema = object({
        area: string().required('Required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddArea({
                area: values.area,
                pincodeId: selectedLocationPincode?.value || '',
                tehsilId: selectedLocationTehsil?.value || '',
                districtId: selectedLocationDistrict?.value || '',
                stateId: selectedLocationState?.value || '',
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
                        <AddAreaDialog
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

export default AddAreaWrapper
