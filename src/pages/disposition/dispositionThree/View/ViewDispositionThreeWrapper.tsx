import React, { useEffect } from 'react'
import DispositionLayout from '../../DispositionLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useParams } from 'react-router-dom'
import { Formik, FormikProps } from 'formik'

import { useGetDispositionThreeByIdQuery } from 'src/services/configurations/DispositionThreeServices'
import { setSelectedDispostionThree } from 'src/redux/slices/configuration/dispositionThreeSlice'
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
    const dispatch = useDispatch<AppDispatch>()

    const { userData } = useSelector((state: RootState) => state?.auth)

    const { selectedDispostionThree }: any = useSelector(
        (state: RootState) => state?.dispositionThree
    )

    const { data, isLoading, isFetching } = useGetDispositionThreeByIdQuery(Id)

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedDispostionThree(data?.data || []))
        }
    }, [isLoading, isFetching, data, dispatch])

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
        <DispositionLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return <ViewDispositionThree formikProps={formikProps} />
                }}
            </Formik>
        </DispositionLayout>
    )
}

export default ViewDispositionThreeWrappper
