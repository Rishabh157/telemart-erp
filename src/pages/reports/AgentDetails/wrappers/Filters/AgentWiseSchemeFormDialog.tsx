import React from 'react'
import { FormikProps } from 'formik'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { FormInitialValuesFilterWithLabel } from './AgentWiseSchemeFormDialogWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'

// hooks
// import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

// models
import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
// import { useGetAllDistrictByStateQuery } from 'src/services/DistricService'
// import { useGetAllStateQuery } from 'src/services/StateService'
import { useGetAllAgentsByCallCenterQuery, useGetFloorMangerUserByCallCenterIdQuery, useGetTeamLeadUserByCallCenterIdQuery } from 'src/services/UserServices'
import { GetHierarchByDeptProps } from 'src/utils/GetHierarchyByDept'

type Props = {
    formikProps: FormikProps<FormInitialValuesFilterWithLabel>
    onReset: () => void
    open: boolean
    onClose: () => void
}

const AgentWiseSchemeFormDialog = ({
    open,
    formikProps,
    onReset,
    onClose,
}: Props) => {
    const { values, setFieldValue, isSubmitting, handleSubmit } = formikProps
    const { userData } = useGetLocalStorage()

    // Hooks
    // const { options: schemeOptions } = useCustomOptions({
    //     useEndPointHook: useGetSchemeQuery(''),
    //     keyName: 'schemeName',
    //     value: '_id',
    // })


    // get call centers
    const { options: callCenterOptions } = useCustomOptions({
        useEndPointHook: useGetAllCallCenterMasterQuery(userData?.companyId, {
            skip: !userData?.companyId,
        }),
        keyName: 'callCenterName',
        value: '_id',
    })

    // get agents by call center id
    const { options: agentsOptions } = useCustomOptions({
        useEndPointHook: useGetAllAgentsByCallCenterQuery(
            values?.callCenterId?.value,
            { skip: !values?.callCenterId?.value }
        ),
        keyName: 'userName',
        value: '_id',
    })

    // get floor manager
    const { options: florManagerOptionList } = useCustomOptions({
        useEndPointHook: useGetFloorMangerUserByCallCenterIdQuery(
            {
                // companyId: userData?.companyId as string,
                callCenterId: values?.callCenterId?.value as string,
                departmentId: values?.userDepartment?.value as string,
            },
            {
                skip: !values?.userDepartment?.value || !values?.callCenterId?.value, // Skip the query if isAgent is false or callCenterId is not available
            }
        ),
        keyName: 'userName',
        value: '_id',
    })

    // get team leads
    const { options: teamLeadOptionList } = useCustomOptions({
        useEndPointHook: useGetTeamLeadUserByCallCenterIdQuery(
            {
                // companyId: userData?.companyId as string,
                callCenterId: values?.callCenterId.value,
                departmentId: values?.userDepartment.value,
            },
            {
                skip: !values?.callCenterId?.value,
            }
        ),
        keyName: 'userName',
        value: '_id',
    })

    // departments
    const departmentOption: any = [
        {
            label: GetHierarchByDeptProps.SALES_DEPARTMENT,
            value: GetHierarchByDeptProps.SALES_DEPARTMENT
        },
        {
            label: GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT,
            value: GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT
        }
    ]

    return (
        <div className="flex flex-col gap-4 px-4 py-2">
            {/* Heading & Clear Button */}
            <div className="flex justify-between items-center sticky top-0 z-50 bg-white">
                <div className="text-xl font-medium"> Filter </div>
                <button
                    type="button"
                    className="text-red-600 hover:text-red-400 font-medium"
                    onClick={onReset}
                >
                    Clear Filters
                </button>
            </div>

            <div className="grid grid-cols-2 gap-x-6">

                <ATMSelectSearchable
                    label="User Department"
                    selectLabel="Select user department"
                    name="userDepartment"
                    value={values.userDepartment.value}
                    options={departmentOption}
                    isValueWithLable
                    onChange={(e) => {
                        setFieldValue('userDepartment', {
                            fieldName: 'User Department',
                            label: e.label,
                            value: e.value,
                        })
                    }}
                />

                <ATMSelectSearchable
                    label="Call Center"
                    selectLabel="Select callCenterId"
                    name="callCenterId"
                    value={values.callCenterId.value}
                    options={callCenterOptions}
                    isValueWithLable
                    // isLoading={isSchemesLoading}
                    onChange={(e) => {
                        setFieldValue('callCenterId', {
                            fieldName: 'Call Center',
                            label: e.label,
                            value: e.value,
                        })
                    }}
                />

                <ATMSelectSearchable
                    label="Floor Manager"
                    selectLabel="Select floor manager"
                    name="floorManagerId"
                    value={values.floorManagerId.value}
                    options={florManagerOptionList}
                    isValueWithLable
                    onChange={(e) => {
                        setFieldValue('floorManagerId', {
                            fieldName: 'Floor Manager',
                            label: e.label,
                            value: e.value,
                        })
                    }}
                />

                <ATMSelectSearchable
                    label="Team Lead"
                    selectLabel="Select team lead"
                    name="teamLeadId"
                    value={values.teamLeadId.value}
                    options={teamLeadOptionList}
                    isValueWithLable
                    onChange={(e) => {
                        setFieldValue('teamLeadId', {
                            fieldName: 'Team Lead',
                            label: e.label,
                            value: e.value,
                        })
                    }}
                />

                <ATMSelectSearchable
                    label="Agent"
                    selectLabel="Select agent"
                    name="agentId"
                    value={values.agentId.value}
                    options={agentsOptions}
                    isValueWithLable
                    onChange={(e) => {
                        setFieldValue('agentId', {
                            fieldName: 'Agent',
                            label: e.label,
                            value: e.value,
                        })
                    }}
                />

                <div></div>

                {/* From */}
                <div className="mt-4">
                    <ATMDatePicker
                        label="Date From"
                        name="startDate"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.startDate.value}
                        onChange={(e) =>
                            setFieldValue('startDate', {
                                fieldName: 'Date From',
                                label: '',
                                value: e,
                            })
                        }
                    />
                </div>

                {/* To */}
                <div className="mt-4">
                    <ATMDatePicker
                        label="Date To"
                        name="endDate"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.endDate.value}
                        minDate={values?.startDate}
                        onChange={(newValue) =>
                            setFieldValue('endDate', {
                                fieldName: 'Date to',
                                label: 'Date to',
                                value: newValue,
                            })
                        }
                    />
                </div>
            </div>

            {/* Apply & Cancel Buttons */}
            <div className="flex gap-2  sticky bottom-0 bg-white mt-4">
                <ATMLoadingButton
                    className="bg-slate-300 w-1/2 hover:bg-gray-200 transition-all h-[40px] border-none text-slate-700 font-medium"
                    onClick={onClose}
                >
                    Cancel
                </ATMLoadingButton>

                <ATMLoadingButton
                    type="submit"
                    className="h-[40px] w-1/2 hover:bg-[#396396]"
                    isLoading={isSubmitting}
                    onClick={() => handleSubmit()}
                >
                    Apply
                </ATMLoadingButton>
            </div>
        </div>
    )
}

export default AgentWiseSchemeFormDialog
