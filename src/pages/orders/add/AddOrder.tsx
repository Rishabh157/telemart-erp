/// ==============================================
// Filename:AddOrder.tsx
// Type: Add Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- Internal Dependencies --|
import SideNavLayout from '../../../components/layouts/SideNavLayout/SideNavLayout'
import ATMTextField from '../../../components/UI/atoms/formFields/ATMTextField/ATMTextField'

const AddOrder = () => {
    return (
        <SideNavLayout>
            <div>
                <ATMTextField
                    name=""
                    value={''}
                    onChange={() => {}}
                    placeholder="Add Order"
                />
            </div>
        </SideNavLayout>
    )
}

export default AddOrder
