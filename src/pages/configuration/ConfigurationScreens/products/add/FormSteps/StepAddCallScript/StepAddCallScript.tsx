/// ==============================================
// Filename:StepAddCallScript.tsx
// Type: ADD Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { EditorState } from 'draft-js'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../AddProductWrapper'
import ATMHTMLEditor from 'src/components/UI/atoms/formFields/ATMHTMLEditor/ATMHTMLEditor'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import { DropdownOptions } from './StepAddCallScriptWrapper'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
}

const StepAddCallScript = ({ formikProps, dropdownOptions }: Props) => {
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
            <FieldArray name="call_scripts">
                {({ push, remove }) => (
                    <div >
                        {values.call_scripts?.map((script, scriptIndex) => {
                            const { language } = script

                            return (
                                <div
                                    key={scriptIndex}
                                    className={`flex flex-col gap-3 py-6 px-7 ${
                                        scriptIndex !==
                                            values.call_scripts.length - 1 &&
                                        'border-b'
                                    }  border-slate-300 `}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="text-primary-main text-lg pb-2 font-medium ">
                                            Script #{scriptIndex + 1}
                                        </div>
                                        {/* Delete Button */}
                                        {values.call_scripts?.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    remove(scriptIndex)
                                                }
                                                className="p-1 bg-red-500 text-white rounded"
                                            >
                                                <MdDeleteOutline className="text-2xl" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="w-full d-flex flex-wrap">
                                        <ATMHTMLEditor
                                            name={`call_scripts[${scriptIndex}].script`}
                                            value={script.script}
                                            onChange={(newValue) =>
                                                handleSetFieldValue(
                                                    `call_scripts[${scriptIndex}].script`,
                                                    newValue
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 gap-y-5 my-3">
                                        <ATMSelect
                                            name={`call_scripts[${scriptIndex}].language`}
                                            value={language}
                                            onChange={(e) => {
                                                handleSetFieldValue(
                                                    `call_scripts[${scriptIndex}].language`,
                                                    e.target.value
                                                )
                                            }}
                                            size="small"
                                            label="Language"
                                            options={
                                                dropdownOptions?.langaugeOption
                                            }
                                            isSubmitting={isSubmitting}
                                        />
                                    </div>
                                </div>
                            )
                        })}

                        {/* BUTTON- Add More Script */}
                        <div className="flex justify-end p-5">
                            <button
                                type="button"
                                onClick={() =>
                                    push({
                                        script: EditorState.createEmpty(),
                                        language: '',
                                    })
                                }
                                className="bg-primary-main px-3 py-1 text-white rounded"
                            >
                                {/* <AddCircleOutlineOutlinedIcon
                                    style={{ fontSize: '34px' }}
                                /> */} 
                                +
                            </button>
                        </div>
                    </div>
                )}
            </FieldArray>
        </div>
    )
}

export default StepAddCallScript
