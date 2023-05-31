import React, { useEffect, useState } from 'react'
import DispositionLayout from '../../DispositionLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { array, object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useGetAlldispositionOneQuery } from 'src/services/configurations/DispositiononeServices'
import { useGetAlldispositionTwoQuery } from 'src/services/configurations/DispositionTwoServices'
import { setAllItems as setAllDispositionTwo } from 'src/redux/slices/configuration/dispositionTwoSlice'
import { setAllItems as setAllDispositionOne } from 'src/redux/slices/configuration/dispositionOneSlice'
import { DispositionOneListResponse } from 'src/models/configurationModel/DisposiionOne.model'
import { DispositionTwoListResponse } from 'src/models/configurationModel/DispositionTwo.model'
import AddDispositionThree from './AddDispositionThree'
import { useAdddispositionThreeMutation } from 'src/services/configurations/DispositionThreeServices'

export type FormInitialValues = {
    dispositionName: string
    dispositionOneId: string
    dispositionTwoId: string
    smsType: string
    emailType: string
    priority: string
    applicableCriteria: string[]
    companyId: string
}

const AddDispositionThreeWrappper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const { userData } = useSelector((state: RootState) => state?.auth)

    const { allItems: dispositionOne }: any = useSelector(
        (state: RootState) => state.dispositionOne
    )

    const { allItems: dispositionTwo }: any = useSelector(
        (state: RootState) => state?.dispositionTwo
    )

    const [adddispositionThree] = useAdddispositionThreeMutation()

    const {
        isLoading: isDTLoading,
        isFetching: isDTFetching,
        data: DtData,
    } = useGetAlldispositionTwoQuery('')

    useEffect(() => {
        if (!isDTLoading && !isDTFetching) {
            dispatch(setAllDispositionTwo(DtData?.data || []))
        }
    }, [isDTLoading, isDTFetching, DtData, dispatch])

    const {
        isLoading: isDOLoading,
        isFetching: isDOFetching,
        data: DoData,
    } = useGetAlldispositionOneQuery('')

    useEffect(() => {
        if (!isDOLoading && !isDOFetching) {
            dispatch(setAllDispositionOne(DoData?.data || []))
        }
    }, [isDOLoading, isDOFetching, DoData, dispatch])

    const initialValues: FormInitialValues = {
        dispositionName: '',
        dispositionOneId: '',
        dispositionTwoId: '',
        smsType: '',
        emailType: '',
        priority: '',
        applicableCriteria: [''],
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        dispositionName: string().required('Required'),
        dispositionOneId: string().required('Required'),
        dispositionTwoId: string().required('Required'),
        applicableCriteria: array().of(string().required('Required')),
        smsType: string().required('Required'),
        emailType: string().required('Required'),
        priority: string().required('Required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        adddispositionThree({
            dispositionName: values.dispositionName,
            dispositionOneId: values.dispositionOneId,
            dispositionTwoId: values.dispositionTwoId,
            applicableCriteria: values.applicableCriteria,
            smsType: values.smsType,
            emailType: values.emailType,
            priority: values.priority,
            companyId: values.companyId || '',
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Disposition 3 Added successfully!')
                    navigate('/dispositions/disposition-three')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }

    const priorityOpt = () => {
        let options: any = []

        for (let i = 0; i <= 50; i++) {
            options.push({ label: i.toString(), value: i.toString() })
        }
        return options
    }

    const priorityOptions = priorityOpt()

    const dropdownOptions = {
        DispotionOneOptions: dispositionOne?.map(
            (dispositionOne: DispositionOneListResponse) => {
                return {
                    label: dispositionOne.dispositionName,
                    value: dispositionOne._id,
                }
            }
        ),

        DispositionTwoOptions: dispositionTwo?.map(
            (dispositionTwo: DispositionTwoListResponse) => {
                return {
                    label: dispositionTwo.dispositionName,
                    value: dispositionTwo._id,
                }
            }
        ),
        priorityOptions,
        emailTypeOptions: [
            { label: 'personalEmail', value: 'PERSONAL EMAIL' },
            { label: 'officialEmail', value: 'OFFICIAL EMAIL' },
            { label: 'buisnessEmail', value: 'BUISNESS EMAIL' },
        ],

        smsTypeOptions: [
            { label: 'alcobanSms', value: 'ALCOBAN SMS' },
            { label: 'complaintCCA_CNC', value: 'CUSTOMER NOT CONTACTABLE' },
            {
                label: 'complaintCCA_OWEI',
                value: 'COMPLAINT CCA-ORDERS WITH EMAIL ID',
            },
            {
                label: 'complaintCCA_OWNEI',
                value: 'COMPLAINT CCA-ORDERS WITHOUT EMAIL ID',
            },
            { label: 'complaintORC', value: 'CREATE ORDER REFUND-CHEQUE' },
            { label: 'complaintORN', value: 'CREATE ORDER REFUND-NEFT' },
            { label: 'complaintRPIM', value: 'CREATE RPI-MANUAL' },
            {
                label: 'complaintRPI',
                value: 'CREATE RPI-TV-SHOP COURIER ASSIGNED',
            },
            { label: 'complaintSCD', value: 'COMPLAINT SERVICE DETAILS' },
            { label: 'createComplant', value: 'CREATE COMPLAINT' },
            { label: 'dealerDelivered', value: 'DEALER DELIVERED' },
            {
                label: 'dealerDeliveredBI',
                value: 'DEALER DELIVERED BOY INTRANSIT',
            },
            { label: 'dispositionMsg', value: 'DISPOSITION MESSAGE' },
            { label: 'hold', value: 'HOLD' },
            { label: 'inTransitDB', value: 'IN-TRANSIT-DELIVERY-BOY' },
            { label: 'invoiceSent', value: 'INVOICE SENT' },
        ],
        applicableCriteriaOptions: [
            { label: 'IS ORDER', value: 'IS ORDER' },
            { label: 'IS PREPAID', value: 'IS PREPAID' },
            { label: 'IS CALLBACK', value: 'IS CALLBACK' },
            { label: 'IS REPLACEMENT', value: 'IS REPLACEMENT' },
        ],
    }

    return (
        <DispositionLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <AddDispositionThree
                            dropdownOptions={dropdownOptions}
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </DispositionLayout>
    )
}

export default AddDispositionThreeWrappper
