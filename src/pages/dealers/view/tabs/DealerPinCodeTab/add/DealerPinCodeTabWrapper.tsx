/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:DealerPincodeTabWrapper.tsx
// Type: Tab  Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { array, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import { useAddDealerPincodeMutation } from 'src/services/DealerPincodeService'
import { showToast } from 'src/utils'
import AddDealerPincode from './AddDealerPincode'

// |-- Redux --|
import { useGetAllDistrictQuery } from 'src/services/DistricService'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    dealerId: string
    pincodeDetail: {
        district: string
        tehsilId: string
        pincode: string[]
        estTime: number | 0
    }[]
}

const DealerPinCodeTabWrapper = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const dealerId: any = params.dealerId
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [allDistricts, setAllDistricts] = useState([])
    const [addDealerPincode] = useAddDealerPincodeMutation()

    const {
        data: districtData,
        isLoading: districtIsLoading,
        isFetching: districtIsFetching,
    } = useGetAllDistrictQuery('')

    useEffect(() => {
        if (!districtIsLoading && !districtIsFetching) {
            setAllDistricts(districtData?.data)
        }
    }, [districtData, districtIsLoading, districtIsFetching])

    const DistrictOptions = allDistricts?.map((ele: any) => {
        return {
            label: ele.districtName,
            value: ele._id,
        }
    })

    const initialValues: FormInitialValues = {
        dealerId: dealerId,
        pincodeDetail: [
            {
                district: '',
                tehsilId: '',
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
            return { ...rest, districtId: district } // return the new object without the _id property
        })
        setTimeout(() => {
            addDealerPincode({
                dealerId: values.dealerId || '',
                pincodeDetail: newPincodeDetail,
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
                            DistrictOptions={DistrictOptions}
                        />
                    )
                }}
            </Formik>
        </div>
    )
}

export default DealerPinCodeTabWrapper
