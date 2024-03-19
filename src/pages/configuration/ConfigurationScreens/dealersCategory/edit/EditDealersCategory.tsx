/// ==============================================
// Filename:EditDealerCategory.tsx
// Type: Edit Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

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
import { FormInitialValues } from './EditDealersCategoryWrapper'
import { useDispatch } from 'react-redux'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Dealer Categories',
        path: '/configurations/dealers-category',
    },
    {
        label: 'Edit',
    },
]

const EditDealersCategory = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | File) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="h-[calc(100vh-55px)] overflow-auto">
            <div className="flex flex-col gap-2 p-4 ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Dealer Categories </ATMPageHeading>
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
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    apiStatus ? 'opacity-50' : ''
                                }`}
                            >
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="px-3 py-8 grow ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* dealersCategory */}
                            <ATMTextField
                                required
                                name="dealersCategory"
                                value={values.dealersCategory}
                                label="Dealers Category"
                                placeholder="Dealers Category"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'dealersCategory',
                                        e.target.value
                                    )
                                }
                            />

                            {/* Invest Amount */}
                            <ATMTextField
                                required
                                name="investAmount"
                                value={
                                    values.investAmount === 0
                                        ? ''
                                        : values.investAmount
                                }
                                label="Invest Amount"
                                placeholder="Invest Amount"
                                onChange={(e) => {
                                    const newValue = e.target.value
                                    if (!isNaN(Number(newValue))) {
                                        handleSetFieldValue(
                                            'investAmount',
                                            newValue
                                        )
                                    }
                                }}
                            />

                            {/* Number of Orders */}
                            <ATMTextField
                                required
                                name="numberOfOrders"
                                value={
                                    values.numberOfOrders === 0
                                        ? ''
                                        : values.numberOfOrders
                                }
                                label="Number Of Orders"
                                placeholder="Number Of Orders"
                                onChange={(e) => {
                                    const newValue = e.target.value
                                    if (!isNaN(Number(newValue))) {
                                        handleSetFieldValue(
                                            'numberOfOrders',
                                            newValue
                                        )
                                    }
                                }}
                            />
                            {/* Delivery Percentage */}
                            <ATMTextField
                                required
                                name="deliveryPercentage"
                                value={
                                    values.deliveryPercentage === 0
                                        ? ''
                                        : values.deliveryPercentage
                                }
                                label="Delivery Percentage"
                                placeholder="Delivery Percentage"
                                onChange={(e) => {
                                    const newValue = e.target.value
                                    if (!isNaN(Number(newValue))) {
                                        handleSetFieldValue(
                                            'deliveryPercentage',
                                            newValue
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

export default EditDealersCategory
