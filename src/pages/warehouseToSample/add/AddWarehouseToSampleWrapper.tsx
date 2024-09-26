// |-- Built-in Dependencies --|
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
import { useAddWarehouseToSampleMutation } from 'src/services/WarehouseToSampleService'
import { showToast } from 'src/utils'
import AddWarehouseTransfer from './AddWarehouseToSample'

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
    fromWarehouseId: string
    toName: string
    companyId: string
    remark: string
    productSalesOrder: ProductSalesOrder[]
}

const AddWarehouseToSampleWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [AddWarehouseToSample] = useAddWarehouseToSampleMutation()

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
        fromWarehouseId: '',
        toName: '',
        companyId: '',
        remark: '',
        productSalesOrder: [
            {
                productGroupId: '',
                rate: 0,
                quantity: 0,
            },
        ],
    }

    // Form Validation Schema
    const validationSchema = object({
        fromWarehouseId: string().required('please select a warehouse'),
        toName: string().required('please enter receiver name'),
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
            AddWarehouseToSample({
                fromWarehouseId: values.fromWarehouseId,
                toName: values.toName,
                companyId: userData?.companyId || '',
                remark: values.remark || '',
                productSalesOrder: values.productSalesOrder,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'request added successfully!')
                        navigate('/warehouse-to-sample')
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

export default AddWarehouseToSampleWrapper
