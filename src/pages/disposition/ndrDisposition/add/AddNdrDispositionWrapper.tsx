import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useAddNdrDispositionMutation } from 'src/services/configurations/NdrDisositionServices'
import { useNavigate } from 'react-router-dom'
import DispositionLayout from '../../DispositionLayout'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import AddNdrDisposition from './AddNdrDisposition'

export type FormInitialValues = {
    ndrDisposition: string
}
const AddNdrDispositionWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [addDisposition] = useAddNdrDispositionMutation()
    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        ndrDisposition: '',
    }
    const validationSchema = object({
        ndrDisposition: string().required('Required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addDisposition({
                ndrDisposition: values.ndrDisposition,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/dispositions/ndr-disposition')
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
                            <AddNdrDisposition
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

export default AddNdrDispositionWrapper
