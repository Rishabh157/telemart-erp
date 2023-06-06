import React, { useState } from 'react'
import { Formik } from 'formik'
import { object, string, number } from 'yup'
import AddCompetitor from './Addcompetitor'
// import { useAddCompetitorsMutation } from 'src/services/AttributeService'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useAddcompetitorMutation } from 'src/services/media/CompetitorManagementServices'
import MediaLayout from '../../MediaLayout'

type Props = {}

export type FormInitialValues = {
    competitorName: string
    companyName: string
    productName: string
    websiteLink: string
    youtubeLink: string
    whatsapp: string
    price: string
}

const AddCompetitorWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addCompetitor] = useAddcompetitorMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        competitorName: '',
        companyName: '',
        productName: '',
        websiteLink: '',
        youtubeLink: '',
        whatsapp: '',
        price: '0',
    }

    // Form Validation Schema
    const validationSchema = object({
        competitorName: string().required('compititor Name is required'),
        productName: string(),
        websiteLink: string(),
        youtubeLink: string(),
        whatsapp: string(),
        price: number()
            .typeError('Price must be a number')
            .positive(' Must be a positive number.'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addCompetitor({
                competitorName: values.competitorName,
                companyName: values.companyName,
                productName: values.productName,
                websiteLink: values.websiteLink,
                youtubeLink: values.youtubeLink,
                whatsapp: values.whatsapp,
                price: values.price,
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
        <MediaLayout>
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
        </MediaLayout>
    )
}

export default AddCompetitorWrapper
