import React, { useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import AddCompetitor from './Addcompetitor'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
// import { useAddCompetitorsMutation } from 'src/services/AttributeService'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useAddcompetitorMutation } from 'src/services/media/CompetitorManagementServices'

type Props = {}

export type FormInitialValues = {
    competitorName: string
}

const AddCompetitorWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addCompetitor] = useAddcompetitorMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        competitorName: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        competitorName: string().required('compititor Name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addCompetitor({
                competitorName: values.competitorName,
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Compititor added successfully!')
                        navigate('/media/competitor')
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
                        <AddCompetitor
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default AddCompetitorWrapper
