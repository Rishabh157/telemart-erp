/// ==============================================
// Filename:EditDispositionComplaintWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { Formik } from 'formik'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import AddDispositionOne from './EditDispositionComplaint'
import DispositionLayout from '../../DispositionLayout'
import {
    useGetdispositionComplaintByIdQuery,
    useUpdatedispositionComplaintMutation,
} from 'src/services/configurations/DispositionComplaintServices'

// |-- Redux --|
import { setSelectedDispositionComplaint } from 'src/redux/slices/configuration/dispositionComplaintSlice'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Types --|
export type FormInitialValues = {
    dispositionName: string
    priority: string
    emailType: string
    smsType: string
}
const EditDispositionComplaintWrappper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [editDispositionComplaint] = useUpdatedispositionComplaintMutation()
    const params = useParams()
    const Id = params.id
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const { selectedDispositionCompalint }: any = useSelector(
        (state: RootState) => state.dispositionComplaint
    )

    const { data, isLoading, isFetching } =
        useGetdispositionComplaintByIdQuery(Id)

    const initialValues: FormInitialValues = {
        dispositionName: selectedDispositionCompalint?.dispositionName || '',
        priority: selectedDispositionCompalint?.priority || '',
        emailType: selectedDispositionCompalint?.emailType || '',
        smsType: selectedDispositionCompalint?.smsType || '',
    }

    const validationSchema = object({
        dispositionName: string().required('Required'),
        priority: string().required('Required'),
        emailType: string().required('Required'),
        smsType: string().required('Required'),
    })
    useEffect(() => {
        if (!isLoading && !isFetching)
            dispatch(setSelectedDispositionComplaint(data?.data || []))
    }, [data, dispatch, isFetching, isLoading])

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            editDispositionComplaint({
                body: {
                    dispositionName: values.dispositionName,
                    priority: values.priority,
                    emailType: values.emailType,
                    smsType: values.smsType,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
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
    const priorityTYpe = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
        { label: '11', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14' },
    ]
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
        priorityTypeOptions: priorityTYpe?.map((ele: any) => {
            return {
                label: ele.label,
                value: ele.value,
            }
        }),
    }

    return (
        <>
            <DispositionLayout>
                {' '}
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmitHandler}
                >
                    {(formikProps) => {
                        return (
                            <AddDispositionOne
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

export default EditDispositionComplaintWrappper
