// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddCompanyWrapper'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'

// |-- Types --|
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
                    required
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
                    required
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
                    required
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
                {/* <ATMTextField
                    required
                    name="address"
                    value={values.address}
                    onChange={(e) => {
                        handleSetFieldValue('address', e.target.value)
                    }}
                    label="Address"
                    placeholder="Address"
                    className="shadow bg-white rounded"
                    isSubmitting={isSubmitting}
                /> */}


                {/* Phone No. */}
                <ATMTextField
                    required
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

                <ATMTextArea
                    required
                    name="address"
                    value={values.address}
                    label="Address"
                    minRows={4}
                    className='rounded'
                    labelClass='text-slate-700 text-sm font-medium mt-2'
                    placeholder="Address"
                    onChange={(newValue) => setFieldValue('address', newValue)}
                />

            </div>
        </div>
    )
}

export default StepAddCompanyDetails
