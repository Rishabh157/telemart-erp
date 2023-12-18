/// ==============================================
// Filename:AddRTVendorWrapper.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { array, number, object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import AddRTVendor from './AddRTVendor'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { showToast } from 'src/utils'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { useAddReturnToVendorMutation } from 'src/services/ReturnToVendorService'

// |-- Redux--|
import { setAllItems as setAllWareHouse } from 'src/redux/slices/warehouseSlice'
import { setAllItems as setAllProductGroups } from 'src/redux/slices/productGroupSlice'
import { setAllItems as setAllVendor } from 'src/redux/slices/vendorSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
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

    // all warehouse query
    const {
        data: warehouseData,
        isLoading: warehouseIsLoading,
        isFetching: warehouseIsFetching,
    } = useGetWareHousesQuery(userData?.companyId)
    const { allItems: warehouseItems }: any = useSelector(
        (state: RootState) => state?.warehouse
    )
    // all vendor query
    const { allItems: allVendor }: any = useSelector(
        (state: RootState) => state.vendor
    )

    const {
        data: vendorData,
        isLoading: vendorIsLoading,
        isFetching: VendorIsFetching,
    } = useGetVendorsQuery(userData?.companyId)

    //vendor
    useEffect(() => {
        if (!vendorIsLoading && !VendorIsFetching) {
            dispatch(setAllVendor(vendorData?.data))
        }
    }, [vendorData, vendorIsLoading, VendorIsFetching, dispatch])

    const {
        data: productGroupData,
        isLoading: productGroupIsLoading,
        isFetching: productGroupIsFetching,
    } = useGetAllProductGroupQuery(userData?.companyId)
    const { allItems: productGroupItems }: any = useSelector(
        (state: RootState) => state?.productGroup
    )

    const warehouseOptions = warehouseItems?.map((ele: any) => {
        return {
            label: ele.wareHouseName,
            value: ele._id,
        }
    })

    const productGroupOptions = productGroupItems?.map((ele: any) => {
        return {
            label: ele.groupName,
            value: ele._id,
        }
    })

    const productPriceOptions: any = productGroupItems?.map((ele: any) => {
        return {
            key: ele._id,
            value: ele.dealerSalePrice,
        }
    })

    const vendorOptions = allVendor?.map((ele: any) => {
        return {
            label: ele?.companyName,
            value: ele?._id,
        }
    })

    const dropdownOptions = {
        warehouseOptions: warehouseOptions,
        productGroupOptions: productGroupOptions,
        vendorOptions: vendorOptions,
    }

    //Warehouse
    useEffect(() => {
        dispatch(setAllWareHouse(warehouseData?.data))
    }, [warehouseData, warehouseIsLoading, warehouseIsFetching, dispatch])

    //ProductGroup
    useEffect(() => {
        dispatch(setAllProductGroups(productGroupData?.data))
    }, [
        productGroupData,
        productGroupIsLoading,
        productGroupIsFetching,
        dispatch,
    ])

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
        rtvNo: string().required('return to vendor number is required').matches(/^[a-zA-Z]+[^\/\\]*$/, 'Only alphabetical characters are allowed, except / and \\'),
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
