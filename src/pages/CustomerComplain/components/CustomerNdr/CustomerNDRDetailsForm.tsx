import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from './AddCustomerNDRDetailsWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { Divider } from '@mui/material'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
// import { useGetAllInitialByCallType } from 'src/hooks/useGetAllInitialByCallType'
// import { useGetAllInitialCallTwoByCallTypeAndOneId } from 'src/hooks/useGetAllInitialCallTwoByCallTypeAndOneId'
// import { useGetAllInitialCallThreeByCallTypeAndTwoId } from 'src/hooks/useGetAllInitialCallThreeByCallTypeAndTwoId'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    formType: 'ADD' | 'EDIT'
}

const CustomerNDRDetailsForm = ({
    formikProps,
    apiStatus,
    formType,
}: Props) => {
    const { values, setFieldValue, handleSubmit } = formikProps

    // Get IC1 Option By Only Call Type
    // const { initialCallOneByCallType, isDataLoading } =
    //     useGetAllInitialByCallType(values?.callType)

    // // Get IC2 Option By Call Type And IC1 _id
    // const {
    //     initialCallTwoByCallTypeAndOneId,
    //     isDataLoading: isInitialCallTwoDataLoaading,
    // } = useGetAllInitialCallTwoByCallTypeAndOneId(
    //     values.initialCallOne,
    //     values.callType
    // )

    // // Get IC3 Option By Call Type And IC2 _id
    // const {
    //     initialCallThreeByCallTypeAndTwoId,
    //     isDataLoading: isInitialCallThreeDataLoaading,
    // } = useGetAllInitialCallThreeByCallTypeAndTwoId(
    //     values.initialCallTwo,
    //     values.callType
    // )

    return (
        <div className="px-4 pb-4">
            <div>
                <h1 className="text-xl font-semibold mb-2">
                    {formType === 'ADD' ? 'Create' : 'Update'} NDR
                </h1>
                <div className="w-full mt-1 pt-2 pb-4 bg-[#e9f1fb] border-[1px] border-slate-300">
                    <div className="p-2">
                        <div className="grid gap-x-16 grid-cols-4">
                            <div className="flex items-center gap-x-3">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Customer Name
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.orderNo}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Mobile No.
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.orderNo}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Alternate No 1.
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    -
                                </span>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Alternate No 2.
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    -
                                </span>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Order No.
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.orderNo}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Order Status
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-end">
                                    {values?.orderStatus}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Scheme Name
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.schemeName}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Scheme Code
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.schemeCode}
                                </span>
                            </div>
                        </div>
                        <div className="grid gap-x-16 grid-cols-4">
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Courier
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.courierStatus}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Courier Status
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.courierStatus}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Courier Remark
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.courierStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Divider />

                    <div className="grid grid-cols-4 gap-x-8 gap-y-1 p-2">
                        <div className="flex items-center p-2 gap-x-4">
                            <label className="text-slate-700 text-sm">
                                New Address 1
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="flex-1">
                                <ATMTextArea
                                    required
                                    label=""
                                    minRows={4}
                                    name="address1"
                                    value={values.address1}
                                    placeholder="Enter address"
                                    className="rounded"
                                    onChange={(newValue: string) =>
                                        setFieldValue('address1', newValue)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex items-center p-2 gap-x-4">
                            <label className="text-slate-700 text-sm">
                                New Address 2
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="flex-1">
                                <ATMTextArea
                                    required
                                    label=""
                                    minRows={4}
                                    name="address2"
                                    value={values.address2}
                                    placeholder="Enter address"
                                    className="rounded"
                                    onChange={(newValue: string) =>
                                        setFieldValue('address2', newValue)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-x-8 gap-y-1 p-2">
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="Pincode"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select pincode"
                            classDirection="grid grid-cols-3"
                            name="pincode"
                            value={values.pincode || ''}
                            options={[
                                {
                                    label: 'Complaint',
                                    value: 'COMPLAINT',
                                },
                                {
                                    label: 'Inquiry',
                                    value: 'INQUIRY',
                                },
                            ]}
                            onChange={(e) => {
                                setFieldValue('pincode', e)
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="District"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select district"
                            classDirection="grid grid-cols-3"
                            name="district"
                            value={values.district}
                            options={[]}
                            isLoading={false}
                            onChange={(e) => {
                                setFieldValue('district', e)
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="State"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select state"
                            classDirection="grid grid-cols-3"
                            name="state"
                            value={values.state}
                            options={[]}
                            isLoading={false}
                            onChange={(e) => {
                                setFieldValue('state', e)
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="Call Disposition"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select disposition"
                            classDirection="grid grid-cols-3"
                            name="callDisposition"
                            value={values.callDisposition}
                            options={[]}
                            isLoading={false}
                            onChange={(e) => {
                                setFieldValue('callDisposition', e)
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

export default CustomerNDRDetailsForm
