import React, { useState } from 'react'
import AddStateDialog from './AddStateDialog'
import { useAddStateMutation } from 'src/services/StateService'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { showToast } from 'src/utils'
import { object, string } from 'yup'
import { Formik } from 'formik'

type Props = {
    onClose: () => void
}

export type FormInitialValues = {
    stateName: string
}

const AddStateWrapper = ({ onClose }: Props) => {
    const [AddState] = useAddStateMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state?.country
    )

    const [apiStatus, setApiStatus] = useState(false)
    const initialValues: FormInitialValues = {
        stateName: '',
    }
    const validationSchema = object({
        stateName: string().required('State Name is required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddState({
                stateName: values.stateName,
                countryId: selectedLocationCountries?.value || '',
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'State added successfully!')
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
                        <AddStateDialog
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

export default AddStateWrapper
