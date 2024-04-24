// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string, array } from 'yup'
import { Formik, FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import { TapeManagementListResponse } from 'src/models/tapeManagement.model'
import EditTapeManagement from './EditTapeManagement'
import { Field } from 'src/models/FormField/FormField.model'

// |-- Redux --|
import {
    useUpdateTapeMutation,
    useGetTapeByIdQuery,
} from 'src/services/media/TapeManagementServices'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import { useGetAllArtistQuery } from 'src/services/media/ArtistServices'
import { useGetAllLanguageQuery } from 'src/services/LanguageService'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useCustomOptions } from 'src/hooks/useCustomOptions'

// |-- Types --|
export type FormInitialValues = {
    tapeName: string
    tapeType: string
    schemeId: string
    languageId: string[]
    duration: string
    artistId: string[]
    phone: {
        phoneNo: string
    }[]
    webSiteLink: string
    youtubeLink: string
    remarks: string
    companyId: string
    hour: string
    minute: string
    second: string
}

export type FieldType = Field<''>
const formFields: { sectionName: string; fields: FieldType[] }[] = [
    {
        sectionName: 'phone',
        fields: [
            {
                name: 'phone',
                label: 'Phone Number',
                placeholder: 'Phone Number',
            },
        ],
    },
]

const EditTapeManagementWrapper = () => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const params = useParams()
    const id = params.id
    const { userData } = useSelector((state: RootState) => state?.auth)

    // Initiate Method
    const [updateTape] = useUpdateTapeMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    // Hook
    const { items } = useGetDataByIdCustomQuery<TapeManagementListResponse>({
        useEndPointHook: useGetTapeByIdQuery(id),
    })

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

    // set the phone number in field array format
    const newDuration = items?.duration?.split(':')
    let phoneNumber: any = []

    items?.phone?.map((val: any) => {
        return phoneNumber.push({ phoneNo: val })
    })

    const initialValues: FormInitialValues = {
        tapeName: items?.tapeName || '',
        tapeType: items?.tapeType || '',
        schemeId: items?.schemeId || '',
        languageId: items?.languageId || [],
        duration: items?.duration || '',
        artistId: items?.artistId?.map((ele: any) => ele?._id) || [],
        remarks: items?.remarks || '',
        phone: phoneNumber || '',
        webSiteLink: items?.webSiteLink || '',
        youtubeLink: items?.youtubeLink || '',
        hour: newDuration ? newDuration[0] : '0',
        minute: newDuration ? newDuration[1] : '00',
        second: newDuration ? newDuration[2] : '00',
        companyId: items?.companyId || userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        tapeName: string().required('Required'),
        tapeType: string().required('Required'),
        schemeId: string(),
        languageId: array().of(string().required('Required')),
        hour: string().required('Required'),
        minute: string().required('Required'),
        second: string().required('Required'),
        artistId: array().of(string().required('Required')),
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

        let duration = `${values.hour}:${values.minute}:${values.second}`
        let newPhoneNo = values?.phone?.map((ele) => {
            return ele.phoneNo
        })

        setTimeout(() => {
            updateTape({
                body: {
                    tapeName: values.tapeName,
                    tapeType: values.tapeType,
                    schemeId: values.schemeId || null,
                    languageId: values.languageId,
                    duration: duration,
                    artistId: values?.artistId,
                    remarks: values.remarks || '',
                    phone: newPhoneNo,
                    webSiteLink: values?.webSiteLink || '',
                    youtubeLink: values?.youtubeLink || '',
                    companyId: values.companyId || '',
                },
                id: id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Tape Updated successfully!')
                        navigate('/media/tape')
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

    const dropdownOptions = {
        channelGroupOptions,
        languageOptions,
        artistOptions,
        schemeOptions,
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <EditTapeManagement
                        dropdownOptions={dropdownOptions}
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        formFields={formFields}
                    />
                )
            }}
        </Formik>
    )
}

export default EditTapeManagementWrapper
