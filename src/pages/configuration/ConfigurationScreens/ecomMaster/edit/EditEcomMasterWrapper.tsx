// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import EditEcomMaster from './EditEcomMaster'

import {
    useGetEcomMasterByIdQuery,
    useUpdateEcomMasterMutation,
} from 'src/services/EcomMasterService'
import { showToast } from 'src/utils'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
// import { AttributesListResponse } from 'Ecom'
import { EcomMasterListResponse } from 'src/models/EcomMaster.model'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    ecomDisplayName: string
}

const EditEcomMasterWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id

    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [updateEcomMaster] = useUpdateEcomMasterMutation()
    const { items } = useGetDataByIdCustomQuery<EcomMasterListResponse>({
        useEndPointHook: useGetEcomMasterByIdQuery(Id),
    })
    const initialValues: FormInitialValues = {
        ecomDisplayName: items?.ecomDisplayName || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        ecomDisplayName: string().required('Attribute name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            updateEcomMaster({
                body: {
                    ecomDisplayName: values.ecomDisplayName
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/configurations/ecom-master')
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
                    <EditEcomMaster
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default EditEcomMasterWrapper
