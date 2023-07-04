/// ==============================================
// Filename:AccordianBankDetail.tsx
// Type: View-Tab Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- Internal Dependencies --|
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

const AccordianBankDetail = (data: any) => {
    const bankDetail = data?.data?.bankInformation
    return (
        <div>
            {bankDetail?.map((bank: any, bankIndex: number) => (
                <div
                    key={bankIndex}
                    className={`${
                        bankIndex !== bankDetail.length - 1 && 'border-b pb-4'
                    } ${bankIndex === 0 ? 'pb-4' : 'pt-4'}  border-slate-300 `}
                >
                    <div className="text-primary-main text-lg pb-2 font-medium">
                        Bank Information #{bankIndex + 1}
                    </div>
                    <div className="grid grid-cols-3 gap-4 gap-y-5">
                        <ATMTextField
                            name=""
                            value={bank?.bankName}
                            onChange={(e) => {}}
                            label={'Bank Name'}
                            placeholder={'Bank Name'}
                            className="shadow bg-white rounded"
                            disabled={true}
                        />

                        <ATMTextField
                            name=""
                            value={bank?.bankBranchName}
                            onChange={(e) => {}}
                            label={'Branch Name'}
                            placeholder={'Branch Name'}
                            className="shadow bg-white rounded"
                            disabled={true}
                        />

                        <ATMTextField
                            name=""
                            value={bank?.accountHolderName}
                            onChange={(e) => {}}
                            label={'Account Holder Name'}
                            placeholder={'Account Holder Name'}
                            className="shadow bg-white rounded"
                            disabled={true}
                        />

                        <ATMTextField
                            name=""
                            value={bank?.accountNumber}
                            onChange={(e) => {}}
                            label={'Account Number'}
                            placeholder={'Account Number'}
                            className="shadow bg-white rounded"
                            disabled={true}
                        />
                        <ATMTextField
                            name=""
                            value={bank?.ifscNumber}
                            onChange={(e) => {}}
                            label={'IFSC No.'}
                            placeholder={'IFSC No.'}
                            className="shadow bg-white rounded"
                            disabled={true}
                        />

                        <ATMTextField
                            name=""
                            value={bank?.accountType}
                            onChange={(e) => {}}
                            label={'Account Type'}
                            placeholder={'Account Type'}
                            className="shadow bg-white rounded"
                            disabled={true}
                        />

                        <ATMFilePickerWrapper
                            name=""
                            label="Cancelled Check"
                            placeholder="Cancelled Check"
                            onSelect={() => {}}
                            selectedFile={bank?.cancelledCheque}
                            disabled={true}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AccordianBankDetail
