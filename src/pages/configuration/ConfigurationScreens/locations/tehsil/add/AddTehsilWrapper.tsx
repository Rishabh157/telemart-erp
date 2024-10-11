// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { object, string, array } from 'yup'
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
    countryId?: string
    stateId?: string
    districtId?: string
    tehsilName: string
    preferredCourier: any[]
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
    const { selectedLocationDistrict,
        // preffredCourier
    }: any = useSelector(
        (state: RootState) => state?.district
    )

    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        tehsilName: '',
        preferredCourier: [],
        isFixed: false,
    }

    const validationSchema = object({
        tehsilName: string().required('Tehsil  Name is required'),
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
            addTehsil({
                tehsilName: values.tehsilName,
                countryId: selectedLocationCountries || '',
                stateId: selectedLocationState || '',
                preferredCourier: formatedPriority || [],
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
