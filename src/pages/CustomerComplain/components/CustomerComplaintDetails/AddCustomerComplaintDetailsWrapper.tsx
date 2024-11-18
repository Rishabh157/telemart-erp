import React from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { object, string } from 'yup'
import CustomerComplaintDetailsForm from './CustomerComplaintDetailsForm'
import { useGetOrderByIdQuery } from 'src/services/OrderService'
import { OrderListResponse } from 'src/models'
import { CircularProgress } from '@mui/material'
import { useAddCustomerComplainMutation } from 'src/services/CustomerComplainServices'
import { showToast } from 'src/utils'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'
import { BASE_URL_FILE_PICKER, FILE_BUCKET_NAME } from 'src/utils/constants'

type Props = {
    orderId: string
    handleClose: () => void
}

export type FormInitialValues = {
    complaintNumber: number
    orderNo: number | string
    schemeName: string
    schemeCode: string
    orderStatus: string
    courierStatus: string
    callType: string
    initialCallOne: string
    initialCallTwo: string
    initialCallThree: string
    status: string
    remark: string
    icOneLabel: string
    icTwoLabel: string
    icThreeLabel: string
    images: string[]
}

const AddCustomerComplaintDetailsWrapper = ({
    orderId,
    handleClose,
}: Props) => {
    // for multiple images
    const [apiStatus, setApiStatus] = React.useState<boolean>(false)
    const [complainImages, setComplainImages] = React.useState([])
    const [orderDetails, setOrderDetails] = React.useState<OrderListResponse>()
    const [addComplaint] = useAddCustomerComplainMutation()
    // Upload File Mutation
    const [uploadFile] = useAddFileUrlMutation()

    const initialValues: FormInitialValues = {
        complaintNumber: 0,
        orderNo: orderDetails?.orderNumber || 0,
        schemeName: orderDetails?.schemeName || '',
        schemeCode: orderDetails?.schemeName || '',
        orderStatus: orderDetails?.status || '',
        courierStatus: orderDetails?.status || '',
        callType: orderDetails?.callType || '',
        initialCallOne: '',
        initialCallTwo: '',
        initialCallThree: '',
        status: '',
        remark: orderDetails?.remark || '',
        icOneLabel: '',
        icTwoLabel: '',
        icThreeLabel: '',
        images: [],
    }

    // Form Validation Schema
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const validationSchema = object({
        callType: string().required('call type is required'),
        initialCallOne: string().required('ic1 is required'),
        initialCallTwo: string().required('ic2 required'),
        initialCallThree: string().required('ic3 required'),
        status: string().required('status is required'),
        remark: string().required('remark is required'),
    })

    const { data, isLoading, isFetching } = useGetOrderByIdQuery(orderId, {
        skip: !orderId,
    })

    React.useEffect(() => {
        if (!isLoading && !isFetching) {
            setOrderDetails(data?.data)
        }
    }, [data, isLoading, isFetching])

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        // Convert FileList to array
        const fileListArray = Array.from(complainImages)

        // Array to store all upload promises
        const uploadPromises: Promise<any>[] = []

        // Iterate through each file in the file list
        fileListArray.forEach((file: any) => {
            let formData = new FormData()

            formData.append(
                'type',
                file.type?.includes('image') ? 'IMAGE' : 'DOCUMENT'
            )
            formData.append('bucketName', FILE_BUCKET_NAME)
            formData.append('file', file || '', file?.name)

            // Push the promise returned by the uploadFile function into the array
            uploadPromises.push(
                uploadFile(formData).then((res: any) => {
                    if ('data' in res) {
                        let fileUrl =
                            BASE_URL_FILE_PICKER + '/' + res?.data?.file_path
                        values.images.push(fileUrl)
                    }
                })
            )
        })

        // Wait for all promises to resolve and promies chainging
        Promise.all(uploadPromises)
            .then(() => {
                const formatedValues = {
                    orderId,
                    orderNumber: values.orderNo,
                    schemeId: orderDetails?.schemeId,
                    schemeName: values.schemeName,
                    schemeCode: values.schemeCode,
                    orderStatus: values.orderStatus,
                    courierStatus: values.courierStatus,
                    callType: values.callType,
                    icOne: values.initialCallOne,
                    icTwo: values.initialCallTwo,
                    icThree: values.initialCallThree,
                    status: values.status,
                    remark: values.remark,
                    customerNumber: orderDetails?.mobileNo || '',
                    icOneLabel: values.icOneLabel,
                    icTwoLabel: values.icTwoLabel,
                    icThreeLabel: values.icThreeLabel,
                    images: values.images || [],
                }

                // Call the addComplaint API with the formatted values
                return addComplaint(formatedValues)
            })
            .then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'complaint added successfully!')
                        setApiStatus(false)
                        handleClose()
                    } else {
                        showToast('error', res?.data?.message)
                        setApiStatus(false)
                    }
                } else {
                    showToast('error', res?.error?.data?.message)
                    setApiStatus(false)
                }
            })
            .catch((res) => {
                showToast('error', res?.data?.message)
                setApiStatus(false)
            })
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => (
                <Form>
                    {(isLoading || isFetching) && (
                        <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                            <CircularProgress />
                        </div>
                    )}
                    <CustomerComplaintDetailsForm
                        formType="ADD"
                        formikProps={formikProps}
                        apiStatus={apiStatus}
                        complainImages={complainImages}
                        onClickSetImage={(newValue: any) =>
                            setComplainImages(newValue || [])
                        }
                        onClickRemoveImage={(index: number) => {
                            const fileListArray = Array.from(complainImages)
                            const afterRemoveFiles = fileListArray?.filter(
                                (file, ind) => ind !== index && file
                            )
                            setComplainImages(afterRemoveFiles || [])
                            return index
                        }}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default AddCustomerComplaintDetailsWrapper
