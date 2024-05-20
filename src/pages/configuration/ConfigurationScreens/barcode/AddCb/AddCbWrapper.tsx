// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|

import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useGetAllCartonBoxQuery } from 'src/services/CartonBoxService'
import { showToast } from 'src/utils'
import AddCbBarcode from './AddCbBarcode'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { AppDispatch } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    cartonBox: string
    quantity: string
}

const AddCbBarcodeWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState(false)
    const { options: cartonBoxOption } = useCustomOptions({
        useEndPointHook: useGetAllCartonBoxQuery(''),
        keyName: 'boxName',
        value: '_id',
    })
    // Form Initial Values
    const initialValues: FormInitialValues = {
        cartonBox: '',
        quantity: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        cartonBox: string().required('Group Name is required'),
        quantity: string().required('Quantity is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = async (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setApiStatus(false)
        navigate('/configurations/barcode')
        showToast('success', 'Carton-box Barcode added successfully!')
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddCbBarcode
                        formikProps={formikProps}
                        apiStatus={apiStatus}
                        cartonBoxOption={cartonBoxOption}
                    />
                )
            }}
        </Formik>
    )
}

export default AddCbBarcodeWrapper
