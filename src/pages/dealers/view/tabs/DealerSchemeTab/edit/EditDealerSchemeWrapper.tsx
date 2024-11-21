// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { array, object, string } from 'yup'

// |-- Internal Dependencies --|
import {
    DealerSchemeByIdResponse,
    UpdateDealerSchemeInitialValues,
} from 'src/models/DealerScheme.model'
import {
    useGetDealerSchemeByIdQuery,
    useUpdateDealerSchemeMutation,
} from 'src/services/DealerSchemeService'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { showToast } from 'src/utils'
import EditDealerScheme from './EditDealerScheme'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetAllPincodeDealerQuery } from 'src/services/DealerPincodeService'

const EditDealerSchemeWrapper = () => {
    const params = useParams()
    const navigate = useNavigate()
    const schemeId = params.schemeId
    const dealerId = params.dealerId
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId

    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const { items: schemeData } =
        useGetDataByIdCustomQuery<DealerSchemeByIdResponse>({
            useEndPointHook: useGetDealerSchemeByIdQuery(schemeId || ''),
        })
    const [updateScheme] = useUpdateDealerSchemeMutation()

    const { options: schemeOptions } = useCustomOptions({
        useEndPointHook: useGetSchemeQuery({
            companyId: userData?.companyId,
        }),
        keyName: 'schemeName',
        value: '_id',
    })
    const { options: pinCodeOptions } = useCustomOptions({
        useEndPointHook: useGetAllPincodeDealerQuery({
            tehsilid: '',
            dealerId: dealerId,
        }),
        keyName: 'pincode',
        value: 'pincode',
    })

    const initialValues: UpdateDealerSchemeInitialValues = {
        companyId: companyId || '',
        dealerId: dealerId || '',
        schemeId: schemeData?.schemeId || '',
        pincodes: schemeData?.pincodes?.map((item: any) => item) || [],
    }
    const validationSchema = object({
        schemeId: string().required('Please select scheme'),
        pincodes: array().min(1, 'Please select atleast 1 pincode'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: UpdateDealerSchemeInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            updateScheme({
                id: schemeId || '',
                body: {
                    dealerId: values.dealerId || '',
                    schemeId: values?.schemeId,
                    pincodes: values?.pincodes,
                    companyId: values.companyId || '',
                },
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Scheme edited successfully!')
                        navigate('/dealers/' + dealerId + '/scheme')
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
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditDealerScheme
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                            schemeOptions={schemeOptions}
                            pinCodeOptions={pinCodeOptions}
                        />
                    )
                }}
            </Formik>
        </div>
    )
}

export default EditDealerSchemeWrapper
