/// ==============================================
// Filename:EditProductSubCategory.tsx
// Type: Edit Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from './EditProductSubCategoryWrapper'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: {
        parentCategoryOptions: SelectOption[]
    }
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Product Sub Category',
        path: '/configurations/product-sub-category',
    },
    {
        label: 'Edit',
    },
]

const EditProductSubCategory = ({
    formikProps,
    dropdownOptions,
    apiStatus,
}: Props) => {
    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | File) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className="h-[calc(100vh-55px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Edit </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Details </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    apiStatus ? 'opacity-50' : ''
                                }`}
                            >
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow pt-2 pb-9 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* subCategoryCode */}
                            <ATMTextField
                                name="subCategoryCode"
                                value={values.subCategoryCode}
                                label="Sub Category Code"
                                placeholder="Sub Category Code"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'subCategoryCode',
                                        e.target.value
                                    )
                                }
                                className="mt-0 rounded"
                            />

                            <ATMTextField
                                name="subCategoryName"
                                value={values.subCategoryName}
                                label="Sub Category Name"
                                placeholder="Sub Category Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'subCategoryName',
                                        e.target.value
                                    )
                                }
                                className="mt-0 rounded"
                            />
                            <div className="-mt-2 ">
                                <ATMSelectSearchable
                                    name="parentCategoryId"
                                    value={values.parentCategoryId}
                                    onChange={(e) => {
                                        handleSetFieldValue(
                                            'parentCategoryId',
                                            e
                                        )
                                    }}
                                    options={
                                        dropdownOptions.parentCategoryOptions
                                    }
                                    label="Parent Category"
                                />
                            </div>

                            {/* Field 3 */}
                            <ATMTextField
                                name="hsnCode"
                                value={values.hsnCode}
                                label="HSN Code"
                                placeholder="HSN Code"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'hsnCode',
                                        e.target.value
                                    )
                                }
                                className="mt-0 rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProductSubCategory
