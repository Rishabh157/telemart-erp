// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { object, array, string } from 'yup'
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
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    id: string
    onClose: () => void
}

export type FormInitialValues = {
    countryId: string
    stateId: string
    districtId: string
    tehsilId: string
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

    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state?.country
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state?.states
    )
    const { selectedLocationDistrict }: any = useSelector(
        (state: RootState) => state?.district
    )
    const { selectedLocationTehsil }: any = useSelector(
        (state: RootState) => state.tehsils
    )

    const initialValues: FormInitialValues = {
        countryId: selectedLocationCountries,
        stateId: selectedLocationState,
        districtId: selectedLocationDistrict,
        tehsilId: selectedLocationTehsil,
        pincode: selectedItem?.[0]?.pincode,
        preferredCourier:
            selectedItem?.[0]?.preferredCourier?.map((ele: any) => ({
                label: ele?.courierName,
                value: ele?.courierId,
            })) || [],
        isFixed: selectedItem?.[0]?.isFixed,
    }

    const validationSchema = object({

        countryId: string().required('Country is required'),
        stateId: string().required('State is required'),
        districtId: string().required('District is required'),
        tehsilId: string().required('Tehsil is required'),
        preferredCourier: array()
            .of(object())
            .required('Preferred courier is required')
            .min(1, 'At least one courier is required'),
    })

    const onSubmitHandler: any = (values: FormInitialValues) => {
        setApiStatus(true)

        const formatedPriority = values?.preferredCourier?.map(
            (ele: any, ind: number) => ({
                courierId: ele?.value,
                courierName: ele?.label,
                priority: ind + 1,
            })
        )

        setTimeout(() => {
            updatePincode({
                id,
                body: {
                    countryId: values.countryId || '',
                    stateId: values.stateId || '',
                    districtId: values.districtId || '',
                    tehsilId: values.tehsilId || '',
                    preferredCourier: formatedPriority || [],
                    isFixed: values.isFixed,
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
                        formikProps={formikProps as any}
                        formType="EDIT"
                    />
                )
            }}
        </Formik>
    )
}

export default EditPincodeWrapper
