import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { array, object, string } from 'yup'
import EditAttributeGroup from './EditAttributeGroup'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
// import { useEditAttributeGroupMutation } from "src/services/AttributeGroup";
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import {
    useGetattributeGroupByIdQuery,
    useUpdateattributeGroupMutation,
} from 'src/services/AttributeGroup'
import { setSelectedAttGroup } from 'src/redux/slices/attributesGroupSlice'
import { useGetAllAttributesQuery } from 'src/services/AttributeService'
import { setAllItems } from 'src/redux/slices/attributesSlice'

type Props = {}

export type FormInitialValues = {
    group_name: string
    attributes: { label: string; value: string }[]
}

const EditAttributeGroupWrapper = (props: Props) => {
    const params = useParams()
    const Id = params.id
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // Form Initial Values
    const { selectedAttributeGroup }: any = useSelector(
        (state: RootState) => state.attributesGroup
    )
    const { allItems }: any = useSelector(
        (state: RootState) => state.attributes
    )
    const { data, isLoading, isFetching } = useGetattributeGroupByIdQuery(Id)
    const {
        data: attributeData,
        isLoading: attrLoading,
        isFetching: attrIsFetching,
    } = useGetAllAttributesQuery('')

    const { userData } = useSelector((state: RootState) => state?.auth)
    const [EditAttributeGroups] = useUpdateattributeGroupMutation()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const attributeOptions = selectedAttributeGroup?.attributes?.map(
        (ele: any) => {
            return { label: ele.label, value: ele.value }
        }
    )
    const initialValues: FormInitialValues = {
        group_name: selectedAttributeGroup?.groupName || '',
        attributes: attributeOptions || [],
    }

    // Form Validation Schema
    const validationSchema = object({
        group_name: string().required('Group name is required'),
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

    useEffect(() => {
        dispatch(setSelectedAttGroup(data?.data))
    }, [dispatch, data, isLoading, isFetching])

    useEffect(() => {
        dispatch(setAllItems(attributeData?.data))
    }, [dispatch, attributeData, attrLoading, attrIsFetching])
    return (
        <ConfigurationLayout>
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
                            allItems={allItems}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default EditAttributeGroupWrapper
