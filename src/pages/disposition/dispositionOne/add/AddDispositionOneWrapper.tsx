import React, { useState } from 'react'
import AddCountryDialog from './AddDispositionOne'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useAdddispositionOneMutation } from 'src/services/configurations/DispositiononeServices'
import { useNavigate } from 'react-router-dom'
import AddDispositionOne from './AddDispositionOne'
import DispositionLayout from '../../DispositionLayout'

export type FormInitialValues = {
    dispositionName: string
}
const AddDispositionOneWrappper = () => {
    const navigate = useNavigate()
    const [addDisposition] = useAdddispositionOneMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        dispositionName: '',
    }
    const validationSchema = object({
        dispositionName: string().required('Name is required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addDisposition({
                dispositionName: values.dispositionName,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Disposition added successfully!')
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
        <>
            <DispositionLayout>
                {' '}
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
                            />
                        )
                    }}
                </Formik>
            </DispositionLayout>
        </>
    )
}

export default AddDispositionOneWrappper
