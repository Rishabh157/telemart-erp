import React, { useState, useEffect } from 'react'
import CallerButton from './components/CallerButton'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { FormInitialValues } from './CallerPageWrapper'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { setAllItems } from 'src/redux/slices/configuration/dispositionThreeSlice'
import { useGetAllUnAuthdispositionTwoQuery } from 'src/services/configurations/DispositionTwoServices'
import { setItems as setDispositionTwoItems } from 'src/redux/slices/configuration/dispositionTwoSlice'
import { useGetAllPincodeUnauthQuery } from 'src/services/PinCodeService'
import {
    useGetAllSchemeListByPgiQuery,
    useGetSchemeByIdQuery,
} from 'src/services/SchemeService'
import { useGetAllProductGroupUnAuthQuery } from 'src/services/ProductGroupService'
import { setAllPincodes } from 'src/redux/slices/pincodeSlice'
import { useGetAllAreaUnauthQuery } from 'src/services/AreaService'
import { setItems as setAreaItems } from 'src/redux/slices/areaSlice'
import { AreaListResponse } from 'src/models/Area.model'
import { useGetAllUnAuthDispositionThreeQuery } from 'src/services/configurations/DispositionThreeServices'
import CallerHeader from './components/CallerHeader'
import CallerPageTopNav from './components/CallerPageTopNav'

import CallerScheme from './components/CallerScheme'
import CallerDeliveryAddress from './components/CallerDeliveryAddress'
import CallerOtherDetails from './components/CallerOtherDetails'
export type dropdownOptions = {
    // counrtyOptions: SelectOption[]
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
    apiStatus?: boolean
    schemeColumn: columnTypes[] | []
    dropdownOptions: dropdownOptions
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
    apiStatus,
    dropdownOptions,
    schemeColumn,
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
    const [schemeListOptions, setSchemeListOptions] = useState<
        SelectOption[] | []
    >([])

    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate()

    const { allItems: allDispositionItems }: any = useSelector(
        (state: RootState) => state.dispositionThree
    )
    const { items: allArea }: any = useSelector(
        (state: RootState) => state.areas
    )
    const { allPincodes }: any = useSelector(
        (state: RootState) => state.pincode
    )

    const {
        data: PCdata,
        isFetching: PCisFetching,
        isLoading: PCisLoading,
    } = useGetAllPincodeUnauthQuery('')

    useEffect(() => {
        if (!PCisLoading && !PCisFetching) {
            dispatch(setAllPincodes(PCdata?.data))
        }
    }, [PCdata, dispatch, PCisLoading, PCisFetching])

    // Get Product Group Data
    const {
        data: productGroupData,
        isLoading: isProductGroupLoading,
        isFetching: isProductGroupFetching,
    } = useGetAllProductGroupUnAuthQuery(companyId,{
        skip:!companyId
    })

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

    // GET SCHEME LIST BY companyId AND productsGroupId
    const {
        data: schemeListData,
        isFetching: isSchemeListFetching,
        isLoading: isSchemeListLoading,
    } = useGetAllSchemeListByPgiQuery(
        {
            companyId: companyId,
            productGroupId: formikProps?.values?.productGroupId,
        },
        {
            skip: !formikProps?.values?.productGroupId,
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

    // GET SINGLE SCHEME BY ID
    const {
        data: singleSchemeData,
        isFetching: isSingleSchemeFetching,
        isLoading: isSingleSchemeLoading,
    } = useGetSchemeByIdQuery(values.schemeId, {
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

    // Area Options
    const {
        data: areaData,
        isLoading: areaIsLoading,
        isFetching: areaIsFetching,
    } = useGetAllAreaUnauthQuery(formikProps?.values?.pincodeId, {
        skip: !formikProps?.values?.pincodeId,
    })

    useEffect(() => {
        if (!areaIsFetching && !areaIsLoading) {
            dispatch(setAreaItems(areaData?.data))
        }
        // eslint-disable-next-line
    }, [areaData, areaIsLoading, areaIsFetching, dispatch])

    useEffect(() => {
        if (formikProps?.values?.pincodeId && areaData?.data) {
            let v: string[] | string =
                formikProps?.values?.autoFillingShippingAddress.split('\n')
            let areaName = areaData?.data[0]?.area
            v.splice(2, 0, areaName)
            let cv: string = v.toString()
            let dv = cv?.replaceAll(',', '\n')
            setFieldValue('areaId', areaData?.data[0]?._id || '')
            setFieldValue('areaLabel', areaName || '')
            setFieldValue('autoFillingShippingAddress', dv || '')
        }
        // eslint-disable-next-line
    }, [allArea, formikProps?.values?.pincodeId])

    useEffect(() => {
        setFieldValue('totalAmount', schemeDetails.totalAmount)
        setFieldValue('shcemeQuantity', schemeDetails.quantity)
        setFieldValue('schemeName', schemeDetails.schemeName)
        setFieldValue('price', schemeDetails.price)
        setFieldValue('deliveryCharges', schemeDetails.deliveryCharges)

        // eslint-disable-next-line
    }, [schemeDetails])

    dropdownOptions = {
        ...dropdownOptions,

        dispositionThreeOptions: allDispositionItems?.map((ele: any) => {
            return { label: ele?.dispositionName, value: ele?._id }
        }),
        dispositionTwoOptions: dispositionTwoItems?.map((ele: any) => {
            return { label: ele?.dispositionName, value: ele?._id }
        }),
        pincodeOptions: allPincodes?.map((ele: any) => {
            return { label: ele?.pincode, value: ele?._id }
        }),
        areaOptions: allArea?.map((ele: AreaListResponse) => {
            return { label: ele?.area, value: ele?._id }
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
                schemeListOptions={schemeListOptions}
                setSchemeDetails={setSchemeDetails}
                schemeDetails={schemeDetails}
            />
            <CallerDeliveryAddress
                dropdownOptions={dropdownOptions}
                setFieldValue={setFieldValue}
                values={values}
            />

            <CallerOtherDetails setFieldValue={setFieldValue} values={values} />

            {/* Disposition Section  */}
            <div className="grid grid-cols-12 items-center border-[1px] px-3 pb-6 mt-1 border-grey-700 z-50">
                <div className="col-span-3 px-3">
                    <ATMSelectSearchable
                        required
                        label="Disposition Level 1"
                        componentClass="mt-2"
                        selectLabel="select disposition level 1"
                        size="xs"
                        name="dispositionLevelTwoId"
                        value={values.dispositionLevelTwoId || ''}
                        // isSubmitting
                        options={dropdownOptions.dispositionTwoOptions || []}
                        onChange={(e) => {
                            setFieldValue('dispositionLevelTwoId', e)
                        }}
                    />
                </div>
                <div className="col-span-3 px-3">
                    <ATMSelectSearchable
                        required
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
                <div className="col-span-1 px-3 pt-6">
                    <CallerButton
                        // disabled={!dirty || isSubmitting}
                        isLoading={isLoading}
                        text="Save"
                        type="submit"
                        className="py-2 h-[35px]"
                        onClick={() => formikProps.handleSubmit()}
                    />
                </div>
            </div>

            {/* Data Table  */}

            <div className="border-[1px] pb-2 mt-1 border-grey-700 pt-2">
                <ATMTable
                    headerClassName="bg-[#87527c] py-2 text-white"
                    columns={column}
                    rows={rows}
                />
            </div>
        </div>
    )
}

export default CallerPage
