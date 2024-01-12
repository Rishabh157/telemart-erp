import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { array, boolean, object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import EditInitialCallOne from './EditInitialCallThree'
import DispositionLayout from 'src/pages/disposition/DispositionLayout'
import {
    useGetInitialCallerThreeByIdQuery,
    useUpdateInitialCallerThreeMutation,
} from 'src/services/configurations/InitialCallerThreeServices'
import { setSelectedInitialCallerThree } from 'src/redux/slices/configuration/initialCallerThreeSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

export type FormInitialValues = {
    callType: string
    initialCallName: string
    initialCallOneId: string
    initialCallTwoId: string
    emailType: string
    smsType: string
    returnType: string[]
    isPnd: boolean
    cancelFlag: boolean
}
const EditInitialCallThreeWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [editInitialCallThree] = useUpdateInitialCallerThreeMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)
    const params = useParams()
    const Id = params.id
    const { selectedInitialCallerThree }: any = useSelector(
        (state: RootState) => state.initialCallerThree
    )

    const initialValues: FormInitialValues = {
        callType: selectedInitialCallerThree?.callType || '',
        initialCallName: selectedInitialCallerThree?.initialCallName || '',
        initialCallOneId: selectedInitialCallerThree?.initialCallOneId || '',
        initialCallTwoId: selectedInitialCallerThree?.initialCallTwoId || '',
        emailType: selectedInitialCallerThree?.emailType || '',
        smsType: selectedInitialCallerThree?.smsType || '',
        returnType: selectedInitialCallerThree?.returnType || [''],
        isPnd: selectedInitialCallerThree?.isPnd,
        cancelFlag: selectedInitialCallerThree?.cancelFlag,
    }

    const { allItems }: any = useSelector(
        (state: RootState) => state?.initialCallerOne
    )

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

    const validationSchema = object({
        callType: string().required('Requiredd'),
        initialCallName: string().required('Requiredd'),
        initialCallOneId: string().required('Required'),
        initialCallTwoId: string().required('Required'),

        emailType: string().required('Required'),
        smsType: string().required('Required'),
        returnType: array().of(string().required('Required')),
        isPnd: boolean(),
        cancelFlag: boolean(),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            editInitialCallThree({
                body: {
                    callType: values.callType,
                    initialCallName: values.initialCallName,
                    initialCallOneId: values.initialCallOneId,
                    initialCallTwoId: values.initialCallTwoId,

                    emailType: values.emailType,
                    smsType: values.smsType,
                    returnType: values.returnType,
                    companyId: userData?.companyId || '',
                    isPnd: values.isPnd,
                    cancelFlag: values.cancelFlag,
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/dispositions/initialcall-three')
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
    const smstype = [
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
        { label: 'complaintRPI', value: 'CREATE RPI-TV-SHOP COURIER ASSIGNED' },
        { label: 'complaintSCD', value: 'COMPLAINT SERVICE DETAILS' },
        { label: 'createComplant', value: 'CREATE COMPLAINT' },
        { label: 'dealerDelivered', value: 'DEALER DELIVERED' },
        { label: 'dealerDeliveredBI', value: 'DEALER DELIVERED BOY INTRANSIT' },
        { label: 'dispositionMsg', value: 'DISPOSITION MESSAGE' },
        { label: 'hold', value: 'HOLD' },
        { label: 'inTransitDB', value: 'IN-TRANSIT-DELIVERY-BOY' },
        { label: 'invoiceSent', value: 'INVOICE SENT' },
    ]

    const complainttype = [
        {
            label: 'Complaint',
            value: 'COMPLAINT',
        },
        {
            label: 'Inquiry',
            value: 'INQUIRY',
        },
    ]

    const returntype = [
        { label: 'ESCALATE', value: 'ESCALATE' },
        { label: 'REPLACEMENT', value: 'REPLACEMENT' },
        { label: 'REFUND', value: 'REFUND' },
    ]

    const EmailType = [
        { label: 'Personal Email', value: 'PERSONAL_EMAIL' },
        { label: 'Buisness Email', value: 'BUISNESS_EMAIL' },
        { label: 'Company Email', value: 'COMPANY_EMAIL' },
        { label: 'Official Email', value: 'OFFICIAL_EMAIL' },
    ]

    const dropdownoptions = {
        initialCallOneOptions: allItems?.map((ele: any) => {
            return {
                label: ele.initialCallName,
                value: ele._id,
            }
        }),
        complainttypeOptions: complainttype?.map((ele: any) => {
            return {
                label: ele.label,
                value: ele.value,
            }
        }),
        smstypeOptions: smstype?.map((ele: any) => {
            return {
                label: ele.label,
                value: ele.value,
            }
        }),
        returntypeOptions: returntype?.map((ele: any) => {
            return {
                label: ele.label,
                value: ele.value,
            }
        }),
        emailTypeOptions: EmailType?.map((ele: any) => {
            return {
                label: ele.label,
                value: ele.value,
            }
        }),
    }

    return (
        <>
            <DispositionLayout>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmitHandler}
                >
                    {(formikProps: any) => {
                        return (
                            <EditInitialCallOne
                                apiStatus={apiStatus}
                                formikProps={formikProps}
                                dropdownoptions={dropdownoptions}
                            />
                        )
                    }}
                </Formik>
            </DispositionLayout>
        </>
    )
}

export default EditInitialCallThreeWrapper
