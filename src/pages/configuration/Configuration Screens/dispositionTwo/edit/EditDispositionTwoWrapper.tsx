import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import AddDispositionOne from './EditDispositionTwo'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'

import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import {
    useGetdispositionTwoByIdQuery,
    useUpdatedispositionTwoMutation,
} from 'src/services/configurations/DispositionTwoServices'
import { useGetAlldispositionOneQuery } from 'src/services/configurations/DispositiononeServices'
import { setAllItems } from 'src/redux/slices/configuration/dispositionOneSlice'
import { setSelectedDispostion } from 'src/redux/slices/configuration/dispositionTwoSlice'

type Props = {}

export type FormInitialValues = {
    dispositionName: string
    dispositionOneId: string
}

const EditDispositionTwoWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const { selectedDispostion }: any = useSelector(
        (state: RootState) => state.dispositionTwo
    )
    const {
        data: editData,
        isFetching: editisFetching,
        isLoading: editisLoading,
    } = useGetdispositionTwoByIdQuery(Id)

    useEffect(() => {
        if (!editisFetching && !editisLoading) {
            dispatch(setSelectedDispostion(editData?.data))
        }
    }, [editisFetching, editisLoading, editData, dispatch])

    // Form Initial Values

    const { userData } = useSelector((state: RootState) => state?.auth)
    //const { data, isLoading, isFetching } = useGetdispositionOneByIdQuery('')
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const { allItems }: any = useSelector(
        (state: RootState) => state?.dispositionOne
    )
    const [EditDispositionTwo] = useUpdatedispositionTwoMutation()

    const dispositiononeoption = allItems?.map((ele: any) => {
        return {
            label: ele.dispositionName,
            value: ele._id,
        }
    })
    const {
        data: datas,
        isLoading: isLoadings,
        isFetching: isFetchings,
    } = useGetAlldispositionOneQuery('')

    useEffect(() => {
        if (!isFetchings && !isLoadings) {
            dispatch(setAllItems(datas?.data || []))
        }
    }, [isFetchings, isLoadings, datas, dispatch])

    const initialValues: FormInitialValues = {
        dispositionName: selectedDispostion?.dispositionName || '',
        dispositionOneId: selectedDispostion?.dispositionOneId || '',
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
            EditDispositionTwo({
                body: {
                    dispositionName: values?.dispositionName,
                    dispositionOneId: values?.dispositionOneId,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'disposition Two updated successfully!'
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
                enableReinitialize
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

export default EditDispositionTwoWrapper
