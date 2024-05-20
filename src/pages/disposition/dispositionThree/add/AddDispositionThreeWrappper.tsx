import { useState } from 'react'
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useAdddispositionThreeMutation } from 'src/services/configurations/DispositionThreeServices'
import { useGetAlldispositionOneQuery } from 'src/services/configurations/DispositiononeServices'
import { showToast } from 'src/utils'
import { object, string } from 'yup'
import AddDispositionThree from './AddDispositionThree'

export type FormInitialValues = {
    dispositionName: string
    dispositionOneId: string
    dispositionTwoId: string
    smsType: string
    emailType: string
    whatsApp: string
    priority: string
    applicableCriteria: string
    companyId: string
}

const AddDispositionThreeWrappper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const { userData } = useSelector((state: RootState) => state?.auth)

    const [adddispositionThree] = useAdddispositionThreeMutation()

    const { options } = useCustomOptions({
        useEndPointHook: useGetAlldispositionOneQuery(''),
        keyName: 'dispositionDisplayName',
        value: '_id',
    })

    const initialValues: FormInitialValues = {
        dispositionName: '',
        dispositionOneId: '',
        dispositionTwoId: '',
        smsType: '',
        emailType: '',
        whatsApp: '',
        priority: '',
        applicableCriteria: '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        dispositionName: string().required(
            'Disposition three name is required'
        ),
        dispositionOneId: string().required(
            'Please select disposition one name'
        ),
        dispositionTwoId: string().required(
            'Please select disposition two name'
        ),
        applicableCriteria: string().required(
            'Please select applicable criteria'
        ),
        smsType: string(),
        emailType: string(),
        whatsApp: string(),
        priority: string(),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        adddispositionThree({
            dispositionName: values.dispositionName,
            dispositionOneId: values.dispositionOneId,
            dispositionTwoId: values.dispositionTwoId,
            applicableCriteria: [values.applicableCriteria],
            smsType: values.smsType || null,
            emailType: values.emailType || null,
            whatsApp: values.whatsApp || null,
            priority: values.priority || '',
            companyId: values.companyId || '',
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Added successfully!')
                    navigate('/dispositions/disposition-three')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }

    const dropdownOptions = { DispotionOneOptions: options }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <AddDispositionThree
                        dropdownOptions={dropdownOptions}
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddDispositionThreeWrappper
