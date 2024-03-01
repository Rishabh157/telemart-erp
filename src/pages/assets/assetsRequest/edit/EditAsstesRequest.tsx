/// ==============================================
// Filename:EditAssetsRequest.tsx
// Type: Edit Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './EditAssetsRequestwrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { SelectOption } from 'src/models/FormField/FormField.model'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        assetCategoryOptions: SelectOption[]
    }
}
const EditAsstesRequest = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Assets Request',
            path: '/assets/assets-request',
        },
        {
            label: 'Update ',
        },
    ]
    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Update </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Details</div>

                        {/* BUTTON - Update Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => {
                                    formikProps.handleSubmit()
                                }}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    apiStatus ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow pt-2 pb-9 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* Field1 */}

                            {/* Field 3 */}
                            <ATMTextField
                                name="assetName"
                                required
                                value={values.assetName}
                                label="Asset Name"
                                placeholder="Asset Name"
                                onChange={(e) =>
                                    setFieldValue('assetName', e.target.value)
                                }
                            />
                            <ATMSelectSearchable
                                name="assetCategory"
                                required
                                value={values.assetCategory}
                                onChange={(e) =>
                                    setFieldValue('assetCategory', e)
                                }
                                options={dropdownOptions?.assetCategoryOptions}
                                label="Asset Category"
                            />
                            <ATMTextField
                                name="quantity"
                                value={values.quantity}
                                label="Quantity"
                                placeholder="Quantity"
                                onChange={(e) =>
                                    setFieldValue('quantity', e.target.value)
                                }
                            />
                            <ATMTextField
                                name="price"
                                value={values.price}
                                label="Price"
                                placeholder="Price"
                                onChange={(e) =>
                                    setFieldValue('price', e.target.value)
                                }
                            />
                            <ATMTextArea
                                name="remark"
                                value={values.remark}
                                label="Remark "
                                placeholder="Remark "
                                onChange={(newValue) =>
                                    setFieldValue('remark', newValue)
                                }
                            />
                            <ATMTextArea
                                name="assetDetails"
                                value={values.assetDetails}
                                label="Asset Details (, seperated values)"
                                placeholder="Asset Details "
                                onChange={(newValue) =>
                                    setFieldValue('assetDetails', newValue)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAsstesRequest
