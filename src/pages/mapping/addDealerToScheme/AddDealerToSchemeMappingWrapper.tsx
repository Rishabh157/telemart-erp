// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { array, object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AddDealerToSchemeMapping from './AddDealerToSchemeMapping'
import { showToast } from 'src/utils'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import {
    useGetAllDealersQuery,
    useSaveMultipleSchemeToSingleDealerMutation,
} from 'src/services/DealerServices'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { SelectOption } from 'src/models/FormField/FormField.model'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    dealerId: string
    schemes: { label: string; value: string }[]
    schemeToRemove: { label: string; value: string }[]
}

const AddDealerToSchemeMappingWrapper = (props: Props) => {
    // Form Initial Values
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const [schemeListOptions, setSchemeListOptions] = React.useState<
        SelectOption[] | []
    >([])

    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [saveMultipleSchemeToSingleDealer] =
        useSaveMultipleSchemeToSingleDealerMutation()

    const initialValues: FormInitialValues = {
        dealerId: '',
        schemes: [],
        schemeToRemove: [],
    }

    // Form Validation Schema
    const validationSchema = object({
        dealerId: string().required('Required'),
        schemes: array().of(
            object().shape({
                label: string().required(),
                value: string().required(),
            })
        ),
        schemeToRemove: array().of(
            object().shape({
                label: string().required(),
                value: string().required(),
            })
        ),
    })

    // GET SCHEME LIST BY companyId
    const {
        data: dealerListData,
        isFetching: isDealerListFetching,
        isLoading: isDealerListLoading,
    } = useGetAllDealersQuery(userData?.companyId, {
        skip: !userData?.companyId,
    })

    // Get Schemes by companyId
    useEffect(() => {
        if (!isDealerListFetching && !isDealerListLoading) {
            const schemeList = dealerListData?.data?.map((dealer: any) => {
                return {
                    label: dealer?.firstName?.concat(' ', dealer?.lastName),
                    value: dealer?._id,
                }
            })
            setSchemeListOptions(schemeList)
        }
    }, [dealerListData, isDealerListFetching, isDealerListLoading])

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        setTimeout(() => {
            saveMultipleSchemeToSingleDealer({
                dealerId: values.dealerId,
                schemes: values.schemes?.map((ele) => ele?.value),
                schemesToRemove: values.schemeToRemove?.map(
                    (ele) => ele?.value
                ),
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
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
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddDealerToSchemeMapping
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        schemeListOption={schemeListOptions || []}
                    />
                )
            }}
        </Formik>
    )
}

export default AddDealerToSchemeMappingWrapper
