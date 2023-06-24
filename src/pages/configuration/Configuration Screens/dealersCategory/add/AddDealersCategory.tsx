import React from 'react'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddDealersCategoryWrapper'
import { useDispatch } from 'react-redux'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

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
        label: 'Add ',
    },
]

const AddDealersCategory = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | File) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className=" h-[calc(100vh-55px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Dealer Categories </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
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
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* dealersCategory */}
                            <ATMTextField
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
                                        handleSetFieldValue('investAmount', newValue)
                                    }
                                }}
                            />

                            {/* Number of Orders */}
                            <ATMTextField
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

export default AddDealersCategory
