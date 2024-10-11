// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { object, array, string } from 'yup'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AddTehsilDialog from './AddTehsilDialog'
import {
    useGetTehsilByIdQuery,
    useUpdateTehsilMutation,
} from 'src/services/TehsilService'
import { showToast } from 'src/utils'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { AppDispatch, RootState } from 'src/redux/store'
import { setSelctedTehsilPreffredCourier } from 'src/redux/slices/tehsilSlice'

// |-- Types --|
type Props = {
    id: string
    onClose: () => void
}

export type FormInitialValues = {
    countryId: string
    stateId: string
    districtId: string
    tehsilName: string
    preferredCourier: any[]
    isFixed: boolean
}

const EditTehsiltWrapper = ({ id, onClose }: Props) => {
    const [apiStatus, setApiStatus] = useState(false)
    const [updateTehsil] = useUpdateTehsilMutation()
    const dispatch = useDispatch<AppDispatch>()

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetTehsilByIdQuery(id || '', {
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

    const initialValues: FormInitialValues = {
        countryId: selectedLocationCountries,
        stateId: selectedLocationState,
        districtId: selectedLocationDistrict,
        tehsilName: selectedItem?.tehsilName,
        preferredCourier:
            selectedItem?.preferredCourier?.map((ele: any) => ({
                label: ele?.courierName,
                value: ele?.courierId,
            })) || [],
        isFixed: selectedItem?.isFixed,
    }

    const validationSchema = object({
        countryId: string().required('Country is required'),
        stateId: string().required('State is required'),
        districtId: string().required('District is required'),
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
            updateTehsil({
                id,
                body: {
                    countryId: values.countryId || '',
                    stateId: values.stateId || '',
                    districtId: values.districtId || '',
                    preferredCourier: formatedPriority || [],
                    isFixed: values.isFixed,
                },
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'District Updated successfully!')
                        onClose()
                        setApiStatus(false)
                        dispatch(
                            setSelctedTehsilPreffredCourier(
                                res?.data?.data?.preferredCourier
                            )
                        )
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
                    <AddTehsilDialog
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

export default EditTehsiltWrapper
