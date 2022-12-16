import { FormikProps } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMPageHeader from 'src/components/UI/atoms/ATMPageHeader/ATMPageHeader'
import { renderFormFields } from 'src/utils/dealer'
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

    // Constants
    const breadcrumbsList = [
        {
            label: "Dealer",
            onClick: () => { alert("Dealer") }
        },
        {
            label: "Add Dealer",
            onClick: () => { alert("Add Dealer") }
        },

    ]

    return (
        <>
            <ATMPageHeader
                pageTitle="Add Dealer"
                breadcrumbsList={breadcrumbsList}
            />
            <div className='w-full h-[calc(100%-70px)]  flex justify-center' >
                <div className='w-[100%]  px-12 max-h-full overflow-auto bg-white  shadow-lg rounded-lg relative '>

                    <div className='col-span-12 flex justify-end gap-3 sticky top-0 bg-white z-50 py-5'>
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

                    <div className='w-full  rounded   grid grid-cols-12 gap-7' >
                        {
                            renderFormFields(values, setFieldValue)
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default AddDealer
