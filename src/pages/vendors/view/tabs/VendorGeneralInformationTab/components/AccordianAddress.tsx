import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

const AccordianAddress = (data: any) => {
    return (
        <div>
            {/* Regd. Address */}
            <div className="border-b border-slate-300 pb-4">
                <div className="text-primary-main text-lg pb-2 font-medium">
                    Regd. Address
                </div>
                <div className="grid grid-cols-3 gap-4 gap-y-5">
                    <ATMTextField
                        name=""
                        value={data?.data?.registrationAddress?.phone}
                        onChange={(e) => {}}
                        label={'Phone'}
                        placeholder={'Phone'}
                        className="shadow bg-white rounded"
                        disabled={true}
                    />

                    <ATMTextField
                        name=""
                        value={data?.data?.registrationAddress?.address}
                        onChange={(e) => {}}
                        label={'Address'}
                        placeholder={'Address'}
                        className="shadow bg-white rounded"
                        disabled={true}
                    />

                    <ATMTextField
                        name=""
                        value={data?.data?.registrationCountryName}
                        onChange={(e) => {}}
                        label={'Country'}
                        placeholder={'Country'}
                        className="shadow bg-white rounded"
                        disabled={true}
                    />

                    <ATMTextField
                        name=""
                        value={data?.data?.registrationStateName}
                        onChange={(e) => {}}
                        label={'State'}
                        placeholder={'State'}
                        className="shadow bg-white rounded"
                        disabled={true}
                    />
                    <ATMTextField
                        name=""
                        value={data?.data?.registrationDistrictName}
                        onChange={(e) => {}}
                        label={'District'}
                        placeholder={'District'}
                        className="shadow bg-white rounded"
                        disabled={true}
                    />

                    <ATMTextField
                        name=""
                        value={data?.data?.registrationPincodeName}
                        onChange={(e) => {}}
                        label={'Pincode'}
                        placeholder={'Pincode'}
                        className="shadow bg-white rounded"
                        disabled={true}
                    />
                </div>
            </div>

            {/* Biiling Address  */}
            <div className=" pt-4">
                <div className="text-primary-main text-lg pb-2 font-medium">
                    Billing Address
                </div>
                <div className="grid grid-cols-3 gap-4 gap-y-5">
                    <ATMTextField
                        name=""
                        value={data?.data?.billingAddress?.phone}
                        onChange={(e) => {}}
                        label={'Phone'}
                        placeholder={'Phone'}
                        className="shadow bg-white rounded"
                        disabled={true}
                    />

                    <ATMTextField
                        name=""
                        value={data?.data?.billingAddress?.address}
                        onChange={(e) => {}}
                        label={'Address'}
                        placeholder={'Address'}
                        className="shadow bg-white rounded"
                        disabled={true}
                    />

                    <ATMTextField
                        name=""
                        value={data?.data?.billingAddressCountryName}
                        onChange={(e) => {}}
                        label={'Country'}
                        placeholder={'Country'}
                        className="shadow bg-white rounded"
                        disabled={true}
                    />

                    <ATMTextField
                        name=""
                        value={data?.data?.billingAddressStateName}
                        onChange={(e) => {}}
                        label={'State'}
                        placeholder={'State'}
                        className="shadow bg-white rounded"
                        disabled={true}
                    />
                    <ATMTextField
                        name=""
                        value={data?.data?.billingAddressDistrictName}
                        onChange={(e) => {}}
                        label={'District'}
                        placeholder={'District'}
                        className="shadow bg-white rounded"
                        disabled={true}
                    />

                    <ATMTextField
                        name=""
                        value={data?.data?.billingAddressPincodeName}
                        onChange={(e) => {}}
                        label={'Pincode'}
                        placeholder={'Pincode'}
                        className="shadow bg-white rounded"
                        disabled={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default AccordianAddress
