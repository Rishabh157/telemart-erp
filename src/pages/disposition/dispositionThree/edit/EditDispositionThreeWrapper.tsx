import React, { useEffect, useState } from 'react'
import DispositionLayout from '../../DispositionLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useGetAlldispositionOneQuery } from 'src/services/configurations/DispositiononeServices'
import { useGetAlldispositionTwoQuery } from 'src/services/configurations/DispositionTwoServices'
import { setAllItems as setAllDispositionTwo } from 'src/redux/slices/configuration/dispositionTwoSlice'
import { setAllItems as setAllDispositionOne } from 'src/redux/slices/configuration/dispositionOneSlice'
import { DispositionOneListResponse } from 'src/models/configurationModel/DisposiionOne.model'
import { DispositionTwoListResponse } from 'src/models/configurationModel/DispositionTwo.model'
import EditDispositionThree from './EditDispositionThree'
import {
    useGetDispositionThreeByIdQuery,
    useUpdatedispositionThreeMutation,
} from 'src/services/configurations/DispositionThreeServices'
import { setSelectedDispostionThree } from 'src/redux/slices/configuration/dispositionThreeSlice'

export type FormInitialValues = {
    dispositionName: string
    dispositionOneId: string
    dispositionTwoId: string
    smsType: string
    emailType: string
    whatsApp: string
    priority: string
    applicableCriteria: string
    companyId: string
}

const EditDispositionThreeWrappper = () => {
    const navigate = useNavigate()
    const params = useParams()
    const Id = params.id
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [updatedispositionThree] = useUpdatedispositionThreeMutation()

    const { userData } = useSelector((state: RootState) => state?.auth)

    const { allItems: dispositionOne }: any = useSelector(
        (state: RootState) => state.dispositionOne
    )

    const { allItems: dispositionTwo }: any = useSelector(
        (state: RootState) => state?.dispositionTwo
    )

    const { selectedDispostionThree }: any = useSelector(
        (state: RootState) => state?.dispositionThree
    )

    const { data, isLoading, isFetching } = useGetDispositionThreeByIdQuery(Id)

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedDispostionThree(data?.data || []))
        }
    }, [isLoading, isFetching, data, dispatch])

    const {
        isLoading: isDTLoading,
        isFetching: isDTFetching,
        data: DtData,
    } = useGetAlldispositionTwoQuery(userData?.companyId)

    useEffect(() => {
        if (!isDTLoading && !isDTFetching) {
            dispatch(setAllDispositionTwo(DtData?.data || []))
        }
    }, [isDTLoading, isDTFetching, DtData, dispatch])

    const {
        isLoading: isDOLoading,
        isFetching: isDOFetching,
        data: DoData,
    } = useGetAlldispositionOneQuery(userData?.companyId)

    useEffect(() => {
        if (!isDOLoading && !isDOFetching) {
            dispatch(setAllDispositionOne(DoData?.data || []))
        }
    }, [isDOLoading, isDOFetching, DoData, dispatch])

    const initialValues: FormInitialValues = {
        dispositionName: selectedDispostionThree?.dispositionName || '',
        dispositionOneId: selectedDispostionThree?.dispositionOneId || '',
        dispositionTwoId: selectedDispostionThree?.dispositionTwoId || '',
        smsType: selectedDispostionThree?.smsType || '',
        emailType: selectedDispostionThree?.emailType || '',
        whatsApp: selectedDispostionThree?.whatsApp || '',
        priority: selectedDispostionThree?.priority || '',
        applicableCriteria:
            selectedDispostionThree?.applicableCriteria[0] || '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        dispositionName: string().required('Required'),
        dispositionOneId: string().required('Required'),
        dispositionTwoId: string().required('Required'),
        applicableCriteria: string().required('Required'),
        smsType: string(),
        emailType: string(),
        whatsApp: string(),
        priority: string(),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        console.log(values.applicableCriteria)
        updatedispositionThree({
            body: {
                dispositionName: values.dispositionName,
                dispositionOneId: values.dispositionOneId,
                dispositionTwoId: values.dispositionTwoId,
                applicableCriteria: [values.applicableCriteria],
                smsType: values.smsType || null,
                emailType: values.emailType || null,
                whatsApp: values.whatsApp || null,
                priority: values.priority || '',
                companyId: values.companyId || '',
            },
            id: Id || '',
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Disposition 3 Updated successfully!')
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
        whatsAppOptions: [
            { label: 'template 1', value: 'TEMP ONE' },
            { label: 'template 2', value: 'TEMP TWO' },
            { label: 'template 3', value: 'TEMP THREE' },
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
            { label: 'IS INQUIRY', value: 'IS INQUIRY' },
        ],
    }

    return (
        <DispositionLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <EditDispositionThree
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

export default EditDispositionThreeWrappper
