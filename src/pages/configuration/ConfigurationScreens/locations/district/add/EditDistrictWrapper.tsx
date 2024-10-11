// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { array, object , string } from 'yup'

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
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    id: string
    onClose: () => void
}

export type FormInitialValues = {
    countryId: string
    stateId: string
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

    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state?.country
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state?.states
    )

    const initialValues: FormInitialValues = {
        countryId: selectedLocationCountries,
        stateId: selectedLocationState,
        districtName: selectedItem?.districtName,
        preferredCourier:
            selectedItem?.preferredCourier?.map((ele: any) => ({
                label: ele?.courierName,
                value: ele?.courierId,
            })) || [],
        isFixed: selectedItem?.isFixed,
    }

    const validationSchema = object({
        countryId: string().required('Country is required'),
        stateId: string().required('State is required'),
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
                    countryId: values.countryId || '',
                    stateId: values.stateId || '',
                    preferredCourier: formatedPriority || [],
                    isFixed: values.isFixed,
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
                        formikProps={formikProps as any}
                        formType="EDIT"
                    />
                )
            }}
        </Formik>
    )
}

export default EditDistrictWrapper
