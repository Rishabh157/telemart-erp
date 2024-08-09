// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { object, string, array } from 'yup'
import { Formik } from 'formik'

// |-- Internal Dependencies --|
import AddStateDialog from './AddStateDialog'
import { useAddStateMutation } from 'src/services/StateService'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    onClose: () => void
}

export type FormInitialValues = {
    stateName: string
    preferredCourier: any[]
    isUnion: boolean
    isFixed: boolean
}

const AddStateWrapper = ({ onClose }: Props) => {
    const [apiStatus, setApiStatus] = useState(false)
    const [addState] = useAddStateMutation()
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state?.country
    )

    const initialValues: FormInitialValues = {
        stateName: '',
        preferredCourier: [],
        isUnion: false,
        isFixed: false,
    }

    const validationSchema = object({
        stateName: string().required('State Name is required'),
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
            addState({
                stateName: values.stateName,
                preferredCourier: formatedPriority,
                isUnion: values.isUnion,
                isFixed: values.isFixed,
                countryId: selectedLocationCountries || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'State added successfully!')
                        onClose()
                        setApiStatus(false)
                    } else {
                        showToast('error', res?.data?.message)
                        setApiStatus(false)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                    setApiStatus(false)
                }
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
                    <AddStateDialog
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

export default AddStateWrapper
