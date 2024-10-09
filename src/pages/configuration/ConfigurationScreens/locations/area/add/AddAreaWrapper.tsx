// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { array, object, string } from 'yup'
import { Formik } from 'formik'

// |-- Internal Dependencies --|
import AddAreaDialog from './AddAreaDialog'
import { showToast } from 'src/utils'
import {
    // useAddAreaMutation , 
    useAddMultipleAreaMutation
} from 'src/services/AreaService'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    onClose: () => void
}

export type FormInitialValues = {
    area: { areaName: string }[]
}

const AddAreaWrapper = ({ onClose }: Props) => {

    // for add single area
    // const [AddArea] = useAddAreaMutation()

    // for add multiple area
    const [addMultipleArea] = useAddMultipleAreaMutation()
    const [apiStatus, setApiStatus] = useState(false)
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state?.country
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state?.states
    )
    const { selectedLocationDistrict }: any = useSelector(
        (state: RootState) => state?.district
    )
    const { selectedLocationPincode }: any = useSelector(
        (state: RootState) => state.pincode
    )
    const { selectedLocationTehsil }: any = useSelector(
        (state: RootState) => state.tehsils
    )

    const initialValues: FormInitialValues = {
        area: [
            { areaName: '' },
        ],
    }
    const validationSchema = object({
        // area: string().required('Area is required'),
        area: array().of(
            object().shape({
                areaName: string().required(
                    'Enter area name'
                ),

            })
        ),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addMultipleArea({
                area: values?.area?.map((ele) => ele?.areaName),
                pincodeId: selectedLocationPincode || '',
                tehsilId: selectedLocationTehsil || '',
                districtId: selectedLocationDistrict || '',
                stateId: selectedLocationState || '',
                countryId: selectedLocationCountries || '',
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
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddAreaDialog
                        onClose={onClose}
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddAreaWrapper
