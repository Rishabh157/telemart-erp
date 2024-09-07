import React, { useState } from 'react'
import { object, string } from 'yup'
import { Formik, FormikProps } from 'formik'
import ChangeCourierReturnRequestStatus from './ChangeCourierReturnRequestStatus'
import { useChangeRequestStatusMutation } from 'src/services/CourierReturnService'
import { showToast } from 'src/utils'

export type FormInitialValues = {
    requestStatus: string
    currentStatus: string
}

const ChangeCourierRequestStatusWrapper = ({
    requestId,
    currentStatus,
    setIsShow,
}: {
    requestId: string
    currentStatus: string
    setIsShow: any
}) => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [chageRequestStatus] = useChangeRequestStatusMutation()

    const initialValues: FormInitialValues = {
        requestStatus: currentStatus || '',
        currentStatus: currentStatus
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
                    console.error(res)

                    if (res?.data?.status) {
                        showToast('success', 'Assigned successfully')
                        setIsShow(false)
                    } else {
                        if (!res?.error?.data?.status) {
                            showToast('error', res?.error?.data?.message)
                        } else {

                            showToast('error', res?.data?.message)
                        }
                    }
                })
                .catch((err: any) => {
                    showToast('error', err?.data?.message)
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
