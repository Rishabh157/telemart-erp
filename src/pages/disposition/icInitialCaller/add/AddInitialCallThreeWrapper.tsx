import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { array, boolean, object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useAddInitialCallerThreeMutation } from 'src/services/configurations/InitialCallerThreeServices'
import AddInitialCallThree from './AddInitialCallThree'
import { useNavigate } from 'react-router-dom'
import DispositionLayout from 'src/pages/disposition/DispositionLayout'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

export type FormInitialValues = {
    initialCallName: string
    initialCallOneId: string
    callType: string
    initialCallTwoId: string
    emailType: string
    smsType: string
    returnType: string[]
    isPnd: boolean
    cancelFlag: boolean
}
const AddInitialCallThreeWrappper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [addIntialCallThree] = useAddInitialCallerThreeMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)
    const { allItems }: any = useSelector(
        (state: RootState) => state?.initialCallerOne
    )

    const initialValues: FormInitialValues = {
        initialCallName: '',
        initialCallOneId: '',
        callType: '',
        initialCallTwoId: '',

        emailType: '',
        smsType: '',
        returnType: [''],
        isPnd: false,
        cancelFlag: false,
    }
    const validationSchema = object({
        initialCallName: string().required('Required'),
        initialCallOneId: string().required('Required'),
        callType: string().required('Required'),
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
            addIntialCallThree({
                initialCallName: values.initialCallName,
                initialCallOneId: values.initialCallOneId,
                callType: values.callType,
                initialCallTwoId: values.initialCallTwoId,
                emailType: values.emailType,
                smsType: values.smsType,
                returnType: values.returnType,
                companyId: userData?.companyId || '',
                isPnd: values.isPnd,
                cancelFlag: values.cancelFlag,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Call added successfully!')
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
        //    { label:"alcobanSms" ,value:"ALCOBAN SMS"},
        //    { label:"complaintCCA_CNC" ,value:"CUSTOMER NOT CONTACTABLE"},
        //     { label:"alcobanSms" ,value:"ALCOBAN SMS"},
        //     { label:"alcobanSms" ,value:"ALCOBAN SMS"},
        //     { label:"alcobanSms" ,value:"ALCOBAN SMS"},
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
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmitHandler}
                >
                    {(formikProps) => {
                        return (
                            <AddInitialCallThree
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

export default AddInitialCallThreeWrappper
