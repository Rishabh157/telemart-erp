import React from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddStateWrapper'
import { FormikProps } from 'formik'

type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const AddStateDialog = ({ onClose, formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <>
            <Dialog open={true} onClose={onClose} fullWidth>
                <DialogTitle className="text-primary-main">
                    {' '}
                    Add State{' '}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <div>
                            <ATMTextField
                                name="stateName"
                                value={values.stateName}
                                onChange={(e) => {
                                    setFieldValue('stateName', e.target.value)
                                }}
                                placeholder="Enter a state name"
                                label="State Name"
                            />
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <button 
                    className="border border-primary-main text-primary-main px-3 py-2 rounded"
                    type="button" onClick={() => onClose()}>
                        {' '}
                        Cancel
                    </button>
                    <button
                        type="button"
                        className={`bg-primary-main rounded py-2 px-5 text-white border border-primary-main ${
                            true ? 'disabled:opacity-25' : ''
                        }`}
                        onClick={() => formikProps.handleSubmit()}
                    >
                        {' '}
                        Submit{' '}
                    </button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddStateDialog
