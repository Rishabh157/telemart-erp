/// ==============================================
// Filename:AddInfluencerWrapper.tsx
// Type: Add Component
// Last Updated: JULY 05, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// |-- INternal Dependencies --|
import { showToast } from 'src/utils'
import WebsiteLayout from '../../WebsiteLayout'
import AddInfluencer from './AddInfluencer'
import { useAddInfluencerMutation } from 'src/services/websites/InfluencerServices'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- TYpes --|
type Props = {}

export type FormInitialValues = {
    name: string
    schemeId: string
    startDate: string
    endDate: string
}

const AddInfluencerWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addInfluencer] = useAddInfluencerMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        name: '',
        schemeId: '',
        startDate: '',
        endDate: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        name: string().required('Required'),
        schemeId: string().required('Required'),
        startDate: string().required('Required'),
        endDate: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)

        setTimeout(() => {
            addInfluencer({
                name: values.name,
                schemeId: values.schemeId,
                startDate: values.startDate,
                endDate: values.endDate,
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/all-websites/influencers-management')
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
        <WebsiteLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddInfluencer
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </WebsiteLayout>
    )
}

export default AddInfluencerWrapper
