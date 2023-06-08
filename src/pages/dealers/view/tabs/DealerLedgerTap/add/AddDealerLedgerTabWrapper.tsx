import React, { useState } from 'react'
import { Formik } from 'formik'
import { number, object, string } from 'yup'
import AddDealerLedger from './AddDealerLedger'
import { useAddDealerLedgerMutation } from 'src/services/DealerLedgerServices'
//import { useGetDealerLedgerQuery } from 'src/services/DealerLedgerServices'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import {useSelector } from 'react-redux'
import { RootState, } from 'src/redux/store'
//import { setAllDealerLedger } from 'src/redux/slices/dealerLedgerSlice'


type Props = {}

export type FormInitialValues = {
    noteType: string,
    price: number,
    remark: string,
}

const AddDealerLedgerTabWrapper = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const dealerId: any = params.dealerId
    
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addDealerLedger] = useAddDealerLedgerMutation()
   
   

    
    const initialValues: FormInitialValues = {
        noteType: '',
        price: 0,
        remark: '',
    }

    const validationSchema = object({
        noteType: string().required('Required'),
        price: number().required('Required'),
        remark: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)   

        setTimeout(() => {
            addDealerLedger({
                noteType: values.noteType,
                price: values.price,
                remark: values.remark,
                companyId: companyId || '',
                dealerId: dealerId
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Ledger added successfully!')
                        navigate('/dealers/' + dealerId + '/ledger')
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

    const dropdownOptions = {
        noteTypeOptions: [
            { label: 'CREDIT', value: 'CREDIT' },
            { label: 'DEBIT', value: 'DEBIT' },            
        ],
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddDealerLedger
                            dropdownOptions={dropdownOptions}
                            apiStatus={apiStatus}
                            formikProps={formikProps}                            
                        />
                    )
                }}
            </Formik>
        </div>
    )
}

export default AddDealerLedgerTabWrapper
