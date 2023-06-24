import React from 'react'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './EditCartonBoxWrapper'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useDispatch } from 'react-redux'

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
        label: 'Edit',
    },
]

const EditCartonBox = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="h-[calc(100vh-55px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Update </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">
                            {' '}
                            Outer Pack Box Details{' '}
                        </div>

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
                                Update
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
                                    handleSetFieldValue('boxName', e.target.value)
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
                                        handleSetFieldValue(
                                            'innerItemsCount',
                                            inputValue
                                        )
                                    }
                                }}
                            />
                            <div className="mt-4">
                                <label className="text-slate-700 font-medium">
                                    {' '}
                                    Dimensions{' '}
                                </label>
                                <div className="flex gap-2">
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
                                                handleSetFieldValue(
                                                    'dimensions.height',
                                                    inputValue
                                                )
                                            }
                                        }}
                                        placeholder="H"
                                        className="shadow bg-white rounded -mt-2"
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
                                                handleSetFieldValue(
                                                    'dimensions.width',
                                                    inputValue
                                                )
                                            }
                                        }}
                                        placeholder="W"
                                        className="shadow bg-white rounded -mt-2"
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
                                                handleSetFieldValue(
                                                    'dimensions.depth',
                                                    inputValue
                                                )
                                            }
                                        }}
                                        placeholder="D"
                                        className="shadow bg-white rounded -mt-2"
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
                                        handleSetFieldValue('boxWeight', inputValue)
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

export default EditCartonBox
