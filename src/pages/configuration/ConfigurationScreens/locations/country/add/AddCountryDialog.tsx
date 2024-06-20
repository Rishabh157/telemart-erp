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
import { FormInitialValues } from './AddCountryWrapper'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'

// |-- Types --|
type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const AddCountryDialog = ({ onClose, formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <Dialog open={true} onClose={onClose} fullWidth>
            <DialogTitle className="text-primary-main">Add Country</DialogTitle>
            <DialogContent>
                <ATMTextField
                    required
                    name="countryName"
                    value={values.countryName}
                    placeholder="Name"
                    label="Country Name"
                    onChange={(e) =>
                        setFieldValue('countryName', e.target.value)
                    }
                />
            </DialogContent>

            <DialogActions>
                <button
                    type="button"
                    onClick={() => onClose()}
                    className="border border-primary-main text-primary-main px-3 py-2 rounded hover:bg-gray-100"
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

export default AddCountryDialog
