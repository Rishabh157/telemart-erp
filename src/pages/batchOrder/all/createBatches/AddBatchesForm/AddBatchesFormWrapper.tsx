// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import AddBatchesForm from './AddBatchesForm'
import { showToast } from 'src/utils'

// |-- Redux --|
import {
    useAddBatchesMutation,
    useGetUsersByDistributeDepartmentQuery,
} from 'src/services/BatchesServices'

// |-- Types --|
type Props = {
    selectedRows: any[]
    handleClose: () => void
}

export type FormInitialValues = {
    orders: any[]
    batchAssignedTo: string
}

const AddBatchesFormWrapper = ({ selectedRows, handleClose }: Props) => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addBatch] = useAddBatchesMutation()
    const [assignUsers, setAssignUsers] = useState<any[]>()

    // Form Initial Values
    const initialValues: FormInitialValues = {
        orders: [],
        batchAssignedTo: '',
    }

    const validationSchema = object({
        batchAssignedTo: string().required(
            'Please select batch assign memeber'
        ),
    })

    const { isLoading, isFetching, data } =
        useGetUsersByDistributeDepartmentQuery('')

    useEffect(() => {
        if (!isFetching && !isLoading) {
            setAssignUsers(data?.data)
        }
    }, [isLoading, isFetching, data])

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)

        setTimeout(() => {
            addBatch({
                orders: selectedRows?.map((ele: any) => ele?._id),
                batchAssignedTo: values.batchAssignedTo,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Batch Created successfully!')
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

    //  selected option dropdowns options
    const dropdownOptions = {
        assignUserOptions:
            assignUsers?.map((ele: any) => {
                return {
                    label: ele?.firstName?.concat(' ', ele?.lastName),
                    value: ele?._id,
                }
            }) || [],
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddBatchesForm
                        formikProps={formikProps}
                        apiStatus={apiStatus}
                        dropdownOptions={dropdownOptions}
                    />
                )
            }}
        </Formik>
    )
}

export default AddBatchesFormWrapper
