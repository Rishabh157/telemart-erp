// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { object, string } from 'yup'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import AddDistrictDialog from './AddDistrictDialog'
import {
    useGetDistictByIdQuery,
    useUpdateDistrictMutation,
} from 'src/services/DistricService'
import { showToast } from 'src/utils'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { AppDispatch } from 'src/redux/store'
import { setSelctedDistrictPreffredCourier } from 'src/redux/slices/districtSlice'

// |-- Types --|
type Props = {
    id: string
    onClose: () => void
}

export type FormInitialValues = {
    districtName: string
    preferredCourier: string
    isFixed: boolean
}

const EditDistrictWrapper = ({ id, onClose }: Props) => {
    const [apiStatus, setApiStatus] = useState(false)
    const [updateDistrict] = useUpdateDistrictMutation()
    const dispatch = useDispatch<AppDispatch>()

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetDistictByIdQuery(id || '', {
            skip: !id,
        }),
    })

    const initialValues: FormInitialValues = {
        districtName: selectedItem?.districtName,
        preferredCourier: selectedItem?.preferredCourier,
        isFixed: selectedItem?.isFixed,
    }

    const validationSchema = object({
        preferredCourier: string().required('Preferred courier is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            updateDistrict({
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
                        showToast('success', 'District Updated successfully!')
                        onClose()
                        setApiStatus(false)
                        dispatch(
                            setSelctedDistrictPreffredCourier(
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
                    <AddDistrictDialog
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

export default EditDistrictWrapper
