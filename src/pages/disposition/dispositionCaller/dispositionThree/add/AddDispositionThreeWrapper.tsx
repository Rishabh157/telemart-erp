import React, { useState } from 'react'
import AddCountryDialog from './AddDispositionThreeDialog'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useAdddispositionThreeMutation } from 'src/services/configurations/DispositionThreeServices'

type Props = {
    onClose: () => void
}

export type FormInitialValues = {
    dispositionName: string
}
const AddDispositionThreeWrappper = ({ onClose }: Props) => {
    const [addDispositionThree] = useAdddispositionThreeMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)
    const { selectedDispositionOne }: any = useSelector(
        (state: RootState) => state?.dispositionOne
    )
    const { selectedDispostion }: any = useSelector(
        (state: RootState) => state?.dispositionTwo
    )

    const initialValues: FormInitialValues = {
        dispositionName: '',
    }
    const validationSchema = object({
        dispositionName: string().required(
            'Disposition-Three name is required'
        ),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addDispositionThree({
                dispositionName: values.dispositionName,
                dispositionOneId: selectedDispositionOne?.value || '',
                dispositionTwoId: selectedDispostion?.value || '',
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'Disposition-Three added successfully!'
                        )
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

export default AddDispositionThreeWrappper
