/// ==============================================
// Filename:AssetsRelocationWrapper.tsx
// Type: List Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- Internal Dependencies --|
import AssetsMangementListing from './AssetsRelocationListing'
import AsstesLayout from '../../AssetsLayout'

const AssetsRelocationWrapper = () => {
    return (
        <div>
            <AsstesLayout>
                <AssetsMangementListing />
            </AsstesLayout>
        </div>
    )
}

export default AssetsRelocationWrapper
