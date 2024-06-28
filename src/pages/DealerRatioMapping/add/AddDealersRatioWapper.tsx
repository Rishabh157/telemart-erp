// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { Formik, FormikProps } from 'formik'

// |-- Internal Dependencies --|
import AddDealersRatio from './AddDealersRatio'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
export type FormInitialValues = {
    priority: string
    ratio: string
    dealerName: string
    companyId: string
}

type Props = {
    id: string
    setIsOpenDialog: any
}

const AddDealersRatioWapper = ({ id, setIsOpenDialog }: Props) => {
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    // const [AddChannelcategory] = useAddChannelCategoryMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        priority: '',
        ratio: '',
        dealerName: '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    // const validationSchema = object({
    //     channelCategory: string().required('Group Name is required'),
    // })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            // AddChannelcategory({
            //     channelCategory: values.channelCategory,
            //     companyId: values.companyId || '',
            // }).then((res: any) => {
            //     if ('data' in res) {
            //         if (res?.data?.status) {
            //             showToast(
            //                 'success',
            //                 'Channel Category name added successfully!'
            //             )
            //             navigate('/media/channel-category')
            //         } else {
            //             showToast('error', res?.data?.message)
            //         }
            //     } else {
            //         showToast('error', 'Something went wrong')
            //     }
            //     setApiStatus(false)
            // })
        }, 1000)
    }
    return (
        <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <AddDealersRatio
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddDealersRatioWapper
