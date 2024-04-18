import { Formik, FormikProps } from 'formik'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { DispositionTwoListResponse } from 'src/models/configurationModel/DispositionTwo.model'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    useGetdispositionTwoByIdQuery,
    useUpdatedispositionTwoMutation,
} from 'src/services/configurations/DispositionTwoServices'
import { useGetAlldispositionOneQuery } from 'src/services/configurations/DispositiononeServices'
import { showToast } from 'src/utils'
import { object, string } from 'yup'
import EditDispositionTwo from './EditDispositionTwo'

export type FormInitialValues = {
    dispositionName: string
    dispositionDisplayName: string
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
   
    const { items: selectedDispostion } = useGetDataByIdCustomQuery<DispositionTwoListResponse>({
        useEndPointHook: useGetdispositionTwoByIdQuery(Id),
    })

    const { options } = useCustomOptions({
        useEndPointHook: useGetAlldispositionOneQuery(''),
        keyName: 'dispositionDisplayName',
        value: '_id',
    })

    const initialValues: FormInitialValues = {
        dispositionName: selectedDispostion?.dispositionName || '',
        dispositionOneId: selectedDispostion?.dispositionOneId || '',
        dispositionDisplayName:
            selectedDispostion?.dispositionDisplayName || '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        dispositionName: string().required('Disposition two name is required'),
        dispositionOneId: string().required(
            'Please select disposition one name'
        ),
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
        DispotionOneOptions: options
    }

    return (
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
    )
}

export default EditDispositionTwoWrapper
