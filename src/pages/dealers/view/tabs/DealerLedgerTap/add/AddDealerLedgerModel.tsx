// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { Divider } from '@mui/material'

// |-- Internal Dependencies --|
import { FormInitialValues } from './AddDealerLedgerModelWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { NoteType } from 'src/models/Ledger.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    addType: keyof typeof NoteType
}

const AddDealerLedgerModel = ({ formikProps, apiStatus, addType }: Props) => {
    const { values, setFieldValue } = formikProps

    const { options: productGroupOptions } = useCustomOptions({
        useEndPointHook: useGetAllProductGroupQuery(''),
        keyName: 'groupName',
        value: '_id',
    })

    return (
        <div className="p-2 px-4">
            <div className="flex justify-between items-center py-2">
                {/* Form Heading */}
                <div className="text-xl font-medium">
                    {(addType === 'CREDIT_NOTE_CREATED' && (
                        <p> Credit Details </p>
                    )) ||
                        (addType === 'DEBIT_NOTE_CREATED' && (
                            <p> Debit Details </p>
                        )) || <p> Credit Amount Details </p>}
                </div>
            </div>
            <Divider />
            <div className="grow  p-2   ">
                <div className="grid grid-cols-1 gap-4">
                    <div hidden={!(addType === 'DEBIT_NOTE_CREATED')}>
                        <ATMTextField
                            name="debitAmount"
                            required
                            value={values.debitAmount}
                            label="Debit Amount"
                            placeholder="Debit Amount"
                            onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(Number(inputValue))) {
                                    setFieldValue('debitAmount', e.target.value)
                                }
                            }}
                        />
                    </div>
                    <div hidden={addType === 'DEBIT_NOTE_CREATED'}>
                        <ATMTextField
                            name="creditAmount"
                            required
                            value={values.creditAmount}
                            label="Credit Amount"
                            placeholder="Credit Amount"
                            onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(Number(inputValue))) {
                                    setFieldValue(
                                        'creditAmount',
                                        e.target.value
                                    )
                                }
                            }}
                        />
                    </div>

                    {/* <ATMTextField
                        name={'taxAmount'}
                        value={values.taxAmount}
                        label="Tax Amount"
                        placeholder="Tax Amount"
                        onChange={(e) => {
                            const inputValue = e.target.value
                            if (!isNaN(Number(inputValue))) {
                                setFieldValue('taxAmount', e.target.value)
                            }
                        }}
                    /> */}

                    <ATMSelectSearchable
                        required
                        name={`itemId`}
                        value={values.itemId}
                        onChange={(newValue) => {
                            setFieldValue('itemId', newValue)
                        }}
                        label="Product Group"
                        selectLabel="Select Product Group"
                        options={productGroupOptions}
                    />

                    <ATMTextArea
                        name={'remark'}
                        value={values.remark}
                        onChange={(newValue) => {
                            setFieldValue('remark', newValue)
                        }}
                        label="Remark"
                        placeholder="Remark"
                        className="shadow bg-white rounded"
                    />
                </div>
            </div>

            <div className="flex justify-end  p-2">
                <button
                    type="button"
                    disabled={apiStatus}
                    onClick={() => formikProps.handleSubmit()}
                    className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                        true ? 'disabled:opacity-25' : ''
                    }`}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default AddDealerLedgerModel
