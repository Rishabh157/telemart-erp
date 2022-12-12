import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

type Props = {
    values: any,
    setFieldValue: (fieldName: string, value: any) => void
}

const AddDealer = ({
    values,
    setFieldValue,
}: Props
) => {

    return (
        <>

            <div className='w-full p-2  rounded overflow-auto  grid grid-cols-12 gap-7' >
                <div className='col-span-12 text-center text-xl text-slate-600 ' >  Add Dealer </div>
                <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                    <ATMTextField
                        name='name'
                        value={values.name}
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        label='Name'
                        placeholder='Enter dealer name'
                        required
                    />
                </div>

                <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                    <ATMTextField
                        name='mobile'
                        value={values.mobile}
                        onChange={(e) => setFieldValue('mobile', e.target.value)}
                        label='Mobile'
                        placeholder='Enter mobile no.'
                        required
                    />
                </div>

                <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                    <ATMTextField
                        name='dealer_code'
                        value={values.dealer_code}
                        onChange={(e) => setFieldValue('dealer_code', e.target.value)}
                        label='Dealer Code'
                        placeholder='Enter dealer code'
                        required
                    />
                </div>

                <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                    <ATMTextField
                        name='district'
                        value={values.district}
                        onChange={(e) => setFieldValue('district', e.target.value)}
                        label='District'
                        placeholder='Enter district'
                        required
                    />
                </div>

                <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                    <ATMTextField
                        name='password'
                        value={values.password}
                        onChange={(e) => setFieldValue('password', e.target.value)}
                        label='Password'
                        placeholder='Enter password'
                        required
                    />
                </div>

                <div className='lg:col-span-4 md:col-span-6 col-span-12  h-fit' >
                    <ATMTextField
                        name='confirm_password'
                        value={values.confirm_password}
                        onChange={(e) => setFieldValue('confirm_password', e.target.value)}
                        label='Confirm Password'
                        placeholder='Enter confirm password'
                        required
                    />
                </div>

                <div className='col-span-12 flex justify-end'  >
                    <button type='submit' className='border w-[100px] bg-primary-main text-white rounded p-2' > Submit </button>
                </div>
            </div>
        </>
    )
}

export default AddDealer
