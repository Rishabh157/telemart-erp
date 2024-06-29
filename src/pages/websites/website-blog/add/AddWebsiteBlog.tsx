/// ==============================================
// Filename:AddWebsiteBlogWrapper.tsx
// Type: Add Component
// Last Updated: JULY 06, 2023
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
import { FormInitialValues } from './AddWebsiteBlogWrapper'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'

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
        label: 'Website Blog',
        path: '/all-websites/website-blog',
    },
    {
        label: 'Add Website Blog',
    },
]

const AddWebsiteBlog = ({ formikProps, apiStatus }: Props) => {
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
                    <ATMPageHeading> Add New Blog </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Blog Details</div>

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
                                name="blogName"
                                value={values.blogName}
                                required
                                label="Blog Name"
                                placeholder="Blog Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'blogName',
                                        e.target.value
                                    )
                                }
                            />

                            {/* Field 3 */}
                            <ATMTextField
                                name="blogTitle"
                                required
                                value={values.blogTitle}
                                label="Blog Title"
                                placeholder="Blog Title"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'blogTitle',
                                        e.target.value
                                    )
                                }
                            />

                            {/* Field 3 */}
                            <ATMTextField
                                name="blogSubtitle"
                                value={values.blogSubtitle}
                                label="Blog SubTitle"
                                placeholder="Blog SubTitle"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'blogSubtitle',
                                        e.target.value
                                    )
                                }
                            />

                            <ATMTextField
                                name="image"
                                value={values.image}
                                label="Image"
                                placeholder="Image"
                                onChange={(e) =>
                                    handleSetFieldValue('image', e.target.value)
                                }
                            />

                            <ATMTextArea
                                minRows={4}
                                name="blogDescription"
                                value={values.blogDescription}
                                label="Blog Description"
                                onChange={(newValue) =>
                                    handleSetFieldValue(
                                        'blogDescription',
                                        newValue
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddWebsiteBlog
