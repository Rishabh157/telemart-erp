// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useSelector } from 'react-redux'
import { array, object, string } from 'yup'

// |-- Internal Dependencies --|
import { useAddDistrictMutation } from 'src/services/DistricService'
import { showToast } from 'src/utils'
import AddDistrictDialog from './AddDistrictDialog'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    onClose: () => void
}

export type FormInitialValues = {
    countryId?: string
    stateId?: string
    districtName: string
    preferredCourier: any[]
    isFixed: boolean
}

const AddDistrictWrapper = ({ onClose }: Props) => {
    const [addDistrict] = useAddDistrictMutation()
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state?.country
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state?.states
    )

    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        districtName: '',
        preferredCourier: [],
        isFixed: false,
    }

    const validationSchema = object({
        districtName: string().required('District name is required'),
        preferredCourier: array()
            .of(object())
            .required('Preferred courier is required')
            .min(1, 'At least one courier is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        const formatedPriority = values?.preferredCourier?.map(
            (ele: any, ind: number) => ({
                courierId: ele?.value,
                courierName: ele?.label,
                priority: ind + 1,
            })
        )
        setTimeout(() => {
            addDistrict({
                districtName: values.districtName,
                preferredCourier: formatedPriority,
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
            enableReinitialize
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
                        formType="ADD"
                    />
                )
            }}
        </Formik>
    )
}

export default AddDistrictWrapper
