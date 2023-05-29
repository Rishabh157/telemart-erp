import React from 'react'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { FormInitialValues } from './EditWebsiteBlogWrapper'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Website',
        path: '/all-websites/website-blog',
    },
    {
        label: 'Add Website',
    },
]

const EditWebsiteBlog = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New Website-blog </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">
                            {' '}
                            Website-blog Details
                        </div>

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

                            {/* Field 3 */}
                            <ATMTextField
                                name="blogName"
                                value={values.blogName}
                                label="Blog Name"
                                placeholder="Name"
                                onChange={(e) =>
                                    setFieldValue('blogName', e.target.value)
                                }
                            />
                       
                            <ATMTextField
                                name="blogTitle"
                                value={values.blogTitle}
                                label="Blog Title "
                                placeholder="Title "
                                onChange={(e) =>
                                    setFieldValue('blogTitle', e.target.value)
                                }
                            />
                            <ATMTextField
                                name="blogSubtitle"
                                value={values.blogSubtitle}
                                label="Subtitle Name"
                                placeholder="Subtitle "
                                onChange={(e) =>
                                    setFieldValue('blogSubtitle', e.target.value)
                                }
                            />
                            <ATMTextField
                                name="image"
                                value={values.image}
                                label="Image Name"
                                placeholder="Image Name"
                                onChange={(e) =>
                                    setFieldValue('image', e.target.value)
                                }
                            />
                            <ATMTextArea
                                label="Blog Description"
                                value={values.blogDescription}
                                onChange={(e) => {
                                    setFieldValue('blogDescription', e)
                                }}
                                minRows={3}
                                name="blogDescription"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditWebsiteBlog
