import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import AddInitialCallTwo from './AddInitialCallTwo'
import { useAddinitialCallerTwoMutation } from 'src/services/configurations/InitialCallerTwoServices'

import { setFieldCustomized } from 'src/redux/slices/authSlice'

export type FormInitialValues = {
    initialCallName: string
    callType: string
    initialCallOneId: string
}
const AddInitialCallTwoWrapper = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [addinitialCallTwo] = useAddinitialCallerTwoMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        initialCallName: '',
        callType: '',
        initialCallOneId: '',
    }
    const validationSchema = object({
        initialCallName: string().required('Required'),
        callType: string().required('Required'),
        initialCallOneId: string().required('Required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addinitialCallTwo({
                initialCallName: values.initialCallName,
                callType: values.callType,
                initialCallOneId: values.initialCallOneId || '',
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/dispositions/initialcall-two')
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
            <>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmitHandler}
                >
                    {(formikProps: any) => {
                        return (
                            <AddInitialCallTwo
                                apiStatus={apiStatus}
                                formikProps={formikProps}
                            />
                        )
                    }}
                </Formik>
            </>
        </>
    )
}

export default AddInitialCallTwoWrapper
