// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { array, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import {
    useGetAsrByIdQuery,
    useUpdateAsrMutation,
} from 'src/services/AsrService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { showToast } from 'src/utils'
import EditASR from './EditASR'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { ASRListResponse } from 'src/models'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|

export type FormInitialValues = {
    asrDetails: {
        productName: string
        productId: string
        quantity: number
    }[]
}

const EditASRWrapper = () => {
    const params = useParams()
    const Id = params.id
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    const [editAsr] = useUpdateAsrMutation()
    const { items: selectedItem } = useGetDataByIdCustomQuery<ASRListResponse>({
        useEndPointHook: useGetAsrByIdQuery(Id),
    })

    const { options } = useCustomOptions({
        useEndPointHook: useGetAllProductGroupQuery(''),
        keyName: 'groupName',
        value: '_id',
    })

    // Form Initial Values
    const initialValues: FormInitialValues = {
        asrDetails: selectedItem?.asrDetails as any,
    }

    // Form Validation Schema
    const validationSchema = object({
        asrDetails: array().of(
            object().shape({
                productName: string().required('Product name is required'),
                quantity: string().required('Quantity is required'),
            })
        ),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        const asrDetails = values.asrDetails.map((ele: any) => {
            const { _id, ...rest } = ele // use object destructuring to remove the _id property
            return rest // return the new object without the _id property
        })
        editAsr({
            body: {
                asrDetails: asrDetails,
                companyId: userData?.companyId || '',
            },
            id: Id || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Updated successfully!')
                    navigate('/asr')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
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
                        <EditASR
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                            dropDownOptions={options}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default EditASRWrapper
