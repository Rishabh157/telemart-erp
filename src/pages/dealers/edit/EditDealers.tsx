// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { Step, StepLabel, Stepper } from '@mui/material'
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMBreadCrumbs from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { FormInitialValues } from './EditDealerWrapper'

// |-- Redux --|
import { AppDispatch } from 'src/redux/store'
import { setFormSubmitting } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    activeStep: number
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    steps: any[]
    dealerCategoryOptions: any[]
    apiStatus: boolean
}

const EditDealers = ({
    formikProps,
    activeStep,
    setActiveStep,
    steps,
    dealerCategoryOptions,
    apiStatus,
}: Props) => {
    // Handle Previous
    const dispatch = useDispatch<AppDispatch>()
    const handlePrevious = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const breadcrumbs = [
        {
            label: 'Dealers',
            onClick: () => { },
            path: '/dealers',
        },
        {
            label: 'Update Dealer',
            onClick: () => { },
        },
    ]


    return (
        <div className="h-[calc(100vh-55px)] overflow-auto px-4 mt-3">
            <div className="flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div>
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Update Dealer </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">
                            {steps[activeStep]?.label}
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
                                onClick={() => {
                                    dispatch(setFormSubmitting(true))
                                    formikProps.handleSubmit()
                                }}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${apiStatus ? 'opacity-50' : ''
                                    }`}
                                disabled={apiStatus}
                            >
                                {activeStep === steps?.length - 1
                                    ? 'Submit'
                                    : 'Next'}
                            </button>
                        </div>
                    </div>

                    <div className="py-5 px-16 border-b border-slate-300">
                        {/* Steps */}
                        <Stepper activeStep={activeStep}>
                            {steps.map((step) => {
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
                            dealerCategoryOptions,
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDealers
