import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
// import { v4 as uuidv4 } from "uuid";
import { useGetAllCartonBoxQuery } from 'src/services/CartonBoxService'
// import { useAddCartonBoxBarcodeMutation } from "src/services/CartonBoxBarcodeService";
import AddCbBarcode from './AddCbBarcode'
import { setAllItems } from 'src/redux/slices/cartonBoxSlice'

type Props = {}

export type FormInitialValues = {
    cartonBox: string
    quantity: string
}

const AddCbBarcodeWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState(false)
    // const { userData } = useSelector((state: RootState) => state?.auth);
    const { allItems }: any = useSelector(
        (state: RootState) => state?.cartonBox
    )

    // const [AddCartonBoxBarcode] = useAddCartonBoxBarcodeMutation();
    const {
        data: cbData,
        isLoading: cbIsLoading,
        isFetching: cbIsFetching,
    } = useGetAllCartonBoxQuery('')

    useEffect(() => {
        dispatch(setAllItems(cbData?.data))
    }, [dispatch, cbData, cbIsLoading, cbIsFetching])

    // Form Initial Values
    const initialValues: FormInitialValues = {
        cartonBox: '',
        quantity: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        cartonBox: string().required('Group Name is required'),
        quantity: string().required('Quantity is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = async (values: FormInitialValues) => {
        setApiStatus(true)
        // const uniqueGroupId = uuidv4();
        // const promises = [];
        // for (let i = 0; i < Number(values?.quantity); i++) {
        //   const uniqueId = uuidv4();
        //   promises.push(
        //     AddCartonBoxBarcode({
        //       cartonBoxId: values.cartonBox,
        //       barcodeNumber: uniqueId,
        //       barcodeGroupNumber: uniqueGroupId,
        //       companyId: userData?.companyId || "",
        //       cartonBoxItems: ["string"],
        //     })
        //   );
        // }
        // await Promise.all(promises); // Wait for all promises to complete
        setApiStatus(false)
        navigate('/configurations/barcode')
        showToast('success', 'Carton-box Barcode added successfully!')
    }
    const cartonBoxOption = allItems?.map((ele: any) => {
        return { label: ele?.boxName, value: ele?._id }
    })

    return (
        <ConfigurationLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddCbBarcode
                            formikProps={formikProps}
                            apiStatus={apiStatus}
                            cartonBoxOption={cartonBoxOption}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default AddCbBarcodeWrapper
