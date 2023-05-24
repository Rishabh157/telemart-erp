import React, { useState } from 'react'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTimePicker from 'src/components/UI/atoms/formFields/ATMTimePicker/ATMTimePicker'

const UpdateSlotRun = ({
    dropdownOptions,
    apiStatus ,
    formikProps,
}: any) => {
    const [switch1, setSwitch2] = useState<boolean>(false)
    const { values, setFieldValue } = formikProps
    return (
        <>
            <div className=" mt-0 pb-2 border-b-4 border-slate-500">
                <ATMPageHeading>Run Slot</ATMPageHeading>
            </div>
            <div className="grow py-4  px-3 ">
                <div className="grid grid-cols-2 gap-4">
                    <ATMSwitchButton
                        name="slotName"
                        value={switch1}
                        label="Slot Name"
                        required
                        onChange={(value: any) => {
                            console.log(value)
                            setSwitch2(value)
                            // setFieldValue('slotName', value)
                        }}
                    />
                    <ATMTimePicker
                        name="startDateTime"
                        value={values.startDateTime}
                        label="Start Time"
                        required
                        size="medium"
                        onChange={(e) => {
                            setFieldValue('startTimeDate', e.target.value)
                        }}
                    />
                    <ATMTimePicker
                        name="endDateTime"
                        value={values.endDateTime}
                        label="End Time"
                        required
                        size="medium"
                        onChange={(e) => {
                            setFieldValue('endDateTime', e.target.value)
                        }}
                    />
                    <ATMTextField
                        name="slotName"
                        value={values.slotName}
                        label="Slot Name"
                        required
                        size="medium"
                        placeholder="Slot Name"
                        onChange={(e) => {
                            setFieldValue('slotName', e.target.value)
                        }}
                    />
                    <ATMTextField
                        name="slotName"
                        value={values.slotName}
                        label="Slot Name"
                        required
                        size="medium"
                        placeholder="Slot Name"
                        onChange={(e) => {
                            setFieldValue('slotName', e.target.value)
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    disabled={apiStatus}
                    onClick={() => {
                        formikProps.handleSubmit()
                    }}
                    className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main
                    ${apiStatus ? 'opacity-50' : ''}

                   
                    `}
                >
                    Submit
                </button>
            </div>
        </>
    )
}

export default UpdateSlotRun
