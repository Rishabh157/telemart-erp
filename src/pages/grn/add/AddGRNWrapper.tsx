// eslint-disable-next-line
// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { number, object, ref } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useAddGRNMutation } from 'src/services/GRNService'
import { showToast } from 'src/utils'
import AddItem from './AddGRN'

// |-- Types --|

export type FormInitialValues = {
    poCode: string
    itemId: string
    receivedQuantity: number
    goodQuantity: number
    defectiveQuantity: number
    companyId: string
}

const AddGRNWrapper = () => {
    const navigate = useNavigate()
    const [addGRN] = useAddGRNMutation()
    const { state } = useLocation()

    const [apiStatus, setApiStatus] = useState(false)

    // Form Initial Values
    const initialValues: FormInitialValues = {
        poCode: state?.poCode || '',
        itemId: state?.itemId || '',
        companyId: state?.companyId || '',
        receivedQuantity: 0,
        goodQuantity: 0,
        defectiveQuantity: 0,
    }

    // Form Validation Schema
    const validationSchema = object({
        receivedQuantity: number()
            .min(1, 'Quantity should be greater than or equal to 1')
            .required('Please enter Recieved Quantity'),
        goodQuantity: number()
            .min(0, 'Good Quantity must be greater than 0')
            .max(
                ref('receivedQuantity'),
                'Good Quantity must be less than or Equal to Receive Quantity'
            )
            .required('Please enter Good Quantity'),
        defectiveQuantity: number()
            .min(0, 'Defective Quantity must be greater than 0')
            .max(
                ref('receivedQuantity'),
                'Defective Quantity must be less than or Equal to Receive Quantity'
            )
            .required('Please enter Defective Quantity'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addGRN({
                poCode: values.poCode,
                itemId: values.itemId,
                receivedQuantity: values.receivedQuantity,
                goodQuantity: values.goodQuantity,
                defectiveQuantity: values.defectiveQuantity,
            }).then((res:any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'GRN added successfully!')
                        navigate('/grn')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', res?.error?.data?.message)
                }
                setApiStatus(false)
            })
        }, 1000)
    }

    return (
        <SideNavLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddItem
                            formikProps={formikProps}
                            apiStatus={apiStatus}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default AddGRNWrapper
