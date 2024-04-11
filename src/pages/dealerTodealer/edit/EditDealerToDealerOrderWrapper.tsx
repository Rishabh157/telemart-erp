// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { array, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import EditDealerToDealerOrder from './EditDealerToDealerOrder'
// import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetAllDealersQuery } from 'src/services/DealerServices'
import {
    useGetDealerToDealerOrderByIdQuery,
    useUpdateDealerToDealerOrderMutation,
} from 'src/services/DealerToDealerOrderService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { showToast } from 'src/utils'

// |-- Redux--|
import { setAllItems } from 'src/redux/slices/dealerSlice'
import { setAllItems as setAllProductGroups } from 'src/redux/slices/productGroupSlice'
import { AppDispatch, RootState } from 'src/redux/store'

import { setSelectedItem } from 'src/redux/slices/DealerToDealerOrderSlice'
//
// |-- Types --|
type Props = {}

export type FormInitialValues = {
    dtdNumber: string
    fromDealerId: string
    toDealerId: string
    remark: string
    productDetails: {
        dtdId: string
        productGroupId: string
        rate: number | 0
        quantity: number | 0
    }[]
}

const EditDealerToDealerOrderWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [editSaleOrder, setEditSaleOrder] = useState<FormInitialValues>({
        dtdNumber: '',
        fromDealerId: '',
        toDealerId: '',
        remark: '',
        productDetails: [],
    })
    const [updateDealerToDealer] = useUpdateDealerToDealerOrderMutation()
    const params = useParams()
    const Id = params.id
    const { data, isLoading, isFetching } = useGetDealerToDealerOrderByIdQuery(
        Id || ''
    )
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
    const { allItems }: any = useSelector((state: RootState) => state?.dealer)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.delaerToDealer
    )

    const {
        data: productGroupData,
        isLoading: productGroupIsLoading,
        isFetching: productGroupIsFetching,
    } = useGetAllProductGroupQuery(userData?.companyId)
    const { allItems: productGroupItems }: any = useSelector(
        (state: RootState) => state?.productGroup
    )

    const dealerOptions = allItems?.map((ele: any) => {
        return {
            label: ele.firstName + ' ' + ele.lastName,
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
        dispatch(setAllItems(dealerData?.data))
    }, [dealerData, dealerIsLoading, dealerIsFetching, dispatch])

    //ProductGroup
    useEffect(() => {
        dispatch(setAllProductGroups(productGroupData?.data))
    }, [
        productGroupData,
        productGroupIsLoading,
        productGroupIsFetching,
        dispatch,
    ])

    const dropdownOptions = {
        dealerOptions: dealerOptions,
        productGroupOptions: productGroupOptions,
    }

    useEffect(() => {
        if (selectedItem?.length) {
            let product: FormInitialValues = {
                dtdNumber: '',
                fromDealerId: '',
                toDealerId: '',
                remark: '',
                productDetails: [],
            }

            // eslint-disable-next-line array-callback-return
            selectedItem?.map((ele: any) => {
                product = {
                    ...product,
                    dtdNumber: ele?.dtdNumber,
                    fromDealerId: ele?.fromDealerId,
                    toDealerId: ele?.toDealerId,
                    remark: ele?.remark,
                    productDetails: [
                        ...product.productDetails,
                        {
                            dtdId: ele?._id,
                            productGroupId: ele?.productDetails?.productGroupId,
                            rate: ele?.productDetails?.rate,
                            quantity: ele?.productDetails?.quantity,
                        },
                    ],
                }
            })

            setEditSaleOrder(product)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItem])
    // Form Initial Values
    const initialValues: FormInitialValues = {
        dtdNumber: editSaleOrder.dtdNumber,
        fromDealerId: editSaleOrder.fromDealerId,
        toDealerId: editSaleOrder.toDealerId,
        remark: editSaleOrder.remark,
        productDetails: editSaleOrder.productDetails,
    }

    // Form Validation Schema
    const validationSchema = object({
        dtdNumber: string()
            .required('Dealer to Dealer number is required')
            .matches(/^[0-9]+$/, 'Only numeric characters are allowed'),
        fromDealerId: string().required('Please select a dealer'),
        toDealerId: string().required('Please select a dealer'),
        remark: string(),
        productDetails: array().of(
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
            dtdNumber: values.dtdNumber,
            fromDealerId: values.fromDealerId,
            toDealerId: values.toDealerId,
            remark: values.remark,
            productDetails: {},
            id: '',
        }

        const finalValues: any = []
        // eslint-disable-next-line array-callback-return
        values.productDetails.map((ele) => {
            finalValues.push({
                ...newValues,
                id: ele.dtdId ? ele.dtdId : '',
                productDetails: {
                    productGroupId: ele.productGroupId,
                    rate: ele.rate,
                    quantity: ele.quantity,
                },
            })
        })

        setApiStatus(true)
        setTimeout(() => {
            updateDealerToDealer({
                dtdData: finalValues,
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', ' Updated successfully!')
                        navigate('/dealer-to-dealer')
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
                        <EditDealerToDealerOrder
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

export default EditDealerToDealerOrderWrapper
