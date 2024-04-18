// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import EditArtist from './EditArtist'
import { showToast } from 'src/utils'
import { ArtistListResponse } from 'src/models'

// |-- Redux --|
import {
    useGetArtistByIdQuery,
    useUpdateArtistMutation,
} from 'src/services/media/ArtistServices'
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    artistName: string
}

const EditArtistWrapper = (props: Props) => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const params = useParams()
    const id = params.id

    // Initiate Method
    const [editArtists] = useUpdateArtistMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Hook
    const { items } = useGetDataByIdCustomQuery<ArtistListResponse>({
        useEndPointHook: useGetArtistByIdQuery(id),
    })

    const initialValues: FormInitialValues = {
        artistName: items?.artistName || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        artistName: string().required('Artist Name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            editArtists({
                body: {
                    artistName: values.artistName,
                    companyId: userData?.companyId || '',
                },
                id: id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Artist updated successfully!')
                        navigate('/media/artist')
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
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <EditArtist
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default EditArtistWrapper
