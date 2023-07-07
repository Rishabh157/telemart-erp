/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:ViewPurchaseOrderWrapper.tsx
// Type: View Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { array, date, number, object, string } from 'yup'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ViewPurchaseOrder from './ViewPurchaseOrder'
import { useGetPurchaseOrderByIdQuery } from 'src/services/PurchaseOrderService'

// |-- Redux --|
import { setSelectedItems } from 'src/redux/slices/PurchaseOrderSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
    // setFilterValue,
} from 'src/redux/slices/GRNSlice'
import { useGetPaginationGRNQuery } from 'src/services/GRNService'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    poCode: string
    vendor: string
    wareHouse: string
    purchaseOrder: {
        itemId: string
        itemName: string
        rate: number
        quantity: number
        estReceivingDate: string
    }
    approval: {
        approvalByName: string
        approvalLevel: number
        time: string
    }[]
}

const ViewPurchaseOrderWrapper = (props: Props) => {
    // Form Initial Values
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const Id = params.id
    const { data, isLoading, isFetching } = useGetPurchaseOrderByIdQuery(Id)
    const { selectedItems }: any = useSelector(
        (state: RootState) => state?.purchaseOrder
    )
    const { userData }: any = useSelector((state: RootState) => state.auth)
    const grnState: any = useSelector((state: RootState) => state.grn)
    const { page, rowsPerPage, searchValue, items } = grnState
    useEffect(() => {
        dispatch(setSelectedItems(data?.data))
    }, [data, isLoading, isFetching, dispatch])

    const initialValues: FormInitialValues = {
        poCode: selectedItems?.poCode || '',
        vendor: selectedItems?.vendorLabel || '',
        wareHouse: selectedItems?.warehouseLabel || '',
        purchaseOrder: selectedItems?.purchaseOrder || '',
        approval: selectedItems?.approval || [],
    }
    const {
        data: GRNData,
        isLoading: GRNIsLoading,
        isFetching: GRNIsFetching,
    } = useGetPaginationGRNQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['itemName'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
            },
            {
                fieldName: 'poCode',
                value: selectedItems?.poCode,
            },
            
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: false,
    })

    useEffect(() => {
        if (!GRNIsLoading && !GRNIsFetching) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(GRNData?.data || []))
            dispatch(setTotalItems(GRNData?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [GRNIsLoading, GRNIsFetching, GRNData, dispatch])
    // Form Validation Schema
    const validationSchema = object({
        poCode: string().required('Purchase order code is required'),
        vendor: string().required('Please select a vendor'),
        wareHouse: string().required('Please select a warehouse'),
        purchaseOrder: array().of(
            object().shape({
                itemId: string().required('required'),
                itemName: string().required('required'),

                rate: number()
                    .min(0, 'Rate must be greater than 0')
                    .required('Please enter rate'),
                quantity: number()
                    .min(0, 'Quantity must be greater than 0')
                    .required('Please enter quantity'),
                estReceivingDate: date().required('Please select date'),
            })
        ),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {}

    return (
        <SideNavLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <ViewPurchaseOrder
                            formikProps={formikProps}
                            items={items}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}
export default ViewPurchaseOrderWrapper
