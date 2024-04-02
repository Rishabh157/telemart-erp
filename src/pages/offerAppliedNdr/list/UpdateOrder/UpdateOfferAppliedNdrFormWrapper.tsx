import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
// import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import UpdateOfferAppliedNdrForm from './UpdateOfferAppliedNdrForm'
import { showToast } from 'src/utils'

// |-- Redux --|
// import { RootState } from 'src/redux/store'
import {
    useGetOrderByIdQuery,
    useUpdateOfferAppliedNdrOrderMutation,
} from 'src/services/OrderService'

// |-- Types --|
type Props = {
    orderId: string

    handleClose: () => void
}

export type FormInitialValues = {
    productGroupId: string
    schemeId: string
    ndrRemark: string
}

const UpdateOfferAppliedNdrFormWrapper = ({ orderId, handleClose }: Props) => {
    const [orderDetails, setOrderDetails] = useState<any>({})

    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateOfferApplied] = useUpdateOfferAppliedNdrOrderMutation()

    const { data, isLoading, isFetching } = useGetOrderByIdQuery(orderId, {
        skip: !orderId,
    })

    React.useEffect(() => {
        if (!isLoading && !isFetching) {
            setOrderDetails(data?.data)
        }
    }, [data, isLoading, isFetching])

    // const dealerOptions = dealer?.map((ele: any) => {
    //     return {
    //         label: ele?.dealerName,
    //         value: ele?.dealerId,
    //     }
    // })

    // Form Initial Values
    const initialValues: FormInitialValues = {
        productGroupId: orderDetails?.productGroupId,
        schemeId: orderDetails?.schemeId,
        ndrRemark: orderDetails?.ndrRemark,
    }

    const validationSchema = object({
        schemeId: string().required(''),
        ndrRemark: string().required(''),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)

        const formatedValues = {
            schemeId: values.schemeId,
            ndrRemark: values.ndrRemark,
        }
        setTimeout(() => {
            updateOfferApplied({
                id: orderId,
                body: formatedValues,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'assign order successfully!')
                        handleClose()
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
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <UpdateOfferAppliedNdrForm
                        formikProps={formikProps}
                        orderDetails={orderDetails}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}

export default UpdateOfferAppliedNdrFormWrapper
