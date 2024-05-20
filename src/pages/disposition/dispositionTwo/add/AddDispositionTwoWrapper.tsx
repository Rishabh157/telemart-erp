import { Formik, FormikProps } from 'formik'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useAdddispositionTwoMutation } from 'src/services/configurations/DispositionTwoServices'
import { useGetAlldispositionOneQuery } from 'src/services/configurations/DispositiononeServices'
import { showToast } from 'src/utils'
import { object, string } from 'yup'
import AddDispositionTwo from './AddDispositionTwo'

export type FormInitialValues = {
    dispositionName: string
    dispositionOneId: string
    companyId: string
}

const AddDispositionTwoWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const { userData } = useSelector((state: RootState) => state?.auth)

    const [adddispositionTwo] = useAdddispositionTwoMutation()

    const { options } = useCustomOptions({
        useEndPointHook: useGetAlldispositionOneQuery(''),
        keyName: 'dispositionDisplayName',
        value: '_id',
    })
    const initialValues: FormInitialValues = {
        dispositionName: '',
        dispositionOneId: '',
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
        adddispositionTwo({
            dispositionName: values.dispositionName,
            dispositionOneId: values.dispositionOneId,
            companyId: values.companyId || '',
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Disposition Two Added successfully!')
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
        DispotionOneOptions: options,
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <AddDispositionTwo
                        dropdownOptions={dropdownOptions}
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddDispositionTwoWrapper
