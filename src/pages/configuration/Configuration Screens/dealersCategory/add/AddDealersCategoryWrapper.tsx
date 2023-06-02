import React, { useState } from 'react'
import { Formik } from 'formik'
import { number, object, string } from 'yup'
import AddDealersCategory from './AddDealersCategory'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { useAddDealerCategoryMutation } from 'src/services/DealerCategoryService'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'

type Props = {}

export type FormInitialValues = {
    dealersCategory: string
    investAmount: number
    numberOfOrders: number
    deliveryPercentage: number
}

const AddDealersCategoryWrapper = (props: Props) => {
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState(false)

    const [addDealerscategory] = useAddDealerCategoryMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    // Form Initial Values
    const initialValues: FormInitialValues = {
        dealersCategory: '',
        investAmount: 0,
        numberOfOrders: 0,
        deliveryPercentage: 0,
    }

    // Form Validation Schema
    const validationSchema = object({
        dealersCategory: string().required('Required'),
        investAmount: number().required(' Required'),
        numberOfOrders: number().required('Required'),
        deliveryPercentage: number().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        addDealerscategory({
            dealersCategory: values.dealersCategory,
            investAmount: values.investAmount,
            numberOfOrders: values.numberOfOrders,
            deliveryPercentage: values.deliveryPercentage,
            companyId: userData?.companyId || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Added successfully!')
                    navigate('/configurations/dealers-category')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }

    return (
        <ConfigurationLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddDealersCategory
                            formikProps={formikProps}
                            apiStatus={apiStatus}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default AddDealersCategoryWrapper
