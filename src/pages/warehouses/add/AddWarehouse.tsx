import { Step, StepLabel, Stepper } from '@mui/material'
import { FormikProps } from 'formik'
import React from 'react'
import ATMBreadCrumbs from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { FormInitialValues } from './AddWarehouseWrapper'
import { setFormSubmitting } from 'src/redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/redux/store'
import { useLocation } from 'react-router-dom'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    activeStep: number
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    steps: any[]
    apiStatus: boolean
    allCountry: any
}

const AddWarehouse = ({
    formikProps,
    activeStep,
    setActiveStep,
    steps,
    apiStatus,
    allCountry,
}: Props) => {
    // Handle Previous
    const dispatch = useDispatch<AppDispatch>()
    const handlePrevious = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
    const { state } = useLocation()
    const vendorId = state?.params?.vendorId || null
    const dealerId = state?.params?.dealerId || null
    let redirectPath = 'warehouse'
    let redirectLabel = 'Warehouse'
    if (dealerId) {
        redirectLabel = 'Dealer Warehouse'
        redirectPath = `dealers/${dealerId}/warehouse`
    } else if (vendorId) {
        redirectLabel = 'Vendor Warehouse'
        redirectPath = `vendors/${vendorId}/warehouse`
    }
    const breadcrumbs = [
        {
            label: `${redirectLabel}`,
            path: `/${redirectPath}`,
        },
        {
            label: 'Add Warehouse',
        },
    ]

    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New warehouse </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">
                            {' '}
                            {steps[activeStep]?.label}{' '}
                        </div>

                        {/* Buttons - Previous / Next */}
                        <div className="flex gap-1">
                            {activeStep > 0 && (
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    className="text-primary-main font-semibold py-1 px-5 hover:border border-primary-main rounded"
                                >
                                    Previous
                                </button>
                            )}

                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => {
                                    dispatch(setFormSubmitting(true))
                                    formikProps.handleSubmit()
                                }}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    apiStatus ? 'opacity-50' : ''
                                }`}
                            >
                                {activeStep === steps.length - 1
                                    ? 'Submit'
                                    : 'Next'}
                            </button>
                        </div>
                    </div>

                    <div className="py-5 px-16 border-b border-slate-300">
                        {/* Steps */}
                        <Stepper activeStep={activeStep}>
                            {steps.map((step, index) => {
                                const stepProps: { completed?: boolean } = {}
                                const labelProps: {
                                    optional?: React.ReactNode
                                } = {}
                                return (
                                    <Step key={step.label} {...stepProps}>
                                        <StepLabel {...labelProps}>
                                            {step.label}
                                        </StepLabel>
                                    </Step>
                                )
                            })}
                        </Stepper>
                    </div>

                    {/* Form */}
                    <div className="grow">
                        {steps[activeStep]?.component({
                            formikProps,
                            allCountry,
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddWarehouse
