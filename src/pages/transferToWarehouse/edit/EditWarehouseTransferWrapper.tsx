// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { array, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import {
    useGetWarehouseTransferByIdQuery,
    useUpdateWarehouseTransferMutation,
} from 'src/services/WarehouseTransferService'
import { showToast } from 'src/utils'
import EditWarehouseTransfer from './EditWarehouseTransfer'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

// |-- Types --|
type Props = {}

interface ProductSalesOrder {
    productGroupId: string
    rate: number
    quantity: number
    wtNo: string
}

export type FormInitialValues = {
    id: string
    wtNumber: string
    fromWarehouseId: string
    toWarehouseId: string
    firstApproved: boolean | null
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApproved: boolean | null
    secondApprovedActionBy: string
    secondApprovedAt: string
    firstApprovedById: string | null
    secondApprovedById: string | null
    productSalesOrder: ProductSalesOrder[]
    remark: string
    status: string
    companyId: string
}

const EditWarehouseTransferWrapper = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const [editWarehouseTransfer, setEditWarehouseTransfer] =
        useState<FormInitialValues>({
            wtNumber: '',
            fromWarehouseId: '',
            toWarehouseId: '',
            firstApproved: null,
            firstApprovedActionBy: '',
            firstApprovedAt: '',
            secondApproved: null,
            secondApprovedActionBy: '',
            secondApprovedAt: '',
            firstApprovedById: '',
            secondApprovedById: '',
            productSalesOrder: [],
            remark: '',
            status: '',
            id: '',
            companyId: '',
        })
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateWarehouseTransfer] = useUpdateWarehouseTransferMutation()

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetWarehouseTransferByIdQuery(Id),
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
    }
    useEffect(() => {
        if (selectedItem?.length) {
            let product: FormInitialValues = {
                wtNumber: '',
                fromWarehouseId: '',
                toWarehouseId: '',
                firstApproved: null,
                firstApprovedActionBy: '',
                firstApprovedAt: '',
                secondApproved: null,
                secondApprovedActionBy: '',
                secondApprovedAt: '',
                firstApprovedById: '',
                secondApprovedById: '',
                productSalesOrder: [],
                remark: '',
                status: '',
                companyId: '',
                id: '',
            }

            selectedItem?.map((ele: any) => {
                return (product = {
                    ...product,
                    wtNumber: ele?.wtNumber,
                    fromWarehouseId: ele?.fromWarehouseId,
                    toWarehouseId: ele?.toWarehouseId,
                    firstApproved: ele?.firstApproved,
                    firstApprovedActionBy: ele?.firstApprovedActionBy,
                    firstApprovedAt: ele?.firstApprovedAt,
                    secondApproved: ele?.secondApproved,
                    secondApprovedActionBy: ele?.secondApprovedActionBy,
                    secondApprovedAt: ele?.secondApprovedAt,
                    firstApprovedById: ele?.firstApprovedById,
                    secondApprovedById: ele?.secondApprovedById,
                    remark: ele?.remark,
                    status: ele?.status,
                    companyId: ele?.companyId,
                    id: '',
                    productSalesOrder: [
                        ...product.productSalesOrder,
                        {
                            wtNo: ele?._id,
                            productGroupId:
                                ele?.productSalesOrder?.productGroupId,
                            rate: ele?.productSalesOrder?.rate,
                            quantity: ele?.productSalesOrder?.quantity,
                        },
                    ],
                })
            })
            setEditWarehouseTransfer(product)
        }
    }, [selectedItem])

    // Form Initial Values
    const initialValues: FormInitialValues = {
        wtNumber: editWarehouseTransfer.wtNumber,
        fromWarehouseId: editWarehouseTransfer.fromWarehouseId,
        toWarehouseId: editWarehouseTransfer.toWarehouseId,
        firstApproved: editWarehouseTransfer.firstApproved,
        firstApprovedActionBy: editWarehouseTransfer.firstApprovedActionBy,
        firstApprovedAt: editWarehouseTransfer.firstApprovedAt,
        secondApproved: editWarehouseTransfer.secondApproved,
        secondApprovedActionBy: editWarehouseTransfer.secondApprovedActionBy,
        secondApprovedAt: editWarehouseTransfer.secondApprovedAt,
        firstApprovedById: editWarehouseTransfer.firstApprovedById,
        secondApprovedById: editWarehouseTransfer.secondApprovedById,
        productSalesOrder: editWarehouseTransfer.productSalesOrder,
        remark: editWarehouseTransfer.remark,
        status: editWarehouseTransfer.status,
        companyId: editWarehouseTransfer.companyId,
        id: editWarehouseTransfer.id,
    }

    // Form Validation Schema
    const validationSchema = object({
        fromWarehouseId: string().required('please select warehouse'),
        toWarehouseId: string().required('please select warehouse'),
        remark: string(),
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
            wtNumber: values.wtNumber,
            fromWarehouseId: values.fromWarehouseId,
            toWarehouseId: values.toWarehouseId,
            firstApproved: values.firstApproved,
            firstApprovedActionBy: values.firstApprovedActionBy,
            firstApprovedAt: values.firstApprovedAt,
            secondApproved: values.secondApproved,
            secondApprovedActionBy: values.secondApprovedActionBy,
            secondApprovedAt: values.secondApprovedAt,
            firstApprovedById: values.firstApprovedById,
            secondApprovedById: values.secondApprovedById,
            remark: values.remark,
            // status: values.status,
            companyId: values.companyId,
            id: '',
        }

        const finalValues: any = []
        values?.productSalesOrder?.map((ele) => {
            return finalValues.push({
                ...newValues,
                id: ele.wtNo ? ele.wtNo : '',
                productSalesOrder: {
                    productGroupId: ele.productGroupId,
                    rate: ele.rate,
                    quantity: ele.quantity,
                },
            })
        })

        setApiStatus(true)
        setTimeout(() => {
            updateWarehouseTransfer({
                body: finalValues,
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', ' Updated successfully!')
                        navigate('/warehouse-transfer')
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
                        <EditWarehouseTransfer
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

export default EditWarehouseTransferWrapper
