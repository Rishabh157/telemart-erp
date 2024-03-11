/// ==============================================
// Filename:AddAreaDialog.tsx
// Type: ADD Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from './ChangePasswordWrapper'
import ATMInputAdormant from 'src/components/UI/atoms/formFields/ATMInputAdormant/ATMInputAdormant'
import { BiHide, BiShow } from 'react-icons/bi'

// |-- Types --|
type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const ChangePasswordDialog = ({ onClose, formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    const [isShowPassword, setIsShowPassword] = useState(false)
    return (
        <>
            <Dialog open={true} onClose={onClose} fullWidth>
                <DialogTitle className="text-primary-main">
                    {' '}
                    Change Password{' '}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <div className="">
                            <ATMInputAdormant
                                name="newPassword"
                                type={isShowPassword ? 'text' : 'password'}
                                value={values?.newPassword}
                                onChange={(e) => {
                                    setFieldValue("newPassword", e.target.value)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                    }
                                }}
                                label="Password"
                                className="bg-slate-100 focus:bg-white h-[50px]"
                                adormant={
                                    !isShowPassword ? (
                                        <BiHide className="text-xl" />
                                    ) : (
                                        <BiShow className="text-xl" />
                                    )
                                }
                                adormantProps={{
                                    position: 'end',
                                    extraClasses: 'bg-white border-none',
                                    onClick: () => {
                                        setIsShowPassword(
                                            (isShowPassword) => !isShowPassword
                                        )
                                    },
                                }}
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
                        className="bg-primary-main text-white px-3 py-2 rounded"
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

export default ChangePasswordDialog
