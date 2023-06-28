/// ==============================================
// Filename:DealerSupervisorTabWrapper.tsx
// Type: Add Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import AddDealerSupervisor from './AddDealerSupervisor'
import { useAddDealerSupervisorMutation } from 'src/services/DealerSupervisorServices'
import { showToast } from 'src/utils'

// |-- Redux --|
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    companyId: string
    dealerId: string
    zonalManager: string
    zonalDistribution: string
}

const DealerSupervisorTabWrapper = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const dealerId: any = params.dealerId

    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addDealerSupervisor] = useAddDealerSupervisorMutation()

    const initialValues: FormInitialValues = {
        companyId: companyId,
        dealerId: dealerId,
        zonalManager: '',
        zonalDistribution: '',
    }

    const validationSchema = object({
        zonalManager: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)

        setTimeout(() => {
            addDealerSupervisor({
                dealerId: values.dealerId || '',
                zonalManagerName: values.zonalManager,
                // zonalDistribution:values.zonalDistribution,
                companyId: values.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Supervisor added successfully!')
                        navigate('/dealers/' + dealerId + '/supervisor')
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
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddDealerSupervisor
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </div>
    )
}

export default DealerSupervisorTabWrapper
