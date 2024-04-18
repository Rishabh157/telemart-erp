// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { array, object, string } from 'yup'

// |-- Internal Dependencies --|
import { AddDealerSchemeFormInitialValues } from 'src/models/DealerScheme.model'
import { useGetAllPincodeDealerQuery } from 'src/services/DealerPincodeService'
import {
    useAddDealerSchemeMutation,
    useGetAllDealerSchemeByDealerIdQuery,
} from 'src/services/DealerSchemeService'
import { showToast } from 'src/utils'
import AddDealerScheme from './AddDealerScheme'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

const DealerPinCodeTabWrapper = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const dealerId: any = params.dealerId
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addDealerScheme] = useAddDealerSchemeMutation()

    const { options: schemeOptions } = useCustomOptions({
        useEndPointHook: useGetAllDealerSchemeByDealerIdQuery({
            companyId: userData?.companyId,
            dealerId,
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

    const initialValues: AddDealerSchemeFormInitialValues = {
        companyId: companyId,
        dealerId: dealerId,
        details: [
            {
                schemeId: '',
                pincodes: pinCodeOptions?.map((item: any) => item?.label),
            },
        ],
    }

    const validationSchema = object({
        details: array()
            .of(
                object().shape({
                    schemeId: string().required('Please select scheme'),
                    pincodes: array()
                        .min(1, 'Please select atleast 1 pincode')
                        .required('Please select atleast 1 pincode'),
                })
            )
            .min(1, 'Please select atleast 1 Scheme'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: AddDealerSchemeFormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addDealerScheme({
                dealerId: values.dealerId || '',
                details: values?.details,
                companyId: values.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Scheme added successfully!')
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
                        <AddDealerScheme
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

export default DealerPinCodeTabWrapper
