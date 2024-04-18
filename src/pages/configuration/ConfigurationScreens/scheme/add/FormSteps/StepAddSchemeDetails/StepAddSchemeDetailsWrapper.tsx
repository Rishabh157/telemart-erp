// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field } from 'src/models/FormField/FormField.model'
import { useGetAllProductCategoryQuery } from 'src/services/ProductCategoryServices'
import { useGetSubCategoryByParentQuery } from 'src/services/ProductSubCategoryService'
import { FormInitialValues } from '../../AddSchemeWrapper'
import StepAddSchemeDetails from './StepAddSchemeDetails'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

const formFields: {
    sectionName: string
    fields: Field<'productCategoryoption' | 'productSubCategoryOption'>[]
}[] = [
    {
        sectionName: 'Scheme Code',
        fields: [
            {
                name: 'SchemeCode',
                label: 'Scheme code',
                placeholder: 'Scheme code',
            },
            {
                name: 'Category',
                label: 'Category',
                placeholder: 'Category',
                type: 'select',
                optionAccessKey: 'productCategoryoption',
            },
            {
                name: 'subCategory',
                label: 'Sub Category',
                placeholder: 'subCategory',
                type: 'select',
                optionAccessKey: 'productSubCategoryOption',
            },
            {
                name: 'schemeName',
                label: 'schemeName',
                placeholder: 'Scheme Name',
            },
            {
                name: 'schemePrice',
                label: 'schemePrice',
                placeholder: 'Scheme Price',
            },

            {
                name: 'commission',
                label: 'Commission',
                placeholder: 'Commission',
            },
            {
                name: 'dimension.height',
                label: 'Dimensions',
                placeholder: 'H',
            },
            {
                name: 'dimension.width',
                label: 'Dimensions',
                placeholder: 'W',
            },
            {
                name: 'dimension.depth',
                label: 'Dimensions',
                placeholder: 'D',
            },
            {
                name: 'weight',
                label: 'weight',
                placeholder: 'weight',
            },
            {
                name: 'deliveryCharges',
                label: 'deliveryCharges',
                placeholder: 'deliveryCharges',
            },
            {
                name: 'comboPacking',
                label: 'comboPacking',
                placeholder: 'comboPacking',
            },
            {
                name: 'startDate',
                label: 'startDate',
                placeholder: 'startDate',
            },
            {
                name: 'endDate',
                label: 'endDate',
                placeholder: 'endDate',
            },
            {
                name: 'schemeDescription',
                label: 'schemeDescription',
                placeholder: 'schemeDescription',
            },
        ],
    },
]

const StepAddSchemeDetailsWrapper = ({ formikProps }: Props) => {
    const { options: productCategoryoption } = useCustomOptions({
        useEndPointHook: useGetAllProductCategoryQuery(''),
        keyName: 'categoryName',
        value: '_id',
    })

    const { options: productSubCategoryOption } = useCustomOptions({
        useEndPointHook: useGetSubCategoryByParentQuery(
            formikProps?.values?.category,
            {
                skip: !formikProps?.values?.category,
            }
        ),
        keyName: 'subCategoryName',
        value: '_id',
    })

    const dropdownOptions = {
        productCategoryoption,
        productSubCategoryOption,
    }

    return (
        <>
            <StepAddSchemeDetails
                formikProps={formikProps}
                formFields={formFields}
                dropdownOptions={dropdownOptions}
            />
        </>
    )
}

export default StepAddSchemeDetailsWrapper
