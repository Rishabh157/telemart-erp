// |-- Built-in Dependencies --|
import React, { useState } from 'react'
// |-- External Dependencies --|
import { Formik } from 'formik'
import { number, object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
// |-- Internal Dependencies --|
import { useAddVendorLedgerMutation } from 'src/services/VendorLedgerServices'
import { showToast } from 'src/utils'
import { NoteType } from 'src/models/Ledger.model'
import AddVendorLedgerModel from './AddVendorLedgerModel'
// |-- Redux --|
import { RootState } from 'src/redux/store'
interface PropsType {
    addType: keyof typeof NoteType
    setIsOpenModel: any
}

// |-- Types --|
export type FormInitialValues = {
    noteType: string
    creditAmount: number
    debitAmount: number
    remark: string
    vendorId: string
    companyId: string
}

const AddVendorLedgerModelWrapper: React.FC<PropsType> = ({
    addType,
    setIsOpenModel,
}) => {
    const navigate = useNavigate()
    const params = useParams()
    const vendorId: any = params.vendorId
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addVendorLedger] = useAddVendorLedgerMutation()

    const initialValues: FormInitialValues = {
        noteType: '',
        creditAmount: 0,
        debitAmount: 0,
        remark: '',
        vendorId: '',
        companyId: '',
    }

    const validationSchema = object({
        creditAmount: number(),
        debitAmount: number(),
        remark: string().required('Required'),
    })
    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)

        setTimeout(() => {
            addVendorLedger({
                noteType: addType,
                creditAmount: values?.creditAmount,
                debitAmount: values?.debitAmount,
                remark: values?.remark,
                companyId: companyId || '',
                vendorId: vendorId,
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        setIsOpenModel(false)
                        showToast('success', 'Ledger added successfully!')
                        navigate('/Vendors/' + vendorId + '/ledger')
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
                    <AddVendorLedgerModel
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        addType={addType}
                    />
                )
            }}
        </Formik>
    )
}

export default AddVendorLedgerModelWrapper
