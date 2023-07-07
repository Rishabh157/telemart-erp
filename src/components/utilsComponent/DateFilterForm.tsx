/// ==============================================
// Filename:DataFilterForm.tsx
// Type: Utils Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

import { format } from 'date-fns'
import { Form, Formik, FormikProps } from 'formik'
import React from 'react'
import { object, string } from 'yup'
import ATMDatePicker from '../UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import * as yup from 'yup'
interface FormInitialValues {
    startDate: string
    endDate: string
}

interface Props {
    onSubmitDateHandler: (values: any) => void
    IsDaterFilterLoading: boolean
}

const DateFilterForm: React.FC<Props> = ({
    onSubmitDateHandler,
    IsDaterFilterLoading = false,
}) => {
    const initialValues: FormInitialValues = {
        startDate: '',
        endDate: '',
    }

    const validationSchema = object({
        startDate: string().required('Start date is required'),
        endDate: string().test(
            'is-valid-end-date',
            'Should be less then Start Date',
            function (endDate) {
                const startDate = this.resolve(yup.ref('startDate')) as string
                return !startDate || !endDate || startDate <= endDate
            }
        ),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        onSubmitDateHandler(values)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                const { setFieldValue, values } = formikProps

                return (
                    <Form className="flex gap-4 px-3 w-full ">
                        <div className="flex gap-2">
                            <div className="text-center text-xs items-center flex font-bold">
                                From
                            </div>
                            <ATMDatePicker
                                name="startDate"
                                size="xs"
                                value={values.startDate}
                                dateTimeFormat="DD/MM/YY"
                                onChange={(e) =>
                                    setFieldValue(
                                        'startDate',
                                        format(new Date(e), 'yyyy-MM-dd')
                                    )
                                }
                            />
                        </div>
                        <div className="flex gap-2  ">
                            <div className="text-center text-xs items-center flex font-bold">
                                To
                            </div>
                            <ATMDatePicker
                                name="endDate"
                                size="xs"
                                value={values.endDate}
                                dateTimeFormat="DD/MM/YY "
                                onChange={(e) =>
                                    setFieldValue(
                                        'endDate',
                                        format(new Date(e), 'yyyy-MM-dd')
                                    )
                                }
                            />
                        </div>
                        <div className="flex justify-end  ">
                            <button
                                type="submit"
                                disabled={
                                    IsDaterFilterLoading ||
                                    !(values.endDate && values.startDate)
                                }
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 mt-1 -mb-1 px-2 text-white text-xs border hover:bg-blue-800 cursor border-primary-main ${
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default DateFilterForm
