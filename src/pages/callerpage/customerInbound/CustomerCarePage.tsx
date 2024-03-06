import React, { useState, useEffect } from 'react'
import CallerButton from '../components/CallerButton'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { FormInitialValues } from './CustomerCarePageWrapper'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { setAllItems } from 'src/redux/slices/configuration/dispositionThreeSlice'
import { useGetAllUnAuthdispositionTwoQuery } from 'src/services/configurations/DispositionTwoServices'
import { useGetAllUnAuthDispositionThreeQuery } from 'src/services/configurations/DispositionThreeServices'
import { setItems as setDispositionTwoItems } from 'src/redux/slices/configuration/dispositionTwoSlice'
import { useGetSchemeByIdUnAuthQuery } from 'src/services/SchemeService'
import CallerHeader from '../components/CallerHeader'
import CallerPageTopNav from '../components/CallerPageTopNav'
import CallerScheme from '../components/CallerScheme'
import CallerDeliveryAddress from '../components/CallerDeliveryAddress'
import CallerOtherDetails from '../components/CallerOtherDetails'
import { IoReorderFour } from 'react-icons/io5'

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

enum TabTypes {
    history = 'history',
    order = 'order',
    complaint = 'complaint',
}

type Props = {
    formikProps: FormikProps<FormInitialValues>
    activeTab: TabTypes
    setActiveTab: (value: string) => void
    column: any[]
    rows: any[]
    didItems: any
    apiStatus: boolean
    isTableLoading: boolean
    productsGroupOptions: SelectOption[]
    companyId: string
    customerReputationType: string
}

export interface SchemeDetailsPropTypes {
    schemeName: string
    price: number
    quantity: number
    deliveryCharges: number
    totalAmount: number
}

const CustomerCarePage: React.FC<Props> = ({
    formikProps,
    didItems,
    activeTab,
    setActiveTab,
    column,
    rows,
    apiStatus,
    isTableLoading,
    productsGroupOptions,
    companyId,
    customerReputationType,
}) => {
    const [schemeDetails, setSchemeDetails] = useState<SchemeDetailsPropTypes>({
        schemeName: '',
        price: 0,
        quantity: 1,
        deliveryCharges: 0,
        totalAmount: 0,
    })

    const { values, setFieldValue } = formikProps

    const dispatch = useDispatch<AppDispatch>()

    const { allItems: allDispositionItems }: any = useSelector(
        (state: RootState) => state.dispositionThree
    )

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
            return { label: ele?.dispositionDisplayName, value: ele?._id }
        }),
        dispositionTwoOptions: dispositionTwoItems?.map((ele: any) => {
            return { label: ele?.dispositionName, value: ele?._id }
        }),
    }

    return (
        <div className="bg-white px-1">
            <CallerPageTopNav agentName={values.agentName as string} />
            <CallerHeader
                CampaignName={values.campaign || ''}
                CallType={values.callType}
                IncomingNo={values.mobileNo}
                CustomerName={'' || ''}
                DidNumber={values.didNo}
                customerReputationType={customerReputationType}
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

            <CallerOtherDetails
                setFieldValue={setFieldValue}
                values={values}
                isCaller
            />

            {/* Disposition Section  */}
            <div className="grid grid-cols-12 items-center border-[1px] px-2 pb-1 border-grey-700 z-[5000]">
                <div className="col-span-3 px-2">
                    <ATMSelectSearchable
                        fontSizeOptionsClass="13px"
                        minHeight="25px"
                        size="xxs"
                        fontSizePlaceHolder="14px"
                        labelSize="xxs"
                        required
                        labelClass="text-xs font-medium"
                        label="Disposition Level 1"
                        componentClass="mt-2"
                        selectLabel="disposition level 1"
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
                        fontSizeOptionsClass="13px"
                        minHeight="25px"
                        size="xxs"
                        fontSizePlaceHolder="14px"
                        labelSize="xxs"
                        required
                        labelClass="text-xs font-medium"
                        label="Disposition Level 2"
                        componentClass="mt-2"
                        selectLabel="disposition level 2"
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
                        isLoading={apiStatus}
                        disabled={apiStatus}
                        text="Save"
                        type="submit"
                        className=""
                        onClick={() => formikProps.handleSubmit()}
                    />
                </div>
            </div>

            {/* TABS */}
            <div className="flex gap-x-4 mt-2 mb-1">
                <div
                    className={`flex px-1 py-0 font-semibold cursor-pointer rounded items-center ${
                        TabTypes[activeTab] === TabTypes.history
                            ? 'bg-[#87527c] text-white'
                            : 'bg-slate-200'
                    }`}
                    onClick={() => setActiveTab(TabTypes.history)}
                >
                    <div className=" text-xs mr-2">
                        <IoReorderFour />
                    </div>
                    <div className="text-xs">History</div>
                </div>
                <div
                    className={`flex px-1 py-0 font-semibold cursor-pointer rounded items-center ${
                        TabTypes[activeTab] === TabTypes.order
                            ? 'bg-[#87527c] text-white'
                            : 'bg-slate-200'
                    }`}
                    onClick={() => setActiveTab(TabTypes.order)}
                >
                    <div className=" text-xs mr-2">
                        <IoReorderFour />
                    </div>
                    <div className="text-xs">Order</div>
                </div>
                <div
                    className={`flex px-1 py-0 font-semibold cursor-pointer rounded items-center ${
                        TabTypes[activeTab] === TabTypes.complaint
                            ? 'bg-[#87527c] text-white'
                            : 'bg-slate-200'
                    }`}
                    onClick={() => setActiveTab(TabTypes.complaint)}
                >
                    <div className=" text-xs mr-2">
                        <IoReorderFour />
                    </div>
                    <div className="text-xs">Complain</div>
                </div>
            </div>

            {/* Data Table  */}
            <div className="border-[1px] border-grey-700 overflow-scroll">
                <ATMTable
                    headerClassName="bg-[#87527c] py-2 text-white z-0"
                    columns={column || []}
                    rows={rows || []}
                    isLoading={isTableLoading}
                />
            </div>
        </div>
    )
}

export default CustomerCarePage
