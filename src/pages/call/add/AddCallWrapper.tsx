import React, { useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import AddInfluencer from './AddCall'
import { useAddInfluencerMutation } from 'src/services/websites/InfluencerServices'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import AddCall from './AddCall'

type Props = {}

export type FormInitialValues = {
    name: string
    schemeId: string
    startDate: string
    endDate: string
}

const AddCallWrapper = (props: Props) => {
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
        //console.log(values)
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
        <ConfigurationLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddCall
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default AddCallWrapper
