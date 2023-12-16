/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:DealerSchemeTabWrapper.tsx
// Type: Tab Add Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { array, object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AddDealerScheme from './AddDealerScheme'
import {
    useAddDealerSchemeMutation,
    useGetAllDealerSchemeByDealerIdQuery,
} from 'src/services/DealerSchemeService'
import { useGetAllPincodeByDealerQuery } from 'src/services/DealerPincodeService'
import { showToast } from 'src/utils'
import { AddDealerSchemeFormInitialValues } from 'src/models/DealerScheme.model'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllItems as setAllDealerSchemes } from 'src/redux/slices/schemeSlice'

// |-- Types --|
type Props = {}

const DealerPinCodeTabWrapper = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const dealerId: any = params.dealerId
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [pinCodeOptions, setPinCodeOptions] = useState([])
    const [addDealerScheme] = useAddDealerSchemeMutation()

    const {
        data: schemeData,
        isLoading: schemeIsLoading,
        isFetching: schemeIsFetching,
    } = useGetAllDealerSchemeByDealerIdQuery({
        companyId: userData?.companyId,
        dealerId,
    })
    useEffect(() => {
        return () => {
            dispatch(setAllDealerSchemes([]))
        }
    }, [])
    useEffect(() => {
        dispatch(setAllDealerSchemes(schemeData?.data))
    }, [schemeData, schemeIsLoading, schemeIsFetching, dispatch, dealerId])

    const { allItems: schemeItems }: any = useSelector(
        (state: RootState) => state?.scheme
    )
    const schemeOptions = schemeItems?.map((ele: any) => {
        return {
            label: ele.schemeName,
            value: ele._id,
        }
    })
    const {
        data: pinCodeList,
        isLoading: pinCodeIsLoading,
        isFetching: pinCodeIsFetching,
    } = useGetAllPincodeByDealerQuery({
        companyId: companyId,
        dealerId: dealerId,
    })

    useEffect(() => {
        if (!pinCodeIsLoading && !pinCodeIsFetching) {
            let options: any = []
            pinCodeList?.data?.map((item: any) => {
                return item?.pincode?.foreach((pincode: any) => {
                    options = [
                        ...options,
                        {
                            label: pincode,
                            value: pincode,
                        },
                    ]
                })
            })
            setPinCodeOptions(options)
        }
    }, [pinCodeList, pinCodeIsLoading, pinCodeIsFetching])

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
