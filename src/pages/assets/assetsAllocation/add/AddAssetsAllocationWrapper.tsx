/// ==============================================
// Filename:AddAssetsAllocationWrapper.tsx
// Type: Add Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- Internal Dependencies --|
import AsstesLayout from '../../AssetsLayout'
import AddAsstesRelocation from './AddAsstesAllocation'

const AddAssetsAllocationWrapper = () => {
    return (
        <div>
            <AsstesLayout>
                <AddAsstesRelocation />
            </AsstesLayout>
        </div>
    )
}

export default AddAssetsAllocationWrapper
