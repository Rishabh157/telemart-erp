import React, { useState } from 'react'
import AddCountryDialog from './AddInitialCallTwoDialog'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useAddinitialCallerTwoMutation } from 'src/services/configurations/InitialCallerTwoServices'

type Props = {
    onClose: () => void
}

export type FormInitialValues = {
    initialCallName: string
}
const AddInitialCallTwoWrapper = ({ onClose }: Props) => {
    const[addInitialCallTwo]=useAddinitialCallerTwoMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)
    const {selectedInitialOne}:any=useSelector((state:RootState)=>state?.initialCallerOne)
    const initialValues: FormInitialValues = {
        initialCallName: '',

    }
    const validationSchema = object({
        initialCallName: string().required('InitialCaller-Two Name is required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addInitialCallTwo({
                initialCallName: values.initialCallName,
                initialCallOneId:selectedInitialOne?.value || "",
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'InitialCall Two added successfully!')
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

export default AddInitialCallTwoWrapper
