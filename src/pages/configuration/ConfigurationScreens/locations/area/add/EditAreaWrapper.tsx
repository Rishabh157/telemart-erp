// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useSelector } from 'react-redux'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import AddAreaDialog from './AddAreaDialog'
import { showToast } from 'src/utils'
import { RootState } from 'src/redux/store'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetAreaByIdQuery, useUpdateAreaMutation } from 'src/services/AreaService'

// |-- Types --|
type Props = {
    id: string
    onClose: () => void
}

export type FormInitialValues = {
    countryId: string
    stateId: string
    districtId: string
    tehsilId: string
    pincodeId: string
    area: { areaName: string }[]
}

const EditAreaWrapper = ({ id, onClose }: Props) => {

    const [apiStatus, setApiStatus] = useState(false)
    const [updateArea] = useUpdateAreaMutation()

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetAreaByIdQuery(id || '', {
            skip: !id,
        }),
    })

    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state?.country
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state?.states
    )
    const { selectedLocationDistrict }: any = useSelector(
        (state: RootState) => state?.district
    )
    const { selectedLocationTehsil }: any = useSelector(
        (state: RootState) => state.tehsils
    )
    const { selectedLocationPincode }: any = useSelector(
        (state: RootState) => state.pincode
    )

    const initialValues: FormInitialValues = {
        countryId: selectedLocationCountries,
        stateId: selectedLocationState,
        districtId: selectedLocationDistrict,
        tehsilId: selectedLocationTehsil,
        pincodeId: selectedLocationPincode,
        area: [
            { areaName: selectedItem?.area || '' }
        ]
    }

    const validationSchema = object({
        countryId: string().required('Country is required'),
        stateId: string().required('State is required'),
        districtId: string().required('District is required'),
        tehsilId: string().required('Tehsil is required'),
        pincodeId: string().required('Pincode is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            updateArea({
                id,
                body: {
                    countryId: values.countryId || '',
                    stateId: values.stateId || '',
                    districtId: values.districtId || '',
                    tehsilId: values.tehsilId || '',
                    pincodeId: values.pincodeId || '',
                    // area: values?.area?.map((ele) => ele?.areaName),
                },
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Area Updated successfully!')
                        onClose()
                        setApiStatus(false)
                    } else {
                        showToast('error', res?.data?.message)
                        setApiStatus(false)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                    setApiStatus(false)
                }
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
                    <AddAreaDialog
                        onClose={onClose}
                        apiStatus={apiStatus}
                        formikProps={formikProps as any}
                        formType="EDIT"
                    />
                )
            }}
        </Formik>
    )
}

export default EditAreaWrapper
