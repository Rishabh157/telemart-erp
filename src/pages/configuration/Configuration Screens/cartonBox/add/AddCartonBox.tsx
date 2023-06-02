import React from 'react'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddCartonBoxWrapper'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Outer Pack Box',
        path: '/configurations/carton-box',
    },
    {
        label: 'Add ',
    },
]

const AddCartonBox = ({ formikProps, apiStatus }: Props) => {
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
                    <ATMPageHeading> Add </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Details </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                onClick={() => formikProps.handleSubmit()}
                                disabled={apiStatus}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                + Add
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* boxName */}
                            <ATMTextField
                                name="boxName"
                                value={values.boxName}
                                label="Box Name"
                                placeholder="Box Name"
                                onChange={(e) =>
                                    setFieldValue('boxName', e.target.value)
                                }
                            />

                            {/* Inner Items Count */}
                            <ATMTextField
                                name="innerItemsCount"
                                value={
                                    values.innerItemsCount === 0
                                        ? ''
                                        : values.innerItemsCount
                                }
                                label="Inner Items Count"
                                placeholder="Inner Items Count"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        setFieldValue(
                                            'innerItemsCount',
                                            inputValue
                                        )
                                    }
                                }}
                            />
                            <div>
                                <label className="text-slate-700 font-medium">
                                    {' '}
                                    Dimensions{' '}
                                </label>
                                <div className="flex gap-2 mt-2">
                                    {/* Height */}
                                    <ATMTextField
                                        name="dimensions.height"
                                        value={
                                            values.dimensions.height === 0
                                                ? ''
                                                : values.dimensions.height
                                        }
                                        onChange={(e) => {
                                            const inputValue = e.target.value
                                            if (!isNaN(Number(inputValue))) {
                                                setFieldValue(
                                                    'dimensions.height',
                                                    inputValue
                                                )
                                            }
                                        }}
                                        placeholder="H"
                                        className="shadow bg-white rounded"
                                    />

                                    {/* Weight */}
                                    <ATMTextField
                                        name="dimensions.width"
                                        value={
                                            values.dimensions.width === 0
                                                ? ''
                                                : values.dimensions.width
                                        }
                                        onChange={(e) => {
                                            const inputValue = e.target.value
                                            if (!isNaN(Number(inputValue))) {
                                                setFieldValue(
                                                    'dimensions.width',
                                                    inputValue
                                                )
                                            }
                                        }}
                                        placeholder="W"
                                        className="shadow bg-white rounded"
                                    />

                                    {/* Depth */}
                                    <ATMTextField
                                        name="dimensions.depth"
                                        value={
                                            values.dimensions.depth === 0
                                                ? ''
                                                : values.dimensions.depth
                                        }
                                        onChange={(e) => {
                                            const inputValue = e.target.value
                                            if (!isNaN(Number(inputValue))) {
                                                setFieldValue(
                                                    'dimensions.depth',
                                                    inputValue
                                                )
                                            }
                                        }}
                                        placeholder="D"
                                        className="shadow bg-white rounded"
                                    />
                                </div>
                            </div>

                            {/* Box Weight */}
                            <ATMTextField
                                name="boxWeight"
                                value={
                                    values.boxWeight === 0
                                        ? ''
                                        : values.boxWeight
                                }
                                label="Box Weight (in gms)"
                                placeholder="Box Weight"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        setFieldValue('boxWeight', inputValue)
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCartonBox
