import React, { useState } from 'react'
import { Formik } from 'formik'
import { number, object, string } from 'yup'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import AddProductGroup from './AddProductGroup'
import { useNavigate } from 'react-router-dom'
import { useAddProductGroupMutation } from 'src/services/ProductGroupService'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { showToast } from 'src/utils'

export type FormInitialValues = {
    groupName: string
    dealerSalePrice: number
    gst: number
    sgst: number
    cgst: number
    igst: number
    utgst: number
}

const AddProductGroupWrapper: React.FC<{}> = () => {
    // Form Initial Values
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const navigate = useNavigate()
    const [addProductGroup] = useAddProductGroupMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        groupName: '',
        dealerSalePrice: 0,
        gst: 0,
        sgst: 0,
        cgst: 0,
        igst: 0,
        utgst: 0,
    }

    // Form Validation Schema
    const validationSchema = object({
        groupName: string().required('Required'),
        dealerSalePrice: number().required('Required'),
        gst: number(),
        sgst: number(),
        cgst: number(),
        igst: number(),
        utgst: number(),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)

        setTimeout(() => {
            addProductGroup({
                dealerSalePrice: values.dealerSalePrice,
                groupName: values.groupName,
                gst: values.gst,
                sgst: values.sgst,
                cgst: values.cgst,
                igst: values.igst,
                utgst: values.utgst,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/configurations/product-group')
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
        <ConfigurationLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddProductGroup
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default AddProductGroupWrapper
