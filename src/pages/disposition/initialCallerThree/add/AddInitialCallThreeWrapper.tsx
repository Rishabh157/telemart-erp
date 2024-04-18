import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { array, boolean, object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useAddInitialCallerThreeMutation } from 'src/services/configurations/InitialCallerThreeServices'
import AddInitialCallThree from './AddInitialCallThree'
import { useNavigate } from 'react-router-dom'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

export type FormInitialValues = {
    initialCallName: string
    initialCallOneId: string
    callType: string
    initialCallTwoId: string
    emailType: string
    smsType: string
    returnType: string[]
    isPnd: boolean
    cancelFlag: boolean
}
const AddInitialCallThreeWrappper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [addIntialCallThree] = useAddInitialCallerThreeMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)


    const initialValues: FormInitialValues = {
        initialCallName: '',
        initialCallOneId: '',
        callType: '',
        initialCallTwoId: '',

        emailType: '',
        smsType: '',
        returnType: [''],
        isPnd: false,
        cancelFlag: false,
    }
    const validationSchema = object({
        initialCallName: string().required('Initial Call Name is required'),
        initialCallOneId: string().required('Initial Call One is required'),
        callType: string().required('Call Type is required'),
        initialCallTwoId: string().required('Initial Call Two is required'),
        emailType: string().required('Email Type is required'),
        smsType: string().required('SMS Type is required'),
        returnType: array().of(string().required('Return Type is required')),
        isPnd: boolean(),
        cancelFlag: boolean(),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addIntialCallThree({
                initialCallName: values.initialCallName,
                initialCallOneId: values.initialCallOneId,
                callType: values.callType,
                initialCallTwoId: values.initialCallTwoId,
                emailType: values.emailType,
                smsType: values.smsType,
                returnType: values.returnType,
                companyId: userData?.companyId || '',
                isPnd: values.isPnd,
                cancelFlag: values.cancelFlag,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Call added successfully!')
                        navigate('/dispositions/initialcall-three')
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

    const dropdownoptions = {
        initialCallOneOptions: [],
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddInitialCallThree
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        dropdownoptions={dropdownoptions}
                    />
                )
            }}
        </Formik>
    )
}

export default AddInitialCallThreeWrappper
