import React from 'react'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './EditDispositionOneWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useDispatch } from 'react-redux'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const EditDispositionOne = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Disposition One',
            path: '/dispositions/disposition-one',
        },
        {
            label: 'Edit',
        },
    ]
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="flex flex-col gap-2 p-4 ">
            {/* Breadcrumbs */}
            <div >
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Page Heading */}
            <div className="pt-1">
                <ATMPageHeading>Edit </ATMPageHeading>
            </div>

            <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
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
                <div className="px-3 py-8 grow ">
                    <div className="grid grid-cols-3 gap-4">
                        {/* Disposition Name */}
                        <ATMTextField
                            required
                            readOnly
                            disabled
                            name="dispositionName"
                            value={values.dispositionDisplayName}
                            label="Disposition Name"
                            placeholder="Name"
                            onChange={(e) =>
                                handleSetFieldValue(
                                    'dispositionName',
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDispositionOne
