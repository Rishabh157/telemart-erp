import React from 'react'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTimePicker from 'src/components/UI/atoms/formFields/ATMTimePicker/ATMTimePicker'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { Divider } from '@mui/material'

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
                    <div className="">
                        <ATMTimePicker
                            name="runStartTime"
                            value={values.runStartTime}
                            label="Start Time"
                            size="medium"
                            onChange={(newValue) => {
                                setFieldValue('runStartTime', newValue)
                            }}
                        />
                    </div>

                    <div className="py-1 pl-12 mt-3">
                        <ATMSwitchButton
                            name="run"
                            value={values.run}
                            label="Status"
                            onChange={(value: any) => {
                                setFieldValue('run', value)
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid grid-rows-1  gap-4">
                        <div className="-mt-4">
                            <ATMTimePicker
                                name="runEndTime"
                                value={values.runEndTime}
                                label="End Time"
                                size="medium"
                                onChange={(newValue) => {
                                    setFieldValue('runEndTime', newValue)
                                }}
                            />
                        </div>

                        <div className="-mt-8">
                            <ATMTextField
                                name="runYoutubeLink"
                                value={values.runYoutubeLink}
                                label="Youtube Link"
                                placeholder="Youtube Link "
                                onChange={(e) =>
                                    setFieldValue(
                                        'runYoutubeLink',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-rows-1 gap-4 ">
                        <div className="-mt-4 ml-12">
                            <ATMTextArea
                                minRows={4}
                                name="runRemark"
                                value={values.runRemark}
                                label="Remark"
                                onChange={(newValue) =>
                                    setFieldValue('runRemark', newValue)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Divider />
            <div className="flex justify-center mt-2 ml-12">
                <button
                    type="button"
                    disabled={apiStatus}
                    onClick={() => {
                        formikProps.handleSubmit()
                    }}
                    className={`bg-primary-main rounded py-1 px-5 item-center text-white border border-primary-main
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
