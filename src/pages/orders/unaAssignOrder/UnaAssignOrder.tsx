import { useEffect, useState } from 'react'
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './UnaAssignOrderWrapper'
import { AppDispatch } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetDealerOfOrderQuery } from 'src/services/OrderService'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import { useGetAllSchemeListByPgiAuthQuery } from 'src/services/SchemeService'
import { useGetAllProductGroupUnAuthQuery } from 'src/services/ProductGroupService'
import { handleValidNumber } from 'src/utils/methods/numberMethods'
import { useGetAllStateQuery } from 'src/services/StateService'
import { useGetAllDistrictByStateQuery } from 'src/services/DistricService'
import { useGetAllTehsilByDistrictQuery } from 'src/services/TehsilService'
import { useGetAllPincodeByTehsilQuery } from 'src/services/PinCodeService'
import { useGetAllAreaByPincodeQuery } from 'src/services/AreaService'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'

// |-- Types --|
type Props = {
  formikProps: FormikProps<FormInitialValues>
  apiStatus: boolean
  orderNumber: string | number
}

const UnaAssignOrder = ({
  formikProps,
  apiStatus,
  orderNumber,
}: Props) => {

  const dispatch = useDispatch<AppDispatch>()
  const { values, setFieldValue } = formikProps

  const [companyWarehouse, setCompanyWarehouse] = useState<any[]>([])
  const [dealer, setDealer] = useState<any>([])

  const { userData } = useGetLocalStorage()

  const {
    data: dealerOfOrderData,
    isLoading: isDealerOfOrderDataFetching,
    isFetching: isDealerOfOrderDataLoading,
  } = useGetDealerOfOrderQuery(
    {
      schemeId: values.schemeId,
      pincodeId: values?.pincodeLabel,
    },
    {
      skip: !values.schemeId || !values?.pincodeLabel,
    }
  )

  const { options: productOptions } = useCustomOptions({
    useEndPointHook: useGetAllProductGroupUnAuthQuery(userData?.companyId, {
      skip: !userData?.companyId,
    }),
    keyName: 'groupName',
    value: '_id',
  })

  const { options: schemeOptions } = useCustomOptions({
    useEndPointHook: useGetAllSchemeListByPgiAuthQuery(values?.productId, {
      skip: !values?.productId
    }),
    keyName: 'schemeName',
    value: '_id',
  })

  useEffect(() => {
    if (!isDealerOfOrderDataLoading && !isDealerOfOrderDataFetching) {
      setCompanyWarehouse(dealerOfOrderData?.companyWarehouse)
      setDealer(dealerOfOrderData?.dealerData)
    }
  }, [dealerOfOrderData, isDealerOfOrderDataFetching, isDealerOfOrderDataLoading])

  const dealerOptions = dealer?.map((ele: any) => {
    return {
      label: ele?.dealerCode,
      value: ele?.dealerId,
    }
  })

  const warehouseOptions = companyWarehouse?.map((ele: any) => {
    return {
      label: ele?.wareHouseName,
      value: ele?._id,
    }
  })

  const { options: stateOptions } = useCustomOptions({
    useEndPointHook: useGetAllStateQuery(''),
    keyName: 'stateName',
    value: '_id',
  })

  const { options: districtOptions } = useCustomOptions({
    useEndPointHook: useGetAllDistrictByStateQuery(values.stateId || '',
      {
        skip: !values.stateId
      }),
    keyName: 'districtName',
    value: '_id',
  })

  const { options: tehsilOptions } = useCustomOptions({
    useEndPointHook: useGetAllTehsilByDistrictQuery(values.districtId || '',
      {
        skip: !values.districtId
      }),
    keyName: 'tehsilName',
    value: '_id',
  })

  const { options: pincodeOptions } = useCustomOptions({
    useEndPointHook: useGetAllPincodeByTehsilQuery(values.tehsilId || '',
      {
        skip: !values.tehsilId
      }),
    keyName: 'pincode',
    value: '_id',
  })

  const { options: areaOptions } = useCustomOptions({
    useEndPointHook: useGetAllAreaByPincodeQuery(values.pincodeId || '',
      {
        skip: !values.pincodeId
      }),
    keyName: 'area',
    value: '_id',
  })

  const handleSetFieldValue = (name: string, value: string | boolean) => {
    setFieldValue(name, value)
    dispatch(setFieldCustomized(true))
  }

  console.log('values: ', values)

  return (
    <div className="h-[calc(100vh-55px)] overflow-auto">
      <div className="p-4 flex flex-col gap-2  ">

        <div className="pt-1">
          <ATMPageHeading> UNA Reassign Order </ATMPageHeading>
        </div>

        <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
          <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
            <div className="text-xl font-medium">UNA Reassign Order of ({orderNumber})</div>
            <div>
              <button
                type="button"
                disabled={apiStatus}
                onClick={() => formikProps.handleSubmit()}
                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${apiStatus ? 'opacity-50' : ''}`}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="grow py-9 px-3">

            <div className="grid grid-cols-5 gap-3 mt-5">

              <ATMSelectSearchable
                required
                name="stateId"
                label="State"
                value={values.stateId}
                options={stateOptions}
                onChange={(e) => handleSetFieldValue('stateId', e)}
              />

              <ATMSelectSearchable
                required
                name="districtId"
                label="State"
                value={values.districtId}
                options={districtOptions}
                onChange={(e) => handleSetFieldValue('districtId', e)}
              />

              <ATMSelectSearchable
                required
                name="districtId"
                label="Tehsil"
                value={values.tehsilId}
                options={tehsilOptions}
                onChange={(e) => handleSetFieldValue('tehsilId', e)}
              />

              <ATMSelectSearchable
                required
                name="pincodeId"
                label="Pincode"
                value={values.pincodeId}
                options={pincodeOptions}
                isValueWithLable
                onChange={(e) => {
                  handleSetFieldValue('pincodeId', e.value)
                  handleSetFieldValue('pincodeLabel', e.label)
                }}
              />

              <ATMSelectSearchable
                required
                name="areaId"
                label="Area"
                value={values.areaId}
                options={areaOptions}
                onChange={(e) => handleSetFieldValue('areaId', e)}
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              <ATMSelectSearchable
                required
                name="productId"
                label="Product"
                value={values.productId}
                options={productOptions}
                onChange={(e) => handleSetFieldValue('productId', e)}
              />

              <ATMSelectSearchable
                required
                label="Scheme"
                name="schemeId"
                value={values.schemeId}
                options={schemeOptions}
                onChange={(e) => handleSetFieldValue('schemeId', e)}
              />

              <ATMTextField
                name="shcemeQuantity"
                value={values.shcemeQuantity}
                label="Shceme Quantity"
                // placeholder=""
                onChange={(e) => handleValidNumber(e) && setFieldValue('shcemeQuantity', e.target.value)}
              />

              <ATMSelectSearchable
                required
                name="assignDealerId"
                label="Assign Dealer"
                value={values.assignDealerId || ''}
                options={dealerOptions}
                onChange={(e) => {
                  handleSetFieldValue('assignDealerId', e)
                  handleSetFieldValue('assignWarehouseId', null as any)
                }}
              />

              <ATMSelectSearchable
                required
                name="assignWarehouseId"
                label="Assign Warehouse"
                value={values.assignWarehouseId || ''}
                options={warehouseOptions}
                onChange={(e) => {
                  handleSetFieldValue('assignWarehouseId', e)
                  handleSetFieldValue('assignDealerId', null as any)
                }}
              />

              <ATMTextArea
                name="remark"
                value={values.remark}
                label="Remark "
                placeholder="Remark "
                onChange={(newValue) => setFieldValue('remark', newValue)}
              />

            </div>



          </div>


        </div>
      </div>
    </div>
  )
}

export default UnaAssignOrder
