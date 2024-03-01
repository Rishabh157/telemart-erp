import React, { useEffect } from 'react'
import DispositionLayout from '../../DispositionLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useParams } from 'react-router-dom'
import { array, object, string } from 'yup'
import { Formik, FormikProps } from 'formik'
import ViewInitialCallThree from './ViewInitialCallThree'
import { useGetInitialCallerThreeByIdQuery } from 'src/services/configurations/InitialCallerThreeServices'
import { setSelectedInitialCallerThree } from 'src/redux/slices/configuration/initialCallerThreeSlice'

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
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const { selectedInitialCallerThree }: any = useSelector(
        (state: RootState) => state.initialCallerThree
    )

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

    const {
        data: Icdata,
        isFetching: IcisFetching,
        isLoading: IcisLoading,
    } = useGetInitialCallerThreeByIdQuery(Id)

    useEffect(() => {
        if (!IcisLoading && !IcisFetching) {
            dispatch(setSelectedInitialCallerThree(Icdata?.data || []))
        }
    }, [Icdata, IcisLoading, IcisFetching, dispatch])

    const onSubmitHandler = (values: FormInitialValues) => {}

    return (
        <DispositionLayout>
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
        </DispositionLayout>
    )
}

export default ViewInitialCallThreeWrappper
