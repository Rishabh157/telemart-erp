import React from 'react'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
//import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTimePicker from 'src/components/UI/atoms/formFields/ATMTimePicker/ATMTimePicker'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'

const UpdateSlotRun = ({ dropdownOptions, apiStatus, formikProps }: any) => {
    //const [switch, setSwitch] = useState<boolean>(false)
    const { values, setFieldValue } = formikProps
    return (
        <>
            <div className=" mt-0 pb-2 border-b-4 border-slate-500">
                <ATMPageHeading>Run Slot</ATMPageHeading>
            </div>
            <div className="grow py-4  px-3 ">
                <div className="grid grid-cols-2 gap-4">
                    <ATMSwitchButton
                        name="run"
                        value={values.run}
                        label="Status"
                        required
                        onChange={(value: any) => {
                            // console.log(value)
                            // setSwitch(value)
                            setFieldValue('run', value)
                        }}
                    />

                    <ATMTimePicker
                        name="runStartTime"
                        value={values.runStartTime}
                        label="Start Time"
                        required
                        size="medium"
                        onChange={(newValue) => {
                            setFieldValue('runStartTime', newValue)
                        }}
                    />
                    {/* <ATMTextField
                        name="runRemark"
                        value={values.runRemark}
                        label="Reamrk"
                        required
                        size="medium"
                        placeholder="Remark"
                        onChange={(e) => {
                            setFieldValue('runRemark', e.target.value)
                        }}
                    /> */}

                    <ATMTextArea
                        name="runRemark"
                        value={values.runRemark}
                        onChange={(newValue) =>
                            setFieldValue('runRemark', newValue)
                        }
                    />

                    <ATMTimePicker
                        name="runEndTime"
                        value={values.runEndTime}
                        label="End Time"
                        required
                        size="medium"
                        onChange={(newValue) => {
                            setFieldValue('runEndTime', newValue)
                        }}
                    />

                    {/* <ATMTextField
                        name="slotName"
                        value={values.slotName}
                        label="Slot Name"
                        required
                        size="medium"
                        placeholder="Slot Name"
                        onChange={(e) => {
                            setFieldValue('slotName', e.target.value)
                        }}
                    /> */}
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
