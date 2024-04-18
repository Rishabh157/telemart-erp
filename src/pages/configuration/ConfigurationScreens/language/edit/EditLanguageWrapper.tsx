
// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import EditLanguage from './EditLanguage'

import {
    useGetLanguageByIdQuery,
    useUpdateLanguageMutation,
} from 'src/services/LanguageService'
import { showToast } from 'src/utils'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    languageName: string
}

const EditLanguageWrapper = (props: Props) => {
    const params = useParams()
    const Id = params.id
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [editLanguage] = useUpdateLanguageMutation()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetLanguageByIdQuery(Id),
    })
    const initialValues: FormInitialValues = {
        languageName: selectedItem?.languageName,
    }

    // Form Validation Schema
    const validationSchema = object({
        languageName: string().required('Required'),
    })
    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        editLanguage({
            body: {
                languageName: values.languageName,
                companyId: userData?.companyId || '',
            },
            id: Id || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Updated successfully!')
                    navigate('/configurations/language')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <EditLanguage
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default EditLanguageWrapper
