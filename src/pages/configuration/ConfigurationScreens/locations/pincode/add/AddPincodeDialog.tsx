/// ==============================================
// Filename:AddPicodeDialog.tsx
// Type: Add Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddPincodeWrapper'
import { courierOptionsType } from 'src/utils/constants/customeTypes'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

// |-- Types --|
type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const AddPincodeDialog = ({ onClose, formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <Dialog open={true} onClose={onClose} fullWidth>
            <DialogTitle className="text-primary-main">Add Pincode</DialogTitle>
            <DialogContent>
                <div>
                    <div>
                        <ATMTextField
                            required
                            name="pincode"
                            value={values.pincode}
                            onChange={(e) => {
                                setFieldValue('pincode', e.target.value)
                            }}
                            placeholder="Pincode"
                            label="Name"
                        />
                    </div>
                    <div>
                        <ATMSelectSearchable
                            name="preferredCourier"
                            required
                            label="Preferred Courier"
                            value={values.preferredCourier}
                            options={courierOptionsType()}
                            onChange={(e) =>
                                setFieldValue('preferredCourier', e)
                            }
                        />
                    </div>
                </div>
            </DialogContent>

            <DialogActions>
                <button
                    type="button"
                    onClick={() => onClose()}
                    className="border border-primary-main text-primary-main px-3 py-2 rounded"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className={`bg-primary-main rounded py-2 px-5 text-white border border-primary-main ${
                        true ? 'disabled:opacity-25' : ''
                    }`}
                    onClick={() => formikProps.handleSubmit()}
                >
                    Submit
                </button>
            </DialogActions>
        </Dialog>
    )
}

export default AddPincodeDialog
