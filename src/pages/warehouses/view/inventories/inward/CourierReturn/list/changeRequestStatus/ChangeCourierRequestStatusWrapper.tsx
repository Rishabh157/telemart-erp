import React, { useState } from 'react'
import { object, string } from 'yup'
import { Formik, FormikProps } from 'formik'
import ChangeCourierReturnRequestStatus from './ChangeCourierReturnRequestStatus'
import { useChangeRequestStatusMutation } from 'src/services/CourierReturnService'
import { showToast } from 'src/utils'

export type FormInitialValues = {
    requestStatus: string
}

const ChangeCourierRequestStatusWrapper = ({
    requestId,
    setIsShow,
}: {
    requestId: string
    setIsShow: any
}) => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [chageRequestStatus] = useChangeRequestStatusMutation()

    const initialValues: FormInitialValues = {
        requestStatus: '',
    }

    const validationSchema = object({
        requestStatus: string().required('Please select order status'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            chageRequestStatus({
                _id: requestId,
                body: values,
            })
                .then((res: any) => {
                    if (res?.data?.status) {
                        showToast('success', 'Assigned successfully')
                        setIsShow(false)
                    } else {
                        showToast('error', res?.data?.message)
                    }
                })
                .catch((err: any) => {
                    console.error(err)
                })
        }, 1000)
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <ChangeCourierReturnRequestStatus
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default ChangeCourierRequestStatusWrapper
