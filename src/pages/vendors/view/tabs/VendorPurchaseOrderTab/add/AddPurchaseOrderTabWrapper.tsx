// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { array, date, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import { useNavigate } from 'react-router-dom'
import { useGetAllItemsQuery } from 'src/services/ItemService'
import { useAddPurchaseOrderMutation } from 'src/services/PurchaseOrderService'
import { useGetVendorsQuery } from 'src/services/VendorServices'
import { showToast } from 'src/utils'
import AddPurchaseOrder from './AddPurchaseOrder'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetVendorWarehouseByVendorIdQuery } from 'src/services/VendorWarehouseService'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    poCode: string
    vendorId: string
    wareHouseId: string
    isEditable: boolean
    purchaseOrder: {
        itemId: string
        rate: number
        quantity: number
        estReceivingDate: string
    }[]
}

const AddPurchaseOrderTabWrapper = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const vendorId: any = params.vendorId

    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [addPurchaseOrder] = useAddPurchaseOrderMutation()

    const { options: itemOptions } = useCustomOptions({
        useEndPointHook: useGetAllItemsQuery(userData?.companyId),
        keyName: 'itemName',
        value: '_id',
    })
    const { options: warehouseOptions } = useCustomOptions({
        useEndPointHook: useGetVendorWarehouseByVendorIdQuery({
            companyId: userData?.companyId,
            vendorId: vendorId,
        }),
        keyName: 'wareHouseName',
        value: '_id',
    })
    const { options: vendorOptions } = useCustomOptions({
        useEndPointHook: useGetVendorsQuery(userData?.companyId),
        keyName: 'companyName',
        value: '_id',
    })

    //itemOption

    // Form Initial Values
    const initialValues: FormInitialValues = {
        poCode: '',
        vendorId: vendorId,
        wareHouseId: '',
        isEditable: true,
        purchaseOrder: [
            {
                itemId: '',
                rate: 0,
                quantity: 0,
                estReceivingDate: '',
            },
        ],
    }

    // Form Validation Schema
    const validationSchema = object({
        poCode: string().required('Purchase order code is required'),
        vendorId: string().required('Please select a vendor'),
        wareHouseId: string().required('Please select a warehouse'),
        purchaseOrder: array().of(
            object().shape({
                itemId: string().required('Please select a Item'),
                rate: number()
                    .min(1, 'Rate must be greater than 0')
                    .required('Please enter rate'),
                quantity: number()
                    .min(1, 'Quantity must be greater than 0')
                    .required('Please enter quantity'),
                estReceivingDate: date().required('Please select date'),
            })
        ),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        const purchaseOrder = values.purchaseOrder.map((ele: any) => {
            return {
                ...ele,
                estReceivingDate: moment(ele.estReceivingDate).format(
                    'YYYY/MM/D'
                ),
            }
        })

        setTimeout(() => {
            addPurchaseOrder({
                vendorId: values.vendorId,
                wareHouseId: values.wareHouseId,
                isEditable: values.isEditable,
                purchaseOrder: purchaseOrder,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'purchase-order added successfully!'
                        )
                        navigate(`/vendors/${vendorId}/purchase-order`)
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
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddPurchaseOrder
                        formikProps={formikProps}
                        vendorOptions={vendorOptions}
                        warehouseOptions={warehouseOptions}
                        itemOptions={itemOptions}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}
export default AddPurchaseOrderTabWrapper
