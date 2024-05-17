import { Formik } from 'formik'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { RootState } from 'src/redux/store'
import {
    useGetInitialCallerThreeByIdQuery,
    useUpdateInitialCallerThreeMutation,
} from 'src/services/configurations/InitialCallerThreeServices'
import { showToast } from 'src/utils'
import { array, boolean, object, string } from 'yup'
import EditInitialCallOne from './EditInitialCallThree'

export type FormInitialValues = {
    callType: string
    initialCallName: string
    initialCallOneId: string
    initialCallDisplayName: string
    initialCallTwoId: string
    emailType: string
    smsType: string
    returnType: string[]
    isPnd: boolean
    cancelFlag: boolean
}
const EditInitialCallThreeWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [editInitialCallThree] = useUpdateInitialCallerThreeMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)
    const params = useParams()
    const Id = params.id

    const { items: selectedInitialCallerThree } =
        useGetDataByIdCustomQuery<any>({
            useEndPointHook: useGetInitialCallerThreeByIdQuery(Id),
        })
    const initialValues: FormInitialValues = {
        callType: selectedInitialCallerThree?.callType || '',
        initialCallName: selectedInitialCallerThree?.initialCallName || '',
        initialCallOneId: selectedInitialCallerThree?.initialCallOneId || '',
        initialCallTwoId: selectedInitialCallerThree?.initialCallTwoId || '',
        initialCallDisplayName:
            selectedInitialCallerThree?.initialCallDisplayName || '',
        emailType: selectedInitialCallerThree?.emailType || '',
        smsType: selectedInitialCallerThree?.smsType || '',
        returnType: selectedInitialCallerThree?.returnType || [''],
        isPnd: selectedInitialCallerThree?.isPnd,
        cancelFlag: selectedInitialCallerThree?.cancelFlag,
    }

    const validationSchema = object({
        initialCallName: string().required('Initial Call Name is required'),
        initialCallOneId: string().required('Initial Call One is required'),
        callType: string().required('Call Type is required'),
        initialCallTwoId: string().required('Initial Call Two is required'),
        emailType: string().required('Email Type is required'),
        smsType: string().required('SMS Type is required'),
        returnType: array()
            .of(string())
            .min(1, 'At least one return type is required')
            .required('Return Type is required'),
        isPnd: boolean(),
        cancelFlag: boolean(),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            editInitialCallThree({
                body: {
                    callType: values.callType,
                    initialCallName: values.initialCallName,
                    initialCallOneId: values.initialCallOneId,
                    initialCallTwoId: values.initialCallTwoId,
                    emailType: values.emailType,
                    smsType: values.smsType,
                    returnType: values.returnType,
                    companyId: userData?.companyId || '',
                    isPnd: values.isPnd,
                    cancelFlag: values.cancelFlag,
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
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
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: any) => {
                return (
                    <EditInitialCallOne
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        dropdownoptions={dropdownoptions}
                    />
                )
            }}
        </Formik>
    )
}

export default EditInitialCallThreeWrapper
