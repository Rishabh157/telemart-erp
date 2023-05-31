import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { array, object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import EditInitialCallOne from './EditInitialCallThree'
import DispositionLayout from 'src/pages/disposition/DispositionLayout'
import {
    useGetInitialCallerThreeByIdQuery,
    useUpdateInitialCallerThreeMutation,
} from 'src/services/configurations/InitialCallerThreeServices'
import { useGetAllinitialCallerOneQuery } from 'src/services/configurations/InitialCallerOneServices'
import { setAllItems } from 'src/redux/slices/configuration/initialCallerOneSlice'
import { setSelectedInitialCallerThree } from 'src/redux/slices/configuration/initialCallerThreeSlice'

export type FormInitialValues = {
    initialCallName: string
    initialCallOneId: string
    initialCallTwoId: string
    complaintType: string
    emailType: string
    smsType: string
    returnType: string[]
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
        initialCallName: selectedInitialCallerThree?.initialCallName || '',
        initialCallOneId: selectedInitialCallerThree?.initialCallOneId || '',
        initialCallTwoId: selectedInitialCallerThree?.initialCallTwoId || '',
        complaintType: selectedInitialCallerThree?.complaintType || '',
        emailType: selectedInitialCallerThree?.emailType || '',
        smsType: selectedInitialCallerThree?.smsType || '',
        returnType: selectedInitialCallerThree?.returnType || [''],
    }

    const { allItems }: any = useSelector(
        (state: RootState) => state?.initialCallerOne
    )

    const { data, isFetching, isLoading } = useGetAllinitialCallerOneQuery('')
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

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setAllItems(data?.data || []))
        }
    }, [data, isLoading, isFetching, dispatch])

    const validationSchema = object({
        initialCallName: string().required('Requiredd'),
        initialCallOneId: string().required('Required'),
        initialCallTwoId: string().required('Required'),
        complaintType: string().required(' Required'),
        emailType: string().required('Required'),
        smsType: string().required('Required'),
        returnType: array().of(string().required('Required')),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            editInitialCallThree({
                body: {
                    initialCallName: values.initialCallName,
                    initialCallOneId: values.initialCallOneId,
                    initialCallTwoId: values.initialCallTwoId,
                    complaintType: values.complaintType,
                    emailType: values.emailType,
                    smsType: values.smsType,
                    returnType: values.returnType,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Call updated successfully!')
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
        { label: 'complaint', value: 'COMPLAINT' },
        { label: 'enquiry', value: 'ENQUIRY' },
    ]

    const returntype = [
        { label: 'ESCALATE', value: 'ESCALATE' },
        { label: 'REPLACEMENT', value: 'REPLACEMENT' },
        { label: 'REFUND', value: 'REFUND' },
    ]

    const EmailType = [
        { label: 'personalEmail', value: 'PERSONAL EMAIL' },
        { label: 'officialEmail', value: 'OFFICIAL EMAIL' },
        { label: 'buisnessEmail', value: 'BUISNESS EMAIL' },
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
