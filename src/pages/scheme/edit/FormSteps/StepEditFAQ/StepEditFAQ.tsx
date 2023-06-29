import React from 'react'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditSchemeWrapper'
import { FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { HiPlus } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

type Props = {
    formikProps: FormikProps<FormInitialValues>
}

const StepEditFAQ = ({ formikProps }: Props) => {
    const { values, setFieldValue } = formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className=" ">
            <FieldArray name="faq">
                {({ push, remove }) => {
                    return (
                        <>
                            {values.faq?.map((faq, FAQIndex) => {
                                const { question, answer } = faq
                                return (
                                    <div
                                        key={FAQIndex}
                                        className={`flex flex-col gap-3 py-6 px-7 ${
                                            FAQIndex !==
                                                values.faq.length - 1 &&
                                            'border-b'
                                        }  border-slate-300 `}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="text-primary-main text-lg pb-2 font-medium ">
                                                FAQ's #{FAQIndex + 1}
                                            </div>
                                            {/* Delete Button */}
                                            {values.faq?.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        remove(FAQIndex)
                                                    }
                                                    className="p-1 bg-red-500 text-white rounded"
                                                >
                                                    <MdDeleteOutline className="text-2xl" />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 gap-y-5">
                                            {/* Question */}
                                            <ATMTextField
                                                name={`faq[${FAQIndex}].question`}
                                                value={question}
                                                onChange={(e) => {
                                                    handleSetFieldValue(
                                                        `faq[${FAQIndex}].question`,
                                                        e.target.value
                                                    )
                                                }}
                                                label="Question"
                                                placeholder="Question"
                                                className="shadow bg-white rounded"
                                                isSubmitting={isSubmitting}
                                            />

                                            {/* Answer */}
                                            <ATMTextArea
                                                name={`faq[${FAQIndex}].answer`}
                                                value={answer}
                                                onChange={(newValue) => {
                                                    handleSetFieldValue(
                                                        `faq[${FAQIndex}].answer`,
                                                        newValue
                                                    )
                                                }}
                                                label="Answer"
                                                placeholder="Answer"
                                                className="shadow bg-white rounded"
                                                isSubmitting={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="flex justify-self-start p-5">
                                <button
                                    type="button"
                                    onClick={() =>
                                        push({
                                            question: '',
                                            answer: '',
                                        })
                                    }
                                    className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
                                >
                                    <HiPlus size="20" /> Add More
                                </button>
                            </div>
                        </>
                    )
                }}
            </FieldArray>
        </div>
    )
}

export default StepEditFAQ
