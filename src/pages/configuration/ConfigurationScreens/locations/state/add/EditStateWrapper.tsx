// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { object, string } from 'yup'
import { Formik } from 'formik'

// |-- Internal Dependencies --|
import AddStateDialog from './AddStateDialog'
import {
    useGetStateByIdQuery,
    useUpdateStateMutation,
} from 'src/services/StateService'
import { showToast } from 'src/utils'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

// |-- Types --|
type Props = {
    id: string
    onClose: () => void
}

export type FormInitialValues = {
    stateName: string
    preferredCourier: string
    isUnion: boolean
    isFixed: boolean
}

const EditStateWrapper = ({ id, onClose }: Props) => {
    const [apiStatus, setApiStatus] = useState(false)
    const [updateState] = useUpdateStateMutation()

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetStateByIdQuery(id || '', {
            skip: !id,
        }),
    })

    const initialValues: FormInitialValues = {
        stateName: selectedItem?.stateName,
        preferredCourier: selectedItem?.preferredCourier,
        isUnion: selectedItem?.isUnion,
        isFixed: selectedItem?.isFixed,
    }

    const validationSchema = object({
        stateName: string().required('State Name is required'),
        preferredCourier: string().required('Preferred courier is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            updateState({
                id,
                body: {
                    // stateName: values.stateName,
                    preferredCourier: values.preferredCourier,
                    isUnion: values.isUnion,
                    isFixed: values.isFixed,
                    // countryId: selectedLocationCountries || '',
                    // companyId: userData?.companyId || '',
                },
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
            enableReinitialize
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
                        formType="EDIT"
                    />
                )
            }}
        </Formik>
    )
}

export default EditStateWrapper
