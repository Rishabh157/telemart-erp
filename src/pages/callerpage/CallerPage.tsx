import React, { useState, useEffect } from 'react'
import CallerButton from './components/CallerButton'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { FormInitialValues } from './CallerPageWrapper'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { setAllItems } from 'src/redux/slices/configuration/dispositionThreeSlice'
import { useGetAllUnAuthdispositionTwoQuery } from 'src/services/configurations/DispositionTwoServices'
import { setItems as setDispositionTwoItems } from 'src/redux/slices/configuration/dispositionTwoSlice'
import { useGetSchemeByIdUnAuthQuery } from 'src/services/SchemeService'
import { useGetAllProductGroupUnAuthQuery } from 'src/services/ProductGroupService'
import { useGetAllUnAuthDispositionThreeQuery } from 'src/services/configurations/DispositionThreeServices'
import CallerHeader from './components/CallerHeader'
import CallerPageTopNav from './components/CallerPageTopNav'
import CallerScheme from './components/CallerScheme'
import CallerDeliveryAddress from './components/CallerDeliveryAddress'
import CallerOtherDetails from './components/CallerOtherDetails'
export type dropdownOptions = {
    stateOptions?: SelectOption[] | []
    districtOptions?: SelectOption[] | []
    pincodeOptions?: SelectOption[] | []
    dispositionThreeOptions?: SelectOption[] | []
    dispositionTwoOptions?: SelectOption[] | []
    tehsilOptions?: SelectOption[] | []
    areaOptions?: SelectOption[] | []
    OutBoundOptions?: SelectOption[] | []
}
type Props = {
    formikProps: FormikProps<FormInitialValues>
    column: any[]
    rows: any[]
    didItems: any
    isLoading: boolean
}

type ProductGroupResponse = {
    _id: string
    groupName: string
    dealerSalePrice: number
    gst: number
    cgst: number
    sgst: number
    igst: number
    utgst: number
    companyId: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
}
export interface SchemeDetailsPropTypes {
    schemeName: string
    price: number
    quantity: number
    deliveryCharges: number
    totalAmount: number
}

