import React, { useEffect, useState } from 'react'
import AddCountryDialog from './EditDispositionOne'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import {
    useAdddispositionOneMutation,
    useGetdispositionOneByIdQuery,
    useUpdatedispositionOneMutation,
} from 'src/services/configurations/DispositiononeServices'
import { useNavigate, useParams } from 'react-router-dom'
import AddDispositionOne from './EditDispositionOne'
import DispositionLayout from '../../DispositionLayout'

export type FormInitialValues = {
    dispositionName: string
}
const AddDispositionOneWrappper = () => {
    const navigate = useNavigate()
    const [editDispositionOne] = useUpdatedispositionOneMutation()
    const params = useParams()
    const Id = params.id
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const { selectedDispositionOne } = useSelector(
        (state: RootState) => state?.dispositionOne
    )

    const { data, isLoading, isFetching } = useGetdispositionOneByIdQuery(Id)
    const initialValues: FormInitialValues = {
        dispositionName: '',
    }

    useEffect(() => {})

    const validationSchema = object({
        dispositionName: string().required('Name is required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            editDispositionOne({
                body: {
                    dispositionName: values.dispositionName,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Disposition added successfully!')
                        navigate('/dispositions/disposition-one')
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
        <>
            <DispositionLayout>
                {' '}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmitHandler}
                >
                    {(formikProps) => {
                        return (
                            <AddDispositionOne
                                apiStatus={apiStatus}
                                formikProps={formikProps}
                            />
                        )
                    }}
                </Formik>
            </DispositionLayout>
        </>
    )
}

export default AddDispositionOneWrappper
