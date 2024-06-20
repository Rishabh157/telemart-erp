import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from './AddDispositionTwoWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { handleValidCharchater } from 'src/utils/methods/charchterMethods'

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
        label: 'Add ',
    },
]

const AddDispositionTwo = ({
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
                            Submit
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="grow py-8 px-3 ">
                    <div className="grid grid-cols-3 gap-4">
                        <ATMTextField
                            name="dispositionName"
                            value={values.dispositionName}
                            label="Disposition Name"
                            required
                            placeholder="Disposition Name"
                            onChange={(e: any) => {
                                if (
                                    e.nativeEvent.inputType ===
                                    'deleteContentBackward'
                                ) {
                                    // If backspace, remove the last character
                                    handleSetFieldValue(
                                        'dispositionName',
                                        e.target.value
                                    )
                                } else {
                                    // If not backspace, perform character validation
                                    if (!values.dispositionName) {
                                        handleSetFieldValue(
                                            'dispositionName',
                                            e.target.value
                                        )
                                    } else {
                                        handleValidCharchater(e) &&
                                            handleSetFieldValue(
                                                'dispositionName',
                                                e.target.value
                                            )
                                    }
                                }
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

export default AddDispositionTwo
