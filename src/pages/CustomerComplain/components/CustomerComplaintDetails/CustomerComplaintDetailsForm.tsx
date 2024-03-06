import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from './AddCustomerComplaintDetailsWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { Divider } from '@mui/material'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { useGetAllInitialByCallType } from 'src/hooks/useGetAllInitialByCallType'
import { useGetAllInitialCallTwoByCallTypeAndOneId } from 'src/hooks/useGetAllInitialCallTwoByCallTypeAndOneId'
import { useGetAllInitialCallThreeByCallTypeAndTwoId } from 'src/hooks/useGetAllInitialCallThreeByCallTypeAndTwoId'
import { complaintTypeOptions } from 'src/utils/constants/customeTypes'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    formType: 'ADD' | 'EDIT'
}

const statusOption = [
    {
        label: 'Open',
        value: 'OPEN',
    },
    {
        label: 'Pending',
        value: 'PENDING',
    },
    {
        label: 'Closed',
        value: 'CLOSED',
    },
]

const CustomerComplaintDetailsForm = ({
    formikProps,
    apiStatus,
    formType,
}: Props) => {
    const { values, setFieldValue, handleSubmit } = formikProps

    // Get IC1 Option By Only Call Type
    const { initialCallOneByCallType, isDataLoading } =
        useGetAllInitialByCallType(values?.callType)

    // Get IC2 Option By Call Type And IC1 _id
    const {
        initialCallTwoByCallTypeAndOneId,
        isDataLoading: isInitialCallTwoDataLoaading,
    } = useGetAllInitialCallTwoByCallTypeAndOneId(
        values.initialCallOne,
        values.callType
    )

    // Get IC3 Option By Call Type And IC2 _id
    const {
        initialCallThreeByCallTypeAndTwoId,
        isDataLoading: isInitialCallThreeDataLoaading,
    } = useGetAllInitialCallThreeByCallTypeAndTwoId(
        values.initialCallTwo,
        values.callType
    )

    return (
        <div className="p-4 h-[50vh]">
            <div>
                <h1 className="text-xl font-semibold mb-2">
                    {formType === 'ADD' ? 'Create' : 'Update'} Complaint
                </h1>
                <div className="w-full mt-1 pt-2 pb-4 bg-[#e9f1fb] border-[1px] border-slate-300">
                    <div className="p-2">
                        <div className="grid gap-x-16 grid-cols-3">
                            <div className="flex items-center gap-x-3">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Order No
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-end">
                                    {values?.orderNo || 12423523}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Scheme Name
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-end">
                                    {values?.schemeName || 12423523}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Scheme Code
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-end">
                                    {values?.schemeCode || 12423523}
                                </span>
                            </div>
                        </div>
                        <div className="grid gap-x-16 grid-cols-3">
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Order Status
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-end">
                                    {values?.orderStatus || 12423523}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Courier Status
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-end">
                                    {values?.courierStatus || 12423523}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Divider />

                    <div className="grid grid-cols-4 gap-x-8 gap-y-1 p-2">
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="Call Type"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select call type"
                            classDirection="grid grid-cols-3"
                            name="callType"
                            value={values.callType || ''}
                            options={complaintTypeOptions()}
                            onChange={(e) => {
                                setFieldValue('callType', e)
                                if (e === 'COMPLAINT') {
                                    setFieldValue('status', 'OPEN')
                                } else if (e === 'INQUIRY') {
                                    setFieldValue('status', 'CLOSED')
                                }
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="IC1"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select IC1"
                            classDirection="grid grid-cols-3"
                            name="initialCallOne"
                            value={values.initialCallOne || ''}
                            options={initialCallOneByCallType}
                            isLoading={isDataLoading}
                            onChange={(e) => {
                                setFieldValue('initialCallOne', e)
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="IC2"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select IC2"
                            classDirection="grid grid-cols-3"
                            name="initialCallTwo"
                            value={values.initialCallTwo || ''}
                            options={initialCallTwoByCallTypeAndOneId}
                            isLoading={isInitialCallTwoDataLoaading}
                            onChange={(e) => {
                                setFieldValue('initialCallTwo', e || '')
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="IC3"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select IC3"
                            classDirection="grid grid-cols-3"
                            name="initialCallThree"
                            value={values.initialCallThree || ''}
                            options={initialCallThreeByCallTypeAndTwoId}
                            isLoading={isInitialCallThreeDataLoaading}
                            onChange={(e) => {
                                setFieldValue('initialCallThree', e)
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="Status"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select status"
                            classDirection="grid grid-cols-3"
                            name="status"
                            isDisabled={values?.callType === 'INQUIRY'}
                            value={values.status || ''}
                            options={statusOption}
                            onChange={(e) => {
                                setFieldValue('status', e)
                            }}
                        />
                    </div>

                    <div className="flex items-center p-2 gap-x-4">
                        <label className="text-slate-700">
                            Remarks
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1">
                            <ATMTextArea
                                required
                                label=""
                                minRows={2}
                                name="remark"
                                value={values.remark}
                                placeholder="remark"
                                className="rounded"
                                onChange={(newValue: string) =>
                                    setFieldValue('remark', newValue)
                                }
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <ATMLoadingButton
                            className="w-24"
                            onClick={handleSubmit as any}
                            isLoading={apiStatus}
                        >
                            Save
                        </ATMLoadingButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerComplaintDetailsForm
