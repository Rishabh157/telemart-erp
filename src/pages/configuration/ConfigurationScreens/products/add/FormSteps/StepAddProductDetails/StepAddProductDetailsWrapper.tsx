// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field } from 'src/models/FormField/FormField.model'
import { useGetAllProductCategoryQuery } from 'src/services/ProductCategoryServices'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { useGetSubCategoryByParentQuery } from 'src/services/ProductSubCategoryService'
import { FormInitialValues } from '../../AddProductWrapper'
import StepAddProductDetails from './StepAddProductDetails'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<
    'productSubCategoryOPtions' | 'productCategoryOPtions'
>
const StepAddProductDetailsWrapper = ({ formikProps }: Props) => {
    const { options: productCategoryOPtions } = useCustomOptions({
        useEndPointHook: useGetAllProductCategoryQuery(''),
        keyName: 'categoryName',
        value: '_id',
    })
    const { options: productSubCategoryOPtions } = useCustomOptions({
        useEndPointHook: useGetSubCategoryByParentQuery(
            formikProps?.values?.product_category,
            {
                skip: !formikProps?.values?.product_category,
            }
        ),
        keyName: 'subCategoryName',
        value: '_id',
    })
    const { options: productGroupOPtions } = useCustomOptions({
        useEndPointHook: useGetAllProductGroupQuery(''),
        keyName: 'groupName',
        value: '_id',
    })

    const dropdownOptions = {
        productSubCategoryOPtions,
        productCategoryOPtions,
        productGroupOPtions,
    }

    return (
        <>
            <StepAddProductDetails
                formikProps={formikProps}
                dropdownOptions={dropdownOptions}
            />
        </>
    )
}

export default StepAddProductDetailsWrapper
