import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useGetAllinitialCallerOneQuery } from 'src/services/configurations/InitialCallerOneServices'
import { useNavigate, useParams } from 'react-router-dom'
import DispositionLayout from '../../DispositionLayout'
import { setAllItems } from 'src/redux/slices/configuration/initialCallerOneSlice'
import {
    useGetinitialCallerTwoByIdQuery,
    useUpdateinitialCallerTwoMutation,
} from 'src/services/configurations/InitialCallerTwoServices'
import { setSelectedInitialCallerTwo } from 'src/redux/slices/configuration/initialCallerTwoSlice'
import EditInitialCallTwo from './EditInitialCallTwo'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

export type FormInitialValues = {
    initialCallName: string
    initialCallOneId: string
}
const EditInitialCallTwoWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const [editInitialCallTwo] = useUpdateinitialCallerTwoMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)
    const { allItems }: any = useSelector(
        (state: RootState) => state?.initialCallerOne
    )
    const { selectedInitialCallerTwo }: any = useSelector(
        (state: RootState) => state?.initialCallerTwo
    )
    const { data, isFetching, isLoading } = useGetAllinitialCallerOneQuery('')

    const {
        data: InitialCallData,
        isFetching: InitialCallIsFetching,
        isLoading: InitialCallIsLoading,
    } = useGetinitialCallerTwoByIdQuery(Id)

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setAllItems(data?.data || []))
        }
    }, [isFetching, isLoading, data, dispatch])

    const initicalCallOneOptions = allItems?.map((ele: any) => {
        return {
            label: ele.initialCallName,
            value: ele._id,
        }
    })
    useEffect(() => {
        if (!InitialCallIsFetching && !InitialCallIsLoading) {
            dispatch(setSelectedInitialCallerTwo(InitialCallData?.data || []))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [InitialCallIsLoading, InitialCallIsFetching, InitialCallData])

    const initialValues: FormInitialValues = {
        initialCallName: selectedInitialCallerTwo?.initialCallName || '',
        initialCallOneId: selectedInitialCallerTwo?.initialCallOneId || '',
    }
    const validationSchema = object({
        initialCallName: string().required('Name is required'),
        initialCallOneId: string().required('Required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            editInitialCallTwo({
                body: {
                    initialCallName: values.initialCallName,
                    initialCallOneId: values.initialCallOneId,
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
    const dropdownOptions = {
        initicalCallOneOptions,
    }

    return (
        <>
            <DispositionLayout>
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
                                dropdownOptions={dropdownOptions}
                            />
                        )
                    }}
                </Formik>
            </DispositionLayout>
        </>
    )
}

export default EditInitialCallTwoWrapper
