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
import { FormInitialValues } from './AddwebsitePageWrapper'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Website Page',
        path: '/all-websites/website-page',
    },
    {
        label: 'Add ',
    },
]

const AddWebsitePage = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div >
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div >
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
                        <div className="grid grid-cols-3 gap-6 px-5">
                            {/* Field1 */}

                            {/* Field 3 */}
                            <ATMTextField
                                name="pageName"
                                required
                                value={values.pageName}
                                label="Page Name "
                                placeholder="Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'pageName',
                                        e.target.value
                                    )
                                }
                            />

                            <ATMTextField
                                name="pageUrl"
                                required
                                value={values.pageUrl}
                                label="Page Url"
                                placeholder="Url"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'pageUrl',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4 px-5 py-5">
                            <ATMTextArea
                                name="headerSpace"
                                required
                                value={values.headerSpace}
                                label="Subtitle Name"
                                onChange={(e: any) =>
                                    handleSetFieldValue('headerSpace', e)
                                }
                                minRows={4}
                            />
                            <ATMTextArea
                                name="footerSpace"
                                required
                                value={values.footerSpace}
                                label="footer Space"
                                onChange={(e: any) =>
                                    handleSetFieldValue('footerSpace', e)
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

export default AddWebsitePage
