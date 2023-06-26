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
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import ViewBarcode from './ViewBarcode'

// |-- Types --|
type Props = {}

const ViewBarcodeWrapper = (props: Props) => {
    const params = useParams()
    const cartonBoxCode = params.cartonboxcode
    return (
        <ConfigurationLayout>
            <ViewBarcode cartonBoxCode={cartonBoxCode || ''} />
        </ConfigurationLayout>
    )
}

export default ViewBarcodeWrapper
