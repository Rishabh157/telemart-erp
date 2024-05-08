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
import { FormInitialValues } from './AddDistrictWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { getCourierOptions } from 'src/utils/constants/customeTypes'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'

// |-- Types --|
type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    formType: 'ADD' | 'EDIT'
}

const AddDistrictDialog = ({
    onClose,
    formikProps,
    apiStatus,
    formType,
}: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <Dialog open={true} onClose={onClose} fullWidth>
            <DialogTitle className="text-primary-main">
                {formType === 'ADD' ? 'Add' : 'Edit'} District
            </DialogTitle>
            <DialogContent>
                <ATMTextField
                    disabled={formType === 'EDIT'}
                    required
                    name="districtName"
                    value={values.districtName}
                    onChange={(e) => {
                        setFieldValue('districtName', e.target.value)
                    }}
                    placeholder="Name"
                    label="District Name"
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

export default AddDistrictDialog
