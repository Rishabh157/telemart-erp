// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddCartonBoxWrapper'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useDispatch } from 'react-redux'

// |-- Types --|
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
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className=" h-[calc(100vh-55px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div>
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Outer Pack Box </ATMPageHeading>
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
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* boxName */}
                            <ATMTextField
                                required
                                name="boxName"
                                value={values.boxName}
                                label="Box Name"
                                placeholder="Box Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'boxName',
                                        e.target.value
                                    )
                                }
                            />

                            {/* Inner Items Count */}
                            <ATMTextField
                                required
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
                                        handleSetFieldValue(
                                            'innerItemsCount',
                                            inputValue
                                        )
                                    }
                                }}
                            />
                            <div className="mt-4">
                                <label className="text-slate-700 text-sm font-medium">
                                    Dimensions (in cm)
                                    <span className="ml-1 text-sm text-red-500">
                                        *
                                    </span>
                                </label>
                                <div className="flex gap-2">
                                    {/* Height */}
                                    <ATMTextField
                                        required
                                        name="dimensions.height"
                                        extraClassField="mt-1"
                                        value={
                                            values.dimensions.height === 0
                                                ? ''
                                                : values.dimensions.height
                                        }
                                        onChange={(e) => {
                                            const inputValue = e.target.value
                                            if (!isNaN(Number(inputValue))) {
                                                handleSetFieldValue(
                                                    'dimensions.height',
                                                    inputValue
                                                )
                                            }
                                        }}
                                        placeholder="Height"
                                        className="shadow bg-white rounded"
                                    />

                                    {/* Weight */}
                                    <ATMTextField
                                        required
                                        name="dimensions.width"
                                        extraClassField="mt-1"
                                        value={
                                            values.dimensions.width === 0
                                                ? ''
                                                : values.dimensions.width
                                        }
                                        onChange={(e) => {
                                            const inputValue = e.target.value
                                            if (!isNaN(Number(inputValue))) {
                                                handleSetFieldValue(
                                                    'dimensions.width',
                                                    inputValue
                                                )
                                            }
                                        }}
                                        placeholder="Width"
                                        className="shadow bg-white rounded"
                                    />

                                    {/* Depth */}
                                    <ATMTextField
                                        required
                                        name="dimensions.depth"
                                        extraClassField="mt-1"
                                        value={
                                            values.dimensions.depth === 0
                                                ? ''
                                                : values.dimensions.depth
                                        }
                                        onChange={(e) => {
                                            const inputValue = e.target.value
                                            if (!isNaN(Number(inputValue))) {
                                                handleSetFieldValue(
                                                    'dimensions.depth',
                                                    inputValue
                                                )
                                            }
                                        }}
                                        placeholder="Depth"
                                        className="shadow bg-white rounded"
                                    />
                                </div>
                            </div>

                            {/* Box Weight */}
                            <ATMTextField
                                required
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
                                        handleSetFieldValue(
                                            'boxWeight',
                                            inputValue
                                        )
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
