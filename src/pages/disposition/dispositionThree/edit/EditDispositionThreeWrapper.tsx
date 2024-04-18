import { useState } from 'react'

import { Formik, FormikProps } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { DispositionThreeListResponse } from 'src/models/configurationModel/DispositionThree.model'
import { RootState } from 'src/redux/store'
import {
    useGetDispositionThreeByIdQuery,
    useUpdatedispositionThreeMutation,
} from 'src/services/configurations/DispositionThreeServices'
import { useGetAlldispositionOneQuery } from 'src/services/configurations/DispositiononeServices'
import { showToast } from 'src/utils'
import { object, string } from 'yup'
import EditDispositionThree from './EditDispositionThree'

export type FormInitialValues = {
    dispositionName: string
    dispositionOneId: string
    dispositionTwoId: string
    dispositionDisplayName: string
    smsType: string
    emailType: string
    whatsApp: string
    priority: string
    applicableCriteria: string
    companyId: string
}

const EditDispositionThreeWrappper = () => {
    const navigate = useNavigate()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [updatedispositionThree] = useUpdatedispositionThreeMutation()

    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items: selectedDispostionThree } = useGetDataByIdCustomQuery<DispositionThreeListResponse>({
        useEndPointHook: useGetDispositionThreeByIdQuery(Id),
    })

    const { options } = useCustomOptions({
        useEndPointHook: useGetAlldispositionOneQuery(''),
        keyName: 'dispositionDisplayName',
        value: '_id',
    })

    const initialValues: FormInitialValues = {
        dispositionName: selectedDispostionThree?.dispositionName || '',
        dispositionOneId: selectedDispostionThree?.dispositionOneId || '',
        dispositionTwoId: selectedDispostionThree?.dispositionTwoId || '',
        dispositionDisplayName: selectedDispostionThree?.dispositionDisplayName || '',
        smsType: selectedDispostionThree?.smsType || '',
        emailType: selectedDispostionThree?.emailType || '',
        whatsApp: selectedDispostionThree?.whatsApp || '',
        priority: selectedDispostionThree?.priority || '',
        applicableCriteria: selectedDispostionThree?.applicableCriteria[0] || '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        dispositionName: string().required('Disposition three name is required'),
        dispositionOneId: string().required('Please select disposition one name'),
        dispositionTwoId: string().required('Please select disposition two name'),
        applicableCriteria: string().required('Please select applicable criteria'),
        smsType: string(),
        emailType: string(),
        whatsApp: string(),
        priority: string(),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        updatedispositionThree({
            body: {
                dispositionName: values.dispositionName,
                dispositionOneId: values.dispositionOneId,
                dispositionTwoId: values.dispositionTwoId,
                applicableCriteria: [values.applicableCriteria],
                smsType: values.smsType || null,
                emailType: values.emailType || null,
                whatsApp: values.whatsApp || null,
                priority: values.priority || '',
                companyId: values.companyId || '',
            },
            id: Id || '',
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Disposition 3 Updated successfully!')
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
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <EditDispositionThree
                        dropdownOptions={dropdownOptions}
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default EditDispositionThreeWrappper
