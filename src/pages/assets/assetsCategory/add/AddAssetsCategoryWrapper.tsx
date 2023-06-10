import React, { useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import AddAsstesCategory from './AddAsstesCategory'
import { useAddAssetsCategoryMutation } from 'src/services/assets/AssetsCategoryService'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import AsstesLayout from '../../AssetsLayout'

type Props = {}

export type FormInitialValues = {
    categoryName: string
}

const AddAssetsCategoryWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addCategory] = useAddAssetsCategoryMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        categoryName: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        categoryName: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addCategory({
                assetCategoryName: values.categoryName,
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/assets/assets-category')
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
        <AsstesLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddAsstesCategory
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </AsstesLayout>
    )
}

export default AddAssetsCategoryWrapper
