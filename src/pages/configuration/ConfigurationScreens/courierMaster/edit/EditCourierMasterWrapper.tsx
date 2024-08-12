// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { boolean, object, string } from 'yup'

// |-- Internal Dependencies --|
import CourierMasterForm from '../layout/CourierMasterForm'

import {
    useGetCourierMasterByIdQuery,
    useUpdateCourierMasterMutation,
} from 'src/services/CourierMasterService'
import { showToast } from 'src/utils'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { CourierMasterListResponse } from 'src/models/CourierMaster.model'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    courierName: string
    courierType: string
    transportType: string
    isApiAvailable: boolean
}

const EditCourierMasterWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const { items: selectedItem } =
        useGetDataByIdCustomQuery<CourierMasterListResponse>({
            useEndPointHook: useGetCourierMasterByIdQuery(Id),
        })

    const [updateCourierMaster] = useUpdateCourierMasterMutation()

    const initialValues: FormInitialValues = {
        courierName: selectedItem?.courierName || '',
        courierType: selectedItem?.courierType || '',
        transportType: selectedItem?.transportType || '',
        isApiAvailable: selectedItem?.isApiAvailable || false,
    }

    // Form Validation Schema
    const validationSchema = object({
        courierName: string().required('Courier name is required'),
        courierType: string().required('Courier type is required'),
        transportType: string().required('Transport type is required'),
        isApiAvailable: boolean().required('Courier name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        const { isApiAvailable, ...rest } = values

        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        setTimeout(() => {
            updateCourierMaster({
                id: Id || '',
                body: rest,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
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
                        formType="EDIT"
                    />
                )
            }}
        </Formik>
    )
}

export default EditCourierMasterWrapper
