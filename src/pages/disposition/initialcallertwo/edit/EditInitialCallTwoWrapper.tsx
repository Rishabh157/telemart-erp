import { Formik } from 'formik'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from 'src/redux/store'
import { showToast } from 'src/utils'
import { object, string } from 'yup'

import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import {
    useGetinitialCallerTwoByIdQuery,
    useUpdateinitialCallerTwoMutation,
} from 'src/services/configurations/InitialCallerTwoServices'
import EditInitialCallTwo from './EditInitialCallTwo'

export type FormInitialValues = {
    initialCallName: string
    callType: string
    initialCallOneId: string
    initialCallDisplayName: string
}
const EditInitialCallTwoWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const [editInitialCallTwo] = useUpdateinitialCallerTwoMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const { items: selectedInitialCallerTwo } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetinitialCallerTwoByIdQuery(Id),
    })
    const initialValues: FormInitialValues = {
        initialCallName: selectedInitialCallerTwo?.initialCallName || '',
        callType: selectedInitialCallerTwo?.callType || '',
        initialCallOneId: selectedInitialCallerTwo?.initialCallOneId || '',
        initialCallDisplayName:
            selectedInitialCallerTwo?.initialCallDisplayName || '',
    }

    const validationSchema = object({
        initialCallName: string().required('Intial call name is required'),
        initialCallOneId: string().required('Intial call one id is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            editInitialCallTwo({
                body: {
                    initialCallName: values.initialCallName,
                    initialCallOneId: values.initialCallOneId,
                    callType: values.callType,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
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
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: any) => {
                return (
                    <EditInitialCallTwo
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default EditInitialCallTwoWrapper