const CallerPage: React.FC<Props> = ({
    formikProps,
    didItems,
    column,
    rows,
    isLoading,
}) => {
    const callerDetails: any = localStorage.getItem('callerPageData')
    let callerDataItem = JSON.parse(callerDetails)
    const companyId = callerDataItem?.companyId || ''

    const [schemeDetails, setSchemeDetails] = useState<SchemeDetailsPropTypes>({
        schemeName: '',
        price: 0,
        quantity: 1,
        deliveryCharges: 0,
        totalAmount: 0,
    })
    const [productsGroupOptions, setProductsGroupOptions] = useState<
        SelectOption[] | []
    >([])

    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate()

    const { allItems: allDispositionItems }: any = useSelector(
        (state: RootState) => state.dispositionThree
    )

    // Get Product Group Data
    const {
        data: productGroupData,
        isLoading: isProductGroupLoading,
        isFetching: isProductGroupFetching,
    } = useGetAllProductGroupUnAuthQuery(companyId, {
        skip: !companyId,
    })

    useEffect(() => {
        if (didItems) {
            setFieldValue(
                'productGroupId',
                didItems?.schemeProductGroup[0]?.productGroup || ''
            )
            setFieldValue('schemeId', didItems?.schemeId)
        }
        //eslint-disable-next-line
    }, [didItems])
    useEffect(() => {
        if (!isProductGroupLoading && !isProductGroupFetching) {
            if (productGroupData?.status) {
                const productGroupOptionsList = productGroupData?.data?.map(
                    (products: ProductGroupResponse) => {
                        return {
                            label: products?.groupName,
                            value: products?._id,
                        }
                    }
                )
                setProductsGroupOptions(productGroupOptionsList)
            }
        }
    }, [productGroupData, isProductGroupLoading, isProductGroupFetching])

    // GET SINGLE SCHEME BY ID
    const {
        data: singleSchemeData,
        isFetching: isSingleSchemeFetching,
        isLoading: isSingleSchemeLoading,
    } = useGetSchemeByIdUnAuthQuery(values.schemeId, {
        skip: !formikProps?.values?.schemeId,
    })

    useEffect(() => {
        if (!isSingleSchemeLoading && !isSingleSchemeFetching) {
            setSchemeDetails((prevSchemeDetails) => ({
                ...prevSchemeDetails,
                schemeName: singleSchemeData?.data?.schemeName || '',
                price: singleSchemeData?.data?.schemePrice || 0,
                quantity: 1,
                deliveryCharges: singleSchemeData?.data?.deliveryCharges || 0,
                totalAmount:
                    singleSchemeData?.data?.schemePrice +
                        singleSchemeData?.data?.deliveryCharges || 0,
            }))
        }
    }, [
        singleSchemeData,
        isSingleSchemeLoading,
        isSingleSchemeFetching,
        values.productGroupId,
    ])

    // Disposition Three Data
    const {
        data: dispositionThreedata,
        isLoading: dispositionThreeIsLoading,
        isFetching: dispositionThreeIsFetching,
    } = useGetAllUnAuthDispositionThreeQuery(
        formikProps.values.dispositionLevelTwoId,
        { skip: !formikProps?.values?.dispositionLevelTwoId }
    )

    // Disposition Two Data
    const {
        data: dispositionTwodata,
        isLoading: dispositionTwoIsLoading,
        isFetching: dispositionTwoIsFetching,
    } = useGetAllUnAuthdispositionTwoQuery('')

    const { items: dispositionTwoItems }: any = useSelector(
        (state: RootState) => state.dispositionTwo
    )

    useEffect(() => {
        if (!dispositionThreeIsLoading && !dispositionThreeIsFetching) {
            dispatch(setAllItems(dispositionThreedata?.data))
        }
    }, [
        dispositionThreedata,
        dispatch,
        dispositionThreeIsLoading,
        dispositionThreeIsFetching,
    ])

    useEffect(() => {
        if (!dispositionTwoIsLoading && !dispositionTwoIsFetching) {
            dispatch(setDispositionTwoItems(dispositionTwodata?.data))
        }
    }, [
        dispositionTwodata,
        dispatch,
        dispositionTwoIsLoading,
        dispositionTwoIsFetching,
    ])

    useEffect(() => {
        setFieldValue('totalAmount', schemeDetails.totalAmount)
        setFieldValue('shcemeQuantity', schemeDetails.quantity)
        setFieldValue('schemeName', schemeDetails.schemeName)
        setFieldValue('price', schemeDetails.price)
        setFieldValue('deliveryCharges', schemeDetails.deliveryCharges)

        // eslint-disable-next-line
    }, [schemeDetails])

    const dropdownOptions = {
        dispositionThreeOptions: allDispositionItems?.map((ele: any) => {
            return { label: ele?.dispositionName, value: ele?._id }
        }),
        dispositionTwoOptions: dispositionTwoItems?.map((ele: any) => {
            return { label: ele?.dispositionName, value: ele?._id }
        }),
    }

    return (
        <div className="bg-white px-4 h-[2000px]">
            <CallerPageTopNav agentName={values.agentName as string} />
            <CallerHeader
                CampaignName={values.campaign || ''}
                CallType={values.callType}
                IncomingNo={values.mobileNo}
                CustomerName={'' || ''}
                DidNumber={values.didNo}
            />
            <CallerScheme
                values={values}
                setFieldValue={setFieldValue}
                productsGroupOptions={productsGroupOptions}
                setSchemeDetails={setSchemeDetails}
                schemeDetails={schemeDetails}
                companyId={companyId}
            />
            <CallerDeliveryAddress
                setFieldValue={setFieldValue}
                values={values}
            />

            <CallerOtherDetails setFieldValue={setFieldValue} values={values} />

            {/* Disposition Section  */}
            <div className="grid grid-cols-12 items-center border-[1px] px-3 pb-1 border-grey-700 z-[5000]">
                <div className="col-span-3 px-3">
                    <ATMSelectSearchable
                        required
                        labelClass="text-xs font-medium"
                        label="Disposition Level 1"
                        componentClass="mt-2"
                        selectLabel="select disposition level 1"
                        size="xs"
                        name="dispositionLevelTwoId"
                        value={values.dispositionLevelTwoId || ''}
                        // isSubmitting
                        options={dropdownOptions.dispositionTwoOptions || []}
                        menuPosition="absolute"
                        onChange={(e) => {
                            setFieldValue('dispositionLevelTwoId', e)
                        }}
                    />
                </div>
                <div className="col-span-3 px-3">
                    <ATMSelectSearchable
                        required
                        labelClass="text-xs font-medium"
                        label="Disposition Level 2"
                        componentClass="mt-2"
                        selectLabel="select disposition level 2"
                        size="xs"
                        name="dispositionLevelThreeId"
                        value={values.dispositionLevelThreeId || ''}
                        // isSubmitting
                        options={dropdownOptions.dispositionThreeOptions || []}
                        onChange={(e) => {
                            setFieldValue('dispositionLevelThreeId', e)
                        }}
                    />
                </div>
                <div className="col-span-1 px-3 pt-7">
                    <CallerButton
                        // disabled={!dirty || isSubmitting}
                        isLoading={isLoading}
                        text="Save"
                        type="submit"
                        className="py-[8px]"
                        onClick={() => formikProps.handleSubmit()}
                    />
                </div>
            </div>

            {/* Data Table  */}
            <div className="border-[1px] border-grey-700">
                <ATMTable
                    headerClassName="bg-[#87527c] py-2 text-white z-0"
                    columns={column}
                    rows={rows}
                />
            </div>
        </div>
    )
}

export default CallerPage
