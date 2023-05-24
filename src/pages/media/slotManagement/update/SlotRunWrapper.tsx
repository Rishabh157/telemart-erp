import { Formik, FormikProps } from 'formik'
import React from 'react'
import UpdateSlotRun from './UpdateSlotRun'
type FormInitialValues = {}
type SlotRunWrapperProps = {
    data: string
}
const SlotRunWrapper: React.FC<SlotRunWrapperProps> = ({ data }) => {
    const initialValues = {}
    const validationSchema = {}
    const onSubmitHandler = () => {
        console.log(data)
    }
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <UpdateSlotRun
                            dropdownOptions={[]}
                            apiStatus={[]}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </>
    )
}

export default SlotRunWrapper
