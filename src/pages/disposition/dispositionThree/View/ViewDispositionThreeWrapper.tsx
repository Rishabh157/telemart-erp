
import { Formik, FormikProps } from 'formik'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from 'src/redux/store'

import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetDispositionThreeByIdQuery } from 'src/services/configurations/DispositionThreeServices'
import ViewDispositionThree from './ViewDispositionThree'

export type FormInitialValues = {
    dispositionName: string
    dispositionOneId: string
    dispositionTwoId: string
    smsType: string
    emailType: string
    whatsApp: string
    priority: string
    applicableCriteria: string[]
    companyId: string
}

const ViewDispositionThreeWrappper = () => {
    const params = useParams()
    const Id = params.id

    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items: selectedDispostionThree } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetDispositionThreeByIdQuery(Id),
    })

    const initialValues: FormInitialValues = {
        dispositionName: selectedDispostionThree?.dispositionName || '',
        dispositionOneId: selectedDispostionThree?.dispostionOneLabel || '',
        dispositionTwoId: selectedDispostionThree?.dispostionTwoLabel || '',
        smsType: selectedDispostionThree?.smsType || '',
        emailType: selectedDispostionThree?.emailType || '',
        whatsApp: selectedDispostionThree?.whatsApp || '',
        priority: selectedDispostionThree?.priority || '',
        applicableCriteria: selectedDispostionThree?.applicableCriteria || [],
        companyId: userData?.companyId || '',
    }

    const onSubmitHandler = (values: FormInitialValues) => {}
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return <ViewDispositionThree formikProps={formikProps} />
                }}
            </Formik>
        </>
    )
}

export default ViewDispositionThreeWrappper
