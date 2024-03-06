import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import {
    useGetdispositionOneByIdQuery,
    useUpdatedispositionOneMutation,
} from 'src/services/configurations/DispositiononeServices'
import { useNavigate, useParams } from 'react-router-dom'
import AddDispositionOne from './EditDispositionOne'

import { setSelectedDispositionOne } from 'src/redux/slices/configuration/dispositionOneSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

export type FormInitialValues = {
    dispositionName: string
}
const EditDispositionOneWrappper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [editDispositionOne] = useUpdatedispositionOneMutation()
    const params = useParams()
    const Id = params.id
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const { selectedDispositionOne }: any = useSelector(
        (state: RootState) => state?.dispositionOne
    )

    const { data, isLoading, isFetching } = useGetdispositionOneByIdQuery(Id)
    const initialValues: FormInitialValues = {
        dispositionName: selectedDispositionOne?.dispositionName || '',
    }

    useEffect(() => {
        if (!isLoading && !isFetching)
            dispatch(setSelectedDispositionOne(data?.data))
    }, [data, dispatch, isFetching, isLoading])

    const validationSchema = object({
        dispositionName: string().required('Required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
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
                        showToast('success', 'Updated successfully!')
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
        <Formik
            enableReinitialize
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
    )
}

export default EditDispositionOneWrappper
