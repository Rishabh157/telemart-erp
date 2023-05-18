import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import {  object, string } from 'yup'
import AddDispositionOne from './AddDispositionOne'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { useAdddispositionOneMutation ,useGetdispositionOneByIdQuery } from 'src/services/configurations/DispositiononeServices'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { setAllItems } from 'src/redux/slices/attributesSlice'

type Props = {}

export type FormInitialValues = {
    dispositionName: string
    
}

const AddDispositionOneWrapper = (props: Props) => {
    const navigate = useNavigate()
    // Form Initial Values
    const dispatch = useDispatch()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { data, isLoading, isFetching } = useGetdispositionOneByIdQuery('')
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [AddDispositionOneApi] = useAdddispositionOneMutation()

    const initialValues: FormInitialValues = {
        dispositionName: '',
    }
    // Form Validation Schema
    const validationSchema = object({
        dispositionName: string().required('Group name is required'),

    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddDispositionOneApi({
                dispositionName: values.dispositionName,
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'disposition  added successfully!'
                        )
                        navigate('/configurations/disposition-one')
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
        dispatch(setAllItems(data?.data))
    }, [dispatch, data, isLoading, isFetching])

    return (
        <ConfigurationLayout>
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
        </ConfigurationLayout>
    )
}

export default AddDispositionOneWrapper
