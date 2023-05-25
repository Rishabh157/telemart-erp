import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useAddinitialCallerOneMutation } from 'src/services/configurations/InitialCallerOneServices'
import AddInitialCallOne from './AddInitialCallOne'

type Props = {
    onClose: () => void
}

export type FormInitialValues = {
    initailCallName: string
}
const AddInitialCallOneWrapper = ({ onClose }: Props) => {
    const[AddInitialcallOne]=useAddinitialCallerOneMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        initailCallName: '',
    }
    const validationSchema = object({
        initailCallName: string().required('Country Name is required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddInitialcallOne({
                initailCallName: values.initailCallName,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'InitialCallerOne added successfully!')
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
                {(formikProps:any) => {
                    return (
                        <AddInitialCallOne
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

export default AddInitialCallOneWrapper
