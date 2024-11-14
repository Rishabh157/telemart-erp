// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { array, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetAllDealersQuery } from 'src/services/DealerServices'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { useAddSalesOrderMutation } from 'src/services/SalesOrderService'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { showToast } from 'src/utils'
import AddSaleOrder from './AddSaleOrder'
import moment from 'moment'

// |-- Redux--|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    // soNumber: string
    dealerId: string
    dealerWareHouseId: string
    companyWareHouseId: string
    companyId: string
    expectedDeliveryDate: string
    productSalesOrder: {
        productGroupId: string
        rate: number | 0
        quantity: number | 0
    }[]
}

const AddSaleOrderWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [addSalesOrder] = useAddSalesOrderMutation()

    const { options: dealerOptions } = useCustomOptions({
        useEndPointHook: useGetAllDealersQuery(''),
        keyName: 'dealerCode',
        value: '_id',
    })

    const { options: warehouseOptions } = useCustomOptions({
        useEndPointHook: useGetWareHousesQuery(''),
        keyName: 'wareHouseName',
        value: '_id',
    })

    const { options: productGroupOptions } = useCustomOptions({
        useEndPointHook: useGetAllProductGroupQuery(''),
        keyName: 'groupName',
        value: '_id',
    })

    const { options: productPriceOptions } = useCustomOptions({
        useEndPointHook: useGetAllProductGroupQuery(''),
        keyName: 'dealerSalePrice',
        value: '_id',
    })

    const dropdownOptions = {
        dealerOptions: dealerOptions,
        warehouseOptions: warehouseOptions,
        productGroupOptions: productGroupOptions,
    }

    // Form Initial Values
    const initialValues: FormInitialValues = {
        dealerId: '',
        dealerWareHouseId: '',
        companyWareHouseId: '',
        productSalesOrder: [
            {
                productGroupId: '',
                rate: 0,
                quantity: 0,
            },
        ],
        companyId: '',
        expectedDeliveryDate: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        dealerId: string().required('Please select a dealer'),
        dealerWareHouseId: string().required(
            'Please select a  Dealer Warehouse'
        ),
        companyWareHouseId: string().required('Please select a warehouse'),
        expectedDeliveryDate: string().required(
            'Please select a delivery date'
        ),
        productSalesOrder: array().of(
            object().shape({
                productGroupId: string().required(
                    'Please select a product name'
                ),
                rate: number()
                    .min(1, 'Rate must be greater than 0')
                    .required('Please enter rate'),
                quantity: number()
                    .min(1, 'Quantity must be greater than 0')
                    .required('Please enter quantity'),
            })
        ),
    })

    function formatDate(date: Date) {
        return moment(date).format('DD-MMM-YYYY').toLowerCase()
    }

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        const formatedDate = formatDate(new Date(values.expectedDeliveryDate))

        setTimeout(() => {
            addSalesOrder({
                // soNumber: values.soNumber,
                dealerId: values.dealerId,
                dealerWareHouseId: values.dealerWareHouseId,
                companyWareHouseId: values.companyWareHouseId,
                expectedDeliveryDate: formatedDate,
                productSalesOrder: values.productSalesOrder,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Sale-Order added successfully!')
                        navigate('/sale-order')
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <AddSaleOrder
                            formikProps={formikProps}
                            dropdownOptions={dropdownOptions}
                            apiStatus={apiStatus}
                            productPriceOptions={productPriceOptions}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default AddSaleOrderWrapper
