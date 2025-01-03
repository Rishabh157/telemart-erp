// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Divider } from '@mui/material'
import { CircularProgress } from '@mui/material'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
// import ATMTimePicker from 'src/components/UI/atoms/formFields/ATMTimePicker/ATMTimePicker'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import { useFileUploaderMutation } from 'src/services/media/SlotDefinitionServices'

const UpdateSlotRun = ({ dropdownOptions, apiStatus, formikProps }: any) => {
    //const [switch, setSwitch] = useState<boolean>(false)
    const [imageApiStatus, setImageApiStatus] = useState(false)
    // const [videoApiStatus, setVideoApiStatus] = useState(false)

    const { values, setFieldValue } = formikProps
    const [fileUploader] = useFileUploaderMutation()
    const reasonNotShowOption: SelectOption[] = [
        { label: 'SCROLL ON NUMBERS', value: 'SCROLL ON NUMBERS' },
        { label: 'AUDIO WAS NOT PROPER', value: 'AUDIO WAS NOT PROPER' },
        { label: 'SHOW NOT RUN FULLY', value: 'SHOW NOT RUN FULLY' },
        { label: 'DISTORTION IN VIDEO', value: 'DISTORTION IN VIDEO' },
        { label: 'OTHER', value: 'OTHER' },
    ]
    return (
        <>
            <div className=" -mt-6 pb-2 border-b-4 border-slate-500">
                <ATMPageHeading>Run Slot</ATMPageHeading>
            </div>
            <div className="grow py-4  px-3 ">
                <div className="grid grid-cols-2 gap-4">
                    <div className="py-1  mt-3">
                        <ATMSwitchButton
                            title1="Run"
                            title2="Not Run"
                            name="run"
                            value={values.run}
                            label="Status"
                            onChange={(value: any) => {
                                if (value === false) {
                                    setFieldValue('showOk', false)
                                    setFieldValue('reasonNotShow', null)
                                    setFieldValue('runStartTime', '')
                                    setFieldValue('runEndTime', '')
                                }
                                setFieldValue('run', value)
                            }}
                        />
                    </div>
                    <div className="py-1  mt-3">
                        <ATMTextField
                            name="runYoutubeLink"
                            value={values.runYoutubeLink}
                            label="Youtube Link"
                            placeholder="Youtube Link "
                            onChange={(e) =>
                                setFieldValue('runYoutubeLink', e.target.value)
                            }
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {values.run ? (
                        <div className="py-1  mt-3">
                            <ATMSwitchButton
                                title1="Ok"
                                title2="Not Ok"
                                name="showOk"
                                value={values.showOk}
                                label="Show Properly"
                                onChange={(value: any) => {
                                    setFieldValue('showOk', value)
                                    if (value === true) {
                                        setFieldValue('reasonNotShow', '')
                                    }
                                }}
                            />
                        </div>
                    ) : null}
                    {!values.showOk && values.run ? (
                        <div className="py-1  mt-3">
                            <ATMSelectSearchable
                                required
                                name="reasonNotShow"
                                value={values.reasonNotShow}
                                onChange={(e) => {
                                    setFieldValue('reasonNotShow', e)
                                }}
                                options={reasonNotShowOption}
                                label="Reason Not Show"
                            />
                        </div>
                    ) : null}

                    {!values.showOk &&
                    values.reasonNotShow === '' &&
                    values.run ? (
                        <>
                            <p className="text-right -my-4"></p>
                            <p className="text-left -my-4 text-red-500">
                                Required
                            </p>
                        </>
                    ) : null}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="  ">
                        <ATMTextArea
                            minRows={5}
                            name="runRemark"
                            value={values.runRemark}
                            label="Remark"
                            onChange={(newValue) =>
                                setFieldValue('runRemark', newValue)
                            }
                        />
                    </div>
                    <div className="mt-6">
                        <ATMFilePickerWrapper
                            name="slotRunImage"
                            label="Slot Run Image"
                            placeholder="Slot Run Image"
                            onSelect={(newFile) => {
                                const formData = new FormData()
                                formData.append('fileType', 'IMAGE')
                                formData.append('category', 'SLOTS')
                                formData.append('fileUrl', newFile || '')
                                setImageApiStatus(true)
                                fileUploader(formData).then((res: any) => {
                                    if ('data' in res) {
                                        setImageApiStatus(false)
                                        setFieldValue(
                                            'slotRunImage',
                                            res?.data?.data?.fileUrl
                                        )
                                    }
                                    setImageApiStatus(false)
                                })
                            }}
                            selectedFile={values.slotRunImage}
                            disabled={false}
                        />
                        {imageApiStatus ? (
                            <div className=" mt-3 flex justify-center  items-center w-full h-full">
                                <CircularProgress />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <Divider />
            <div className="flex justify-center mt-3 mb-3 ml-12">
                <button
                    type="button"
                    disabled={
                        apiStatus ||
                        imageApiStatus ||
                        (!values.showOk && !values.reasonNotShow && values.run)
                    }
                    onClick={() => {
                        formikProps.handleSubmit()
                    }}
                    className={`bg-primary-main rounded py-1 px-5 item-center text-white border border-primary-main
                    ${
                        apiStatus ||
                        imageApiStatus ||
                        (!values.showOk && !values.reasonNotShow && values.run)
                            ? 'opacity-50'
                            : ''
                    }

                   
                    `}
                >
                    Submit
                </button>
            </div>
        </>
    )
}

export default UpdateSlotRun
