import React from 'react'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import ViewBarcode from './ViewBarcode'
import { useParams } from 'react-router-dom'

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
