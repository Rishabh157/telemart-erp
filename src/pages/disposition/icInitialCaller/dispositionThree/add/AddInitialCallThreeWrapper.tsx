import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import AddInitialCallThreeDialog from './AddInitialCallThree'
import { useAddInitialCallerThreeMutation } from 'src/services/configurations/InitialCallerThreeServices'
import AddInitialCallThree from './AddInitialCallThree'
import { useNavigate} from 'react-router-dom'


export type FormInitialValues = {
    initialCallName: string

}
const AddInitialCallThreeWrappper = () => {
    const navigate=useNavigate()
    const [addIntialCallThree] = useAddInitialCallerThreeMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)
    const { selectedInitialOne }: any = useSelector(
        (state: RootState) => state?.initialCallerOne
    )
    const { selectedInitialCallerTwo }: any = useSelector(
        (state: RootState) => state?.initialCallerTwo
    )

    const initialValues: FormInitialValues = {
        initialCallName: '',
    }
    const validationSchema = object({
        initialCallName: string().required(
            'InitialCaller-three name is required'
        ),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addIntialCallThree({
                initialCallName: values.initialCallName,
                initialCallOneId: selectedInitialOne?.value || '',
                initialCallTwoId: selectedInitialCallerTwo?.value || '',

                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'InitialCaller-Three added successfully!'
                        )
                        navigate("/disposition/disposition-three")
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
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddInitialCallThree
                        
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </>
    )
}

export default AddInitialCallThreeWrappper
