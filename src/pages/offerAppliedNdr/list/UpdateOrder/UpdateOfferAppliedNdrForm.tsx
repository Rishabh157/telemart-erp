// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
// import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './UpdateOfferAppliedNdrFormWrapper'
import { SelectOption } from 'src/models/FormField/FormField.model'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { useGetAllSchemeListByPgiQuery } from 'src/services/SchemeService'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    orderDetails: any
    apiStatus: boolean
}
export type DropdownOptions = {
    dealerOptions: SelectOption[]
    warehouseOptions: SelectOption[]
}

const UpdateOfferAppliedNdrForm = ({
    formikProps,
    orderDetails,
    apiStatus,
}: Props) => {
    const [schemeListOptions, setSchemeListOptions] = React.useState<
        SelectOption[] | []
    >([])

    const dispatch = useDispatch()
    const { values, setFieldValue } = formikProps
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    const { userData } = useGetLocalStorage()

    // GET SCHEME LIST BY companyId AND productsGroupId
    const {
        data: schemeListData,
        isFetching: isSchemeListFetching,
        isLoading: isSchemeListLoading,
    } = useGetAllSchemeListByPgiQuery(
        {
            companyId: userData?.companyId,
            productGroupId: values?.productGroupId,
        },
        {
            skip: !values?.productGroupId || !userData?.companyId,
        }
    )
    useEffect(() => {
        if (!isSchemeListFetching && !isSchemeListLoading) {
            const schemeList = schemeListData?.data?.map((products: any) => {
                return {
                    label: products?.schemeName,
                    value: products?._id,
                }
            })
            setSchemeListOptions(schemeList)
        }
    }, [schemeListData, isSchemeListFetching, isSchemeListLoading])

    return (
        <div className="h-[70vh] overflow-auto">
            <div className="p-4 flex flex-col gap-2">
                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat pb-4">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">
                            Update Order Scheme & Remark
                        </div>

                        <button
                            type="button"
                            disabled={apiStatus}
                            onClick={() => formikProps.handleSubmit()}
                            className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                true ? 'disabled:opacity-25' : ''
                            }`}
                        >
                            Submit
                        </button>
                    </div>

                    {/* Form */}
                    <div className="grow py-4 px-3 ">
                        <div className="flex flex-col gap-4">
                            {/* Order Details */}
                            <div className="border border-gray-300 rounded-md p-4">
                                <h2 className="text-md font-semibold mb-2">
                                    Order Information
                                </h2>
                                <p className="text-[14px]">
                                    <span className="font-semibold">
                                        Order Number :{' '}
                                    </span>{' '}
                                    <span className="text-primary-main">
                                        #{orderDetails?.orderNumber}
                                    </span>
                                </p>
                                <p className="text-[14px]">
                                    <span className="font-semibold">
                                        Assign Dealer :
                                    </span>{' '}
                                    {orderDetails?.assignDealerLabel || '-'}
                                </p>
                                <p className="text-[14px]">
                                    <span className="font-semibold">
                                        Total Amount :
                                    </span>{' '}
                                    &#x20B9; {orderDetails?.totalAmount}
                                </p>

                                {/* Add more order details here */}
                            </div>

                            {/* Customer Details */}
                            <div className="border border-gray-300 rounded-md p-4">
                                <h2 className="text-md font-semibold mb-1">
                                    Customer Information
                                </h2>
                                <p className="text-[14px]">
                                    <span className="font-semibold">
                                        Name :
                                    </span>{' '}
                                    {orderDetails?.customerName}
                                </p>
                                <p className="text-[14px]">
                                    <span className="font-semibold">
                                        Email :
                                    </span>{' '}
                                    {orderDetails?.emailId || '-'}
                                </p>
                                <p className="text-[14px]">
                                    <span className="font-semibold">
                                        Phone :{' '}
                                    </span>
                                    <span className="text-sm">
                                        {orderDetails?.mobileNo}
                                    </span>
                                </p>
                                <p className="text-[14px]">
                                    <span className="font-semibold">
                                        Address :
                                    </span>{' '}
                                    <span>
                                        {orderDetails?.autoFillingShippingAddress ||
                                            '-'}
                                    </span>
                                </p>
                                {/* Add more customer details here */}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Product Group */}
                            <div className="-mt-2">
                                <ATMSelectSearchable
                                    isDisabled
                                    name="schemeId"
                                    value={values.productGroupId}
                                    onChange={(e) =>
                                        handleSetFieldValue('schemeId', e)
                                    }
                                    options={[
                                        {
                                            label: orderDetails?.productGroupLabel,
                                            value: orderDetails?.productGroupId,
                                        },
                                    ]}
                                    label="Product Group"
                                />
                            </div>

                            <div className="-mt-2">
                                <ATMSelectSearchable
                                    name="schemeId"
                                    value={values.schemeId}
                                    onChange={(e) =>
                                        handleSetFieldValue('schemeId', e)
                                    }
                                    options={schemeListOptions}
                                    label="Scheme"
                                />
                            </div>

                            {/* NDR Remark */}
                            <div className="-mt-2">
                                <ATMTextArea
                                    required
                                    name="ndrRemark"
                                    value={values.ndrRemark}
                                    label="NDR Remark"
                                    placeholder="Enter NDR Remark"
                                    minRows={6}
                                    className="rounded"
                                    onChange={(newValue) =>
                                        setFieldValue('ndrRemark', newValue)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateOfferAppliedNdrForm
