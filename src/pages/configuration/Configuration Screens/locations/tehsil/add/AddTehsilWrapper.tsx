import React, { useState } from 'react'
import AddTehsilDialog from './AddTehsilDialog'
import { useAddTehsilMutation } from 'src/services/TehsilService'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { showToast } from 'src/utils'
import { object, string } from 'yup'
import { Formik } from 'formik'

type Props = {
    onClose: () => void
}

export type FormInitialValues = {
    tehsilName: string
}
const AddTehsilWrapper = ({ onClose }: Props) => {
    const [AddTehsil] = useAddTehsilMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state?.country
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state?.states
    )
    const { selectedLocationDistrict }: any = useSelector(
        (state: RootState) => state?.district
    )

    const [apiStatus, setApiStatus] = useState(false)
    const initialValues: FormInitialValues = {
        tehsilName: '',
    }
    const validationSchema = object({
        tehsilName: string().required('State Name is required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddTehsil({
                tehsilName: values.tehsilName,
                countryId: selectedLocationCountries?.value || '',
                stateId: selectedLocationState?.value || '',
                districtId: selectedLocationDistrict?.value || '',
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Tehsil added successfully!')
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
                        <AddTehsilDialog
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

export default AddTehsilWrapper
