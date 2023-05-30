import React from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddDispositionOneWrapper'

type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const AddDispositionOnedialog = ({
    onClose,
    formikProps,
    apiStatus,
}: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <>
            <Dialog open={true} onClose={onClose} fullWidth>
                <DialogTitle className="text-primary-main">
                    {' '}
                    Add Disposition-one{' '}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <div>
                            <ATMTextField
                                name="dispositionName"
                                value={values.dispositionName}
                                placeholder="Enter a Disposition  name"
                                label="Disposition  name"
                                onChange={(e) =>
                                    setFieldValue(
                                        'dispositionName',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <button type="button" onClick={() => onClose()}>
                        {' '}
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={apiStatus}
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

export default AddDispositionOnedialog
