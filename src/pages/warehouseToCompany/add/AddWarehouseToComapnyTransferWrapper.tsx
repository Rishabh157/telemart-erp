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
import { useAddWarehouseToComapnyMutation } from 'src/services/WarehouseToComapnyService'
import { showToast } from 'src/utils'
import AddWarehouseToComapny from './AddWarehouseToComapnyTransfer'

// |-- Redux--|

import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetAllCompaniesQuery } from 'src/services/CompanyServices'

// |-- Types --|
type Props = {}
interface ProductSalesOrder {
    productGroupId: string
    rate: number
    quantity: number
}

export type FormInitialValues = {
    wtcNumber: string
    fromWarehouseId: string
    toWarehouseId: string
    productSalesOrder: ProductSalesOrder[]
    remark: string
    companyId: string
    toCompanyId: string
}

const AddWarehouseToComapnyTransferWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [AddWarehouseToComapnyApi] = useAddWarehouseToComapnyMutation()

    const { options } = useCustomOptions({
        useEndPointHook: useGetAllCompaniesQuery('', {
            skip: !userData?.companyId,
        }),
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

    const companyOption = options?.filter(
        (ele: any) => ele.value !== userData?.companyId
    )

    const dropdownOptions = {
        companyOption: companyOption,
        warehouseOptions: warehouseOptions,
        productGroupOptions: productGroupOptions,
    }

    // Form Initial Values
    const initialValues: FormInitialValues = {
        wtcNumber: '',
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
        toCompanyId: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        wtcNumber: string()
            .required('WTC order number is required')
            .matches(
                // eslint-disable-next-line no-useless-escape
                /^[a-zA-Z]+[^\/\\]*$/,
                'Only alphabetical characters are allowed, except / and \\'
            ),
        fromWarehouseId: string().required('Please select warehouse'),
        toCompanyId: string().required('Please select company'),
        toWarehouseId: string().required('Please select warehouse'),
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
            AddWarehouseToComapnyApi({
                wtcNumber: values.wtcNumber,
                fromWarehouseId: values.fromWarehouseId,
                toWarehouseId: values.toWarehouseId,
                productSalesOrder: values.productSalesOrder,
                remark: values.remark,
                toCompanyId: values.toCompanyId,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'request added successfully!')
                        navigate('/warehouse-to-company')
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
                        <AddWarehouseToComapny
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

export default AddWarehouseToComapnyTransferWrapper
