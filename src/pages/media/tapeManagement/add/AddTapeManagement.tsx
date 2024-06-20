// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
import { HiPlus } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { MdDeleteOutline } from 'react-icons/md'

// |-- Internal Dependencies --|
import { getTapeManagementTypes } from 'src/utils/constants/customeTypes'
import { FormInitialValues } from './AddTapeManagementWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { RootState, AppDispatch } from 'src/redux/store'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        channelGroupOptions: SelectOption[]
        schemeOptions: SelectOption[]
        languageOptions: SelectOption[]
        artistOptions: SelectOption[]
    }
}
const breadcrumbs: BreadcrumbType[] = [
    {
        label: ' Tape Management',
        path: '/media/tape',
    },
    {
        label: 'Add Tape',
    },
]

const AddTapeManagement = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps
    const [show, setShow] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )

    const MinuteOptions = () => {
        let options: SelectOption[] = []
        options = [...options, { label: '00', value: '00' }]
        for (let i = 1; i <= 60; i++) {
            options = [...options, { label: i.toString(), value: i.toString() }]
        }
        return options
    }

    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div >
            <div className="p-4 flex flex-col gap-2 ">
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
                        <div className="text-xl font-medium">Tape Details</div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => {
                                    if (
                                        formikProps?.values.hour === '0' &&
                                        formikProps.values.minute === '00' &&
                                        formikProps.values.second === '00'
                                    ) {
                                        setShow(true)
                                        if (
                                            formikProps.values.languageId
                                                .length === 0 ||
                                            formikProps.values.tapeName ===
                                                '' ||
                                            formikProps.values.tapeType ===
                                                '' ||
                                            formikProps.values.artistId
                                                .length === 0
                                        ) {
                                            formikProps.handleSubmit()
                                        }
                                    } else {
                                        setShow(true)
                                        formikProps.handleSubmit()
                                    }
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
                    <div className="grow py-2 px-3 ">
                        <div className="grid grid-cols-3 gap-4 -mt-4">
                            {/* FirstName */}
                            <ATMTextField
                                name="tapeName"
                                required
                                value={values.tapeName}
                                label="Tape Name"
                                placeholder="Tape Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'tapeName',
                                        e.target.value
                                    )
                                }
                            />

                            <ATMSelectSearchable
                                options={getTapeManagementTypes()}
                                name="tapeType"
                                required
                                value={values.tapeType}
                                selectLabel="Select Tape type"
                                label="Tape Type"
                                onChange={(e) =>
                                    handleSetFieldValue('tapeType', e)
                                }
                            />
                            <ATMSelectSearchable
                                required
                                name="schemeId"
                                value={values.schemeId}
                                selectLabel="Select Scheme"
                                onChange={(value) =>
                                    handleSetFieldValue('schemeId', value)
                                }
                                options={dropdownOptions.schemeOptions}
                                label="Scheme"
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-4 ">
                            <ATMSelectSearchable
                                name="artistId"
                                required
                                isMulti={true}
                                selectLabel="Select Artist"
                                value={values.artistId}
                                onChange={(value) =>
                                    handleSetFieldValue('artistId', value)
                                }
                                options={dropdownOptions.artistOptions}
                                label="Artist"
                            />
                            <ATMSelectSearchable
                                name="languageId"
                                required
                                isMulti={true}
                                value={values.languageId}
                                onChange={(value) =>
                                    handleSetFieldValue('languageId', value)
                                }
                                options={dropdownOptions.languageOptions}
                                label="Language"
                            />
                            <ATMTextField
                                name="webSiteLink"
                                value={values.webSiteLink}
                                label="Website Link"
                                placeholder="Website Link"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'webSiteLink',
                                        e.target.value
                                    )
                                }
                            />
                            <ATMTextField
                                name="youtubeLink"
                                value={values.youtubeLink}
                                label="Youtube Link"
                                placeholder="Youtube Link"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'youtubeLink',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="grid grid-rows-2 ">
                                <div className=" row-sapn-1 text-slate-700 text-center justify-start flex -mt-4 p-0 m-0 items-center   font-medium ">
                                    Duration
                                </div>

                                <div className=" row-sapn-1 grid grid-cols-3 gap-x-2 -mt-9 ">
                                    <div className=" ">
                                        <ATMTextField
                                            name="hour"
                                            required
                                            value={values.hour}
                                            type="number"
                                            label="Hour"
                                            min={0}
                                            placeholder="HH"
                                            onChange={(e) => {
                                                if (e.target.value !== '0') {
                                                    setShow(false)
                                                }
                                                handleSetFieldValue(
                                                    'hour',
                                                    e.target.value
                                                )
                                            }}
                                        />
                                    </div>
                                    <div className=" ">
                                        <ATMSelectSearchable
                                            name="minute"
                                            required
                                            value={values.minute}
                                            selectLabel="MM"
                                            label="Minute"
                                            options={MinuteOptions()}
                                            onChange={(selectValue) => {
                                                if (selectValue !== '00') {
                                                    setShow(false)
                                                }
                                                handleSetFieldValue(
                                                    'minute',
                                                    selectValue
                                                )
                                            }}
                                        />
                                    </div>
                                    <div className=" ">
                                        <ATMSelectSearchable
                                            defaultValue="00"
                                            label="Second"
                                            required
                                            options={MinuteOptions()}
                                            name="second"
                                            value={values.second}
                                            selectLabel="SS"
                                            onChange={(selectValue) => {
                                                if (selectValue !== '00') {
                                                    setShow(false)
                                                }
                                                handleSetFieldValue(
                                                    'second',
                                                    selectValue
                                                )
                                            }}
                                        />
                                    </div>

                                    {show ? (
                                        <p className="font-poppins relative text-[14px] text-start mt-0 text-red-500 col-span-3">
                                            Duration is Required
                                        </p>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                            <ATMTextArea
                                minRows={3}
                                name="remarks"
                                value={values.remarks}
                                label="Remark"
                                onChange={(newValue) =>
                                    handleSetFieldValue('remarks', newValue)
                                }
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4 "></div>
                        {/*  Phone  */}
                        <div className="py-8">
                            <div className=" text-lg pb-2 font-medium text-primary-main">
                                Add Phone Number
                            </div>

                            <FieldArray name="phone">
                                {({ push, remove }) => {
                                    return (
                                        <>
                                            <div className="grid grid-cols-4 gap-4">
                                                {values.phone?.map(
                                                    (
                                                        item: any,
                                                        itemIndex: any
                                                    ) => {
                                                        let { phoneNo } = item

                                                        return (
                                                            <div
                                                                key={itemIndex}
                                                                className="flex gap-3 items-end"
                                                            >
                                                                {/* Phone */}
                                                                <div className="w-full">
                                                                    <ATMTextField
                                                                        type="text"
                                                                        required
                                                                        name={`phone[${itemIndex}].phoneNo`}
                                                                        value={
                                                                            phoneNo
                                                                        }
                                                                        label="Phone"
                                                                        placeholder="Phone"
                                                                        extraClassField="mt-0"
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            handleSetFieldValue(
                                                                                `phone[${itemIndex}].phoneNo`,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }}
                                                                        isSubmitting={
                                                                            isSubmitting
                                                                        }
                                                                    />
                                                                </div>

                                                                {values?.phone
                                                                    ?.length &&
                                                                    values
                                                                        ?.phone
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
                                                                                className="p-2 bg-red-500 text-white rounded h-[37px]"
                                                                            >
                                                                                <MdDeleteOutline />
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                            </div>
                                                        )
                                                    }
                                                )}
                                            </div>

                                            {/* BUTTON - Add More Product */}
                                            <div className="flex justify-self-start py-7">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        push({
                                                            phoneNo: '',
                                                        })
                                                    }
                                                    className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
                                                >
                                                    <HiPlus size="20" /> Add
                                                    More
                                                </button>
                                            </div>
                                        </>
                                    )
                                }}
                            </FieldArray>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddTapeManagement
