/// ==============================================
// Filename:ASRListing.tsx
// Type: List Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'


// |-- Internal Dependencies --|
import AsstesLayout from '../../AssetsLayout'
import AssetsAllocationListing from './AssetsAllocationListing'

const AssetsAllocationWrapper = () => {
    return (
        <div>
            <AsstesLayout>
                <AssetsAllocationListing />
            </AsstesLayout>
        </div>
    )
}

export default AssetsAllocationWrapper
