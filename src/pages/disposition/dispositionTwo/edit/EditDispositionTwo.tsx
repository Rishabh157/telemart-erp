import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from './EditDispositionTwoWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useDispatch } from 'react-redux'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        DispotionOneOptions: SelectOption[]
    }
}
const breadcrumbs: BreadcrumbType[] = [
    {
        label: ' Disposition Two',
        path: '/dispositions/disposition-two',
    },
    {
        label: 'Edit',
    },
]

const EditDispositionTwo = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps

    dropdownOptions = {
        ...dropdownOptions,
    }

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
                <ATMPageHeading> Edit</ATMPageHeading>
            </div>

            <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
                <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                    {/* Form Heading */}
                    <div className="text-xl font-medium">Details</div>

                    {/* BUTTON - Add Button */}
                    <div>
                        <button
                            type="button"
                            disabled={apiStatus}
                            onClick={() => {
                                formikProps.handleSubmit()
                            }}
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
                        {/* FirstName */}
                        <ATMTextField
                            readOnly
                            disabled
                            name="dispositionName"
                            value={values.dispositionDisplayName}
                            label="Disposition Name"
                            required
                            placeholder="Name"
                            onChange={(e) => {
                                handleSetFieldValue(
                                    'dispositionName',
                                    e.target.value
                                )
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            name="dispositionOneId"
                            value={values.dispositionOneId}
                            onChange={(e) =>
                                handleSetFieldValue('dispositionOneId', e)
                            }
                            options={dropdownOptions.DispotionOneOptions}
                            label="Disposition One"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDispositionTwo
