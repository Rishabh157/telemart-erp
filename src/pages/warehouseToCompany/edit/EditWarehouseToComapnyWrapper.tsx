/// ==============================================
// Filename:EditWarehouseToComapnyWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
// import { array, number, object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import EditWarehouseToComapny from './EditWarehouseToComapny'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { showToast } from 'src/utils'
import { useGetAllDealersQuery } from 'src/services/DealerServices'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import {
    useGetWarehouseToComapnyByIdQuery,
    useUpdateWarehouseToComapnyMutation,
} from 'src/services/WarehouseToComapnyService'

// |-- Redux --|
import { setAllItems } from 'src/redux/slices/dealerSlice'
import { setAllItems as setAllWareHouse } from 'src/redux/slices/warehouseSlice'
import { setAllItems as setAllProductGroups } from 'src/redux/slices/productGroupSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedItem } from 'src/redux/slices/WarehouseToComapnySlice'
import { useGetAllCompaniesQuery } from 'src/services/CompanyServices'
import { setItems as setAllCompany } from 'src/redux/slices/companySlice'

// |-- Types --|
type Props = {}

// interface ProductSalesOrder {
//     productGroupId: string
//     rate: number
//     quantity: number
//     _id: string
//     groupName: string
// }

// interface ProductSalesOrderListResponseType {
//     _id: string
//     soNumber: string
//     dealerId: string
//     dealerWareHouseId: string
//     companyWareHouseId: string
//     dhApprovedById: string | null
//     dhApproved: ''
//     dhApprovedActionBy: string
//     dhApprovedAt: string
//     accApprovedById: string | null
//     accApproved: boolean | null
//     accApprovedActionBy: string
//     accApprovedAt: string
//     productSalesOrder: ProductSalesOrder
//     status: string
//     companyId: string
//     isDeleted: boolean
//     isActive: boolean
//     __v: number
//     createdAt: string
//     updatedAt: string
//     dealerLabel: string
//     companyWarehouseLabel: string
//     warehouseLabel: string
// }

interface ProductSalesOrder {
    productGroupId: string
    rate: number
    quantity: number
    wtNo: string
}

export type FormInitialValues = {
    id: string
    wtcNumber: string
    toCompanyId: string
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

const EditWarehouseToComapnyWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const [editWarehouseToComapny, setEditWarehouseToComapny] =
        useState<FormInitialValues>({
            wtcNumber: '',
            toCompanyId: '',
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
    const [updateWarehouseToComapny] = useUpdateWarehouseToComapnyMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.warehouseToComapny
    )

    const { data, isLoading, isFetching } =
        useGetWarehouseToComapnyByIdQuery(Id)
    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedItem(data?.data))
        }
    }, [dispatch, data, isLoading, isFetching])

    const {
        data: dealerData,
        isLoading: dealerIsLoading,
        isFetching: dealerIsFetching,
    } = useGetAllDealersQuery(userData?.companyId)
    // const { allItems }: any = useSelector((state: RootState) => state?.dealer)

    const {
        data: warehouseData,
        isLoading: warehouseIsLoading,
        isFetching: warehouseIsFetching,
    } = useGetWareHousesQuery(userData?.companyId)
    const { allItems: warehouseItems }: any = useSelector(
        (state: RootState) => state?.warehouse
    )

    const {
        data: productGroupData,
        isLoading: productGroupIsLoading,
        isFetching: productGroupIsFetching,
    } = useGetAllProductGroupQuery(userData?.companyId)
    const { allItems: productGroupItems }: any = useSelector(
        (state: RootState) => state?.productGroup
    )
    // const dealerOptions = allItems?.map((ele: any) => {
    //     return {
    //         label: ele.firstName + ' ' + ele.lastName,
    //         value: ele._id,
    //     }
    // })

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

    //Dealer
    useEffect(() => {
        if (!dealerIsLoading && !dealerIsFetching) {
            dispatch(setAllItems(dealerData?.data))
        }
    }, [dealerData, dealerIsLoading, dealerIsFetching, dispatch])

    //Warehouse
    useEffect(() => {
        if (!warehouseIsLoading && !warehouseIsFetching) {
            dispatch(setAllWareHouse(warehouseData?.data))
        }
    }, [warehouseData, warehouseIsLoading, warehouseIsFetching, dispatch])

    //ProductGroup
    useEffect(() => {
        if (!productGroupIsLoading && !productGroupIsFetching) {
            // dispatch(setAllWareHouse(warehouseData?.data))
            dispatch(setAllProductGroups(productGroupData?.data))
        }
    }, [
        productGroupData,
        productGroupIsLoading,
        productGroupIsFetching,
        dispatch,
    ])
    const { items: companyAllItems }: any = useSelector(
        (state: RootState) => state?.company
    )
    const companyOption = companyAllItems
        ?.filter((ele: any) => ele._id !== userData?.companyId)
        ?.map((ele: any) => {
            return {
                label: ele.companyName,
                value: ele._id,
            }
        })

    const dropdownOptions = {
        companyOption: companyOption,
        warehouseOptions: warehouseOptions,
        productGroupOptions: productGroupOptions,
    }

    const {
        data: companyData,
        isFetching: isComapnyFetching,
        isLoading: isCompanyLoading,
    } = useGetAllCompaniesQuery('')
    useEffect(() => {
        if (!isComapnyFetching && !isCompanyLoading) {
            dispatch(setAllCompany(companyData?.data))
        }

        // eslint-disable-next-line
    }, [companyData, isComapnyFetching, isCompanyLoading])
    useEffect(() => {
        if (selectedItem?.length) {
            let product: FormInitialValues = {
                wtcNumber: '',
                toCompanyId: '',
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
                    toCompanyId: ele?.toCompanyId,
                    wtcNumber: ele?.wtcNumber,
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
            setEditWarehouseToComapny(product)
        }
    }, [selectedItem])

    // Form Initial Values
    const initialValues: FormInitialValues = {
        // soNumber: editWarehouseToComapny?.soNumber || '',
        // dealerId: editWarehouseToComapny?.dealerId || '',
        // dealerWareHouseId: editWarehouseToComapny?.dealerWareHouseId || '',
        // companyWareHouseId: editWarehouseToComapny?.companyWareHouseId || '',
        // companyId: editWarehouseToComapny?.companyId || '',
        // productSalesOrder: editWarehouseToComapny.productSalesOrder,
        // id: '',
        // dhApproved: editWarehouseToComapny.dhApproved,
        // dhApprovedActionBy: editWarehouseToComapny.dhApprovedActionBy,
        // dhApprovedAt: editWarehouseToComapny.dhApprovedAt,
        // accApproved: editWarehouseToComapny.accApproved,
        // accApprovedActionBy: editWarehouseToComapny.accApprovedActionBy,
        // accApprovedAt: editWarehouseToComapny.accApprovedAt,
        // dhApprovedById: editWarehouseToComapny.dhApprovedById,
        // accApprovedById: editWarehouseToComapny.accApprovedById,
        toCompanyId: editWarehouseToComapny.toCompanyId,
        wtcNumber: editWarehouseToComapny.wtcNumber,
        fromWarehouseId: editWarehouseToComapny.fromWarehouseId,
        toWarehouseId: editWarehouseToComapny.toWarehouseId,
        firstApproved: editWarehouseToComapny.firstApproved,
        firstApprovedActionBy: editWarehouseToComapny.firstApprovedActionBy,
        firstApprovedAt: editWarehouseToComapny.firstApprovedAt,
        secondApproved: editWarehouseToComapny.secondApproved,
        secondApprovedActionBy: editWarehouseToComapny.secondApprovedActionBy,
        secondApprovedAt: editWarehouseToComapny.secondApprovedAt,
        firstApprovedById: editWarehouseToComapny.firstApprovedById,
        secondApprovedById: editWarehouseToComapny.secondApprovedById,
        productSalesOrder: editWarehouseToComapny.productSalesOrder,
        remark: editWarehouseToComapny.remark,
        status: editWarehouseToComapny.status,
        companyId: editWarehouseToComapny.companyId,
        id: editWarehouseToComapny.id,
    }

    // // Form Validation Schema
    // const validationSchema = object({
    //     soNumber: string().required('Sale order number is required'),
    //     dealerId: string().required('Please select a dealer'),
    //     dealerWareHouseId: string().required(
    //         'Please select a  Dealer Warehouse'
    //     ),
    //     companyWareHouseId: string().required('Please select a warehouse'),
    //     productSalesOrder: array().of(
    //         object().shape({
    //             productGroupId: string().required(
    //                 'Please select a product name'
    //             ),
    //             rate: number()
    //                 .min(1, 'Rate must be greater than 0')
    //                 .required('Please enter rate'),
    //             quantity: number()
    //                 .min(1, 'Quantity must be greater than 0')
    //                 .required('Please enter quantity'),
    //         })
    //     ),
    // })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        let newValues = {
            wtcNumber: values.wtcNumber,
            toCompanyId: values.toCompanyId,
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
            updateWarehouseToComapny({
                body: finalValues,
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', ' Updated successfully!')
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
                enableReinitialize
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <EditWarehouseToComapny
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

export default EditWarehouseToComapnyWrapper
