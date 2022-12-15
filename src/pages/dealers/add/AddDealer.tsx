import { FormikProps } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { renderFormFields } from 'src/utils/company'
import { AddDealerFormValues } from './AddDealerWrapper'

type Props = {
    formikProps: FormikProps<AddDealerFormValues>
}

const AddDealer = ({
    formikProps,
}: Props
) => {

    const { values, setFieldValue, isSubmitting } = formikProps
    const navigate = useNavigate()

    return (
        <>
            <div className='w-full h-full flex justify-center' >
                <div className='w-[80%] max-h-full overflow-auto bg-white  shadow-lg '>

                    <div className='text-xl text-primary-main text-center p-2 border-b' >  Add Dealer </div>

                    <div className='w-full py-5 px-12 rounded   grid grid-cols-12 gap-7' >
                        {
                            renderFormFields(values, setFieldValue)
                        }

                        <div className='col-span-12 flex justify-end gap-3'>
                            <button type='button' onClick={() => navigate("/dealers")} className='border w-[100px] border-primary-main text-primary-main rounded p-2' > Cancel </button>

                            <div className='w-[150px]' >

                                <ATMLoadingButton
                                    type='submit'
                                    isLoading={isSubmitting}
                                    disabled={isSubmitting}

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

export default AddDealer
