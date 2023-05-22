import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import EditCompetitor from './EditCompetitor'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import {
    useGetCompetitorByIdQuery,
    useUpdatecompetitorMutation,
} from 'src/services/media/CompetitorManagementServices'
import { setSelectedCompetitor } from 'src/redux/slices/media/competitorManagementSlice'

type Props = {}

export type FormInitialValues = {
    competitorName: string
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
    }

    // Form Validation Schema
    const validationSchema = object({
        competitorName: string().required('Competitor Name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            EditCompetitors({
                body: {
                    competitorName: values.competitorName,
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
        <ConfigurationLayout>
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
        </ConfigurationLayout>
    )
}

export default EditCompetitorWrapper
