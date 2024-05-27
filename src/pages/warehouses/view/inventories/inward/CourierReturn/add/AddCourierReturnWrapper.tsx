// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import { useAddCourierReturnMutation } from 'src/services/CourierReturnService'
import { showToast } from 'src/utils'
import AddCourierReturn from './AddCourierReturn'

// |-- Redux--|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    shippingProvider: string
    requestStatus: string
    orderNumber: string
    warehouseId: string
    comment: string
}

const AddCourierReturnWrapper = (props: Props) => {
    const navigate = useNavigate()
    const { id: warehouseId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData }: any = useSelector((state: RootState) => state?.auth)
    const [addCourierRto] = useAddCourierReturnMutation()

    // Form Initial Values
    const initialValues: FormInitialValues = {
        shippingProvider: '',
        requestStatus: '',
        orderNumber: '',
        warehouseId: userData?.warehouseId,
        comment: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        shippingProvider: string().required('Shipping provider is required'),
        requestStatus: string().required('Please select status'),
        orderNumber: string().required('Enter a order number'),
        comment: string(),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        const fromatedValue = {
            ...values,
            orderNumber: Number(values.orderNumber),
            warehouseId: warehouseId,
        }

        setTimeout(() => {
            addCourierRto(fromatedValue).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Request Added Successfully!')
                        navigate(
                            `/warehouse/view/${warehouseId}/inward-inventories/courier-return`
                        )
                        dispatch(setFieldCustomized(false))
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <AddCourierReturn
                        formikProps={formikProps}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}

export default AddCourierReturnWrapper
