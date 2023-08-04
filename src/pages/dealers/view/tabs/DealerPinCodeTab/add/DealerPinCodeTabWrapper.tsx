/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:DealerPincodeTabWrapper.tsx
// Type: Tab  Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { array, number, object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AddDealerPincode from './AddDealerPincode'
import { useAddDealerPincodeMutation } from 'src/services/DealerPincodeService'
import { showToast } from 'src/utils'
import { useGetAllPincodeQuery } from 'src/services/PinCodeService'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllPincodes as setAllDealerPincodes } from 'src/redux/slices/pincodeSlice'
import { useGetAllDistrictQuery } from 'src/services/DistricService'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    companyId: string
    dealerId: string
    pincodeDetail: {
        district: string
        pincode: string[]
        estTime: number | 0
    }[]
}

const DealerPinCodeTabWrapper = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const dealerId: any = params.dealerId
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [allDistricts, setAllDistricts] = useState([])
    const [addDealerPincode] = useAddDealerPincodeMutation()
    const dealerPincodeState: any = useSelector(
        (state: RootState) => state.dealerPincode
    )
    const { items } = dealerPincodeState

    const {
        data: pinCodeData,
        isLoading: pinCodeIsLoading,
        isFetching: pinCodeIsFetching,
    } = useGetAllPincodeQuery('')

    const {
        data: districtData,
        isLoading: districtIsLoading,
        isFetching: districtIsFetching,
    } = useGetAllDistrictQuery('')

    useEffect(() => {
        const unmatchedObjects = pinCodeData?.data.filter(
            (item2: any) =>
                !items.some((item1: any) => item1.pincode === item2.pincode)
        )

        dispatch(setAllDealerPincodes(unmatchedObjects))
    }, [pinCodeData, pinCodeIsLoading, pinCodeIsFetching, dispatch])

    useEffect(() => {
        if (!districtIsLoading && !districtIsFetching) {
            setAllDistricts(districtData?.data)
        }
    }, [districtData, districtIsLoading, districtIsFetching])

    const { allPincodes: pincodeItems }: any = useSelector(
        (state: RootState) => state?.pincode
    )

    const pincodeOptions = pincodeItems?.map((ele: any) => {
        return {
            label: ele.pincode,
            value: ele.pincode,
        }
    })

    const DistrictOptions = allDistricts?.map((ele: any) => {
        return {
            label: ele.districtName,
            value: ele._id,
        }
    })

    const initialValues: FormInitialValues = {
        companyId: companyId,
        dealerId: dealerId,
        pincodeDetail: [
            {
                district: '',
                pincode: [],
                estTime: 0,
            },
        ],
    }

    const validationSchema = object({
        pincodeDetail: array().of(
            object().shape({
                estTime: number()
                    .min(1, 'Please enter estimated time')
                    .required('Please enter estimated time'),
                pincode: array()
                    .of(string().required('Required'))
                    .min(1, 'Required'),
            })
        ),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        const newPincodeDetail = values.pincodeDetail.map((ele: any) => {
            const { district, ...rest } = ele // use object destructuring to remove the _id property
            return rest // return the new object without the _id property
        })
        setTimeout(() => {
            addDealerPincode({
                dealerId: values.dealerId || '',
                pincodeDetail: newPincodeDetail,
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
                            DistrictOptions={DistrictOptions}
                        />
                    )
                }}
            </Formik>
        </div>
    )
}

export default DealerPinCodeTabWrapper
