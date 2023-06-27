/// ==============================================
// Filename:AccordianGeneralInformation.tsx
// Type: Tab  Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- Internal Dependencies --|
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'



const AccordianGeneralInformation = (data: any) => {
    return (
        <div className="grid grid-cols-3 gap-4 gap-y-5">
            <ATMTextField
                name=""
                value={data?.data?.dealerCode}
                onChange={(e) => {}}
                label={'Dealer Code'}
                placeholder={'Dealer Code'}
                className="shadow bg-white rounded"
                disabled={true}
            />
            <ATMTextField
                name=""
                value={data?.data?.dealersCategoryName}
                onChange={(e) => {}}
                label={'Dealer Category'}
                placeholder={'Dealer Category'}
                className="shadow bg-white rounded"
                disabled={true}
            />
            <ATMTextField
                name=""
                value={data?.data?.firmName}
                onChange={(e) => {}}
                label={'Firm Name'}
                placeholder={'Firm Name'}
                className="shadow bg-white rounded"
                disabled={true}
            />
            <ATMTextField
                name=""
                value={data?.data?.creditLimit}
                onChange={(e) => {}}
                label={'Credit Limit'}
                placeholder={'Credit Limit'}
                className="shadow bg-white rounded"
                disabled={true}
            />{' '}
            <ATMTextField
                name=""
                value={data?.data?.openingBalance}
                onChange={(e) => {}}
                label={'Opeaning Balance'}
                placeholder={'Opeaning Balance'}
                className="shadow bg-white rounded"
                disabled={true}
            />{' '}
            <ATMSwitchButton
                name=""
                value={data?.data?.autoMapping}
                onChange={(e) => {}}
                label={'Auto Mapping'}
                disabled={true}
            />
            <ATMTextField
                name=""
                value={data?.data?.quantityQuotient}
                onChange={(e) => {}}
                label={'Quantity Quotient'}
                placeholder={'Quantity Quotient'}
                className="shadow bg-white rounded"
                disabled={true}
            />
            <ATMTextField
                name=""
                value={data?.data?.firstName}
                onChange={(e) => {}}
                label={'First Name'}
                placeholder={'First Name'}
                className="shadow bg-white rounded"
                disabled={true}
            />
            <ATMTextField
                name=""
                value={data?.data?.lastName}
                onChange={(e) => {}}
                label={'Last Name'}
                placeholder={'Last Name'}
                className="shadow bg-white rounded"
                disabled={true}
            />
            <ATMTextField
                name=""
                value={data?.data?.email}
                onChange={(e) => {}}
                label={'Email'}
                placeholder={'Email'}
                className="shadow bg-white rounded"
                disabled={true}
            />
        </div>
    )
}

export default AccordianGeneralInformation
