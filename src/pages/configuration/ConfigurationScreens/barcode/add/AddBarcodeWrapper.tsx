/// ==============================================
// Filename:AddBarcodeWrapper.tsx
// Type: ADD Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { number, object, string } from 'yup'

// |-- Internal Dependencies --|

import { WarehousesListResponse } from 'src/models'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { useAddBarcodeMutation } from 'src/services/BarcodeService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { showToast } from 'src/utils'
import AddBarcode from './AddBarcode'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    productGroup: string
    // wareHouseId: string
    quantity: string
    lotNumber: string
}

const AddBarcodeWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    const [wareHouseOption, setWareHouseOption] = useState<SelectOption[] | []>(
        []
    )

    const {
        data: whData,
        isLoading: whIsLoading,
        isFetching: whIsFetching,
    } = useGetWareHousesQuery(userData?.companyId)

    useEffect(() => {
        if (!whIsFetching && !whIsLoading) {
            const options = whData?.data?.map((ele: WarehousesListResponse) => {
                return {
                    label: ele?.wareHouseName,
                    value: ele?._id,
                }
            })
            setWareHouseOption(options)
        }
    }, [whData, whIsLoading, whIsFetching])

    const [addBarcode] = useAddBarcodeMutation()

    // Form Initial Values
    const initialValues: FormInitialValues = {
        productGroup: '',
        quantity: '',
        lotNumber: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        productGroup: string().required('Group Name is required'),
        quantity: number()
            .moreThan(0, 'Quantity must be greater than 0')
            .required('Quantity is required'),
        lotNumber: string().required('Batch number is required'),
        // wareHouseId: string().required('Warehouse is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = async (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        const uniqueGrouId = uuidv4()

        await addBarcode({
            productGroupId: values.productGroup,
            barcodeGroupNumber: uniqueGrouId,
            quantity: Number(values?.quantity),
            lotNumber: values.lotNumber,
            companyId: userData?.companyId || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Added successfully!')
                    navigate('/configurations/barcode')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }

    const { options: productGroupOption } = useCustomOptions({
        useEndPointHook: useGetAllProductGroupQuery(''),
        keyName: 'groupName',
        value: '_id',
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddBarcode
                        formikProps={formikProps}
                        apiStatus={apiStatus}
                        productGroupOption={productGroupOption}
                        wareHouseOption={wareHouseOption}
                    />
                )
            }}
        </Formik>
    )
}

export default AddBarcodeWrapper
