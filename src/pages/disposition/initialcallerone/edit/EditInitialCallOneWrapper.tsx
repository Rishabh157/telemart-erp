import { Formik } from 'formik'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from 'src/redux/store'
import { useUpdateinitialCallerOneMutation } from 'src/services/configurations/InitialCallerOneServices'
import { showToast } from 'src/utils'
import { object, string } from 'yup'

import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { InitialCallerOneListResponse } from 'src/models/configurationModel/InitialCallerOne.model'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useGetinitialCallerOneByIdQuery } from 'src/services/configurations/InitialCallerOneServices'
import EditInitialCallOne from './EditInitialCallOne'

export type FormInitialValues = {
    initialCallName: string
    callType: string
    initialCallDisplayName: string
}
const EditInitialCallOneWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const [editInitialcallOne] = useUpdateinitialCallerOneMutation()

    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const { items: selectedInitialOne } = useGetDataByIdCustomQuery<InitialCallerOneListResponse>({
        useEndPointHook: useGetinitialCallerOneByIdQuery(Id),
    })

    const initialValues: FormInitialValues = {
        initialCallName: selectedInitialOne?.initialCallName || '',
        callType: selectedInitialOne?.callType || '',
        initialCallDisplayName:
            selectedInitialOne?.initialCallDisplayName || '',
    }
    const validationSchema = object({
        initialCallName: string().required('Required'),
        callType: string().required('Required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            editInitialcallOne({
                body: {
                    initialCallName: values.initialCallName,
                    callType: values.callType,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
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
                    />
                )
            }}
        </Formik>
    )
}

export default EditInitialCallOneWrapper
