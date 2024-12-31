import { Formik, FormikProps } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { OrderListResponse } from 'src/models'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'
import { useGetOrderByIdQuery, useReAssignUnaOrderMutation } from 'src/services/OrderService'
import { showToast } from 'src/utils'
import { object } from 'yup'
import UnaAssignOrder from './UnaAssignOrder'

export type FormInitialValues = {
  remark: string,
  stateId: string,
  districtId: string,
  tehsilId: string,
  pincodeId: string,
  areaId: string,
  productId: string,
  schemeId: string,
  assignDealerId: string | null,
  assignWarehouseId: string | null,
  shcemeQuantity: string | number,
  pincodeLabel: string
}

const UnaAssignOrderWrapper = () => {

  const params = useParams()
  const id: any = params.id

  // Get Order Details
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { items, isLoading } = useGetDataByIdCustomQuery<OrderListResponse>({
    useEndPointHook: useGetOrderByIdQuery(id, {
      skip: !id,
    }),
  })

  console.log('items: &&&&&&&&& ', items)
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const [apiStatus, setApiStatus] = useState<boolean>(false)
  const [updateOrder] = useReAssignUnaOrderMutation()

  // Form Initial Values
  const initialValues: FormInitialValues = {
    schemeId: items?.schemeId || "",
    productId: items?.productGroupId || "",
    assignDealerId: items?.assignDealerId || null,
    assignWarehouseId: items?.assignWarehouseId || null,
    shcemeQuantity: items?.shcemeQuantity || '',
    stateId: items?.stateId || "",
    districtId: items?.districtId || "",
    tehsilId: items?.tehsilId || "",
    pincodeId: items?.pincodeId || "",
    areaId: items?.areaId || "",
    remark: items?.remark || "",
    pincodeLabel: items?.pincodeLabel || ''
  }

  // Form Validation Schema
  const validationSchema = object({

  })


  // Form Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => {
    setApiStatus(true)
    dispatch(setFieldCustomized(false))

    const { pincodeLabel, ...rest } = values

    setTimeout(() => {
      updateOrder({
        id: id,
        body: rest
      }).then((res: any) => {
        if ('data' in res) {
          if (res?.data?.status) {
            showToast('success', 'Order updated successfully!')
            navigate('/orders/una')
          } else {
            showToast('error', res?.data?.message)
          }
        } else {
          showToast('error', 'Something went wrong')
        }
        setApiStatus(false)
      })
    }, 1000)
  }

  return (
    <SideNavLayout>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps: FormikProps<FormInitialValues>) => {
          return (
            <UnaAssignOrder
              formikProps={formikProps}
              apiStatus={apiStatus}
              orderNumber={items?.orderNumber || ''}
            />
          )
        }}
      </Formik>
    </SideNavLayout>
  )
}

export default UnaAssignOrderWrapper
