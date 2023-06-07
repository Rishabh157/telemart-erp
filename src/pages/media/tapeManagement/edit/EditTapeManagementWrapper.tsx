import React, { useEffect, useState } from 'react'
import MediaLayout from '../../MediaLayout'
import {
    useUpdateTapeMutation,
    useGetTapeByIdQuery,
} from 'src/services/media/TapeManagementServices'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string, array } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import { setChannelGroups } from 'src/redux/slices/media/channelGroupSlice'
import { GetAllChannelGroupResponse } from 'src/models/ChannelGroup.model'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useGetAllArtistQuery } from 'src/services/media/ArtistServices'
import EditTapeManagement from './EditTapeManagement'
import { SchemeListResponse } from 'src/models/scheme.model'
import { useGetAllLanguageQuery } from 'src/services/LanguageService'
import { setLanguage } from 'src/redux/slices/languageSlice'
import { LanguageListResponse } from 'src/models'
import { setSelectedItem } from 'src/redux/slices/media/tapeManagementSlice'
import { setAllItems as setAllArtist } from 'src/redux/slices/media/artist'
import { Field } from 'src/models/FormField/FormField.model'

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
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [schemeData, setSchemeData] = useState([])

    const ArtistState: any = useSelector((state: RootState) => state.artist)

    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.tapeManagement
    )
    const {
        data: tapeData,
        isLoading: tapeIsLoading,
        isFetching: tapeIsFetching,
    } = useGetTapeByIdQuery(id)

    useEffect(() => {
        if (!tapeIsLoading && !tapeIsFetching) {
            dispatch(setSelectedItem(tapeData?.data || []))
        }
    }, [dispatch, tapeData, tapeIsLoading, tapeIsFetching])

    const { userData } = useSelector((state: RootState) => state?.auth)

    const { channelgroup } = useSelector(
        (state: RootState) => state?.channelGroup
    )
    const { language } = useSelector((state: RootState) => state?.language)

    const { allItems: allArtist } = ArtistState

    const [updateTape] = useUpdateTapeMutation()

    const {
        data: artistData,
        isLoading: artistIsLoading,
        isFetching: artistIsFetching,
    } = useGetAllArtistQuery(' ')

    //console.log(artistData, 'artist')

    const {
        isLoading: isSchemeLoading,
        isFetching: isSchemeFetching,
        data: schemeDataApi,
    } = useGetSchemeQuery(' ')

    const {
        isLoading: isLanguageLoading,
        isFetching: isLanguageFetching,
        data: languageDataApi,
    } = useGetAllLanguageQuery(userData?.companyId)
    const {
        isLoading,
        isFetching,
        data: TapeGroupsData,
    } = useGetAllChannelGroupQuery('')

    useEffect(() => {
        if (!artistIsLoading && !artistIsFetching) {
            dispatch(setAllArtist(artistData?.data || []))
        }
    }, [artistData, artistIsLoading, artistIsFetching, dispatch])

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setChannelGroups(TapeGroupsData.data || []))
        }
    }, [isLoading, isFetching, TapeGroupsData, dispatch])

    useEffect(() => {
        if (!isLanguageLoading && !isLanguageFetching) {
            dispatch(setLanguage(languageDataApi.data || []))
        }
    }, [isLanguageLoading, isLanguageFetching, languageDataApi, dispatch])

    useEffect(() => {
        if (!isSchemeLoading && !isSchemeFetching) {
            setSchemeData(schemeDataApi?.data)
        }
    }, [isSchemeLoading, isSchemeFetching, schemeDataApi])

    const artist = selectedItem?.artistId.map((ele: any) => {
        return ele._id
    })
    //console.log(artist)
    const newDuration = selectedItem?.duration?.split(':')

    let phoneNumber: any = []

    selectedItem?.phone.map((val: any) => {
        return phoneNumber.push({ phoneNo: val })
    })

    const initialValues: FormInitialValues = {
        tapeName: selectedItem?.tapeName || '',
        tapeType: selectedItem?.tapeType || '',
        schemeId: selectedItem?.schemeId || '',
        languageId: selectedItem?.languageId || [],
        duration: selectedItem?.duration || '',
        artistId: artist || [],
        remarks: selectedItem?.remarks || '',
        phone: phoneNumber || '',
        webSiteLink: selectedItem?.webSiteLink || '',
        youtubeLink: selectedItem?.youtubeLink || '',
        hour: newDuration ? newDuration[0] : '0',
        minute: newDuration ? newDuration[1] : '00',
        second: newDuration ? newDuration[2] : '00',
        companyId: selectedItem?.companyId || userData?.companyId || '',
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
        phone: array().of(
            object().shape({
                phoneNo: string()
                    .required('Required')
                    .min(10, 'phone must be 10 digits')
                    .max(10, 'phone must be 10 digits'),
            })
        ),
        webSiteLink: string(),
        youtubeLink: string(),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        //console.log(values.artistId)
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
    }
    const dropdownOptions = {
        artistOption: allArtist.map((item: any) => {
            return {
                label: item.artistName,
                value: item._id,
            }
        }),
        channelGroupOptions:
            channelgroup?.map((channelGroup: GetAllChannelGroupResponse) => {
                return {
                    label: channelGroup.groupName,
                    value: channelGroup._id,
                }
            }) || [],
        schemeDataOption: schemeData?.map((schemeItem: SchemeListResponse) => {
            return {
                label: schemeItem?.schemeName,
                value: schemeItem?._id,
            }
        }),
        languageOptions: language?.map((languageItem: LanguageListResponse) => {
            return {
                label: languageItem?.languageName,
                value: languageItem?._id,
            }
        }),
        tapeTypeOption: [
            { label: 'Scheme Code', value: 'SCHEME_CODE' },
            { label: 'Promotional', value: 'PROMOTIONAL' },
            { label: 'Intruption', value: 'INTRUPTION' },
        ],
    }
    return (
        <MediaLayout>
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
        </MediaLayout>
    )
}

export default EditTapeManagementWrapper
