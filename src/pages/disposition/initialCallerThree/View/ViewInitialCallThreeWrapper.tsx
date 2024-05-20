import { Formik, FormikProps } from 'formik'
import { useParams } from 'react-router-dom'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetInitialCallerThreeByIdQuery } from 'src/services/configurations/InitialCallerThreeServices'
import { array, object, string } from 'yup'
import ViewInitialCallThree from './ViewInitialCallThree'

export type FormInitialValues = {
    initialCallName: string
    initialCallOneId: string
    initialCallTwoId: string
    complaintType: string
    emailType: string
    smsType: string
    returnType: string[]
    cancelFlag: boolean
    isPnd: boolean
}

const ViewInitialCallThreeWrappper = () => {
    const params = useParams()
    const Id = params.id

    const { items: selectedInitialCallerThree } =
        useGetDataByIdCustomQuery<any>({
            useEndPointHook: useGetInitialCallerThreeByIdQuery(Id),
        })

    const initialValues: FormInitialValues = {
        initialCallName: selectedInitialCallerThree?.initialCallName || '',
        initialCallOneId: selectedInitialCallerThree?.initialCallOneLabel || '',
        initialCallTwoId: selectedInitialCallerThree?.initialCallTwoLabel || '',
        complaintType: selectedInitialCallerThree?.complaintType || '',
        emailType: selectedInitialCallerThree?.emailType || '',
        smsType: selectedInitialCallerThree?.smsType || '',
        returnType: selectedInitialCallerThree?.returnType || [''],
        cancelFlag: selectedInitialCallerThree?.cancelFlag,
        isPnd: selectedInitialCallerThree?.isPnd,
    }

    // Form Validation Schema
    const validationSchema = object({
        initialCallName: string().required('Requiredd'),
        initialCallOneId: string().required('Required'),
        initialCallTwoId: string().required('Required'),
        complaintType: string().required(' Required'),
        emailType: string().required('Required'),
        smsType: string().required('Required'),
        returnType: array().of(string().required('Required')),
    })

    const onSubmitHandler = (values: FormInitialValues) => {}

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return <ViewInitialCallThree formikProps={formikProps} />
            }}
        </Formik>
    )
}

export default ViewInitialCallThreeWrappper
