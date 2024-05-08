// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { object, string } from 'yup'
import { Formik } from 'formik'

// |-- Internal Dependencies --|
import AddTehsilDialog from './AddTehsilDialog'
import {
    useGetTehsilByIdQuery,
    useUpdateTehsilMutation,
} from 'src/services/TehsilService'
import { showToast } from 'src/utils'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

// |-- Types --|
type Props = {
    id: string
    onClose: () => void
}

export type FormInitialValues = {
    tehsilName: string
    preferredCourier: string
    isFixed: boolean
}

const EditTehsiltWrapper = ({ id, onClose }: Props) => {
    const [apiStatus, setApiStatus] = useState(false)
    const [updateTehsil] = useUpdateTehsilMutation()

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetTehsilByIdQuery(id || '', {
            skip: !id,
        }),
    })

    const initialValues: FormInitialValues = {
        tehsilName: selectedItem?.tehsilName,
        preferredCourier: selectedItem?.preferredCourier,
        isFixed: selectedItem?.isFixed,
    }

    const validationSchema = object({
        preferredCourier: string().required('Preferred courier is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            updateTehsil({
                id,
                body: {
                    // stateName: values.stateName,
                    preferredCourier: values.preferredCourier,
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
                    <AddTehsilDialog
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

export default EditTehsiltWrapper
