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
import { getCourierOptions } from 'src/utils/constants/customeTypes'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'

// |-- Types --|
type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    formType: 'EDIT' | 'ADD'
}

const AddPincodeDialog = ({
    onClose,
    formikProps,
    apiStatus,
    formType,
}: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <Dialog open={true} onClose={onClose} fullWidth>
            <DialogTitle className="text-primary-main">
                {formType === 'EDIT' ? 'Edit' : 'Add'} Pincode
            </DialogTitle>
            <DialogContent>
                <div>
                    <ATMTextField
                        required
                        disabled={formType === 'EDIT'}
                        name="pincode"
                        value={values.pincode}
                        onChange={(e) => {
                            setFieldValue('pincode', e.target.value)
                        }}
                        placeholder="Pincode"
                        label="Pincode Number"
                    />

                    <ATMSelectSearchable
                        name="preferredCourier"
                        required
                        label="Preferred Courier"
                        value={values.preferredCourier || ''}
                        options={getCourierOptions()}
                        onChange={(e) => setFieldValue('preferredCourier', e)}
                    />

                    <ATMSwitchButton
                        label="Fixed"
                        name="isFixed"
                        value={values.isFixed}
                        title1="YES"
                        title2="NO"
                        onChange={(e) => {
                            setFieldValue('isFixed', e)
                        }}
                    />
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
                <ATMLoadingButton
                    className="w-24"
                    onClick={() => formikProps.handleSubmit()}
                    isLoading={apiStatus}
                >
                    Submit
                </ATMLoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default AddPincodeDialog
