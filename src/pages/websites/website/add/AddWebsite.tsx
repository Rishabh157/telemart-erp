import React from 'react'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddwebsiteWrapper'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Website',
        path: '/all-websites/Website',
    },
    {
        label: 'Add Website',
    },
]

const AddWebsite = ({ formikProps, apiStatus }: Props) => {
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
                    <ATMPageHeading> Add New Website </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">
                            {' '}
                            Website Details
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
                                name="productName"
                                value={values.productName}
                                label="Website Name"
                                placeholder="Website Name"
                                onChange={(e) =>
                                    setFieldValue('productName', e.target.value)
                                }
                            />

                            {/* Field 3 */}
                            <ATMTextField
                                name="url"
                                value={values.url}
                                label="URL"
                                placeholder="URL"
                                onChange={(e) =>
                                    setFieldValue('url', e.target.value)
                                }
                            />

                            <ATMTextArea
                                minRows={4}
                                name="gaTagIp"
                                value={values.gaTagIp}
                                label="GA Tag IP Address"
                                onChange={(newValue) =>
                                    setFieldValue('gaTagIp', newValue)
                                }
                            />

                            <ATMTextArea
                                minRows={4}
                                name="searchConsoleIp"
                                value={values.searchConsoleIp}
                                label="Search Console IP Address"
                                onChange={(newValue) =>
                                    setFieldValue('searchConsoleIp', newValue)
                                }
                            />

                            <ATMTextArea
                                minRows={4}
                                name="headerSpace"
                                value={values.headerSpace}
                                label="Header Space"
                                onChange={(newValue) =>
                                    setFieldValue('headerSpace', newValue)
                                }
                            />

                            <ATMTextArea
                                minRows={4}
                                name="footerSpace"
                                value={values.footerSpace}
                                label="Footer Space"
                                onChange={(newValue) =>
                                    setFieldValue('footerSpace', newValue)
                                }
                            />

                            <ATMTextArea
                                minRows={4}
                                name="siteMap"
                                value={values.siteMap}
                                label="SiteMap"
                                onChange={(newValue) =>
                                    setFieldValue('siteMap', newValue)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddWebsite
