import React, { useState } from 'react'
import AddCountryDialog from './AddDispositionOneDialog'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useAdddispositionOneMutation } from 'src/services/configurations/DispositiononeServices'

type Props = {
    onClose: () => void
}

export type FormInitialValues = {
    dispositionName: string
}
const AddDispositionOneWrappper = ({ onClose }: Props) => {
    const [addDisposition] = useAdddispositionOneMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        dispositionName: '',
    }
    const validationSchema = object({
        dispositionName: string().required('Disposition Name is required'),
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
                        onClose()
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
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddCountryDialog
                            onClose={onClose}
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </>
    )
}

export default AddDispositionOneWrappper
