import React from 'react'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddwebsiteWrapper'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { useDispatch } from 'react-redux'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

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
        label: 'Add',
    },
]

const AddWebsite = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
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
                    <ATMPageHeading> Add </ATMPageHeading>
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
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-2 pb-9 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* Field1 */}

                            {/* Field 3 */}
                            <ATMTextField
                                name="productName"
                                value={values.productName}
                                label="Product Name"
                                placeholder="Product Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'productName',
                                        e.target.value
                                    )
                                }
                            />

                            {/* Field 3 */}
                            <ATMTextField
                                name="url"
                                value={values.url}
                                label="URL"
                                placeholder="URL"
                                onChange={(e) =>
                                    handleSetFieldValue('url', e.target.value)
                                }
                            />

                            <ATMTextField
                                // minRows={4}
                                name="gaTagIp"
                                value={values.gaTagIp}
                                label="GA Tag"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'gaTagIp',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <ATMTextArea
                                minRows={4}
                                name="searchConsoleIp"
                                value={values.searchConsoleIp}
                                label="Search Console IP Address"
                                onChange={(newValue) =>
                                    handleSetFieldValue(
                                        'searchConsoleIp',
                                        newValue
                                    )
                                }
                            />

                            <ATMTextArea
                                minRows={4}
                                name="headerSpace"
                                value={values.headerSpace}
                                label="Header Space"
                                onChange={(newValue) =>
                                    handleSetFieldValue('headerSpace', newValue)
                                }
                            />

                            <ATMTextArea
                                minRows={4}
                                name="footerSpace"
                                value={values.footerSpace}
                                label="Footer Space"
                                onChange={(newValue) =>
                                    handleSetFieldValue('footerSpace', newValue)
                                }
                            />

                            <ATMTextArea
                                minRows={4}
                                name="siteMap"
                                value={values.siteMap}
                                label="SiteMap"
                                onChange={(newValue) =>
                                    handleSetFieldValue('siteMap', newValue)
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
