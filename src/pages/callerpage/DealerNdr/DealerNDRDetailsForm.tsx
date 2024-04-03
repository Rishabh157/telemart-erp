import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from './AddDealerNDRDetailsWrapper'
import ATMSelectSearchable, {
    SelectOption,
} from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { Divider } from '@mui/material'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'
import { dealerValidReamrkType } from 'src/utils/constants/customeTypes'
import moment from 'moment'
import { NdrDispositionListResponseType } from 'src/models/configurationModel/NdrDisposition.model'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    formType: 'ADD' | 'EDIT'
    ndrDispositions?: NdrDispositionListResponseType[] | []
}

const DealerNDRDetailsForm = ({
    formikProps,
    apiStatus,
    formType,
    ndrDispositions = [],
}: Props) => {
    const { values, setFieldValue, handleSubmit } = formikProps

    const NdrDispositionsOptions = ndrDispositions?.map(
        (items: NdrDispositionListResponseType) => {
            return {
                label: items?.ndrDisposition,
                value: items?._id,
            }
        }
    )

    const getNDRReasonsOptions: any = (id: string) => {
        let NDrDisposition = ndrDispositions.find(
            (ele: NdrDispositionListResponseType) => ele?._id === id
        )
        return NDrDisposition?.subDispositions?.map((ele: string) => {
            return {
                label: ele,
                value: ele,
            }
        })
    }

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
                                    Status
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.status}
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
                                    Dealer
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.dealerName}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Dealer Status
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Dealer Remark
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-center">
                                    {values?.remark}
                                </span>
                            </div>
                        </div>
                        {/* <div className="grid gap-x-16 grid-cols-4"></div> */}
                    </div>
                    <Divider />

                    <div className="grid grid-cols-3 gap-x-8 gap-y-3 p-2">
                        <ATMTextField
                            required
                            disabled
                            readOnly
                            label="State"
                            size="xxs"
                            name="state"
                            value={values.state}
                            onChange={(e) => {
                                setFieldValue('state', e.target.value)
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
                                setFieldValue('district', e.target.value)
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
                                setFieldValue('pincode', e.target.value)
                            }}
                        />
                        <ATMTextArea
                            required
                            readOnly
                            isDisable
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
                            name="alternateNumber"
                            value={values.alternateNumber || ''}
                            onChange={(e) => {
                                setFieldValue('alternateNumber', e.target.value)
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
                            name="ndrCallDisposition"
                            value={values.ndrCallDisposition}
                            options={NdrDispositionsOptions}
                            isLoading={false}
                            onChange={(e) => {
                                setFieldValue('ndrCallDisposition', e)
                            }}
                        />
                        <ATMSelectSearchable
                            // required
                            componentClass="mt-1"
                            label="RTO/(Re-attempt Reason)"
                            size="xxs"
                            labelSize="xxs"
                            minHeight="10px"
                            labelDirection="vertical"
                            selectLabel="select "
                            classDirection="grid grid-cols-3"
                            name="ndrRtoReattemptReason"
                            value={values?.ndrRtoReattemptReason || ''}
                            options={
                                getNDRReasonsOptions(
                                    values.ndrCallDisposition
                                ) as SelectOption[]
                            }
                            onChange={(e) => {
                                setFieldValue('ndrRtoReattemptReason', e)
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
                            dateTimeFormat="DD/MM/YYYY"
                            // minDate={moment().subtract(0, 'days')}
                            maxDate={moment().add(15, 'days')}
                            onChange={(e) => {
                                // console.log(e, 'ehehe')
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
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="Valid Dealer Remarks"
                            size="xxs"
                            labelSize="xxs"
                            minHeight="10px"
                            labelDirection="vertical"
                            selectLabel="select "
                            classDirection="grid grid-cols-3"
                            name="dealerValidRemark"
                            value={values?.dealerValidRemark || ''}
                            options={dealerValidReamrkType()}
                            onChange={(e) => {
                                setFieldValue('dealerValidRemark', e)
                            }}
                        />
                    </div>

                    <div className=" items-center p-2">
                        <ATMTextArea
                            required
                            label="NDR Remark"
                            minRows={2}
                            name="ndrRemark"
                            value={values.ndrRemark}
                            placeholder="Remark"
                            className="rounded"
                            onChange={(newValue: string) =>
                                setFieldValue('ndrRemark', newValue)
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
