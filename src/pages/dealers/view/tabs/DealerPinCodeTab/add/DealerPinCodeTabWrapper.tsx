import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { array, number, object, string } from 'yup'
import AddDealerPincode from './AddDealerPincode'
import { useAddDealerPincodeMutation } from 'src/services/DealerPincodeService'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useGetAllPincodeQuery } from 'src/services/PinCodeService'
import { setAllPincodes as setAllDealerPincodes } from 'src/redux/slices/pincodeSlice'

type Props = {}

export type FormInitialValues = {
    companyId: string
    dealerId: string
    pincodeDetail: {
        pincode: string
        estTime: number | 0
    }[]
}

const DealerPinCodeTabWrapper = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const dealerId: any = params.dealerId
    const dispatch = useDispatch()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addDealerPincode] = useAddDealerPincodeMutation()

    const {
        data: pinCodeData,
        isLoading: pinCodeIsLoading,
        isFetching: pinCodeIsFetching,
    } = useGetAllPincodeQuery('')

    useEffect(() => {
        dispatch(setAllDealerPincodes(pinCodeData?.data))
    }, [pinCodeData, pinCodeIsLoading, pinCodeIsFetching, dispatch])

    const { allPincodes: pincodeItems }: any = useSelector(
        (state: RootState) => state?.pincode
    )

    const pincodeOptions = pincodeItems?.map((ele: any) => {
        return {
            label: ele.pincode,
            value: ele.pincode,
        }
    })

    const initialValues: FormInitialValues = {
        companyId: companyId,
        dealerId: dealerId,
        pincodeDetail: [
            {
                pincode: '',
                estTime: 0,
            },
        ],
    }

    const validationSchema = object({
        pincodeDetail: array().of(
            object().shape({
                estTime: number().required('Please enter Estimated Time'),
                pincode: string().required('Please select any pincode'),
            })
        ),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)

        setTimeout(() => {
            addDealerPincode({
                dealerId: values.dealerId || '',
                pincodeDetail: values.pincodeDetail,
                companyId: values.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Pincode added successfully!')
                        navigate('/dealers/' + dealerId + '/pincode')
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
                        <AddDealerPincode
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                            pincodeOptions={pincodeOptions}
                        />
                    )
                }}
            </Formik>
        </div>
    )
}

export default DealerPinCodeTabWrapper
