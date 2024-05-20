// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { array, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetAllDealersQuery } from 'src/services/DealerServices'
import { useAddDealerToDealerOrderMutation } from 'src/services/DealerToDealerOrderService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { showToast } from 'src/utils'
import AddDealerToDealerOrder from './AddDealerToDealerOrder'

// |-- Redux--|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    dtdNumber: string
    fromDealerId: string
    toDealerId: string
    remark: string
    productDetails: {
        productGroupId: string
        rate: number | 0
        quantity: number | 0
    }[]
}

const AddDealerToDealerOrderWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addDealerToDealer] = useAddDealerToDealerOrderMutation()

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
    const { options: dealerOptions } = useCustomOptions({
        useEndPointHook: useGetAllDealersQuery(''),
        keyName: ['firstName', 'lastName'],
        value: '_id',
    })

    const dropdownOptions = {
        dealerOptions: dealerOptions,
        productGroupOptions: productGroupOptions,
    }

    // Form Initial Values
    const initialValues: FormInitialValues = {
        dtdNumber: '',
        fromDealerId: '',
        toDealerId: '',
        remark: '',
        productDetails: [
            {
                productGroupId: '',
                rate: 0,
                quantity: 0,
            },
        ],
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
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addDealerToDealer(values).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Order added successfully!')
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <AddDealerToDealerOrder
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

export default AddDealerToDealerOrderWrapper
