// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { array, object } from 'yup'

// |-- Internal Dependencies --|
import {
    useGetDistictByIdQuery,
    useUpdateDistrictMutation,
} from 'src/services/DistricService'
import { showToast } from 'src/utils'
import AddDistrictDialog from './AddDistrictDialog'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { setSelctedDistrictPreffredCourier } from 'src/redux/slices/districtSlice'
import { AppDispatch } from 'src/redux/store'

// |-- Types --|
type Props = {
    id: string
    onClose: () => void
}

export type FormInitialValues = {
    districtName: string
    preferredCourier: any[]
    isFixed: boolean
}

const EditDistrictWrapper = ({ id, onClose }: Props) => {
    const [apiStatus, setApiStatus] = useState(false)
    const [updateDistrict] = useUpdateDistrictMutation()
    const dispatch = useDispatch<AppDispatch>()

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetDistictByIdQuery(id || '', {
            skip: !id,
        }),
    })

    const initialValues: FormInitialValues = {
        districtName: selectedItem?.districtName,
        preferredCourier:
            selectedItem?.preferredCourier?.map((ele: any) => ({
                label: ele?.courierName,
                value: ele?.courierId,
            })) || [],
        isFixed: selectedItem?.isFixed,
    }

    const validationSchema = object({
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
            updateDistrict({
                id,
                body: {
                    // stateName: values.stateName,
                    preferredCourier: formatedPriority || [],
                    isFixed: values.isFixed,
                    // countryId: selectedLocationCountries || '',
                    // companyId: userData?.companyId || '',
                },
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'District Updated successfully!')
                        onClose()
                        setApiStatus(false)
                        dispatch(
                            setSelctedDistrictPreffredCourier(
                                res?.data?.data?.preferredCourier
                            )
                        )
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
                    <AddDistrictDialog
                        onClose={onClose}
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        formType="EDIT"
                    />
                )
            }}
        </Formik>
    )
}

export default EditDistrictWrapper
