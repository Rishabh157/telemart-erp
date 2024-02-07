/// ==============================================
// Filename:AddOrderAssigneeForm.tsx
// Type: Add Component
// Last Updated: FEB 07, 2024
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
// import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddOrderAssigneeFormWrapper'
import { SelectOption } from 'src/models/FormField/FormField.model'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dealerOptions: any[]
    warehouseOptions: any[]
    apiStatus: boolean
}
export type DropdownOptions = {
    dealerOptions: SelectOption[]
    warehouseOptions: SelectOption[]
}

const AddOrderAssigneeForm = ({
    formikProps,
    dealerOptions,
    warehouseOptions,
    apiStatus,
}: Props) => {
    const dropdownOptions: DropdownOptions = {
        dealerOptions,
        warehouseOptions,
    }

    const dispatch = useDispatch()
    const { values, setFieldValue } = formikProps
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className=" h-[calc(100vh-55px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2">
                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">
                            Order Assignee
                        </div>

                        {/* BUTTON - Add SO */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-9 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* PO Code */}

                            {/* Vendor */}
                            <div className="-mt-2">
                                <ATMSelectSearchable
                                    name="dealerId"
                                    value={values.dealerId}
                                    onChange={(e) =>
                                        handleSetFieldValue('dealerId', e)
                                    }
                                    options={dropdownOptions.dealerOptions}
                                    label="Dealer"
                                />
                            </div>

                            {/* Warehouse */}
                            <div className="-mt-2">
                                <ATMSelectSearchable
                                    name="wareHouseId"
                                    value={values.wareHouseId}
                                    onChange={(e) =>
                                        handleSetFieldValue('wareHouseId', e)
                                    }
                                    options={dropdownOptions.warehouseOptions}
                                    label="Warehouse (Company)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddOrderAssigneeForm
