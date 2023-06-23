import React from 'react'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

//const otherDocumentList = Array(3).fill(null);

const AccordianDocument = (data: any) => {
    const otherDocumentList = data?.data?.otherDocument

    return (
        <div>
            <div className={`pb-5 border-b border-slate-400`}>
                <div className="text-primary-main text-lg pb-2 font-medium ">
                    Documents
                </div>

                <div className="grid grid-cols-3 gap-4 gap-y-4">
                    <ATMTextField
                        name=""
                        value={data?.data?.document?.gstNumber}
                        onChange={() => {}}
                        label={'GST No.'}
                        placeholder={'GST No.'}
                        className="shadow bg-white rounded"
                    />
                    <div className="mt-4">
                        <ATMFilePickerWrapper
                            name=""
                            label={'GST Certificate'}
                            placeholder={'GST Certificate'}
                            onSelect={(newFile) => {}}
                            selectedFile={data?.data?.document?.gstCertificate}
                            disabled={true}
                        />
                    </div>

                    <div></div>

                    <ATMTextField
                        name=""
                        value={data?.data?.document?.adharCardNumber}
                        onChange={() => {}}
                        label={'Aadhar No.'}
                        placeholder={'Aadhar No.'}
                        className="shadow bg-white rounded"
                    />
                    <div className="mt-4">
                        <ATMFilePickerWrapper
                            name=""
                            label={'Aadhar Card'}
                            placeholder={'Aadhar Card'}
                            onSelect={(newFile) => {}}
                            selectedFile={data?.data?.document?.adharCard}
                            disabled={true}
                        />
                    </div>
                </div>
            </div>

            {otherDocumentList.map(
                (otherDocument: any, otherDocumentIndex: any) => (
                    <div
                        key={otherDocument}
                        className={`py-5  border-b border-slate-400`}
                    >
                        <div className="text-primary-main text-lg pb-2 font-medium ">
                            Other Documents #{otherDocumentIndex + 1}
                        </div>

                        <div className="grid grid-cols-3 gap-4 gap-y-4">
                            <ATMTextField
                                name=""
                                value={otherDocument.documentName}
                                onChange={() => {}}
                                label={'Document Name'}
                                placeholder={'Document Name'}
                                className="shadow bg-white rounded"
                            />
                            <div className="mt-4">
                                <ATMFilePickerWrapper
                                    name=""
                                    label={'Document File'}
                                    placeholder={'Document File'}
                                    onSelect={(newFile) => {}}
                                    selectedFile={otherDocument.documentFile}
                                    disabled={true}
                                />
                            </div>
                            <div></div>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default AccordianDocument
