// |-- Built-in Dependencies --|
import React, { useState } from 'react'

import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from './ChangePasswordWrapper'
import ATMInputAdormant from 'src/components/UI/atoms/formFields/ATMInputAdormant/ATMInputAdormant'
import { BiHide, BiShow } from 'react-icons/bi'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'

// |-- Types --|
type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const ChangePasswordDialog = ({ onClose, formikProps, apiStatus }: Props) => {
    const { values, setFieldValue, handleSubmit } = formikProps
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    return (
        <div>
            <div className="p-4 flex flex-col gap-2">
                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat pb-4">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">
                            Change Password
                        </div>

                        <div>
                            <ATMLoadingButton
                                type="submit"
                                className="h-[40px]"
                                isLoading={apiStatus}
                                onClick={() => handleSubmit()}
                                loadingText="Submiting"
                            >
                                Submit
                            </ATMLoadingButton>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-9 px-3 ">
                        <ATMInputAdormant
                            name="newPassword"
                            required
                            type={isShowPassword ? 'text' : 'password'}
                            value={values?.newPassword}
                            placeholder="Enter new password"
                            onChange={(e) => {
                                setFieldValue('newPassword', e.target.value)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                }
                            }}
                            label="Password"
                            className="bg-slate-100 focus:bg-white h-[40px]"
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

                        <div className="mt-4">
                            <ATMInputAdormant
                                required
                                name="confirmPassword"
                                type={
                                    isShowConfirmPassword ? 'text' : 'password'
                                }
                                value={values?.confirmPassword}
                                placeholder="Enter confirm password"
                                onChange={(e) => {
                                    setFieldValue(
                                        'confirmPassword',
                                        e.target.value
                                    )
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                    }
                                }}
                                label="Confirm Password"
                                className="bg-slate-100 focus:bg-white h-[40px]"
                                adormant={
                                    !isShowConfirmPassword ? (
                                        <BiHide className="text-xl" />
                                    ) : (
                                        <BiShow className="text-xl" />
                                    )
                                }
                                adormantProps={{
                                    position: 'end',
                                    extraClasses: 'bg-white border-none',
                                    onClick: () => {
                                        setIsShowConfirmPassword(
                                            (isShowConfirmPassword) =>
                                                !isShowConfirmPassword
                                        )
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordDialog
