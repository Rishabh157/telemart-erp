import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useAddinitialCallerOneMutation } from 'src/services/configurations/InitialCallerOneServices'
import AddInitialCallOne from './AddInitialCallOne'
import { useNavigate } from 'react-router-dom'

import { setFieldCustomized } from 'src/redux/slices/authSlice'

export type FormInitialValues = {
    initialCallName: string
    callType: string
}
const AddInitialCallOneWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [AddInitialcallOne] = useAddinitialCallerOneMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        initialCallName: '',
        callType: '',
    }
    const validationSchema = object({
        initialCallName: string().required('Required'),
        callType: string().required('Required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            AddInitialcallOne({
                initialCallName: values.initialCallName,
                callType: values.callType,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/dispositions/initialcall-one')
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
                            <AddInitialCallOne
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

export default AddInitialCallOneWrapper
