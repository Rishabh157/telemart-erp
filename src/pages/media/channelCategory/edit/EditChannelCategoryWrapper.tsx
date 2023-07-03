/// ==============================================
// Filename:EditChannelCategoryWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect  }  from 'react'


// |-- External Dependencies --|
import { useSelector, useDispatch } from 'react-redux'
import { Formik, FormikProps } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import MediaLayout from '../../MediaLayout'
import { showToast } from 'src/utils'
import EditChannelGroup from './EditChannelCategory'
import {
    useGetChannelCategoryByIdQuery,
    useUpdateChannelCategoryMutation,
} from 'src/services/media/ChannelCategoriesServices'


// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedItem } from 'src/redux/slices/media/channelCategorySlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
export type FormInitialValues = {
    channelCategory: string
    companyId: string
}

const EditChannelCategoryWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    //alert(id)
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateChannelCategory] = useUpdateChannelCategoryMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.channelCategory
    )

    const { data, isLoading, isFetching } = useGetChannelCategoryByIdQuery(id)

    //Channel category
    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [dispatch, data, isLoading, isFetching])

    // Form Validation Schema
    const validationSchema = object({
        channelCategory: string().required('Group Name is required'),
    })

    //console.log(selectedItem?.channelCategory)

    const initialValues: FormInitialValues = {
        channelCategory: selectedItem?.channelCategory || '',
        companyId: selectedItem?.companyId || userData?.companyId || '',
    }

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            updateChannelCategory({
                body: {
                    channelCategory: values.channelCategory,
                    companyId: values.companyId || '',
                },
                id: id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'Channel Category Name Updated successfully!'
                        )
                        navigate('/media/channel-category')
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
        <MediaLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <EditChannelGroup
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </MediaLayout>
    )
}

export default EditChannelCategoryWrapper
