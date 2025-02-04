// eslint-disable-next-line
// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { number, object, ref } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { GRNListResponse } from 'src/models'
import {
    useGetGrnByIdQuery,
    useUpdateGRNMutation,
} from 'src/services/GRNService'
import { showToast } from 'src/utils'
import EditGRN from './EditGRN'

// |-- Types --|

export type FormInitialValues = {
    poCode: string
    itemId: string
    itemName:string
    receivedQuantity: number
    goodQuantity: number
    defectiveQuantity: number
    companyId: string
}

const EditGRNWrapper = () => {
    const params = useParams()
    const Id = params.id
    const navigate = useNavigate()
    const [updateGRN] = useUpdateGRNMutation()

    const [apiStatus, setApiStatus] = useState(false)

    const { items: selectedItems } = useGetDataByIdCustomQuery<GRNListResponse>(
        {
            useEndPointHook: useGetGrnByIdQuery(Id || '', { skip: !Id }),
        }
    )

    // Form Initial Values
    const initialValues: FormInitialValues = {
        poCode: selectedItems?.poCode || '',
        itemId: selectedItems?.itemId || '',
        itemName:selectedItems?.itemName || '',
        companyId: selectedItems?.companyId || '',
        receivedQuantity: selectedItems?.receivedQuantity || 0,
        goodQuantity: selectedItems?.goodQuantity || 0,
        defectiveQuantity: selectedItems?.defectiveQuantity || 0,
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
            updateGRN({
                id: Id || '',
                body: {
                    poCode: values.poCode,
                    itemId: values.itemId || '',
                    receivedQuantity: values.receivedQuantity,
                    goodQuantity: values.goodQuantity,
                    defectiveQuantity: values.defectiveQuantity,
                    companyId: values?.companyId || ''
                },
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'GRN update successfully!')
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
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditGRN
                            formikProps={formikProps}
                            apiStatus={apiStatus}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default EditGRNWrapper
