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
import { FormInitialValues } from './AddStateWrapper'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { getCourierOptions } from 'src/utils/constants/customeTypes'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'

// |-- Types --|
type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    formType: 'ADD' | 'EDIT'
}

const AddStateDialog = ({
    onClose,
    formikProps,
    apiStatus,
    formType,
}: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <Dialog open={true} onClose={onClose} fullWidth>
            <DialogTitle className="text-lg pb-2 font-medium text-primary-main">
                {formType === 'ADD' ? 'Add' : 'Edit'} State
            </DialogTitle>
            <DialogContent>
                <ATMTextField
                    required
                    disabled={formType === 'EDIT'}
                    name="stateName"
                    value={values.stateName}
                    onChange={(e) => {
                        setFieldValue('stateName', e.target.value)
                    }}
                    placeholder="Enter a state name"
                    label="State Name"
                />

                <ATMSelectSearchable
                    name="preferredCourier"
                    required
                    label="Preferred Courier"
                    value={values.preferredCourier || ''}
                    options={getCourierOptions()}
                    onChange={(e) => setFieldValue('preferredCourier', e)}
                />

                <div className="mt-2 flex gap-x-10">
                    <ATMSwitchButton
                        label="Union territory"
                        name="isUnion"
                        value={values.isUnion}
                        title1="YES"
                        title2="NO"
                        onChange={(e) => {
                            setFieldValue('isUnion', e)
                        }}
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
                    className="px-3 py-2 border rounded border-primary-main text-primary-main hover:bg-gray-100"
                    type="button"
                    onClick={() => onClose()}
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

export default AddStateDialog
