import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import AddDispositionOne from './AddDispositionTwo'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'

import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useAdddispositionTwoMutation } from 'src/services/configurations/DispositionTwoServices'
import { useGetAlldispositionOneQuery } from 'src/services/configurations/DispositiononeServices'
import { setAllItems } from 'src/redux/slices/configuration/dispositionOneSlice'

type Props = {}

export type FormInitialValues = {
    dispositionName: string
    dispositionOneId: string
}

const AddDispositionTwoWrapper = (props: Props) => {
    const navigate = useNavigate()

    // Form Initial Values
    const dispatch = useDispatch()
    const { userData } = useSelector((state: RootState) => state?.auth)
    //const { data, isLoading, isFetching } = useGetdispositionOneByIdQuery('')
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [AddDispositionTwo] = useAdddispositionTwoMutation()

    const {
        data: datas,
        isLoading: isLoadings,
        isFetching: isFetchings,
    } = useGetAlldispositionOneQuery('')
    const { allItems }: any = useSelector(
        (state: RootState) => state?.dispositionOne
    )

    const dispositiononeoption = allItems?.map((ele: any) => {
        return {
            label: ele.dispositionName,
            value: ele._id,
        }
    })
    useEffect(() => {
        if (!isFetchings && !isLoadings) {
            dispatch(setAllItems(datas?.data || []))
        }
    }, [isFetchings, isLoadings, datas, dispatch])

    const initialValues: FormInitialValues = {
        dispositionName: '',
        dispositionOneId: '',
    }
    // Form Validation Schema
    const validationSchema = object({
        dispositionName: string().required('Disposition Name name is required'),
        dispositionOneId: string().required('Please select Disposition Name'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddDispositionTwo({
                dispositionName: values.dispositionName,
                dispositionOneId: values.dispositionOneId,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'disposition Two added successfully!'
                        )
                        navigate('/configurations/disposition-Two')
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
        dispositiononeoption: dispositiononeoption,
    }

    // useEffect(() => {
    //     dispatch(setAllItems(data?.data))
    // }, [dispatch, data, isLoading, isFetching])
    return (
        <ConfigurationLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddDispositionOne
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                            dropdownOptions={dropdownOptions}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default AddDispositionTwoWrapper
