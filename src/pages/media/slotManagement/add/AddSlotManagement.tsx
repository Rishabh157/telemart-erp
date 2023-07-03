/// ==============================================
// Filename:AddSlotManagement.tsx
// Type: Add Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FieldArray, FormikProps } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import moment from 'moment'
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
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'

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
        path: '/media/slot',
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

    const [slotStartDate, setSlotStartDate] = useState('')
    const [slotEndDate, setSlotEndDate] = useState('')
    const [slotStartTime, setSlotStartTime] = useState('')
    const [slotEndTime, setSlotEndTime] = useState('')
    const [showSlots, setShowSlots] = useState(false)

    // const options = ['FIXED', 'FLEXIBLE']
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

    const getDates = (startDate: any, endDate: any) => {
        const dateArray = []
        const currentDate = moment(startDate, 'MM/DD/YYYY')
        const finalDate = moment(endDate, 'MM/DD/YYYY')
        while (moment(currentDate).isSameOrBefore(finalDate)) {
            dateArray.push(currentDate.format('MM/DD/YYYY'))
            currentDate.add(1, 'days')
        }

        return dateArray
    }

    const handleConfirm = () => {
        setShowSlots(true)
        const startDate = moment(slotStartDate).format('MM/DD/YYYY')
        const endDate = moment(slotEndDate).format('MM/DD/YYYY')
        const datesBetween = getDates(startDate, endDate)
        const newData = datesBetween?.map((ele) => {
            return { date: ele, startTime: slotStartTime, endTime: slotEndTime }
        })
        setFieldValue('channelSlot', newData)
    }
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
                    <ATMPageHeading> Add New Slot</ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
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
                    <div className="grow py-8 px-3 ">
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
                                required
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
                            <div className=" text-lg pb-2 font-medium text-primary-main">
                                Add Slot Details
                            </div>

                            <div className="grid grid-cols-5 gap-2 items-end  pb-5">
                                {/* Est. Receiving Date */}
                                <div className="flex-[3_3_0%]">
                                    <ATMDatePicker
                                        name={`date`}
                                        value={slotStartDate}
                                        minDate={new Date()}
                                        label="Slot Start Date"
                                        dateTimeFormat="MM/DD/YY ddd"
                                        onChange={(newValue) =>
                                            setSlotStartDate(newValue)
                                        }
                                    />
                                </div>
                                <div className="flex-[3_3_0%]">
                                    <ATMDatePicker
                                        name={`endDate`}
                                        minDate={new Date()}
                                        value={slotEndDate}
                                        label="Slot End Date"
                                        dateTimeFormat="MM/DD/YY ddd"
                                        onChange={(newValue) =>
                                            setSlotEndDate(newValue)
                                        }
                                    />
                                </div>
                                <div className="">
                                    <ATMTimePicker
                                        name={`startTime`}
                                        value={slotStartTime}
                                        label="Start Time"
                                        onChange={(newValue) => {
                                            setSlotStartTime(newValue)
                                        }}
                                    />
                                </div>
                                <div className="">
                                    <ATMTimePicker
                                        name={`endTime`}
                                        value={slotEndTime}
                                        label="End Time"
                                        onChange={(newValue) => {
                                            setSlotEndTime(newValue)
                                        }}
                                    />
                                </div>
                                <button
                                    type="button"
                                    disabled={
                                        !slotStartDate ||
                                        !slotEndDate ||
                                        !slotStartTime ||
                                        !slotEndTime
                                    }
                                    onClick={() => {
                                        handleConfirm()
                                    }}
                                    className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                        !slotStartDate ||
                                        !slotEndDate ||
                                        !slotStartTime ||
                                        !slotEndTime
                                            ? 'opacity-50'
                                            : ''
                                    }`}
                                >
                                    Confirm
                                </button>
                            </div>

                            {showSlots ? (
                                <FieldArray name="channelSlot">
                                    {({ push, remove }) => {
                                        return (
                                            <>
                                                <div className="flex flex-col gap-y-9">
                                                    {values.channelSlot?.map(
                                                        (item, itemIndex) => {
                                                            const {
                                                                date,
                                                                startTime,
                                                                endTime,
                                                            } = item

                                                            return (
                                                                <div
                                                                    key={
                                                                        itemIndex
                                                                    }
                                                                    className="flex gap-5 items-end  "
                                                                >
                                                                    {/* Est. Receiving Date */}
                                                                    <div className="flex-[3_3_0%]">
                                                                        <ATMDatePicker
                                                                            name={`channelSlot[${itemIndex}].date`}
                                                                            value={
                                                                                date
                                                                            }
                                                                            dateTimeFormat="MM/DD/YY ddd"
                                                                            label="Date"
                                                                            onChange={(
                                                                                newValue
                                                                            ) =>
                                                                                handleSetFieldValue(
                                                                                    `channelSlot[${itemIndex}].date`,
                                                                                    newValue
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="flex-[3_3_0%]">
                                                                        <ATMTimePicker
                                                                            name={`channelSlot[${itemIndex}].startTime`}
                                                                            value={
                                                                                startTime
                                                                            }
                                                                            label="Start Time"
                                                                            onChange={(
                                                                                newValue
                                                                            ) => {
                                                                                handleSetFieldValue(
                                                                                    `channelSlot[${itemIndex}].startTime`,
                                                                                    newValue
                                                                                )
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="flex-[3_3_0%]">
                                                                        <ATMTimePicker
                                                                            name={`channelSlot[${itemIndex}].endTime`}
                                                                            value={
                                                                                endTime
                                                                            }
                                                                            label="End Time"
                                                                            onChange={(
                                                                                newValue
                                                                            ) => {
                                                                                handleSetFieldValue(
                                                                                    `channelSlot[${itemIndex}].endTime`,
                                                                                    newValue
                                                                                )
                                                                            }}
                                                                        />
                                                                    </div>

                                                                    {/* BUTTON - Delete */}
                                                                    {values
                                                                        .channelSlot
                                                                        ?.length >
                                                                        1 && (
                                                                        <div>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    remove(
                                                                                        itemIndex
                                                                                    )
                                                                                }}
                                                                                className="p-2 bg-red-500 text-white rounded"
                                                                            >
                                                                                <MdDeleteOutline className="text-2xl" />
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        }
                                                    )}
                                                </div>

                                                {/* BUTTON - Add More Product */}
                                                {/* <div className="flex justify-self-start py-7">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        push({
                                                            date: '',
                                                            startTime: '',
                                                            endTime: '',
                                                        })
                                                    }
                                                    className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
                                                >
                                                    <HiPlus size="20" />
                                                </button>
                                            </div> */}
                                            </>
                                        )
                                    }}
                                </FieldArray>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSlotManagement
