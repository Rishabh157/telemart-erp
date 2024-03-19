/// ==============================================
// Filename:AddASR.tsx
// Type: ADD Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddASRWrapper'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'

// |-- Redux --|
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import MainLayout from 'src/components/layouts/MainLayout/MainLayout'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'ASR',
        path: '/asr',
    },
    {
        label: 'Add ASR',
    },
]

const AddASR = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    const { items }: any = useSelector(
        (state: RootState) => state?.productGroup
    )

    const options = items?.map((ele: any) => {
        return { id: ele?._id, label: ele?.groupName, value: ele?.groupName }
    })
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <MainLayout>
            <div className="flex flex-col gap-2 p-4 ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> ASR </ATMPageHeading>
                </div>

                <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Details </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main  ${
                                    apiStatus ? 'opacity-50' : ''
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <FieldArray name="asrDetails">
                        {({ push, remove }) => {
                            return (
                                <div className="">
                                    {values?.asrDetails?.map(
                                        (asr: any, asrIndex: number) => {
                                            const { productName, quantity } =
                                                asr

                                            return (
                                                <div
                                                    key={asrIndex}
                                                    className={`border-b border-slate-300`}
                                                >
                                                    <div
                                                        className={`py-9 px-7`}
                                                    >
                                                        <div className="flex items-center justify-between pb-2 text-lg font-medium text-primary-main">
                                                            Product{' '}
                                                            {asrIndex + 1}
                                                            {/* Delete Button */}
                                                            {values.asrDetails
                                                                ?.length >
                                                                1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        remove(
                                                                            asrIndex
                                                                        )
                                                                    }
                                                                    className="p-1 text-white bg-red-500 rounded"
                                                                >
                                                                    <MdDeleteOutline className="text-2xl" />
                                                                </button>
                                                            )}
                                                        </div>

                                                        <div className="grid grid-cols-3 gap-4 gap-y-5">
                                                            {/* Product Name */}
                                                            {/* <div className="flex-1"> */}
                                                            <ATMSelect
                                                                required
                                                                name={`asrDetails[${asrIndex}].productName`}
                                                                value={
                                                                    productName
                                                                }
                                                                label="Product group"
                                                                options={
                                                                    options
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    handleSetFieldValue(
                                                                        `asrDetails[${asrIndex}].productName`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                    handleSetFieldValue(
                                                                        `asrDetails[${asrIndex}].productId`,
                                                                        options.find(
                                                                            (
                                                                                obj: any
                                                                            ) =>
                                                                                obj.label ===
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                        ).id
                                                                    )
                                                                }}
                                                            />
                                                            {/* </div> */}

                                                            {/* Quantity */}
                                                            {/* <div className="flex-1"> */}
                                                            <ATMTextField
                                                                required
                                                                name={`asrDetails[${asrIndex}].quantity`}
                                                                value={quantity}
                                                                label="Quantity"
                                                                placeholder="Quantity"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const inputValue =
                                                                        e.target
                                                                            .value
                                                                    if (
                                                                        !isNaN(
                                                                            Number(
                                                                                inputValue
                                                                            )
                                                                        )
                                                                    ) {
                                                                        handleSetFieldValue(
                                                                            `asrDetails[${asrIndex}].quantity`,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                }}
                                                                className="mt-0 rounded"
                                                            />
                                                            {/* </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )}

                                    {/*BUTTON - Add New */}
                                    <div className="flex p-5 justify-self-start">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                push({
                                                    productName: '',
                                                    productId: '',
                                                    quantity: '',
                                                })
                                            }
                                            className="flex items-center px-2 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded-full "
                                        >
                                            <HiPlus size="20" /> Add More
                                        </button>
                                    </div>
                                </div>
                            )
                        }}
                    </FieldArray>
                </div>
            </div>
        </MainLayout>
    )
}

export default AddASR
