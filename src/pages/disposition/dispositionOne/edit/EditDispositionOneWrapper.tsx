import { Formik } from 'formik'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from 'src/redux/store'
import {
    useGetdispositionOneByIdQuery,
    useUpdatedispositionOneMutation,
} from 'src/services/configurations/DispositiononeServices'
import { showToast } from 'src/utils'
import { object, string } from 'yup'
import AddDispositionOne from './EditDispositionOne'

import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { DispositionOneListResponse } from 'src/models/configurationModel/DisposiionOne.model'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

export type FormInitialValues = {
    dispositionName: string
    dispositionDisplayName: string
}
const EditDispositionOneWrappper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [editDispositionOne] = useUpdatedispositionOneMutation()
    const params = useParams()
    const Id = params.id
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const { items: selectedDispositionOne } =
        useGetDataByIdCustomQuery<DispositionOneListResponse>({
            useEndPointHook: useGetdispositionOneByIdQuery(Id),
        })
    const initialValues: FormInitialValues = {
        dispositionName: selectedDispositionOne?.dispositionName || '',
        dispositionDisplayName:
            selectedDispositionOne?.dispositionDisplayName || '',
    }

    const validationSchema = object({
        dispositionName: string().required('Disposition one name is required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            editDispositionOne({
                body: {
                    dispositionName: values.dispositionName,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/dispositions/disposition-one')
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
            {(formikProps) => {
                return (
                    <AddDispositionOne
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default EditDispositionOneWrappper
