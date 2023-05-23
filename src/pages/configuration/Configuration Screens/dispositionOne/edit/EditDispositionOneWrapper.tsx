import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import {
    useGetdispositionOneByIdQuery,
    useUpdatedispositionOneMutation,
} from 'src/services/configurations/DispositiononeServices'
import { setSelectedDispositionOne } from 'src/redux/slices/configuration/dispositionOneSlice'
import EditDispositionOne from './EditDispositionOne'

type Props = {}

export type FormInitialValues = {
    dispositionName: string
}

const EditDispositionOneWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const { selectedDispositionOne }: any = useSelector(
        (state: RootState) => state.dispositionOne
    )
    console.log(selectedDispositionOne)
    const {
        data: editData,
        isFetching: editisFetching,
        isLoading: editisLoading,
    } = useGetdispositionOneByIdQuery(Id)

    useEffect(() => {
        if (!editisFetching && !editisLoading) {
            dispatch(setSelectedDispositionOne(editData?.data))
        }
    }, [editisFetching, editisLoading, editData, dispatch])

    // Form Initial Values

    const { userData } = useSelector((state: RootState) => state?.auth)

    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [EditDispositionApi] = useUpdatedispositionOneMutation()

    const initialValues: FormInitialValues = {
        dispositionName: selectedDispositionOne?.dispositionName || '',
    }
    // Form Validation Schema
    const validationSchema = object({
        dispositionName: string().required('Disposition Name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            EditDispositionApi({
                body: {
                    dispositionName: values?.dispositionName,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'Disposition One updated successfully!'
                        )
                        navigate('/configurations/disposition-One')
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
        <ConfigurationLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditDispositionOne
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default EditDispositionOneWrapper
