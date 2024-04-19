/* eslint-disable array-callback-return */
/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { array, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetAllDealersQuery } from 'src/services/DealerServices'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import {
    useGetSalesOrderByIdQuery,
    useUpdateSalesOrderMutation,
} from 'src/services/SalesOrderService'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { showToast } from 'src/utils'
import EditSaleOrder from './EditSaleOrder'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setAllItems } from 'src/redux/slices/dealerSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    soNumber: string | ''
    dealerId: string | ''
    dealerWareHouseId: string | ''
    companyWareHouseId: string | ''
    companyId: string | ''
    productSalesOrder: {
        soId: string
        productGroupId: string
        rate: number | 0
        quantity: number | 0
    }[]
    id: string
    dhApproved: string
    dhApprovedActionBy: string
    dhApprovedAt: string
    accApproved: string
    accApprovedActionBy: string
    accApprovedAt: string
    dhApprovedById: string
    accApprovedById: string
}

const EditSaleOrderWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const [editSaleOrder, setEditSaleOrder] = useState<FormInitialValues>({
        soNumber: '',
        dealerId: '',
        dealerWareHouseId: '',
        companyWareHouseId: '',
        productSalesOrder: [],
        companyId: '',
        id: '',
        dhApproved: '',
        dhApprovedActionBy: '',
        dhApprovedAt: '',
        accApproved: '',
        accApprovedActionBy: '',
        accApprovedAt: '',
        dhApprovedById: '',
        accApprovedById: '',
    })
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateSaleOrder] = useUpdateSalesOrderMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetSalesOrderByIdQuery(Id || ''),
    })
  

    const {
        data: dealerData,
        isLoading: dealerIsLoading,
        isFetching: dealerIsFetching,
    } = useGetAllDealersQuery(userData?.companyId)
    const { allItems }: any = useSelector((state: RootState) => state?.dealer)

    const dealerOptions = allItems?.map((ele: any) => {
        return {
            label: ele.firstName + ' ' + ele.lastName,
            value: ele._id,
        }
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

    //Dealer
    useEffect(() => {
        dispatch(setAllItems(dealerData?.data))
    }, [dealerData, dealerIsLoading, dealerIsFetching, dispatch])

    const dropdownOptions = {
        dealerOptions: dealerOptions,
        warehouseOptions: warehouseOptions,
        productGroupOptions: productGroupOptions,
    }

    useEffect(() => {
        if (selectedItem?.length) {
            let product: FormInitialValues = {
                soNumber: '',
                dealerId: '',
                dealerWareHouseId: '',
                companyWareHouseId: '',
                productSalesOrder: [],
                companyId: '',
                id: '',
                dhApproved: '',
                dhApprovedActionBy: '',
                dhApprovedAt: '',
                accApproved: '',
                accApprovedActionBy: '',
                accApprovedAt: '',
                dhApprovedById: '',
                accApprovedById: '',
            }

            selectedItem?.map((ele: any) => {
                product = {
                    ...product,
                    soNumber: ele?.soNumber,
                    dealerId: ele?.dealerId,
                    dealerWareHouseId: ele?.dealerWareHouseId,
                    companyWareHouseId: ele?.companyWareHouseId,
                    companyId: ele?.companyId,
                    dhApproved: ele?.dhApproved,
                    dhApprovedActionBy: ele?.dhApprovedActionBy,
                    dhApprovedAt: ele?.dhApprovedAt,
                    accApproved: ele?.accApproved,
                    accApprovedActionBy: ele?.accApprovedActionBy,
                    accApprovedAt: ele?.accApprovedAt,
                    dhApprovedById: ele?.dhApprovedById,
                    accApprovedById: ele?.accApprovedById,
                    productSalesOrder: [
                        ...product.productSalesOrder,
                        {
                            soId: ele?._id,
                            productGroupId:
                                ele?.productSalesOrder?.productGroupId,
                            rate: ele?.productSalesOrder?.rate,
                            quantity: ele?.productSalesOrder?.quantity,
                        },
                    ],
                }
            })

            setEditSaleOrder(product)
        }
    }, [selectedItem])

    // Form Initial Values
    const initialValues: FormInitialValues = {
        soNumber: editSaleOrder?.soNumber || '',
        dealerId: editSaleOrder?.dealerId || '',
        dealerWareHouseId: editSaleOrder?.dealerWareHouseId || '',
        companyWareHouseId: editSaleOrder?.companyWareHouseId || '',
        companyId: editSaleOrder?.companyId || '',
        productSalesOrder: editSaleOrder.productSalesOrder,
        id: '',
        dhApproved: editSaleOrder.dhApproved,
        dhApprovedActionBy: editSaleOrder.dhApprovedActionBy,
        dhApprovedAt: editSaleOrder.dhApprovedAt,
        accApproved: editSaleOrder.accApproved,
        accApprovedActionBy: editSaleOrder.accApprovedActionBy,
        accApprovedAt: editSaleOrder.accApprovedAt,
        dhApprovedById: editSaleOrder.dhApprovedById,
        accApprovedById: editSaleOrder.accApprovedById,
    }

    // Form Validation Schema
    const validationSchema = object({
        soNumber: string().required('Sale order number is required'),
        dealerId: string().required('Please select a dealer'),
        dealerWareHouseId: string().required(
            'Please select a  Dealer Warehouse'
        ),
        companyWareHouseId: string().required('Please select a warehouse'),
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

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        let newValues = {
            soNumber: values?.soNumber || '',
            dealerId: values?.dealerId || '',
            dealerWareHouseId: values?.dealerWareHouseId || '',
            companyWareHouseId: values?.companyWareHouseId || '',
            companyId: values?.companyId || '',
            productSalesOrder: {},
            id: '',
            dhApproved: values.dhApproved,
            dhApprovedActionBy: values.dhApprovedActionBy,
            dhApprovedAt: values.dhApprovedAt,
            accApproved: values.accApproved,
            accApprovedActionBy: values.accApprovedActionBy,
            accApprovedAt: values.accApprovedAt,
            dhApprovedById: values.dhApprovedById,
            accApprovedById: values.accApprovedById,
        }

        const finalValues: any = []
        values.productSalesOrder.map((ele) => {
            finalValues.push({
                ...newValues,
                id: ele.soId ? ele.soId : '',
                productSalesOrder: {
                    productGroupId: ele.productGroupId,
                    rate: ele.rate,
                    quantity: ele.quantity,
                },
            })
        })

        setApiStatus(true)
        setTimeout(() => {
            updateSaleOrder({
                body: finalValues,
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Sale-Order Updated successfully!')
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
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <EditSaleOrder
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

export default EditSaleOrderWrapper
