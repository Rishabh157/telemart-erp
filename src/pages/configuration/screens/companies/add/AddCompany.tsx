import React from 'react'
// import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'


type Props = {
    values: any,
    setFieldValue: (fieldName: string, value: any) => void
}

const AddCompany = ({
    values,
    setFieldValue,
}: Props
) => {
    return (
        <>
            <div className='w-full p-2  rounded overflow-auto  grid grid-cols-12 gap-7' >
                <div className='col-span-12 text-center text-xl text-slate-600 ' >  Add Company </div>

                {/* <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                    <ATMTextField
                        name='company_name'
                        value={values.name}
                        onChange={(e) => setFieldValue('company_name', e.target.value)}
                        label='Company Name'
                        placeholder='Enter Company Name'
                        required
                    />
                </div>

                <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                    <ATMTextField
                        name='logo'
                        value={values.mobile}
                        onChange={(e) => setFieldValue('logo', e.target.value)}
                        label='Logo'
                        placeholder='Enter Website Url'
                        
                    />
                </div>

                <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                    <ATMTextField
                        name='website_url'
                        value={values.dealer_code}
                        onChange={(e) => setFieldValue('website_url', e.target.value)}
                        label='Website Url'
                        placeholder='Enter Website Url'
                        
                    />
                </div>

                <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                    <ATMTextField
                        name='address'
                        value={values.district}
                        onChange={(e) => setFieldValue('address', e.target.value)}
                        label='Address'
                        placeholder='Enter Address'
                        
                    />
                </div>

                <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                    <ATMTextField
                        name='gst_no'
                        value={values.password}
                        onChange={(e) => setFieldValue('gst_no', e.target.value)}
                        label='GST No'
                        placeholder='Enter GST No'
                        
                    />
                </div>

                <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                    <ATMTextField
                        name='phone_no'
                        value={values.confirm_password}
                        onChange={(e) => setFieldValue('phone_no', e.target.value)}
                        label='Phone No'
                        placeholder='Enter Phone No'
                        
                    />
                </div> 

                <div className='col-span-12 flex justify-end'  >
                    <button type='submit' className='border w-[100px] bg-primary-main text-white rounded p-2' > Submit </button>
                </div>
                */}

            </div>
        </>
    )
}

export default AddCompany
