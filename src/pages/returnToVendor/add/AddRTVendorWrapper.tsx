/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { useAddReturnToVendorMutation } from 'src/services/ReturnToVendorService'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { showToast } from 'src/utils'
import AddRTVendor from './AddRTVendor'

// |-- Redux--|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetVendorsQuery } from 'src/services/VendorServices'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    rtvNo: string
    vendorId: string
    remark: string
    warehouseId: string
    companyId: string
    productSalesOrder: {
        productGroupId: string
        rate: number | 0
        quantity: number | 0
    }[]
}

const AddRTVendorWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData }: any = useSelector((state: RootState) => state?.auth)
    const [addReturnToVendor] = useAddReturnToVendorMutation()
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

    // Form Initial Values
    const initialValues: FormInitialValues = {
        rtvNo: '',
        vendorId: '',
        warehouseId: '',
        remark: '',
        companyId: '',
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
        // eslint-disable-next-line no-useless-escape
        rtvNo: string()
            .required('return to vendor number is required')
            .matches(
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
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addReturnToVendor({
                rtvNumber: values?.rtvNo,
                remark: values?.remark,
                vendorId: values?.vendorId,
                warehouseId: values?.warehouseId,
                productSalesOrder: values?.productSalesOrder,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'Return To Vendor Added Successfully!'
                        )
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <AddRTVendor
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

export default AddRTVendorWrapper
