// import React from 'react'
// import AsstesLayout from '../../AssetsLayout'
// import AddAsstesLocation from './AddAsstesLocation'

import React, { useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import AddAsstesLocation from './AddAsstesLocation'
import { useAddAssetsLocationMutation } from 'src/services/assets/AssetsLocationService'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import AsstesLayout from '../../AssetsLayout'

type Props = {}

export type FormInitialValues = {
    locationName: string
}

const AddAssetsLocationWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addLocation] = useAddAssetsLocationMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        locationName: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        locationName: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addLocation({
                locationName: values.locationName,
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
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
        <AsstesLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddAsstesLocation
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </AsstesLayout>
    )
}

export default AddAssetsLocationWrapper
