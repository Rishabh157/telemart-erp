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
            <div className=" -mt-6 pb-2 border-b-4 border-slate-500">
                <ATMPageHeading>Run Slot</ATMPageHeading>
            </div>
            <div className="grow py-4  px-3 ">
                <div className="grid grid-cols-2 gap-4">
                <div className="py-3">
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
                </div>

                <div className="">
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
                </div>
                   
                <div className="-mt-4">
                    <ATMTextArea
                        name="runRemark"
                        value={values.runRemark}
                        label="Remark"
                        onChange={(newValue) =>
                            setFieldValue('runRemark', newValue)
                        }                        
                    />
                </div>
                <div className="mt-0 mb-5">
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
                    </div>
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
