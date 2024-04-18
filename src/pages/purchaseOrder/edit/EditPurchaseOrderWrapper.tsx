// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { date, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetAllItemsQuery } from 'src/services/ItemService'
import {
    useGetByIdPurchaseOrderQuery,
    useUpdatePurchaseOrderMutation,
} from 'src/services/PurchaseOrderService'
import { useGetVendorsQuery } from 'src/services/VendorServices'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { showToast } from 'src/utils'
import EditPurchaseOrder from './EditPurchaseOrder'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    vendorId: string
    wareHouseId: string
    isEditable: boolean
    purchaseOrder: {
        id: string
        itemId: string
        rate: number
        quantity: number
        estReceivingDate: string
    }
}

const EditPurchaseOrderWrapper = (props: Props) => {
    const params = useParams()
    const Id = params.id

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [UpdatePurchaseOrder] = useUpdatePurchaseOrderMutation()

    const { items: selectedItems } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetByIdPurchaseOrderQuery(Id),
    })

    const initialValues: FormInitialValues = {
        vendorId: selectedItems?.vendorId || '',
        wareHouseId: selectedItems?.wareHouseId || '',
        isEditable: selectedItems?.isEditable || true,
        purchaseOrder:
            {
                id: selectedItems?.purchaseOrder?._id,
                itemId: selectedItems?.purchaseOrder?.itemId,
                rate: selectedItems?.purchaseOrder?.rate,
                quantity: selectedItems?.purchaseOrder?.quantity,
                estReceivingDate:
                    selectedItems?.purchaseOrder?.estReceivingDate,
            } || {},
    }
    const { options: itemOptions } = useCustomOptions({
        useEndPointHook: useGetAllItemsQuery(userData?.companyId),
        keyName: 'itemName',
        value: '_id',
    })
    const { options: warehouseOptions } = useCustomOptions({
        useEndPointHook: useGetWareHousesQuery(userData?.companyId),
        keyName: 'wareHouseName',
        value: '_id',
    })
    const { options: vendorOptions } = useCustomOptions({
        useEndPointHook: useGetVendorsQuery(userData?.companyId),
        keyName: 'companyName',
        value: '_id',
    })

    // Form Validation Schema
    const validationSchema = object({
        // eslint-disable-next-line no-useless-escape
        vendorId: string().required('Please select a vendor'),
        wareHouseId: string().required('Please select a warehouse'),
        purchaseOrder: object({
            id: string(),
            itemId: string().required('Please select a Item'),
            rate: number()
                .min(0, 'Rate must be greater than 0')
                .required('Please enter rate'),
            quantity: number()
                .min(0, 'Quantity must be greater than 0')
                .required('Please enter quantity'),
            estReceivingDate: date().required('Please select date'),
        }),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        let iid = values?.purchaseOrder?.id

        const purchaseOrder: any = {
            id: iid,
            itemId: values?.purchaseOrder?.itemId,
            rate: values?.purchaseOrder?.rate,
            quantity: values?.purchaseOrder?.quantity,
            estReceivingDate: moment(
                values?.purchaseOrder?.estReceivingDate
            ).format('YYYY/MM/D'),
        }

        setTimeout(() => {
            UpdatePurchaseOrder({
                body: {
                    vendorId: values?.vendorId,
                    wareHouseId: values?.wareHouseId,
                    isEditable: values?.isEditable,
                    purchaseOrder: purchaseOrder,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'purchase-order updated successfully!'
                        )
                        navigate('/purchase-order')
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
                {(formikProps) => {
                    return (
                        <EditPurchaseOrder
                            formikProps={formikProps}
                            vendorOptions={vendorOptions}
                            warehouseOptions={warehouseOptions}
                            itemOptions={itemOptions}
                            apiStatus={apiStatus}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default EditPurchaseOrderWrapper
