import React from 'react'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './EditWebsiteTagWrapper'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
		dropdownOptions: {
			WebsiteOptions: SelectOption[]
			WebsitePageOptions: SelectOption[]
			
	}
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Website Tags',
        path: '/all-websites/website-tags',
    },
    {
        label: 'Edit Website Tags',
    },
]

const EditWebsiteTag = ({ formikProps, apiStatus, dropdownOptions }: Props) => {
    const { values, setFieldValue } = formikProps
		dropdownOptions = {
			...dropdownOptions,
	}

    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New Tag </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> MetaTag Details</div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* Field1 */}
														<ATMSelectSearchable
                                name="websiteMasterId"
                                value={values.websiteMasterId}
                                onChange={(e) =>
                                    setFieldValue('websiteMasterId', e)
                                }
                                options={dropdownOptions.WebsiteOptions}
                                label="Website"
                            />

                            <div className="">
                                <ATMSelectSearchable
                                    name="websitPageId"
                                    required
                                    value={values.websitPageId}
                                    onChange={(e) =>
                                        setFieldValue('websitPageId', e)
                                    }
                                    options={
                                        dropdownOptions.WebsitePageOptions
                                    }
                                    label="Website Page"
                                />
                            </div>

                            {/* Field 3 */}
                            <ATMTextField
                                name="metaKeyword"
								required
                                value={values.metaKeyword}
                                label="Meta Keyword"
                                placeholder="Meta Keyword"
                                onChange={(e) =>
                                    setFieldValue('metaKeyword', e.target.value)
                                }
                            />

														

                            {/* Field 3 */}
                            <ATMTextField
                                name="metaOgTitle"
							    required
                                value={values.metaOgTitle}
                                label="Meta OG Title"
                                placeholder="Meta OG Title"
                                onChange={(e) =>
                                    setFieldValue('metaOgTitle', e.target.value)
                                }
                            />

                            {/* Field 3 */}
                            <ATMTextField
                                name="metaOgUrl"
								required
                                value={values.metaOgUrl}
                                label="Meta OG URL"
                                placeholder="Meta OG URL"
                                onChange={(e) =>
                                    setFieldValue(
                                        'metaOgUrl',
                                        e.target.value
                                    )
                                }
                            />

                            <ATMTextField
                                name="metaOgImage"
								required
                                value={values.metaOgImage}
                                label="Meta OG Image"
                                placeholder="Meta OG Image"
                                onChange={(e) =>
                                    setFieldValue('metaOgImage', e.target.value)
                                }
                            />

                           
								<ATMTextField
                                name="metaOgType"
								required
                                value={values.metaOgType}
                                label="Meta OG Type"
                                placeholder="Meta OG Type"
                                onChange={(e) =>
                                    setFieldValue('metaOgType', e.target.value)
                                }
                            />

								<ATMTextField
                                name="metaTwitterTitle"
								required
                                value={values.metaTwitterTitle}
                                label="Meta Twitter Title"
                                placeholder="Meta Twitter Title"
                                onChange={(e) =>
                                    setFieldValue('metaTwitterTitle', e.target.value)
                                }
                            />

								<ATMTextField
                                name="metaTwitterCard"
								required
                                value={values.metaTwitterCard}
                                label="Meta Twitter Card"
                                placeholder="Meta Twitter Card"
                                onChange={(e) =>
                                    setFieldValue('metaTwitterCard', e.target.value)
                                }
                            />

                                <ATMTextField
                                name="metaTwitterImage"
								required
                                value={values.metaTwitterImage}
                                label="Meta Twitter Image"
                                placeholder="Meta Twitter Image"
                                onChange={(e) =>
                                    setFieldValue('metaTwitterImage', e.target.value)
                                }
                            />

								<ATMTextArea
                                minRows={4}
								required
                                name="metaOgDescription"
                                value={values.metaOgDescription}
                                label="Meta OG Description"
                                onChange={(newValue) =>
                                    setFieldValue('metaOgDescription', newValue)
                                }
                            />

								<ATMTextArea
                                minRows={4}
								required
                                name="metaDescription"
                                value={values.metaDescription}
                                label="Meta Description"
                                onChange={(newValue) =>
                                    setFieldValue('metaDescription', newValue)
                                }
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditWebsiteTag
