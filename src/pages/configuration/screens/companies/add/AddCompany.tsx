import { FormikProps } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormValues } from './AddCompanyWrapper'


type Props = {
    formikProps: FormikProps<FormValues>
}

const AddCompany = ({
    formikProps
}: Props
) => {

    const { values, setFieldValue , isSubmitting } = formikProps
    const navigate = useNavigate()

    return (
        <>
            <div className='w-full flex justify-center' >
                <div className='w-[75%] bg-white  shadow-lg '>

                    <div className='text-xl text-primary-main text-center p-2 border-b' >  Add Company </div>

                    <div className='px-2 py-4 rounded overflow-auto  grid grid-cols-12 gap-7 ' >
                        <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                            <ATMTextField
                                name='company_name'
                                value={values.company_name}
                                onChange={(e) => setFieldValue('company_name', e.target.value)}
                                label='Company Name'
                                placeholder='Enter Company Name'
                                required
                            />
                        </div>

                        <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                            <ATMTextField
                                name='logo'
                                value={values.logo}
                                onChange={(e) => setFieldValue('logo', e.target.value)}
                                label='Logo'
                                placeholder='Enter Website Url'

                            />
                        </div>

                        <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                            <ATMTextField
                                name='website_url'
                                value={values.website_url}
                                onChange={(e) => setFieldValue('website_url', e.target.value)}
                                label='Website Url'
                                placeholder='Enter Website Url'

                            />
                        </div>

                        <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                            <ATMTextField
                                name='address'
                                value={values.address}
                                onChange={(e) => setFieldValue('address', e.target.value)}
                                label='Address'
                                placeholder='Enter Address'

                            />
                        </div>

                        <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                            <ATMTextField
                                name='gst_no'
                                value={values.gst_no}
                                onChange={(e) => setFieldValue('gst_no', e.target.value)}
                                label='GST No'
                                placeholder='Enter GST No'

                            />
                        </div>

                        <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                            <ATMTextField
                                name='phone_no'
                                value={values.phone_no}
                                onChange={(e) => setFieldValue('phone_no', e.target.value)}
                                label='Phone No'
                                placeholder='Enter Phone No'

                            />
                        </div>

                        <div className='col-span-12 flex justify-end gap-3'>
                            <button type='button' onClick={() => navigate("/configuration/companies")} className='border w-[100px] border-primary-main text-primary-main rounded p-2' > Cancel </button>

                            <div className='w-[150px]' >

                                <ATMLoadingButton
                                    type='submit'
                                    isLoading={isSubmitting}
                                    disabled= {isSubmitting}

                                >
                                    Submit
                                </ATMLoadingButton>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default AddCompany
