/// ==============================================
// Filename:ViewBarcodeWrapper.tsx
// Type: View Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|

import ViewBarcode from './ViewBarcode'

// |-- Types --|
type Props = {}

const ViewBarcodeWrapper = (props: Props) => {
    const params = useParams()
    const cartonBoxCode = params.cartonboxcode
    return (
        
            <ViewBarcode cartonBoxCode={cartonBoxCode || ''} />
       
    )
}

export default ViewBarcodeWrapper
