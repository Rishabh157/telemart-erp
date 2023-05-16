import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import EditAttribute from './EditAttribute'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import {
    useGetattributesByIdQuery,
    useUpdateattributesMutation,
} from 'src/services/AttributeService'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedAttribute } from 'src/redux/slices/attributesSlice'
import { RootState } from 'src/redux/store'

type Props = {}

export type FormInitialValues = {
    attributeName: string
}

const EditAttributeWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const { selectedAttribute }: any = useSelector(
        (state: RootState) => state.attributes
    )
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [EditAttributes] = useUpdateattributesMutation()
    const { data, isLoading } = useGetattributesByIdQuery(Id)
    const initialValues: FormInitialValues = {
        attributeName: selectedAttribute?.attributeName || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        attributeName: string().required('Attribute Name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            EditAttributes({
                body: {
                    attributeName: values.attributeName,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'attributes updated successfully!')
                        navigate('/configurations/attributes')
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
        dispatch(setSelectedAttribute(data?.data))
    }, [dispatch, data, isLoading])
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
                        <EditAttribute
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default EditAttributeWrapper
