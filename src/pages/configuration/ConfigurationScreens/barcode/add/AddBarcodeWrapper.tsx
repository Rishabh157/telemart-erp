// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { number, object, string } from 'yup'

// |-- Internal Dependencies --|
import { useAddBarcodeMutation } from 'src/services/BarcodeService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { showToast } from 'src/utils'
import AddBarcode from './AddBarcode'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    vendorId: string
    productGroup: string
    quantity: string
    lotNumber: string
    invoiceNumber: string
    expiryDate: string | null
}

const AddBarcodeWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState(false)

    const [addBarcode] = useAddBarcodeMutation()

    // Form Initial Values
    const initialValues: FormInitialValues = {
        vendorId: '',
        productGroup: '',
        quantity: '',
        lotNumber: '',
        invoiceNumber: '',
        expiryDate: null,
    }

    // Form Validation Schema
    const validationSchema = object({
        vendorId: string().required('Vendor is required'),
        productGroup: string().required('Group Name is required'),
        quantity: number()
            .moreThan(0, 'Quantity must be greater than 0')
            .required('Quantity is required'),
        lotNumber: string()
            .min(6, 'Batch number should be more then 6 digit eg: DDMMYY')
            .max(6, 'Batch number should be less then 4 digit eg: DDMMYY')
            .required('Batch number is required'),
        invoiceNumber: string().required('Invoice number is required'),
        expiryDate: string().nullable().notRequired(),
    })

    //    Form Submit Handler
    const onSubmitHandler = async (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        const uniqueGrouId = uuidv4()

        await addBarcode({
            vendorLabel: values.vendorId, // going here vendor label
            productGroupId: values.productGroup,
            barcodeGroupNumber: uniqueGrouId,
            quantity: Number(values?.quantity),
            lotNumber: values.lotNumber,
            invoiceNumber: values.invoiceNumber,
            expiryDate: values.expiryDate ? values.expiryDate : null,
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Added successfully!')
                    navigate('/configurations/barcode')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }

    const { options: productGroupOption } = useCustomOptions({
        useEndPointHook: useGetAllProductGroupQuery(''),
        keyName: 'groupName',
        value: '_id',
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddBarcode
                        formikProps={formikProps}
                        apiStatus={apiStatus}
                        productGroupOption={productGroupOption}
                    />
                )
            }}
        </Formik>
    )
}

export default AddBarcodeWrapper
