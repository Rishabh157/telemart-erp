// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { array, object, string } from 'yup'
// import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AddSchemeToDealerMapping from './AddSchemeToDealerMapping'

// import { useAddAttributeGroupMutation } from 'src/services/AttributeGroup'
import { showToast } from 'src/utils'
// import { useGetAllAttributesQuery } from 'src/services/AttributeService'
// import { setAllItems } from 'src/redux/slices/attributesSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useSaveMultipleDealerToSingleSchemeMutation } from 'src/services/DealerServices'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { SelectOption } from 'src/models/FormField/FormField.model'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    schemeId: string
    dealers: { label: string; value: string }[]
    dealersToRemove : { label: string; value: string }[]
}

const AddSchemeToDealerMappingWrapper = (props: Props) => {
    // Form Initial Values
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const [schemeListOptions, setSchemeListOptions] = React.useState<
        SelectOption[] | []
    >([])

    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [saveMultipleDealerToSingleScheme] =
        useSaveMultipleDealerToSingleSchemeMutation()

    const initialValues: FormInitialValues = {
        schemeId: '',
        dealers: [],
        dealersToRemove: [],
    }

    // Form Validation Schema
    const validationSchema = object({
        schemeId: string().required('Required'),
        dealers: array()
            .of(
                object().shape({
                    label: string().required(),
                    value: string().required(),
                })
            )
            .min(1, 'Please select atleast 1 dealer'),
    })

    // GET SCHEME LIST BY companyId
    const {
        data: schemeListData,
        isFetching: isSchemeListFetching,
        isLoading: isSchemeListLoading,
    } = useGetSchemeQuery(userData?.companyId, {
        skip: !userData?.companyId,
    })

    // Get Schemes by companyId
    useEffect(() => {
        if (!isSchemeListFetching && !isSchemeListLoading) {
            const schemeList = schemeListData?.data?.map((scheme: any) => {
                return {
                    label: scheme?.schemeName,
                    value: scheme?._id,
                }
            })
            setSchemeListOptions(schemeList)
        }
    }, [schemeListData, isSchemeListFetching, isSchemeListLoading])

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        setTimeout(() => {
            saveMultipleDealerToSingleScheme({
                schemeId: values.schemeId,
                dealers: values.dealers?.map((ele) => ele?.value),
                dealersToRemove: values.dealersToRemove?.map((ele) => ele?.value),
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
                    <AddSchemeToDealerMapping
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        schemeListOption={schemeListOptions || []}
                    />
                )
            }}
        </Formik>
    )
}

export default AddSchemeToDealerMappingWrapper
