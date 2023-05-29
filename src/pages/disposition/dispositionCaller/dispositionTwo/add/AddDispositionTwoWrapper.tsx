import React, { useState } from 'react'
import AddCountryDialog from './AddDispositionTwoDialog'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useAdddispositionTwoMutation } from 'src/services/configurations/DispositionTwoServices'

type Props = {
    onClose: () => void
}

export type FormInitialValues = {
    dispositionName: string
}
const AddDispositionTwoWrappper = ({ onClose }: Props) => {
    const [addDispositionTwo] = useAdddispositionTwoMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)
    const { selectedDispositionOne }: any = useSelector(
        (state: RootState) => state?.dispositionOne
    )
    const initialValues: FormInitialValues = {
        dispositionName: '',
    }
    const validationSchema = object({
        dispositionName: string().required('Disposition-Two name is required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addDispositionTwo({
                dispositionName: values.dispositionName,
                dispositionOneId: selectedDispositionOne?.value || '',
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

export default AddDispositionTwoWrappper
