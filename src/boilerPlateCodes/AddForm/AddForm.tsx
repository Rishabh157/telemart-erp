/// ==============================================
// Filename:AddFormWrapper.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
//import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from './AddFormWrapper'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: {
        field2Options: SelectOption[]
    }
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'List Page',
        path: '/list-page',
    },
    {
        label: 'Add Form',
    },
]

const AddForm = ({ formikProps, dropdownOptions }: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New Form </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">
                            {' '}
                            Form Heading{' '}
                        </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                onClick={() => formikProps.handleSubmit()}
                                className="bg-primary-main rounded py-1 px-5 text-white border border-primary-main "
                            >
                                Add Button
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* Field1 */}
                            <ATMTextField
                                name="field1"
                                value={values.field1}
                                label="Field 1"
                                placeholder="Field 1"
                                onChange={(e) =>
                                    setFieldValue('field1', e.target.value)
                                }
                            />
                            {/* Field 2 */}c{/* Field 3 */}
                            <ATMTextField
                                name="field3"
                                value={values.field3}
                                label="Field 3"
                                placeholder="Field 3"
                                onChange={(e) =>
                                    setFieldValue('field3', e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/*  Field 4  */}
                    <div className="px-3">
                        <div className=" text-lg pb-2 font-medium text-primary-main">
                            Add New Heading
                        </div>

                        <FieldArray name="field4">
                            {({ push, remove }) => {
                                return (
                                    <>
                                        <div className="flex flex-col gap-y-5">
                                            {values.field4?.map(
                                                (_ele_, _index_) => {
                                                    return (
                                                        <div
                                                            key={_index_}
                                                            className="flex gap-3 items-end "
                                                        >
                                                            {/* Field 4a */}
                                                            <div className="flex-1">
                                                                <ATMTextField
                                                                    name={`field4[${_index_}].field4a`}
                                                                    value={
                                                                        _ele_.field4a
                                                                    }
                                                                    label="Field 4a"
                                                                    placeholder="Field 4a"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setFieldValue(
                                                                            `field4[${_index_}].field4a`,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>

                                                            {/* Field 4b */}
                                                            <div className="flex-1">
                                                                <ATMTextField
                                                                    name={`field4[${_index_}].field4b`}
                                                                    value={
                                                                        _ele_.field4b?.toString() ||
                                                                        ''
                                                                    }
                                                                    label="Field 4b"
                                                                    placeholder="Field 4b"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setFieldValue(
                                                                            `field4[${_index_}].rate`,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>

                                                            {/* Field 4c */}
                                                            <div className="flex-1">
                                                                <ATMTextField
                                                                    name={`field4[${_index_}].field4c`}
                                                                    value={
                                                                        _ele_.field4c?.toString() ||
                                                                        ''
                                                                    }
                                                                    label="Quantity"
                                                                    placeholder="Quantity"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setFieldValue(
                                                                            `field4[${_index_}].field4c`,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>

                                                            {/* BUTTON - Delete */}
                                                            {values.field4
                                                                ?.length >
                                                                1 && (
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            remove(
                                                                                _index_
                                                                            )
                                                                        }}
                                                                        className="p-2 bg-red-500 text-white rounded"
                                                                    >
                                                                        <MdDeleteOutline className="text-2xl" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>

                                        {/* BUTTON - Add More  */}
                                        <div className="flex justify-end py-5">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    push({
                                                        field4a: '',
                                                        field4b: '',
                                                        field4c: '',
                                                    })
                                                }
                                                className="bg-primary-main px-3 py-1 text-white rounded"
                                            >
                                                Add More
                                            </button>
                                        </div>
                                    </>
                                )
                            }}
                        </FieldArray>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddForm
