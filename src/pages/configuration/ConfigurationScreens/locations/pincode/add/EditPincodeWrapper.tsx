// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { object, array } from 'yup'
import { Formik } from 'formik'

// |-- Internal Dependencies --|
import AddPincodeDialog from './AddPincodeDialog'
import {
    useGetPincodeByIdQuery,
    useUpdatePincodeMutation,
} from 'src/services/PinCodeService'
import { showToast } from 'src/utils'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

// |-- Types --|
type Props = {
    id: string
    onClose: () => void
}

export type FormInitialValues = {
    pincode: string
    preferredCourier: any[]
    isFixed: boolean
}

const EditPincodeWrapper = ({ id, onClose }: Props) => {
    const [apiStatus, setApiStatus] = useState(false)
    const [updatePincode] = useUpdatePincodeMutation()

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetPincodeByIdQuery(id || '', {
            skip: !id,
        }),
    })

    const initialValues: FormInitialValues = {
        pincode: selectedItem?.[0]?.pincode,
        preferredCourier:
            selectedItem?.[0]?.preferredCourier?.map((ele: any) => ({
                label: ele?.courierName,
                value: ele?.courierId,
            })) || [],
        isFixed: selectedItem?.[0]?.isFixed,
    }

    const validationSchema = object({
        preferredCourier: array()
            .of(object())
            .required('Preferred courier is required')
            .min(1, 'At least one courier is required'),
    })

    const onSubmitHandler: any = (values: FormInitialValues) => {
        setApiStatus(true)

        setTimeout(() => {
            updatePincode({
                id,
                body: {
                    // stateName: values.stateName,
                    preferredCourier: values.preferredCourier,
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
                    <AddPincodeDialog
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

export default EditPincodeWrapper
