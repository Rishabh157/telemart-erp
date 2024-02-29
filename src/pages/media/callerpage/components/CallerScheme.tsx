import React, { useEffect } from 'react'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { useGetAllSchemeListByPgiQuery } from 'src/services/SchemeService'
import { SchemeDetailsPropTypes } from '../CustomerPage'
import { FormInitialValues } from '../CustomerPageWrapper'

type Props = {
    values: FormInitialValues
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void
    productsGroupOptions: SelectOption[] | []
    // schemeListOptions: SelectOption[] | []
    setSchemeDetails: React.Dispatch<
        React.SetStateAction<SchemeDetailsPropTypes>
    >
    schemeDetails: SchemeDetailsPropTypes
    companyId: string
}

const CallerScheme = ({
    values,
    setFieldValue,
    productsGroupOptions,
    // schemeListOptions,
    setSchemeDetails,
    schemeDetails,
    companyId,
}: Props) => {
    const [schemeListOptions, setSchemeListOptions] = React.useState<
        SelectOption[] | []
    >([])
    // handle change function that increase & decrease product quantity
    const handleQuantity = (type: string) => {
        switch (type) {
            case '+':
                setSchemeDetails((prevSchemeDetails) => ({
                    ...prevSchemeDetails,
                    quantity: prevSchemeDetails.quantity + 1,
                    totalAmount:
                        (prevSchemeDetails.quantity + 1) *
                        prevSchemeDetails.price +
                        prevSchemeDetails.deliveryCharges,
                }))
                break
            case '-':
                setSchemeDetails((prevSchemeDetails) => ({
                    ...prevSchemeDetails,
                    quantity: prevSchemeDetails.quantity - 1,
                    totalAmount:
                        (prevSchemeDetails.quantity - 1) *
                        prevSchemeDetails.price +
                        prevSchemeDetails.deliveryCharges,
                }))
                break
        }
    }

    // GET SCHEME LIST BY companyId AND productsGroupId
    const {
        data: schemeListData,
        isFetching: isSchemeListFetching,
        isLoading: isSchemeListLoading,
    } = useGetAllSchemeListByPgiQuery(
        {
            companyId: companyId,
            productGroupId: values?.productGroupId,
        },
        {
            skip: !values?.productGroupId || !companyId,
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
        <>
            <div className="grid grid-cols-12 px-2 pb-[1px]">
                <div className="col-span-2 mt-3 text-[10px] font-semibold">
                    Search By Scheme
                </div>
                <div className="col-span-3 px-2">
                    <div className="mr-2 -mt-4">
                        <ATMSelectSearchable
                            // isSubmitting
                            size="xxs"
                            labelSize='xxs'
                            fontSizePlaceHolder='14px'
                            minHeight='25px'
                            name="productGroupId"
                            selectLabel="select product"
                            value={values?.productGroupId || ''}
                            options={productsGroupOptions || []}
                            onChange={(e) => {
                                setSchemeListOptions([])
                                setFieldValue('schemeId', '')
                                setFieldValue('productGroupId', e)
                                setSchemeDetails({
                                    ...schemeDetails,
                                    schemeName: '',
                                })
                            }}
                        />
                    </div>
                </div>
                <div className="col-span-3 px-2">
                    <div className="mr-2 -mt-4">
                        <ATMSelectSearchable
                            size="xxs"
                            labelSize='xxs'
                            fontSizePlaceHolder='14px'
                            minHeight='25px'
                            name="schemeId"
                            selectLabel="select scheme"
                            defaultValue=""
                            value={values?.schemeId || ''}
                            options={schemeListOptions || []}
                            onChange={(e) => {
                                setFieldValue('schemeId', e)
                                setSchemeDetails((prevSchemeDetails: any) => ({
                                    ...prevSchemeDetails,
                                    quantity: 1,
                                }))
                            }}
                        // isSubmitting
                        />
                    </div>
                </div>
            </div>

            {values?.schemeId ? (
                <React.Fragment>
                    <div className="bg-[#87527C]">
                        <div className="grid grid-cols-12 py-1 px-2">
                            <div className="col-span-4">
                                <h2 className="font-semibold text-[10px] text-white">
                                    SCHEME
                                </h2>
                            </div>
                            <div className="col-span-2">
                                <h2 className="font-semibold text-[10px] text-white">
                                    PRICE
                                </h2>
                            </div>
                            <div className="col-span-2">
                                <h2 className="font-semibold text-[10px] text-white pl-3">
                                    QTY
                                </h2>
                            </div>
                            <div className="col-span-2">
                                <h2 className="font-semibold text-[10px] text-white">
                                    DELIVERY CHARGES
                                </h2>
                            </div>
                            <div className="col-span-2">
                                <h2 className="font-semibold text-[10px] text-white">
                                    TOTAL AMOUNT
                                </h2>
                            </div>
                        </div>

                        <div className="bg-yellow-500">
                            <div className="grid grid-cols-12 py-1 px-2">
                                <div className="col-span-4 flex items-center">
                                    <h2 className="font-semibold text-[10px] text-white">
                                        {schemeDetails?.schemeName}
                                    </h2>
                                </div>
                                <div className="col-span-2 flex items-center">
                                    <h2 className="font-semibold text-[10px] text-white">
                                        {schemeDetails?.price}.00
                                    </h2>
                                </div>
                                <div className="col-span-2 flex items-center">
                                    <h2 className="flex gap-x-6 items-center justify-start text-[15px] font-bold text-white">
                                        <button
                                            disabled={
                                                schemeDetails.quantity > 1
                                                    ? false
                                                    : true
                                            }
                                            className={`w-[22px] h-[22px] bg-[#f9f9f9] border-[#c2c2c2] border-[1px] rounded-full text-[15px]  ${schemeDetails.quantity > 1
                                                    ? 'text-[black]'
                                                    : 'text-[#c2c2c2]'
                                                }`}
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleQuantity('-')
                                            }}
                                        >
                                            -
                                        </button>
                                        <span className="">
                                            {schemeDetails.quantity}
                                        </span>
                                        <button
                                            disabled={
                                                schemeDetails.quantity < 9
                                                    ? false
                                                    : true
                                            }
                                            type="button"
                                            className="w-[22px] h-[22px] bg-[#f9f9f9] border-[#c2c2c2] border-[1px] rounded-full text-black "
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleQuantity('+')
                                            }}
                                        >
                                            +
                                        </button>
                                    </h2>
                                </div>
                                <div className="col-span-2 flex items-center">
                                    <h2 className=" font-semibold text-[10px]">
                                        {schemeDetails?.deliveryCharges}.00
                                    </h2>
                                </div>
                                <div className="col-span-2 flex items-center">
                                    <h2 className=" font-semibold text-[10px]">
                                        {schemeDetails?.totalAmount}.00
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            ) : null}
        </>
    )
}

export default CallerScheme
