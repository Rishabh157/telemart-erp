import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useUpdateinitialCallerOneMutation } from 'src/services/configurations/InitialCallerOneServices'
import { useNavigate, useParams } from 'react-router-dom'

import EditInitialCallOne from './EditInitialCallOne'
import { useGetinitialCallerOneByIdQuery } from 'src/services/configurations/InitialCallerOneServices'
import { setSelectedInitialOne } from 'src/redux/slices/configuration/initialCallerOneSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

export type FormInitialValues = {
    initialCallName: string
    callType: string
}
const EditInitialCallOneWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const [editInitialcallOne] = useUpdateinitialCallerOneMutation()

    const { selectedInitialOne }: any = useSelector(
        (state: RootState) => state.initialCallerOne
    )

    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        initialCallName: selectedInitialOne?.initialCallName || '',
        callType: selectedInitialOne?.callType || '',
    }
    const validationSchema = object({
        initialCallName: string().required('Required'),
        callType: string().required('Required'),
    })

    const { data, isFetching, isLoading } = useGetinitialCallerOneByIdQuery(Id)

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setSelectedInitialOne(data?.data || []))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data])
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
        <>
            <>
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
            </>
        </>
    )
}

export default EditInitialCallOneWrapper
