/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:EditAssetsLocationWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import EditAsstesLocation from './EditAssetsLocation'
import {
    useUpdateAssetsLocationMutation,
    useGetAssetsLocationByIdQuery,
} from 'src/services/assets/AssetsLocationService'
import { showToast } from 'src/utils'
import { setSelectedLocation } from 'src/redux/slices/assets/assetsLocationSlice'


// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    locationName: string
}

const EditAssetsLocationWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [editLocation] = useUpdateAssetsLocationMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem } = useSelector(
        (state: RootState) => state?.assetLocation
    )
    const { data, isLoading, isFetching } = useGetAssetsLocationByIdQuery(Id)
    const initialValues: FormInitialValues = {
        locationName: selectedItem?.locationName || '',
    }

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedLocation(data?.data))
        }
    }, [data, isFetching, isLoading])
    // Form Validation Schema
    const validationSchema = object({
        locationName: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            editLocation({
                body: {
                    locationName: values.locationName,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/assets/assets-location')
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
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditAsstesLocation
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </>
    )
}

export default EditAssetsLocationWrapper
