import { FormikProps } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMPageHeader from 'src/components/UI/atoms/ATMPageHeader/ATMPageHeader'
import { renderFormFields } from 'src/utils/warehouse/formFields'
import { AddWarehouseFormValues } from './AddWarehouseWrapper'

type Props = {
    formikProps: FormikProps<AddWarehouseFormValues>
}

const AddWarehouse = ({
    formikProps,
}: Props
) => {

    const { values, setFieldValue, isSubmitting } = formikProps
    const navigate = useNavigate()

    // Constants
    const breadcrumbsList = [
        {
            label: "Warehouses",
            onClick: () => { navigate("/warehouse") }
        },
        {
            label: "Add Warehouse",
        },

    ]

    return (
        <>
            <ATMPageHeader
                pageTitle="Add Warehouse"
                breadcrumbsList={breadcrumbsList}
            />
            <div className='w-full h-[calc(100%-70px)]  flex justify-center' >
                <div className='w-[100%]  px-12 max-h-full overflow-auto bg-white  shadow-lg rounded-lg relative '>

                    <div className='col-span-12 flex justify-end gap-3 sticky top-0 bg-white z-50 py-5'>
                        <button type='button' onClick={() => navigate("/warehouse")} className='border w-[100px] border-primary-main text-primary-main rounded p-2' > Cancel </button>

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
                            {renderFormFields(values , setFieldValue)}

                    </div>
                </div>
            </div>
        </>
    )
}

export default AddWarehouse
