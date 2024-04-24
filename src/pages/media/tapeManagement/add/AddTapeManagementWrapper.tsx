// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { object, string, array } from 'yup'
import { Formik, FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import AddTapeManagement from './AddTapeManagement'

// |-- Redux --|
import { useAddTapeMutation } from 'src/services/media/TapeManagementServices'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import { useGetAllLanguageQuery } from 'src/services/LanguageService'
import { useGetAllArtistQuery } from 'src/services/media/ArtistServices'
import { RootState } from 'src/redux/store'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'
import { useCustomOptions } from 'src/hooks/useCustomOptions'

// |-- Types--|
export type FormInitialValues = {
    tapeName: string
    tapeType: string
    schemeId: string
    languageId: string[]
    duration: string
    artistId: string[]
    remarks: string
    phone: {
        phoneNo: string
    }[]
    webSiteLink: string
    youtubeLink: string
    companyId: string
    hour: string
    minute: string
    second: string
}

const AddTapeManagementWrapper = () => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    // Initiate Method
    const [addTapeApi] = useAddTapeMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Hook
    const { options: channelGroupOptions } = useCustomOptions({
        useEndPointHook: useGetAllChannelGroupQuery(userData?.companyId),
        keyName: 'groupName',
        value: '_id',
    })

    const { options: languageOptions } = useCustomOptions({
        useEndPointHook: useGetAllLanguageQuery(''),
        keyName: 'languageName',
        value: '_id',
    })

    const { options: artistOptions } = useCustomOptions({
        useEndPointHook: useGetAllArtistQuery(userData?.companyId, {
            skip: !userData?.companyId,
        }),
        keyName: 'artistName',
        value: '_id',
    })

    const { options: schemeOptions } = useCustomOptions({
        useEndPointHook: useGetSchemeQuery(''),
        keyName: 'schemeName',
        value: '_id',
    })

    const initialValues: FormInitialValues = {
        tapeName: '',
        tapeType: '',
        schemeId: '',
        languageId: [],
        duration: '',
        artistId: [],
        remarks: '',
        phone: [
            {
                phoneNo: '',
            },
        ],
        webSiteLink: '',
        youtubeLink: '',
        hour: '0',
        minute: '00',
        second: '00',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        tapeName: string().required('Required'),
        tapeType: string().required('Required'),
        schemeId: string(),
        languageId: array().of(string()).required('Required'),
        hour: string().required('Required'),
        minute: string().required('Required'),
        second: string().required('Required'),
        artistId: array().of(string()).required('Required'),
        remarks: string(),
        webSiteLink: string(),
        youtubeLink: string(),
        phone: array().of(
            object().shape({
                phoneNo: string().required('Please enter phone number'),
            })
        ),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        let newphoneNo = values?.phone?.map((ele) => {
            return ele.phoneNo
        })
        let duration = `${values.hour}:${values.minute}:${values.second}`

        setTimeout(() => {
            addTapeApi({
                tapeName: values.tapeName,
                tapeType: values.tapeType,
                schemeId: values.schemeId || null,
                languageId: values.languageId,
                duration: duration,
                artistId: values.artistId,
                remarks: values.remarks || '',
                phone: newphoneNo,
                webSiteLink: values?.webSiteLink || '',
                youtubeLink: values?.youtubeLink || '',
                companyId: values.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Tape added successfully!')
                        navigate('/media/Tape')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                setApiStatus(false)
            })
        }, 1000)
        dispatch(setFormSubmitting(false))
    }

    const dropdownOptions = {
        channelGroupOptions,
        languageOptions,
        artistOptions,
        schemeOptions,
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <AddTapeManagement
                        dropdownOptions={dropdownOptions}
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddTapeManagementWrapper
