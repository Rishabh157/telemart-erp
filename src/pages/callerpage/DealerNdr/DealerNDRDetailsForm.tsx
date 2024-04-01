import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from './AddDealerNDRDetailsWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { Divider } from '@mui/material'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'
// import { useGetAllInitialByCallType } from 'src/hooks/useGetAllInitialByCallType'
// import { useGetAllInitialCallTwoByCallTypeAndOneId } from 'src/hooks/useGetAllInitialCallTwoByCallTypeAndOneId'
// import { useGetAllInitialCallThreeByCallTypeAndTwoId } from 'src/hooks/useGetAllInitialCallThreeByCallTypeAndTwoId'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    formType: 'ADD' | 'EDIT'
}

const DealerNDRDetailsForm = ({ formikProps, apiStatus, formType }: Props) => {
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
                <h1 className="text-xl font-semibold mb-2 flex w-[25%]">
                    <ATMTextField
                        required
                        disabled
                        readOnly
                        labelClass="bold text-lg"
                        label="Order No"
                        size="small"
                        name="pincode"
                        value={values.orderNo || ''}
                        onChange={(e) => {
                            setFieldValue('orderNo', e)
                        }}
                    />
                </h1>
                <div className="w-full mt-1 pt-2 pb-4 bg-[#e9f1fb] border-[1px] border-slate-300">
                    <div className="p-2">
                        <div className="grid gap-x-16 gap-y-3 grid-cols-4">
                            <div className="flex items-center gap-x-3">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Customer Name
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.customerName}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Mobile No.
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.mobileNumber}
                                </span>
                            </div>
                            {/* <div className="flex items-center gap-x-3"> */}

                            {/* <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Alternate No 1.
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.alternateNumber1}
                                </span> */}
                            {/* </div> */}

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
                                <span className="text-sm text-black font-semibold flex-1 text-center">
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
                        {/* <div className="grid gap-x-16 grid-cols-4"></div> */}
                    </div>
                    <Divider />

                    <div className="grid grid-cols-3 gap-x-8 gap-y-1 p-2">
                        <ATMTextField
                            required
                            disabled
                            readOnly
                            label="State"
                            size="xxs"
                            name="state"
                            value={values.state}
                            onChange={(e) => {
                                setFieldValue('state', e)
                            }}
                        />
                        <ATMTextField
                            required
                            disabled
                            readOnly
                            label="District"
                            size="xxs"
                            name="district"
                            value={values.district}
                            onChange={(e) => {
                                setFieldValue('district', e)
                            }}
                        />
                        <ATMTextField
                            required
                            disabled
                            readOnly
                            label="Pincode"
                            size="xxs"
                            name="pincode"
                            value={values.pincode || ''}
                            onChange={(e) => {
                                setFieldValue('pincode', e)
                            }}
                        />
                        <ATMTextArea
                            required
                            label="Address"
                            minRows={3}
                            name="address1"
                            value={values.address1}
                            placeholder="Enter address"
                            className="rounded mt-1"
                            onChange={(newValue: string) =>
                                setFieldValue('address1', newValue)
                            }
                        />
                        <ATMTextField
                            label="Alternate No "
                            size="xs"
                            labelClass="mt-0"
                            name="alternateNumber1"
                            value={values.alternateNumber1 || ''}
                            onChange={(e) => {
                                setFieldValue('alternateNumber1', e)
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            componentClass="mt-4"
                            label="Call Disposition"
                            size="xxs"
                            labelSize="xxs"
                            minHeight="10px"
                            labelDirection="vertical"
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
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="RTO/(Re-attempt Reason)"
                            size="xxs"
                            labelSize="xxs"
                            minHeight="10px"
                            labelDirection="vertical"
                            selectLabel="select "
                            classDirection="grid grid-cols-3"
                            name="reAttemeptReason"
                            value={values?.reAttemeptReason || ''}
                            options={[]}
                            onChange={(e) => {
                                setFieldValue('reAttemeptReason', e)
                            }}
                        />
                        <ATMDatePicker
                            inputSize="16px"
                            name="reAttemptDate"
                            className="mt-0"
                            value={values.reAttemptDate}
                            size="small"
                            placeholder="Re-Attempt Date"
                            labelClass="font-medium"
                            label="Re-Attempt Date"
                            dateTimeFormat="MM/DD/YYYY"
                            minDate
                            onChange={(e) => {
                                setFieldValue('reAttemptDate', e)
                            }}
                        />
                        <ATMCheckbox
                            label="NDR Disccount applicable"
                            extraClasses=""
                            // required
                            labelClasses="select-none"
                            checked={values.ndrDiscountApplicable}
                            onChange={(e) =>
                                setFieldValue('ndrDiscountApplicable', e)
                            }
                        />
                    </div>

                    <div className=" items-center p-2">
                        <ATMTextArea
                            required
                            label="Remarks"
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
                    <div className="flex justify-center">
                        <ATMLoadingButton
                            className="w-24"
                            onClick={handleSubmit as any}
                            isLoading={apiStatus}
                        >
                            Update
                        </ATMLoadingButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DealerNDRDetailsForm
