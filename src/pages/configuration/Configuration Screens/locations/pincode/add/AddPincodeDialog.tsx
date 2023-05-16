import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

import { FormInitialValues } from './AddPincodeWrapper'
import { FormikProps } from 'formik'

type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const AddPincodeDialog = ({ onClose, formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <>
            <Dialog open={true} onClose={onClose} fullWidth>
                <DialogTitle className="text-primary-main">
                    {' '}
                    Add Pincode{' '}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <div>
                            <ATMTextField
                                name="pincode"
                                value={values.pincode}
                                onChange={(e) => {
                                    setFieldValue('pincode', e.target.value)
                                }}
                                placeholder="Enter a pincode"
                                label="Pincode Name"
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
                        {' '}
                        Cancel
                    </button>
                    <button
                        type="button"
                        className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
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

export default AddPincodeDialog
