// eslint-disable-next-line
/// ==============================================
// Filename:AddGRNWrapper.tsx
// Type: Add Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { number, object, ref } from 'yup'

// |-- Internal Dependencies --|
import AddItem from './AddGRN'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import {
    useAddGRNMutation,
    useGetGRNByPOCodeQuery,
} from 'src/services/GRNService'
import { showToast } from 'src/utils'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    poCode: string
    itemId: string
    receivedQuantity: number
    goodQuantity: number
    defectiveQuantity: number
    companyId: string
}

const AddGRNWrapper = (props: Props) => {
    const navigate = useNavigate()
    const [totalreceivedQuantity, setreceivedQuantity] = useState<number>(0)
    const [addGRN] = useAddGRNMutation()
    const { state } = useLocation()
    const { poCode, companyId, itemId } = state

    //const { userData } = useSelector((state: RootState) => state?.auth);
    const [apiStatus, setApiStatus] = useState(false)
    const { data, isLoading, isFetching } = useGetGRNByPOCodeQuery(
        {
            pocode: poCode,
        },
        { skip: !poCode }
    )

    useEffect(() => {
        if (data && !isLoading && !isFetching) {
            console.log(data?.totalRecievedQuantity)
            setreceivedQuantity(data?.totalRecievedQuantity)
        }
    }, [data, isLoading, isFetching])

    // const { state } = useLocation()
    // const { poCode, itemName, quantity } = state
    // Form Initial Values
    const initialValues: FormInitialValues = {
        poCode: poCode,
        itemId: itemId,
        companyId: companyId,
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

    // const validationSchema = object({
    //     receivedQuantity: number()
    //         .min(1, 'Quantity should be greater than or equal to 1')
    //         .required('Please enter Received Quantity'),
    //     goodQuantity: number()
    //         .min(0, 'Good Quantity must be greater than or equal to 0')
    //         .when('receivedQuantity', (receivedQuantity: any, schema) => {
    //             return schema.max(
    //                 receivedQuantity,
    //                 'Good Quantity must be less than or equal to Received Quantity'
    //             )
    //         })
    //         .required('Please enter Good Quantity'),
    //     defectiveQuantity: number()
    //         .min(0, 'Defective Quantity must be greater than or equal to 0')
    //         .required('Please enter Defective Quantity'),
    // })
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
                companyId: values.companyId,
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'GRN added successfully!')
                        navigate('/grn')
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
                            totalreceivedQuantity={totalreceivedQuantity}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default AddGRNWrapper
