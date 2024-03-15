/// ==============================================
// Filename:AddDistrictWrapper.tsx
// Type: Add Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { Formik } from 'formik'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import AddDistrictDialog from './AddDistrictDialog'
import { showToast } from 'src/utils'
import { useAddDistrictMutation } from 'src/services/DistricService'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    onClose: () => void
}

export type FormInitialValues = {
    districtName: string
}

const AddDistrictWrapper = ({ onClose }: Props) => {
    const [AddDistrict] = useAddDistrictMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state?.country
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state?.states
    )

    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        districtName: '',
    }
    const validationSchema = object({
        districtName: string().required('Required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddDistrict({
                districtName: values.districtName,
                stateId: selectedLocationState || '',
                countryId: selectedLocationCountries || '',
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        onClose()
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
        <>
            {' '}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddDistrictDialog
                            onClose={onClose}
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </>
    )
}

export default AddDistrictWrapper
