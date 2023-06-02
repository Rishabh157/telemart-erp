import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import { object, string } from 'yup'
import AddProductCategory from './AddProductCategory'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { useAddProductCategoryMutation } from 'src/services/ProductCategoryServices'
import { showToast } from 'src/utils'
import { RootState } from 'src/redux/store'
import { useSelector } from 'react-redux'

type Props = {}

export type FormInitialValues = {
    categoryCode: string
    categoryName: string
}

const AddProductCategoryWrapper = (props: Props) => {
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [addProductCategory] = useAddProductCategoryMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    // Form Initial Values
    const initialValues: FormInitialValues = {
        categoryCode: '',
        categoryName: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        categoryCode: string().required('Required'),
        categoryName: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addProductCategory({
                categoryCode: values.categoryCode,
                categoryName: values.categoryName,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/configurations/product-category')
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
                        <AddProductCategory
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default AddProductCategoryWrapper
