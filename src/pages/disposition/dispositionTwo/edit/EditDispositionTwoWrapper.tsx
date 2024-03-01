import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useGetAlldispositionOneQuery } from 'src/services/configurations/DispositiononeServices'
import { setAllItems as setAllDispositionOne } from 'src/redux/slices/configuration/dispositionOneSlice'
import { DispositionOneListResponse } from 'src/models/configurationModel/DisposiionOne.model'
import EditDispositionTwo from './EditDispositionTwo'
import {
    useGetdispositionTwoByIdQuery,
    useUpdatedispositionTwoMutation,
} from 'src/services/configurations/DispositionTwoServices'
import { setSelectedDispostion } from 'src/redux/slices/configuration/dispositionTwoSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

export type FormInitialValues = {
    dispositionName: string
    dispositionOneId: string
    companyId: string
}

const EditDispositionTwoWrapper = () => {
    const navigate = useNavigate()
    const params = useParams()
    const Id = params.id
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [updatedispositionTwo] = useUpdatedispositionTwoMutation()

    const { userData } = useSelector((state: RootState) => state?.auth)

    const { allItems: dispositionOne }: any = useSelector(
        (state: RootState) => state.dispositionOne
    )

    const { selectedDispostion }: any = useSelector(
        (state: RootState) => state?.dispositionTwo
    )

    const { data, isLoading, isFetching } = useGetdispositionTwoByIdQuery(Id)

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedDispostion(data?.data || []))
        }
    }, [isLoading, isFetching, data, dispatch])

    const {
        isLoading: isDOLoading,
        isFetching: isDOFetching,
        data: DoData,
    } = useGetAlldispositionOneQuery('')

    useEffect(() => {
        if (!isDOLoading && !isDOFetching) {
            dispatch(setAllDispositionOne(DoData?.data || []))
        }
    }, [isDOLoading, isDOFetching, DoData, dispatch])

    const initialValues: FormInitialValues = {
        dispositionName: selectedDispostion?.dispositionName || '',
        dispositionOneId: selectedDispostion?.dispositionOneId || '',

        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        dispositionName: string().required('Required'),
        dispositionOneId: string().required('Required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        updatedispositionTwo({
            body: {
                dispositionName: values.dispositionName,
                dispositionOneId: values.dispositionOneId,
                companyId: values.companyId || '',
            },
            id: Id || '',
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        'Disposition Two Updated successfully!'
                    )
                    navigate('/dispositions/disposition-two')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }

    const dropdownOptions = {
        DispotionOneOptions: dispositionOne?.map(
            (dispositionOne: DispositionOneListResponse) => {
                return {
                    label: dispositionOne.dispositionName,
                    value: dispositionOne._id,
                }
            }
        ),
    }

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <EditDispositionTwo
                            dropdownOptions={dropdownOptions}
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </>
    )
}

export default EditDispositionTwoWrapper
