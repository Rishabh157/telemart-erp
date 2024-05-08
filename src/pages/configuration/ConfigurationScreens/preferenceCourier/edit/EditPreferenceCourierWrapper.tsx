// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import EditAttribute from './EditPreferenceCourier'

import {
    useGetattributesByIdQuery,
    useUpdateattributesMutation,
} from 'src/services/AttributeService'
import { showToast } from 'src/utils'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { AttributesListResponse } from 'src/models'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    attributeName: string
}

const EditPreferenceCourierWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id

    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [EditAttributes] = useUpdateattributesMutation()
    const { items } = useGetDataByIdCustomQuery<AttributesListResponse>({
        useEndPointHook: useGetattributesByIdQuery(Id),
    })
    const initialValues: FormInitialValues = {
        attributeName: items?.attributeName || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        attributeName: string().required('Attribute name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            EditAttributes({
                body: {
                    attributeName: values.attributeName,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/configurations/attributes')
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
                    <EditAttribute
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default EditPreferenceCourierWrapper
