/* eslint-disable array-callback-return */
/// ==============================================
// Filename:EditRTVendorWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
// import { number, object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import {
    useGetReturnToOrderByIdQuery,
    useUpdateReturnToVendorOrderMutation,
} from 'src/services/ReturnToVendorService'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { showToast } from 'src/utils'
import EditRTVendor from './EditRTVendor'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetVendorsQuery } from 'src/services/VendorServices'
import { array, number, object, string } from 'yup'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    rtvNo: string
    vendorId: string
    warehouseId: string
    remark: string
    companyId: string
    productSalesOrder: {
        soId: string
        productGroupId: string
        rate: number
        quantity: number
    }[]
    id: string
    firstApproved: boolean
    firstApprovedActionBy: string
    firstApprovedAt: string
    firstApprovedById: string
    secondApproved: boolean | null
    secondApprovedActionBy: string
    secondApprovedById: string | null
    secondApprovedAt: string
}

const EditRTVendorWrapper = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const [editSaleOrder, setEditSaleOrder] = useState<FormInitialValues>({
        rtvNo: '',
        vendorId: '',
        warehouseId: '',
        remark: '',
        productSalesOrder: [],
        companyId: '',
        id: '',
        firstApproved: false,
        firstApprovedActionBy: '',
        firstApprovedAt: '',
        firstApprovedById: '',
        secondApproved: false,
        secondApprovedActionBy: '',
        secondApprovedById: '',
        secondApprovedAt: '',
    })
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateReturnToVendor] = useUpdateReturnToVendorOrderMutation()

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetReturnToOrderByIdQuery(Id),
    })

    const { options: vendorOptions } = useCustomOptions({
        useEndPointHook: useGetVendorsQuery(''),
        keyName: 'companyName',
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
        warehouseOptions: warehouseOptions,
        productGroupOptions: productGroupOptions,
        vendorOptions: vendorOptions,
    }

    useEffect(() => {
        if (selectedItem?.length) {
            let product: FormInitialValues = {
                rtvNo: '',
                remark: '',
                vendorId: '',
                warehouseId: '',
                productSalesOrder: [],
                companyId: '',
                id: '',
                firstApproved: false,
                firstApprovedActionBy: '',
                firstApprovedAt: '',
                firstApprovedById: '',
                secondApproved: false,
                secondApprovedActionBy: '',
                secondApprovedById: '',
                secondApprovedAt: '',
            }

            selectedItem?.map((ele: any) => {
                product = {
                    ...product,
                    rtvNo: ele?.rtvNumber,
                    vendorId: ele?.vendorId,
                    warehouseId: ele?.warehouseId,
                    remark: ele?.remark,
                    companyId: ele?.companyId,
                    firstApproved: ele?.firstApproved,
                    firstApprovedActionBy: ele?.firstApprovedActionBy,
                    firstApprovedAt: ele?.firstApprovedAt,
                    firstApprovedById: ele?.firstApprovedById,
                    secondApproved: ele?.secondApproved,
                    secondApprovedActionBy: ele?.secondApprovedActionBy,
                    secondApprovedById: ele?.secondApprovedById,
                    secondApprovedAt: ele?.secondApprovedAt,
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
        rtvNo: editSaleOrder?.rtvNo || '',
        vendorId: editSaleOrder?.vendorId || '',
        warehouseId: editSaleOrder?.warehouseId || '',
        companyId: editSaleOrder?.companyId || '',
        remark: editSaleOrder?.remark,
        productSalesOrder: editSaleOrder.productSalesOrder,
        id: '',
        firstApproved: editSaleOrder.firstApproved,
        firstApprovedActionBy: editSaleOrder.firstApprovedActionBy,
        firstApprovedAt: editSaleOrder.firstApprovedAt,
        firstApprovedById: editSaleOrder.firstApprovedById,
        secondApproved: editSaleOrder.secondApproved,
        secondApprovedActionBy: editSaleOrder.secondApprovedActionBy,
        secondApprovedById: editSaleOrder.secondApprovedById,
        secondApprovedAt: editSaleOrder.secondApprovedAt,
    }

    // Form Validation Schema
    const validationSchema = object({
        rtvNo: string()
            .required('return to vendor number is required')
            .matches(
                // eslint-disable-next-line no-useless-escape
                /^[a-zA-Z]+[^\/\\]*$/,
                'Only alphabetical characters are allowed, except / and \\'
            ),
        remark: string(),
        vendorId: string().required('please select a vendor'),
        warehouseId: string().required('please select warehouse'),
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
            rtvNumber: values?.rtvNo || '',
            vendorId: values?.vendorId || '',
            warehouseId: values?.warehouseId || '',
            remark: values?.remark,
            companyId: values?.companyId || '',
            productSalesOrder: {},
            id: '',
            firstApproved: values.firstApproved,
            firstApprovedActionBy: values.firstApprovedActionBy,
            firstApprovedAt: values.firstApprovedAt,
            firstApprovedById: values.firstApprovedById,
            secondApproved: values.secondApproved,
            secondApprovedActionBy: values.secondApprovedActionBy,
            secondApprovedById: values.secondApprovedById,
            secondApprovedAt: values.secondApprovedAt,
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
            updateReturnToVendor({
                body: finalValues,
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/return-to-vendor')
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
                        <EditRTVendor
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

export default EditRTVendorWrapper
