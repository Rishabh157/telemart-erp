import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string, number } from 'yup'
import EditCompetitor from './EditCompetitor'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import {
    useGetCompetitorByIdQuery,
    useUpdatecompetitorMutation,
} from 'src/services/media/CompetitorManagementServices'
import { setSelectedCompetitor } from 'src/redux/slices/media/competitorManagementSlice'
import MediaLayout from '../../MediaLayout'

type Props = {}

export type FormInitialValues = {
    competitorName: string
    companyName: string
    productName: string
    websiteLink: string
    youtubeLink: string
    schemePrice: string
    whatsappNo:string
}

const EditCompetitorWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const { selectedItem }: any = useSelector(
        (state: RootState) => state.competitor
    )
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [EditCompetitors] = useUpdatecompetitorMutation()
    const { data, isLoading, isFetching } = useGetCompetitorByIdQuery(Id)
    const initialValues: FormInitialValues = {
        competitorName: selectedItem?.competitorName || '',
        companyName: '',
        productName: '',
        websiteLink: '',
        youtubeLink: '',
        schemePrice: '0',
        whatsappNo:''
    }

    // Form Validation Schema
    const validationSchema = object({
        competitorName: string().required('Competitor Name is required'),
        companyName: string(),
        productName: string(),
        websiteLink: string(),
        youtubeLink: string(),
        whatsappNo:string(),
        schemePrice: number()
            .typeError('schemePrice must be a number')
            .positive(' Must be a positive number.'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            EditCompetitors({
                body: {
                    competitorName: values.competitorName,
                    companyName: values.companyName,
                    productName: values.productName,
                    websiteLink: values.websiteLink,
                    youtubeLink: values.youtubeLink,
                    schemePrice: values.schemePrice,
                    whatsappNo:values.whatsappNo,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Competitor updated successfully!')
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

    useEffect(() => {
        dispatch(setSelectedCompetitor(data?.data))
    }, [dispatch, data, isLoading, isFetching])
    return (
        <MediaLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <>
                            <EditCompetitor
                                apiStatus={apiStatus}
                                formikProps={formikProps}
                            />
                        </>
                    )
                }}
            </Formik>
        </MediaLayout>
    )
}

export default EditCompetitorWrapper
