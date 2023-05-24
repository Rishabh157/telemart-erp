import React, { useEffect, useState } from 'react'
import MediaLayout from '../../MediaLayout'
import { useAddTapeMutation } from 'src/services/media/TapeManagementServices'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { object, string, array } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import { setChannelGroups } from 'src/redux/slices/media/channelGroupSlice'
import { GetAllChannelGroupResponse } from 'src/models/ChannelGroup.model'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import AddTapeManagement from './AddTapeManagement'
import { SchemeListResponse } from 'src/models/scheme.model'
import { useGetAllLanguageQuery } from 'src/services/LanguageService'
import { setLanguage } from 'src/redux/slices/languageSlice'
import { LanguageListResponse } from 'src/models'
import { setAllItems as setAllArtist } from 'src/redux/slices/media/artist'
import { useGetAllArtistQuery } from 'src/services/media/ArtistServices'

export type FormInitialValues = {
    tapeName: string
    channelGroupId: string
    tapeType: string
    schemeId: string
    languageId: string
    duration: string
    artistId: string[]
    remarks: string
    companyId: string
    hour: string
    minute: string
    second: string
}

const AddTapeManagementWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [schemeData, setSchemeData] = useState([])

    const ArtistState: any = useSelector((state: RootState) => state.artist)
    const { allItems: allArtist } = ArtistState

    const { userData } = useSelector((state: RootState) => state?.auth)

    const { channelgroup } = useSelector(
        (state: RootState) => state?.channelGroup
    )
    const { language } = useSelector((state: RootState) => state?.language)

    const [AddTapeApi] = useAddTapeMutation()
    const {
        data: artistData,
        isLoading: artistIsLoading,
        isFetching: artistIsFetching,
    } = useGetAllArtistQuery(' ')

    const {
        isLoading: isSchemeLoading,
        isFetching: isSchemeFetching,
        data: schemeDataApi,
    } = useGetSchemeQuery(' ')
    const {
        isLoading: isLanguageLoading,
        isFetching: isLanguageFetching,
        data: languageDataApi,
    } = useGetAllLanguageQuery(' ')
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
    const initialValues: FormInitialValues = {
        tapeName: '',
        channelGroupId: '',
        tapeType: '',
        schemeId: '',
        languageId: '',
        duration: '',
        artistId: [''],
        remarks: '',
        hour: '0',
        minute: '00',
        second: '00',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        tapeName: string().required('Required'),
        tapeType: string().required('Required'),
        channelGroupId: string(),
        languageId: string().required('Required'),
        hour: string().required('Required'),
        minute: string().required('Required'),
        second: string().required('Required'),
        artistId: array().of(string().required('Required')),
        remarks: string(),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        //console.log(values.artistId, "Add")
        let duration = `${values.hour}:${values.minute}:${values.second}`
        setTimeout(() => {
            AddTapeApi({
                tapeName: values.tapeName,
                channelGroupId: values.channelGroupId || null,
                tapeType: values.tapeType,
                schemeId: values.schemeId || null,
                languageId: values.languageId,
                duration: duration,
                artistId: values.artistId,
                remarks: values.remarks || '',
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
        </MediaLayout>
    )
}

export default AddTapeManagementWrapper
