import React, { useState } from 'react'
import { Formik } from 'formik'
import { number, object, string } from 'yup'
import AddCartonBox from './AddCartonBox'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { useAddCartonBoxMutation } from 'src/services/CartonBoxService'
import { showToast } from 'src/utils'
import { RootState } from 'src/redux/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

type Props = {}

export type FormInitialValues = {
    boxName: string
    innerItemsCount: number
    boxWeight: number
    dimensions: {
        height: number
        width: number
        depth: number
    }
}

const AddCartonBoxWrapper = (props: Props) => {
    const navigate = useNavigate()
    const [addCartonBox] = useAddCartonBoxMutation()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    // Form Initial Values
    const initialValues: FormInitialValues = {
        boxName: '',
        innerItemsCount: 0,
        boxWeight: 0,
        dimensions: {
            height: 0,
            width: 0,
            depth: 0,
        },
    }

    // Form Validation Schema
    const validationSchema = object({
        boxName: string().required('Required'),
        innerItemsCount: number()
            .min(1, 'Item count should be greater than 0')
            .required('Please select a innerItemsCount'),
        boxWeight: number()
            .min(1, 'Box weight should be greater than 0')
            .required('Required'),
        dimensions: object().shape({
            height: number()
                .min(1, 'Height should be greter than 0')
                .required('Required'),
            width: number()
                .min(1, 'Weight should be greater than 0')
                .required('Required'),
            depth: number()
                .min(1, 'depth should be greater than 0')
                .required('Required'),
        }),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        addCartonBox({
            boxName: values.boxName,
            innerItemCount: values.innerItemsCount,
            dimension: values.dimensions,
            boxWeight: values.boxWeight,
            companyId: userData?.companyId || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Added successfully!')
                    navigate('/configurations/carton-box')
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
                        <AddCartonBox
                            formikProps={formikProps}
                            apiStatus={apiStatus}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default AddCartonBoxWrapper
