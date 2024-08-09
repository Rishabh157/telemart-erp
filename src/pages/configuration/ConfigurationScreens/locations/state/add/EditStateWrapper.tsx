// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { object, string , array } from 'yup'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import AddStateDialog from './AddStateDialog'
import {
    useGetStateByIdQuery,
    useUpdateStateMutation,
} from 'src/services/StateService'
import { showToast } from 'src/utils'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { AppDispatch } from 'src/redux/store'
import { setSelctedStatePreffredCourier } from 'src/redux/slices/statesSlice'

// |-- Types --|
type Props = {
    id: string
    onClose: () => void
}

export type FormInitialValues = {
    stateName: string
    preferredCourier: string[]
    isUnion: boolean
    isFixed: boolean
}

const EditStateWrapper = ({ id, onClose }: Props) => {
    const [apiStatus, setApiStatus] = useState(false)
    const [updateState] = useUpdateStateMutation()
    const dispatch = useDispatch<AppDispatch>()

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetStateByIdQuery(id || '', {
            skip: !id,
        }),
    })

    const initialValues: FormInitialValues = {
        stateName: selectedItem?.stateName,
        preferredCourier:
            selectedItem?.preferredCourier?.map((ele: any) => ({
                label: ele?.courierName,
                value: ele?.courierId,
            })) || [],
        isUnion: selectedItem?.isUnion,
        isFixed: selectedItem?.isFixed,
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
            updateState({
                id,
                body: {
                    // stateName: values.stateName,
                    preferredCourier: formatedPriority || [],
                    isUnion: values?.isUnion,
                    isFixed: values?.isFixed,
                    // countryId: selectedLocationCountries || '',
                    // companyId: userData?.companyId || '',
                },
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'State added successfully!')
                        onClose()
                        setApiStatus(false)
                        dispatch(
                            setSelctedStatePreffredCourier(
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
