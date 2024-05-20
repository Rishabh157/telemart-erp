import moment from 'moment'
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
    values?: FormInitialValues
}

const DateFilterForm: React.FC<Props> = ({
    onSubmitDateHandler,
    IsDaterFilterLoading = false,
    values = {
        startDate: '',
        endDate: '',
    },
}) => {
    const initialValues: FormInitialValues = {
        startDate: values?.startDate,
        endDate: values?.endDate,
    }

    const validationSchema = object({
        startDate: string().required('Start date is required'),
        endDate: string().test(
            'is-valid-end-date',
            'Should be less than Start Date',
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
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                const { setFieldValue, values } = formikProps

                return (
                    <Form className="flex gap-4 px-3 w-full items-center">
                        <div className="flex flex-row gap-2 items-center">
                            <label className="text-xs font-bold">From</label>
                            <ATMDatePicker
                                name="startDate"
                                size="xs"
                                value={values.startDate}
                                dateTimeFormat="DD/MM/YY"
                                onChange={(e) => {
                                    setFieldValue(
                                        'startDate',
                                        moment(e).format('YYYY-MM-DD')
                                    )
                                }}
                            />
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <label className="text-xs font-bold">To</label>
                            <ATMDatePicker
                                name="endDate"
                                size="xs"
                                value={values.endDate}
                                dateTimeFormat="DD/MM/YY"
                                onChange={(e) => {
                                    setFieldValue(
                                        'endDate',
                                        moment(e).format('YYYY-MM-DD')
                                    )
                                }}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={
                                    IsDaterFilterLoading ||
                                    !(values.endDate && values.startDate)
                                }
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-2 px-2 text-white text-xs border hover:bg-blue-800 cursor-pointer border-primary-main ${
                                    IsDaterFilterLoading
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
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
