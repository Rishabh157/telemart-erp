/// ==============================================
// Filename:EditCartonBoxWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { number, object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import EditCartonBox from './EditCartonBox'

import { showToast } from 'src/utils'
import {
    useGetCartonBoxByIdQuery,
    useUpdateCartonBoxMutation,
} from 'src/services/CartonBoxService'
import { setSelectedItem } from 'src/redux/slices/cartonBoxSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    boxName: string
    innerItemsCount: number
    boxWeight: number
    dimensions: {
        height: number
        width: number
        depth: number
    }
}

const EditCartonBoxWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const [EditSelectedCartonBox] = useUpdateCartonBoxMutation()
    const { data, isLoading, isFetching } = useGetCartonBoxByIdQuery(Id)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.cartonBox
    )

    // Form Initial Values
    const initialValues: FormInitialValues = {
        boxName: selectedItem?.boxName,
        innerItemsCount: selectedItem?.innerItemCount,
        boxWeight: selectedItem?.boxWeight,
        dimensions: {
            height: selectedItem?.dimension?.height,
            width: selectedItem?.dimension?.width,
            depth: selectedItem?.dimension?.depth,
        },
    }

    // Form Validation Schema
    const validationSchema = object({
        boxName: string().required('boxName is required'),
        innerItemsCount: number().required('Please select a innerItemsCount'),
        boxWeight: number().required('boxWeight is required'),
        dimensions: object().shape({
            height: number().required('Height is required'),
            width: number().required('Width is required'),
            depth: number().required('Depth is required'),
        }),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        EditSelectedCartonBox({
            body: {
                boxName: values.boxName,
                innerItemCount: values.innerItemsCount,
                dimension: values.dimensions,
                boxWeight: values.boxWeight,
                companyId: userData?.companyId || '',
            },
            id: Id || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Updated successfully!')

                    navigate('/configurations/carton-box')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }

    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [dispatch, data, isLoading, isFetching])
    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <EditCartonBox
                        formikProps={formikProps}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}

export default EditCartonBoxWrapper
