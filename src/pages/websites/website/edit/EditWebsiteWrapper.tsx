import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import EditWebsite from './EditWebsite'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import {
    useGetWebsiteByIdQuery,
    useUpdateWebsiteMutation,
} from 'src/services/websites/WebsiteServices'
import { setSelectedWebsite } from 'src/redux/slices/website/websiteSlice'
import WebsitesLayout from '../../WebsiteLayout'

type Props = {}

export type FormInitialValues = {
    websiteName: string
}

const EditWebsiteWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const { selectedItem }: any = useSelector(
        (state: RootState) => state.website
    )
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [editWebsites] = useUpdateWebsiteMutation()
    const { data, isLoading, isFetching } = useGetWebsiteByIdQuery(Id)
    const initialValues: FormInitialValues = {
        websiteName: selectedItem?.websiteName || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        websiteName: string().required('Website Name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            editWebsites({
                body: {
                    websiteName: values.websiteName,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Website updated successfully!')
                        navigate('/all-websites/website')
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
        dispatch(setSelectedWebsite(data?.data))
    }, [dispatch, data, isLoading, isFetching])
    return (
        <WebsitesLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <>
                            <EditWebsite
                                apiStatus={apiStatus}
                                formikProps={formikProps}
                            />
                        </>
                    )
                }}
            </Formik>
        </WebsitesLayout>
    )
}

export default EditWebsiteWrapper
