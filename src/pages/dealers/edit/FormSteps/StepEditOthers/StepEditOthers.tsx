/// ==============================================
// Filename:StepEditOthers.tsx
// Type: Edit Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import { FormInitialValues } from '../../EditDealerWrapper'
import { getHierarchyByDept } from 'src/utils/GetHierarchyByDept'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { SelectOption } from 'src/models/FormField/FormField.model'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

const StepEditOthers = ({ formikProps }: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="">
            <div className={`py-9 px-7 border-b border-slate-400`}>
                <div className="grid grid-cols-12 gap-4 gap-y-4 mb-4">
                    <div className="col-span-4">
                        <ATMSelectSearchable
                            name="zonalManagerId"
                            value={values.zonalManagerId}
                            options={
                                (getHierarchyByDept({
                                    department: 'DISTRIBUTION_DEPARTMENT',
                                }) as SelectOption[]) || []
                            }
                            label="Zonal Manager"
                            onChange={(e) => {
                                handleSetFieldValue('zonalManagerId', e)
                            }}
                        />
                    </div>
                    <div className="col-span-4">
                        <ATMSelectSearchable
                            name="zonalExecutiveId"
                            value={values.zonalExecutiveId}
                            options={
                                (getHierarchyByDept({
                                    department: 'DISTRIBUTION_DEPARTMENT',
                                }) as SelectOption[]) || []
                            }
                            label="Zonal Executive"
                            onChange={(e) => {
                                handleSetFieldValue('zonalExecutiveId', e)
                            }}
                        />
                    </div>
                </div>

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
                                handleSetFieldValue('isAutoMap', value)
                                handleSetFieldValue('isCreditLimit', false)
                                handleSetFieldValue(
                                    'isAvailableQuantity',
                                    false
                                )
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
                                        handleSetFieldValue(
                                            'isCreditLimit',
                                            value
                                        )
                                    }}
                                />
                            </div>
                            <div className="col-span-4">
                                <ATMSwitchButton
                                    name="isAvailableQuantity"
                                    value={values.isAvailableQuantity}
                                    label="Available Quantity"
                                    onChange={(value: any) => {
                                        handleSetFieldValue(
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
