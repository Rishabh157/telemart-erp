// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { array, object, string } from 'yup'

// |-- Internal Dependencies --|
import EditAttributeGroup from './EditAttributeGroup'

import { setFieldCustomized } from 'src/redux/slices/authSlice'
import {
    useGetattributeGroupByIdQuery,
    useUpdateattributeGroupMutation,
} from 'src/services/AttributeGroup'
import { useGetAllAttributesQuery } from 'src/services/AttributeService'
import { showToast } from 'src/utils'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { AttributesGroupListResponse } from 'src/models'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    group_name: string
    attributes: { label: string; value: string }[]
}

const EditAttributeGroupWrapper = (props: Props) => {
    const params = useParams()
    const Id = params.id
    const navigate = useNavigate()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const dispatch = useDispatch<AppDispatch>()
    // Form Initial Values

    const { items } = useGetDataByIdCustomQuery<AttributesGroupListResponse>({
        useEndPointHook: useGetattributeGroupByIdQuery(Id),
    })

    const { options } = useCustomOptions({
        useEndPointHook: useGetAllAttributesQuery(''),
        keyName: 'attributeName',
        value: '_id',
    })

    const [EditAttributeGroups] = useUpdateattributeGroupMutation()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const attributeOptions = items?.attributes?.map((ele: any) => {
        return { label: ele.label, value: ele.value }
    })
    const initialValues: FormInitialValues = {
        group_name: items?.groupName || '',
        attributes: attributeOptions || [],
    }

    // Form Validation Schema
    const validationSchema = object({
        group_name: string().required('Attribute name is required'),
        attributes: array()
            .of(
                object().shape({
                    label: string().required(),
                    value: string().required(),
                })
            )
            .min(1, 'Please select atleast 1 attribute group'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            EditAttributeGroups({
                body: {
                    groupName: values.group_name,
                    attributes: values.attributes,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/configurations/attributes-group')
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
                    <EditAttributeGroup
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        attributeOptions={options}
                    />
                )
            }}
        </Formik>
    )
}

export default EditAttributeGroupWrapper
