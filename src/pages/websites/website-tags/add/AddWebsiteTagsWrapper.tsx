import React, { useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import AddWebsiteTag from './AddWebsiteTag'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useAddWebsiteTagsMutation } from 'src/services/websites/WebsiteTagsServices'
import WebsiteLayout from '../../WebsiteLayout'

type Props = {}

export type FormInitialValues = {
	websitPageIid: string
	websiteMasterId: string
	metaDescription: string
	metaKeyword: string
	metaOgTitle: string
	metaOgUrl: string
	metaOgImage: string
	metaOgDescription: string
	metaOgType: string
	metaTwitterTitle: string
	metaTwitterCard: string
	metaTwitterImage: string
	companyId: string	
}

const AddWebsiteTagsWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()    
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addWebsiteTags] = useAddWebsiteTagsMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
			websitPageIid: '',
			websiteMasterId: '',
			metaDescription: '',
			metaKeyword: '',
			metaOgTitle: '',
			metaOgUrl: '',
			metaOgImage: '',
			metaOgDescription: '',
			metaOgType: '',
			metaTwitterTitle: '',
			metaTwitterCard: '',
			metaTwitterImage: '',
			companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
			metaDescription: string().required('Required'),
			metaKeyword: string().required('Required'),
			metaOgTitle: string().required('Required'),
			metaOgUrl: string().url('URL must be valid'),
			metaOgImage: string().url('Image must be valid url'),
			metaOgDescription: string().required('Required'),
			metaOgType: string().required('Required'),
			metaTwitterTitle: string().required('Required'),
			metaTwitterCard: string().required('Required'),
			metaTwitterImage: string().url('Image must be valid url'),      
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        //console.log(values)
        setTimeout(() => {
            addWebsiteTags({
							websitPageIid: '',
							websiteMasterId: '',
							metaDescription: values?.metaDescription ||'',
							metaKeyword: values?.metaKeyword || '',
							metaOgTitle: values?.metaOgTitle || '',
							metaOgUrl: values?.metaOgUrl || '',
							metaOgImage: values?.metaOgImage || '',
							metaOgDescription: values?.metaOgDescription ||'',
							metaOgType: values?.metaOgType || '',
							metaTwitterTitle: values?.metaTwitterTitle || '',
							metaTwitterCard: values?.metaTwitterCard || '',
							metaTwitterImage: values?.metaTwitterImage || '',
							companyId: userData?.companyId || '',               
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Tags added successfully!')
                        navigate('/all-websites/website-tags')
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
        <WebsiteLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddWebsiteTag
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </WebsiteLayout>
    )
}

export default AddWebsiteTagsWrapper
