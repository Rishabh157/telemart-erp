/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import EditAsstesLocation from './EditAssetsLocation'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import {
    useUpdateAssetsLocationMutation,
    useGetAssetsLocationByIdQuery,
} from 'src/services/assets/AssetsLocationService'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { setSelectedLocation } from 'src/redux/slices/assets/assetsLocationSlice'

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
        <ConfigurationLayout>
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
        </ConfigurationLayout>
    )
}

export default EditAssetsLocationWrapper
