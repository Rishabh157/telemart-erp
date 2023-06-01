import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import DispositionLayout from '../../DispositionLayout'
import { useAdddispositionComplaintMutation } from 'src/services/configurations/DispositionComplaintServices'
import AddDispositionComplaint from './AddDispositionComplaintOne'

export type FormInitialValues = {
    dispositionName: string
    priority: string
    emailType: string
    smsType: string
}
const AddDispositionComplaintWrappper = () => {
    const navigate = useNavigate()
    const [addDispositionCompalint] = useAdddispositionComplaintMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        dispositionName: '',
        priority: '',
        emailType: '',
        smsType: '',
    }
    const validationSchema = object({
        dispositionName: string().required('Required'),
        priority: string().required('Required'),
        emailType: string().required('Required'),
        smsType: string().required('Required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addDispositionCompalint({
                dispositionName: values.dispositionName,
                priority: values.priority,
                emailType: values.emailType,
                smsType: values.smsType,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/dispositions/disposition-complaint')
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

    const priorityOpt = () => {
        let options: any = []

        for (let i = 0; i <= 50; i++) {
            options.push({ label: i.toString(), value: i.toString() })
        }
        return options
    }
    const priorityOptions = priorityOpt()

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
    const EmailType = [
        { label: 'personalEmail', value: 'PERSONAL EMAIL' },
        { label: 'officialEmail', value: 'OFFICIAL EMAIL' },
        { label: 'buisnessEmail', value: 'BUISNESS EMAIL' },
    ]

    const dropdownOptions = {
        smstypeOptions: smstype?.map((ele: any) => {
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
        priorityOptions,
    }

    return (
        <>
            <DispositionLayout>
                {' '}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmitHandler}
                >
                    {(formikProps) => {
                        return (
                            <AddDispositionComplaint
                                apiStatus={apiStatus}
                                formikProps={formikProps}
                                dropdownOptions={dropdownOptions}
                            />
                        )
                    }}
                </Formik>
            </DispositionLayout>
        </>
    )
}

export default AddDispositionComplaintWrappper
