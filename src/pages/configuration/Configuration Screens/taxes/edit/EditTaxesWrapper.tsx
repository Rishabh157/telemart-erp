import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedTaxes } from 'src/redux/slices/TaxesSlice'
import {
    useGetTaxesByIdQuery,
    useUpdateTaxesMutation,
} from 'src/services/TaxesService'
import EditTaxesListing from './EditTaxesListing'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

type Props = {}

export type FormInitialValues = {
    taxName: string
}

const EditTaxesWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const { selectedTaxes }: any = useSelector((state: RootState) => state.tax)
    const { userData } = useSelector((state: RootState) => state?.auth)

    const [EditTaxes] = useUpdateTaxesMutation()
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const { data, isLoading } = useGetTaxesByIdQuery(Id)

    const initialValues: FormInitialValues = {
        taxName: selectedTaxes?.taxName || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        taxName: string().required('Tax Name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        setTimeout(() => {
            EditTaxes({
                body: {
                    taxName: values.taxName,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Taxes updated successfully!')
                        navigate('/configurations/taxes')
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
        dispatch(setSelectedTaxes(data?.data))
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
                        <EditTaxesListing
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default EditTaxesWrapper
