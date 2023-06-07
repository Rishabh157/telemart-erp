import React from 'react'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { FormInitialValues } from './EditWebsitePageWrapper'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Website',
        path: '/all-websites/website-Page',
    },
    {
        label: 'Update',
    },
]

const EditWebsitePage = ({ formikProps, apiStatus }: Props) => {
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
                    <ATMPageHeading> Update Website Page </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Details</div>

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
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-9 px-5">
                            {/* Field1 */}

                            {/* Field 3 */}
                            <ATMTextField
                                name="pageUrl"
                                value={values.pageUrl}
                                label="Page Url"
                                placeholder="Url"
                                onChange={(e) =>
                                    setFieldValue('pageUrl', e.target.value)
                                }
                            />

                            <ATMTextField
                                name="pageName"
                                value={values.pageName}
                                label="Page Name "
                                placeholder="Name"
                                onChange={(e) =>
                                    setFieldValue('pageName', e.target.value)
                                }
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-9 px-5">
                            <ATMTextArea
                                name="headerSpace"
                                value={values.headerSpace}
                                label="Subtitle Name"
                                onChange={(e: any) =>
                                    setFieldValue('headerSpace', e)
                                }
                                minRows={4}
                            />
                            <ATMTextArea
                                name="footerSpace"
                                value={values.footerSpace}
                                label="footer Space"
                                onChange={(e: any) =>
                                    setFieldValue('footerSpace', e)
                                }
                                minRows={4}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditWebsitePage
