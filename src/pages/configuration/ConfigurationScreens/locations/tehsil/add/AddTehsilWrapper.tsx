// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { object, string } from 'yup'
import { Formik } from 'formik'

// |-- Internal Dependencies --|
import AddTehsilDialog from './AddTehsilDialog'
import { useAddTehsilMutation } from 'src/services/TehsilService'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    onClose: () => void
}

export type FormInitialValues = {
    tehsilName: string
    preferredCourier: string
    isFixed: boolean
}

const AddTehsilWrapper = ({ onClose }: Props) => {
    const [addTehsil] = useAddTehsilMutation()
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state?.country
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state?.states
    )
    const { selectedLocationDistrict, preffredCourier }: any = useSelector(
        (state: RootState) => state?.district
    )

    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        tehsilName: '',
        preferredCourier: preffredCourier,
        isFixed: false,
    }

    const validationSchema = object({
        tehsilName: string().required('Tehsil  Name is required'),
        preferredCourier: string().required('Preferred Courier is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addTehsil({
                tehsilName: values.tehsilName,
                countryId: selectedLocationCountries || '',
                stateId: selectedLocationState || '',
                preferredCourier: values.preferredCourier || '',
                districtId: selectedLocationDistrict || '',
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
        <Formik
            enableReinitialize
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
                        formType="ADD"
                    />
                )
            }}
        </Formik>
    )
}

export default AddTehsilWrapper
