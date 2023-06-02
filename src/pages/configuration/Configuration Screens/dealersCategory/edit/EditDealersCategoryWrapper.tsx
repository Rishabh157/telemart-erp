import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { number, object, string } from 'yup'
import EditDealersCategory from './EditDealersCategory'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
// import { useAddDealerCategoryMutation } from "src/services/DealerCategoryService";
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import {
    useGetDealerCategoryByIdQuery,
    useUpdateDealerCategoryMutation,
} from 'src/services/DealerCategoryService'
import { setSelectedItem } from 'src/redux/slices/dealersCategorySlice'

type Props = {}

export type FormInitialValues = {
    dealersCategory: string
    investAmount: number
    numberOfOrders: number
    deliveryPercentage: number
}

const EditDealersCategoryWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState(false)
    const { data, isLoading, isFetching } = useGetDealerCategoryByIdQuery(Id)
    const [editDealerscategory] = useUpdateDealerCategoryMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.dealersCategory
    )

    // Form Initial Values
    const initialValues: FormInitialValues = {
        dealersCategory: selectedItem?.dealersCategory || '',
        investAmount: selectedItem?.investAmount || '',
        numberOfOrders: selectedItem?.numberOfOrders || '',
        deliveryPercentage: selectedItem?.deliveryPercentage || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        dealersCategory: string().required('Required'),
        investAmount: number().required('Required'),
        numberOfOrders: number().required('Required'),
        deliveryPercentage: number().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        editDealerscategory({
            body: {
                dealersCategory: values.dealersCategory,
                investAmount: values.investAmount,
                numberOfOrders: values.numberOfOrders,
                deliveryPercentage: values.deliveryPercentage,
                companyId: userData?.companyId || '',
            },
            id: Id || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Updated successfully!')
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

    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [dispatch, data, isLoading, isFetching])
    return (
        <ConfigurationLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditDealersCategory
                            formikProps={formikProps}
                            apiStatus={apiStatus}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default EditDealersCategoryWrapper
