import React from 'react'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddCompanyWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
// import ATMFilePickerWrapper from "src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper";

type Props = {
    formikProps: FormikProps<FormInitialValues>
}

const StepAddCompanyDetails = ({ formikProps }: Props) => {
    const { values, setFieldValue } = formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | File) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="py-9 px-7">
            <div className="grid grid-cols-3 gap-4 gap-y-5">
                {/* Company Name */}
                <ATMTextField
                    name="companyName"
                    value={values.companyName}
                    onChange={(e) => {
                        handleSetFieldValue('companyName', e.target.value)
                    }}
                    label="Company Name"
                    placeholder="Company Name"
                    className="shadow bg-white rounded"
                    isSubmitting={isSubmitting}
                />

                {/* Website URL */}
                <ATMTextField
                    name="websiteUrl"
                    value={values.websiteUrl}
                    onChange={(e) => {
                        handleSetFieldValue('websiteUrl', e.target.value)
                    }}
                    label="Website URL"
                    placeholder="Website URL"
                    className="shadow bg-white rounded"
                    isSubmitting={isSubmitting}
                />

                {/* GST NO. */}
                <ATMTextField
                    name="gstNo"
                    value={values.gstNo}
                    onChange={(e) => {
                        handleSetFieldValue('gstNo', e.target.value)
                    }}
                    label="GST NO."
                    placeholder="GST NO."
                    className="shadow bg-white rounded"
                    isSubmitting={isSubmitting}
                />

                {/* Address */}
                <ATMTextField
                    name="address"
                    value={values.address}
                    onChange={(e) => {
                        handleSetFieldValue('address', e.target.value)
                    }}
                    label="Address"
                    placeholder="Address"
                    className="shadow bg-white rounded"
                    isSubmitting={isSubmitting}
                />

                {/* Phone No. */}
                <ATMTextField
                    name="phoneNo"
                    value={values.phoneNo}
                    onChange={(e) => {
                        const inputValue = e.target.value
                        if (!isNaN(Number(inputValue))) {
                            handleSetFieldValue('phoneNo', inputValue)
                        }
                    }}
                    label="Phone No."
                    placeholder="Phone No."
                    className="shadow bg-white rounded"
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    )
}

export default StepAddCompanyDetails
