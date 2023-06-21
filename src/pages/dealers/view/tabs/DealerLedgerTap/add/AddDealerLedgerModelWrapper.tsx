// import { OpenModelProps } from '../list/DealerLedgerListing'
import React, { useState } from 'react'
import { Formik } from 'formik'
import { number, object, string } from 'yup'
import { useAddDealerLedgerMutation } from 'src/services/DealerLedgerServices'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { NoteType } from 'src/models/Ledger.model'
import AddDealerLedgerModel from './AddDealerLedgerModel'

interface PropsType {
    addType: keyof typeof NoteType
    setIsOpenModel: any
}

export type FormInitialValues = {
    noteType: string
    creditAmount: number
    debitAmount: number
    remark: string
    dealerId: string
    companyId: string
}

const AddDealerLedgerModelWrapper: React.FC<PropsType> = ({
    addType,
    setIsOpenModel,
}) => {
    const navigate = useNavigate()
    const params = useParams()
    const dealerId: any = params.dealerId
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addDealerLedger] = useAddDealerLedgerMutation()

    const initialValues: FormInitialValues = {
        noteType: '',
        creditAmount: 0,
        debitAmount: 0,
        remark: '',
        dealerId: '',
        companyId: '',
    }

    const validationSchema = object({
        creditAmount: number(),
        debitAmount: number(),
        remark: string().required('Required'),
    })
    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        console.log('values', values)
        setApiStatus(true)

        setTimeout(() => {
            addDealerLedger({
                noteType: addType,
                creditAmount: values?.creditAmount,
                debitAmount: values?.debitAmount,
                remark: values?.remark,
                companyId: companyId || '',
                dealerId: dealerId,
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        setIsOpenModel(false)
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

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddDealerLedgerModel
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        addType={addType}
                    />
                )
            }}
        </Formik>
    )
}

export default AddDealerLedgerModelWrapper
