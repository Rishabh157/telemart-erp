// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { array, object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AddAttributeGroup from './AddAttributeGroup'

import { useAddAttributeGroupMutation } from 'src/services/AttributeGroup'
import { showToast } from 'src/utils'
import { useGetAllAttributesQuery } from 'src/services/AttributeService'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { useCustomOptions } from 'src/hooks/useCustomOptions'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    group_name: string
    attributes: { label: string; value: string }[]
}

const AddAttributeGroupWrapper = (props: Props) => {
    const navigate = useNavigate()
    // Form Initial Values
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { options } = useCustomOptions({
        useEndPointHook: useGetAllAttributesQuery(''),
        keyName: 'attributeName',
        value: '_id',
    })

    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [AddAttributeGroups] = useAddAttributeGroupMutation()

    const initialValues: FormInitialValues = {
        group_name: '',
        attributes: [],
    }
    // Form Validation Schema
    const validationSchema = object({
        group_name: string().required('Required'),
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
            AddAttributeGroups({
                groupName: values.group_name,
                attributes: values.attributes,
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddAttributeGroup
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        // allItems={allItems}
                        attributeOptions={options}
                    />
                )
            }}
        </Formik>
    )
}

export default AddAttributeGroupWrapper
