/// ==============================================
// Filename:StepAddVideo.tsx
// Type: ADD Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddProductWrapper'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

const StepAddVideo = ({ formikProps }: Props) => {
    const { values, setFieldValue } = formikProps

    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | File) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className=" ">
            <FieldArray name="videos">
                {({ push, remove }) => (
                    <div className="">
                        {values.videos?.map((video, videoIndex) => {
                            const { videoName, videoLink } = video

                            return (
                                <div
                                    key={videoIndex}
                                    className={`flex flex-col gap-3 py-6 px-7 ${
                                        videoIndex !==
                                            values.videos.length - 1 &&
                                        'border-b'
                                    }  border-slate-300 `}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="text-primary-main text-lg pb-2 font-medium ">
                                            Video #{videoIndex + 1}
                                        </div>
                                        {/* Delete Button */}
                                        {values.videos?.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    remove(videoIndex)
                                                }
                                                className="p-1 bg-red-500 text-white rounded"
                                            >
                                                <MdDeleteOutline className="text-2xl" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 gap-y-5">
                                        {/* Video Name */}
                                        <ATMTextField
                                            name={`videos[${videoIndex}].videoName`}
                                            value={videoName}
                                            onChange={(e) => {
                                                handleSetFieldValue(
                                                    `videos[${videoIndex}].videoName`,
                                                    e.target.value
                                                )
                                            }}
                                            label="Video Name"
                                            placeholder="Video Name"
                                            className="shadow bg-white rounded"
                                            isSubmitting={isSubmitting}
                                        />

                                        {/* Video Link */}
                                        <ATMTextField
                                            name={`videos[${videoIndex}].videoLink`}
                                            value={videoLink}
                                            onChange={(e) => {
                                                handleSetFieldValue(
                                                    `videos[${videoIndex}].videoLink`,
                                                    e.target.value
                                                )
                                            }}
                                            label="Video Link"
                                            placeholder="Video Link"
                                            className="shadow bg-white rounded"
                                            isSubmitting={isSubmitting}
                                        />

                                        {/* Preview */}
                                        <div className="rounded">
                                            {videoLink ? (
                                                <iframe
                                                    width="100%"
                                                    height="160"
                                                    src={videoLink}
                                                    title="video"
                                                    className="rounded"
                                                />
                                            ) : (
                                                <div className="border rounded h-[160px] flex justify-center items-center">
                                                    Preview
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        {/* BUTTON- Add More Video */}
                        <div className="flex justify-self-start p-5">
                            <button
                                type="button"
                                onClick={() =>
                                    push({
                                        videoName: '',
                                        videoLink: '',
                                    })
                                }
                                className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
                            >
                                <HiPlus size="20" /> Add More
                            </button>
                        </div>
                    </div>
                )}
            </FieldArray>
        </div>
    )
}

export default StepAddVideo
