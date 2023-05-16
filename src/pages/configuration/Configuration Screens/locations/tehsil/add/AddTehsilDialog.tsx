import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddTehsilWrapper'
import { FormikProps } from 'formik'

type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const AddTehsilDialog = ({ onClose, formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <>
            <Dialog open={true} onClose={onClose} fullWidth>
                <DialogTitle className="text-primary-main">
                    {' '}
                    Add Tehsil{' '}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <div>
                            <ATMTextField
                                name="tehsilName"
                                value={values.tehsilName}
                                onChange={(e) => {
                                    setFieldValue('tehsilName', e.target.value)
                                }}
                                placeholder="Enter a tehsil name"
                                label="Tehsil Name"
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

export default AddTehsilDialog
