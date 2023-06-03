import React from 'react'
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
