// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import { FormInitialValues } from './AddSlotManagementWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMTimePicker from 'src/components/UI/atoms/formFields/ATMTimePicker/ATMTimePicker'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMRadioButton from 'src/components/UI/atoms/formFields/ATMRadioButton/ATMRadioButton'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { weekDaysOptions } from 'src/utils/constants/customeTypes'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        channelGroupOptions: SelectOption[]
        categoryOption: SelectOption[]
        channelMgtOptions: SelectOption[]
        tapeMangementOptions: SelectOption[]
    }
}
const breadcrumbs: BreadcrumbType[] = [
    {
        label: ' Slot Management',
        path: '/media/slot/defination',
    },
    {
        label: 'Add Slot',
    },
]

const AddSlotManagement = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps

    dropdownOptions = {
        ...dropdownOptions,
    }

    const options = [
        {
            label: 'Fixed',
            value: 'FIXED',
        },
        {
            label: 'Flexible',
            value: 'FLEXIBLE',
        },
    ]

    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className="">
            <div className="flex flex-col gap-2 p-4 ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New Slot</ATMPageHeading>
                </div>

                <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">Slot Details</div>

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
                    <div className="px-3 py-8 grow ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* FirstName */}
                            <ATMTextField
                                name="slotName"
                                value={values.slotName}
                                label="Slot Name"
                                required
                                placeholder="Slot Name"
                                onChange={(e) => {
                                    handleSetFieldValue(
                                        'slotName',
                                        e.target.value
                                    )
                                }}
                            />
                            <ATMSelectSearchable
                                required
                                name="channelGroup"
                                value={values.channelGroup}
                                onChange={(e) =>
                                    handleSetFieldValue('channelGroup', e)
                                }
                                options={dropdownOptions.channelGroupOptions}
                                label="Channel Group"
                            />
                            <div className="">
                                <ATMRadioButton
                                    name="type"
                                    label="Type"
                                    options={options}
                                    value={values.type}
                                    onChange={(e) => {
                                        handleSetFieldValue('type', e)
                                    }}
                                    required={true}
                                />
                            </div>
                            <div className="">
                                <ATMSelectSearchable
                                    name="channelName"
                                    required
                                    value={values.channelName}
                                    onChange={(e) =>
                                        handleSetFieldValue('channelName', e)
                                    }
                                    options={dropdownOptions.channelMgtOptions}
                                    label="Channel Name"
                                />
                            </div>
                            <ATMSelectSearchable
                                name="tapeName"
                                required
                                value={values.tapeName}
                                onChange={(e) =>
                                    handleSetFieldValue('tapeName', e)
                                }
                                options={dropdownOptions.tapeMangementOptions}
                                label="Tape Name"
                            />
                            <ATMTextField
                                name="channelTrp"
                                // required
                                value={values.channelTrp}
                                label="Channel Trp   "
                                placeholder="Channel Trp "
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'channelTrp',
                                        e.target.value
                                    )
                                }
                            />
                            <ATMTextArea
                                name="remarks"
                                value={values.remarks}
                                label="Remarks "
                                placeholder="Remarks "
                                onChange={(newValue) =>
                                    handleSetFieldValue('remarks', newValue)
                                }
                            />{' '}
                        </div>
                        <div className="px-3 pt-5">
                            <div className="pb-2 text-lg font-medium  text-primary-main">
                                Add Slot Details
                            </div>

                            <div className="grid items-end grid-cols-4 gap-2 pb-5">
                                <div className="mt-0">
                                    <ATMSelectSearchable
                                        isAllSelect
                                        name={'slotDay'}
                                        value={values.slotDay}
                                        required
                                        onChange={(e) => {
                                            handleSetFieldValue('slotDay', e)
                                        }}
                                        size="small"
                                        label={'Slot Days'}
                                        isMulti={true}
                                        options={weekDaysOptions()}
                                    />
                                </div>
                                <div>
                                    <ATMTextField
                                        name="slotPrice"
                                        required
                                        value={values.slotPrice}
                                        label="Slot Price"
                                        placeholder="Slot Price"
                                        onChange={(e) =>
                                            handleSetFieldValue(
                                                'slotPrice',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="">
                                    <ATMDatePicker
                                        required
                                        name={`slotStartDate`}
                                        value={values.slotStartDate}
                                        label="Start Date"
                                        onChange={(newValue) => {
                                            handleSetFieldValue(
                                                'slotStartDate',
                                                newValue
                                            )
                                        }}
                                    />
                                </div>
                                <div className="">
                                    <ATMDatePicker
                                        name={`slotRenewal`}
                                        value={values.slotRenewal}
                                        label="Slot Renewal"
                                        onChange={(newValue) => {
                                            handleSetFieldValue(
                                                'slotRenewal',
                                                newValue
                                            )
                                        }}
                                    />
                                </div>
                                <div className="">
                                    <ATMTimePicker
                                        required
                                        name={`slotStartTime`}
                                        value={values.slotStartTime}
                                        label="Start Time"
                                        onChange={(newValue) => {
                                            handleSetFieldValue(
                                                'slotStartTime',
                                                newValue
                                            )
                                        }}
                                    />
                                </div>
                                <div className="">
                                    <ATMTimePicker
                                        required
                                        name={`slotEndTime`}
                                        value={values.slotEndTime}
                                        label="End Time"
                                        onChange={(newValue) => {
                                            handleSetFieldValue(
                                                'slotEndTime',
                                                newValue
                                            )
                                        }}
                                    />
                                </div>
                                <div>
                                    <ATMSwitchButton
                                        name="slotContinueStatus"
                                        required
                                        value={values.slotContinueStatus}
                                        label="Continue slot"
                                        onChange={(value) =>
                                            handleSetFieldValue(
                                                'slotContinueStatus',
                                                value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSlotManagement
