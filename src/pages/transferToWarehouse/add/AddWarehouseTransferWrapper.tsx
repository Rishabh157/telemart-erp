import { useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { array, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { useAddWarehouseTransferMutation } from 'src/services/WarehouseTransferService'
import { showToast } from 'src/utils'
import AddWarehouseTransfer from './AddWarehouseTransfer'

// |-- Redux--|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}
interface ProductSalesOrder {
    productGroupId: string
    rate: number
    quantity: number
}

export type FormInitialValues = {
    wtNumber: string
    fromWarehouseId: string
    toWarehouseId: string
    productSalesOrder: ProductSalesOrder[]
    remark: string
    companyId: string
}

const AddWarehouseTransferWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [AddWarehouseTransferApi] = useAddWarehouseTransferMutation()

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

    // Form Initial Values
    const initialValues: FormInitialValues = {
        wtNumber: '',
        fromWarehouseId: '',
        toWarehouseId: '',
        productSalesOrder: [
            {
                productGroupId: '',
                rate: 0,
                quantity: 0,
            },
        ],
        remark: '',
        companyId: '',
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
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            AddWarehouseTransferApi({
                fromWarehouseId: values.fromWarehouseId,
                toWarehouseId: values.toWarehouseId,
                productSalesOrder: values.productSalesOrder,
                remark: values.remark,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'request added successfully!')
                        navigate('/warehouse-transfer')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', res?.error?.data?.message)
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
                        <AddWarehouseTransfer
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

export default AddWarehouseTransferWrapper
