import React from 'react'
import { FormikProps } from 'formik'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import { FormInitialValues } from '../../EditDealerWrapper'
import { FieldType } from './StepEditOthersWrapper'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    othersformFields: { sectionName: string; fields: FieldType[] }[]
}

const StepEditOthers = ({ formikProps, othersformFields }: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )

    console.log('other documents form fields =>', values)

    return (
        <div className="">
            <div className={`py-9 px-7 border-b border-slate-400`}>
                <div className="text-primary-main text-lg pb-2 font-medium ">
                    Others
                </div>

                <div className="grid grid-cols-12 gap-4 gap-y-4">
                    <div className="col-span-4">
                        <ATMSwitchButton
                            name="isAutoMap"
                            value={values.isAutoMap}
                            label="Auto Map"
                            onChange={(value: any) => {
                                setFieldValue('isAutoMap', value)
                                setFieldValue('isCreditLimit', false)
                                setFieldValue('isAvailableQuantity', false)
                            }}
                        />
                    </div>

                    {values.isAutoMap && (
                        <>
                            <div className="col-span-4">
                                <ATMSwitchButton
                                    name="isCreditLimit"
                                    value={values.isCreditLimit}
                                    label="Credit Limit"
                                    onChange={(value: any) => {
                                        setFieldValue('isCreditLimit', value)
                                    }}
                                />
                            </div>
                            <div className="col-span-4">
                                <ATMSwitchButton
                                    name="isAvailableQuantity"
                                    value={values.isAvailableQuantity}
                                    label="Available Quantity"
                                    onChange={(value: any) => {
                                        setFieldValue(
                                            'isAvailableQuantity',
                                            value
                                        )
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StepEditOthers
