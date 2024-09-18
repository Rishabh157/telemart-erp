// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { array, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetAllItemsQuery } from 'src/services/ItemService'
import { useAddPurchaseOrderMutation } from 'src/services/PurchaseOrderService'
import { useGetVendorsQuery } from 'src/services/VendorServices'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { showToast } from 'src/utils'
import AddPurchaseOrder from './AddPurchaseOrder'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    vendorId: string
    wareHouseId: string
    isEditable: boolean
    purchaseOrder: {
        itemId: string
        rate: number
        quantity: number
        estReceivingDate: string | null
    }[]
}

const AddPurchaseOrderWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [addPurchaseOrder] = useAddPurchaseOrderMutation()

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
        keyName: ['companyName', 'vendorCode'],
        value: '_id',
    })
    
    console.log('vendorOptions: ', vendorOptions)

    // Form Initial Values
    const initialValues: FormInitialValues = {
        vendorId: '',
        wareHouseId: '',
        isEditable: true,
        purchaseOrder: [
            {
                itemId: '',
                rate: 0,
                quantity: 0,
                estReceivingDate: null,
            },
        ],
    }

    // Form Validation Schema
    const validationSchema = object({
        // eslint-disable-next-line no-useless-escape
        vendorId: string().required('Please select a vendor'),
        wareHouseId: string().required('Please select a warehouse'),
        purchaseOrder: array().of(
            object().shape({
                itemId: string().required('Please select a Item'),
                rate: number().min(0, 'Rate must be greater then or rqual to 0'),
                quantity: number()
                    .min(1, 'Quantity must be greater than 0')
                    .required('Please enter quantity'),
                estReceivingDate: string().nullable().notRequired(),
                // .typeError('Invalid Date')
                // .required('Please select date'),
            })
        ),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        const purchaseOrder = values?.purchaseOrder?.map((ele: any) => {
            return {
                ...ele,
                quantity: parseInt(ele?.quantity),
                estReceivingDate: ele?.estReceivingDate ? moment(
                    ele?.estReceivingDate,
                    'YYYY/MM/DD'
                ).format('YYYY/MM/DD') : null,
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
        </SideNavLayout>
    )
}

export default AddPurchaseOrderWrapper
