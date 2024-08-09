// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { boolean, object, string } from 'yup'

// |-- Internal Dependencies --|
import CourierMasterForm from '../layout/CourierMasterForm'

import { useAddCourierMasterMutation } from 'src/services/CourierMasterService'
import { showToast } from 'src/utils'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    courierName: string
    courierCode: string
    courierType: string
    transportType: string
    isApiAvailable: boolean
}

const AddCourierMasterWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id

    // const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [addCourierMaster] = useAddCourierMasterMutation()

    const initialValues: FormInitialValues = {
        courierName: '',
        courierCode: '',
        courierType: '',
        transportType: '',
        isApiAvailable: false,
    }

    // Form Validation Schema
    const validationSchema = object({
        courierName: string().required('Courier name is required'),
        courierCode: string().required('Courier code is required'),
        courierType: string().required('Courier type is required'),
        transportType: string().required('Transport type is required'),
        isApiAvailable: boolean().required('Courier name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addCourierMaster({
                body: values,
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/configurations/courier')
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
                    <CourierMasterForm
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        formType="ADD"
                    />
                )
            }}
        </Formik>
    )
}

export default AddCourierMasterWrapper
