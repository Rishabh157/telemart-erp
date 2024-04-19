// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import {
    useGetAssetsCategoryByIdQuery,
    useUpdateAssetsCategoryMutation,
} from 'src/services/assets/AssetsCategoryService'
import { showToast } from 'src/utils'
import EditAsstesCategory from './EditAssetsCategory'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    categoryName: string
}

const EditAssetsCategoryWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [editCategory] = useUpdateAssetsCategoryMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetAssetsCategoryByIdQuery(Id),
    })
    const initialValues: FormInitialValues = {
        categoryName: selectedItem?.assetCategoryName || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        categoryName: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            editCategory({
                body: {
                    assetCategoryName: values.categoryName,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
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
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditAsstesCategory
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </>
    )
}

export default EditAssetsCategoryWrapper
