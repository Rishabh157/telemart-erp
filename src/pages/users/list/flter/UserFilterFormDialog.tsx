import React from 'react'
import { FormikProps } from 'formik'
import ATMRadioButtonGroup from 'src/components/UI/atoms/ATMRadioButtonGroup/ATMRadioButtonGroup'
import {
    filterStatusOptions,
    userDepartmentTypeOptions,
} from 'src/utils/constants/customeTypes'
import { FormInitialValues } from './UserFilterFormDialogWrapper'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAllCompaniesBranchQuery } from 'src/services/CompanyBranchService'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    onReset: () => void
    onClose: () => void
}

const UserFilterFormDialog = ({ formikProps, onReset, onClose }: Props) => {
    const { values, setFieldValue, isSubmitting, handleSubmit } = formikProps
    const { userData } = useGetLocalStorage()

    // Get Company Branch
    const { options: branchOptionList } = useCustomOptions({
        useEndPointHook: useGetAllCompaniesBranchQuery(''),
        keyName: 'branchName',
        value: '_id',
    })

    // get call centers
    const { options: callCenterOptions } = useCustomOptions({
        useEndPointHook: useGetAllCallCenterMasterQuery(userData?.companyId, {
            skip: !userData?.companyId,
        }),
        keyName: 'callCenterName',
        value: '_id',
    })

    return (
        <div className="flex flex-col gap-4 px-4 py-2">
            {/* Heading & Clear Button */}
            <div className="flex justify-between items-center sticky top-0 z-50">
                <div className="text-xl font-medium"> Filter </div>
                <button
                    type="button"
                    className="text-red-600 hover:text-red-400 font-medium"
                    onClick={onReset}
                >
                    Clear Filters
                </button>
            </div>

            {/* User Department */}
            <ATMSelectSearchable
                required
                componentClass="m-0"
                name="userDepartment"
                value={values?.userDepartment}
                onChange={(newValue) =>
                    setFieldValue('userDepartment', newValue)
                }
                selectLabel="Select User Department"
                options={userDepartmentTypeOptions()}
                fontSizePlaceHolder="14px"
                label="User Department"
            />

            {/* Branch Name */}
            <ATMSelectSearchable
                required
                componentClass="m-0"
                name="branchId"
                label="Branch Name"
                value={values?.branchId}
                selectLabel="Select Branch Name"
                onChange={(newValue) => setFieldValue('branchId', newValue)}
                options={branchOptionList}
            />

            <ATMSelectSearchable
                name="callCenterId"
                componentClass="m-0"
                value={values?.callCenterId}
                onChange={(newValue) => setFieldValue('callCenterId', newValue)}
                options={callCenterOptions}
                selectLabel="Select Call Center"
                label="Call Center"
            />

            {/*  Active Field */}
            <ATMRadioButtonGroup
                name="isActive"
                label="Status"
                required={false}
                value={values.isActive}
                options={filterStatusOptions()}
                onChange={(newValue: any) => {
                    setFieldValue('isActive', newValue)
                }}
            />

            {/* Apply & Cancel Buttons */}
            <div className="flex flex-col gap-2  sticky bottom-0 bg-white mt-4">
                <div>
                    <ATMLoadingButton
                        type="submit"
                        className="h-[40px]"
                        isLoading={isSubmitting}
                        onClick={() => handleSubmit()}
                    >
                        Apply
                    </ATMLoadingButton>
                </div>

                <div>
                    <ATMLoadingButton
                        className="bg-slate-300 hover:bg-gray-200 transition-all h-[40px] border-none text-slate-700 font-medium"
                        onClick={onClose}
                    >
                        Cancel
                    </ATMLoadingButton>
                </div>
            </div>
        </div>
    )
}

export default UserFilterFormDialog
