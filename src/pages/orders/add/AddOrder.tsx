import React from 'react'
import SideNavLayout from '../../../components/layouts/SideNavLayout/SideNavLayout'
import ATMTextField from '../../../components/UI/atoms/formFields/ATMTextField/ATMTextField'

const AddOrder = () => {
    return (
        <SideNavLayout>
            <div>
                <ATMTextField
                    name=""
                    value={''}
                    onChange={() => { }}
                    placeholder="Add Order"
                />
            </div>
        </SideNavLayout>

    )
}

export default AddOrder
