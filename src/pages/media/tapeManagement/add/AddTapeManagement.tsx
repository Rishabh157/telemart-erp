import { FormikProps } from 'formik'
import React, { useState } from 'react'
import { FormInitialValues } from './AddTapeManagementWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        channelGroupOptions: SelectOption[]
        schemeDataOption: SelectOption[]
        languageOptions: SelectOption[]
        artistOption: SelectOption[]
        tapeTypeOption: SelectOption[]
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

    const MinuteOptions = () => {
        let options: SelectOption[] = []
        options = [...options, { label: '00', value: '00' }]
        for (let i = 1; i <= 60; i++) {
            options = [...options, { label: i.toString(), value: i.toString() }]
        }
        return options
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
                    <ATMPageHeading> Add New Tape </ATMPageHeading>
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
                                    } else {
                                        formikProps.handleSubmit()
                                        setShow(false)
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
                    <div className="grow py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* FirstName */}
                            <ATMTextField
                                name="tapeName"
                                required
                                value={values.tapeName}
                                label="Tape Name"
                                placeholder="Tape Name"
                                onChange={(e) =>
                                    setFieldValue('tapeName', e.target.value)
                                }
                            />

                            <ATMSelectSearchable
                                options={dropdownOptions.tapeTypeOption}
                                name="tapeType"
                                required
                                value={values.tapeType}
                                selectLabel="Select Tape type"
                                label="Tape Type"
                                onChange={(e) => setFieldValue('tapeType', e)}
                            />
                            <ATMSelectSearchable
                                name="schemeId"
                                value={values.schemeId}
                                selectLabel="Select Scheme"
                                onChange={(value) =>
                                    setFieldValue('schemeId', value)
                                }
                                options={dropdownOptions.schemeDataOption}
                                label="Scheme"
                            />
                            <ATMSelectSearchable
                                name="channelGroupId"
                                selectLabel="Select Channel group"
                                value={values.channelGroupId}
                                isMulti={false}
                                onChange={(e) => {
                                    console.log('e', e)
                                    setFieldValue('channelGroupId', e)
                                }}
                                options={dropdownOptions.channelGroupOptions}
                                label="Channel Group"
                            />

                            <ATMSelectSearchable
                                name="artistId"
                                required
                                selectLabel="Select Artist"
                                isMulti={true}
                                value={values.artistId}
                                onChange={(value) =>
                                    setFieldValue('artistId', value)
                                }
                                options={dropdownOptions.artistOption}
                                label="Artist"
                            />
                             <ATMSelectSearchable
                                name="languageId"
                                required
                                value={values.languageId}
                                onChange={(value) =>
                                    setFieldValue('languageId', value)
                                }
                                options={dropdownOptions.languageOptions}
                                label="Language"
                            />
                            <div className="grid grid-cols-3 gap-4 ">
                                <div className=" text-slate-700  font-medium mt-12 ">
                                    Duration :                                   
                                </div>

                                <div className=" col-span-2 ">
                                    <ATMTextField
                                        name="hour"
                                        required
                                        value={values.hour}
                                        type="number"
                                        label="Hour"
                                        min={0}
                                        placeholder="HH"
                                        onChange={(e) =>
                                            setFieldValue(
                                                'hour',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 ">
                                <div className="">
                                    <ATMSelectSearchable
                                        name="minute"
                                        required
                                        value={values.minute}
                                        selectLabel="MM"
                                        label="Minute"
                                        options={MinuteOptions()}
                                        onChange={(selectValue) =>
                                            setFieldValue('minute', selectValue)
                                        }
                                    />
                                </div>
                                <div className="">
                                    <ATMSelectSearchable
                                        defaultValue="00"
                                        label="Second"
                                        required
                                        options={MinuteOptions()}
                                        name="second"
                                        value={values.second}
                                        selectLabel="SS"
                                        onChange={(selectValue) =>
                                            setFieldValue('second', selectValue)
                                        }
                                    />
                                </div>
                                {show ? (
                                        <p className="font-poppins relative text-[14px] text-start mt-0 mr-2 text-red-500">
                                            Duration is Required
                                        </p>
                                    ) : (
                                        ''
                                    )}
                            </div>
                            
                            <ATMTextField
                                name="remarks"
                                value={values.remarks}
                                label="Remarks"
                                placeholder="Remarks"
                                onChange={(e) =>
                                    setFieldValue('remarks', e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTapeManagement
