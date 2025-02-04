// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from './AddDidManagementWrapper'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        schemeOptions: SelectOption[]
        channelNameOptions: SelectOption[]
        slotOptions: SelectOption[]
        didTypeOptions: SelectOption[]
    }
}
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Did Management',
        path: '/media/did',
    },
    {
        label: 'Add Did Management',
    },
]

const AddDidManagements = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {

    const { values, errors, setFieldValue } = formikProps
    const dispatch = useDispatch()

    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div>
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div>
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New DID </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> DID Details</div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${apiStatus ? 'opacity-50' : ''
                                    }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <ATMTextField
                                    required
                                    name="didNumber"
                                    value={values.didNumber}
                                    label="Did Number here"
                                    placeholder="Did Number"
                                    onChange={(e) =>
                                        handleSetFieldValue(
                                            'didNumber',
                                            e.target.value
                                        )
                                    }
                                />

                                {!errors?.didNumber && <span className="font-poppins text-[14px] text-start text-orange-400 text-wrap">
                                    Caution: The DID number should be the same as the dialer DID definition.
                                </span>}
                            </div>

                            <ATMSelectSearchable
                                required
                                name="schemeId"
                                value={values.schemeId}
                                onChange={(value) =>
                                    handleSetFieldValue('schemeId', value)
                                }
                                options={dropdownOptions.schemeOptions}
                                label="Scheme Name"
                            />

                            <ATMSelectSearchable
                                required
                                name="channelId"
                                value={values.channelId}
                                onChange={(value) =>
                                    handleSetFieldValue('channelId', value)
                                }
                                options={dropdownOptions.channelNameOptions}
                                label="Channel Name"
                            />

                            <ATMSelectSearchable
                                required
                                name="slotId"
                                value={values.slotId}
                                onChange={(value) =>
                                    handleSetFieldValue('slotId', value)
                                }
                                options={dropdownOptions.slotOptions}
                                label="Slot Name"
                            />

                            <ATMSelectSearchable
                                required
                                name="didType"
                                value={values.didType}
                                onChange={(value) =>
                                    handleSetFieldValue('didType', value)
                                }
                                options={dropdownOptions.didTypeOptions}
                                label="DID Type"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDidManagements
