// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { useGetVendorByIdQuery } from 'src/services/VendorServices'
import AccordianAddress from './components/AccordianAddress'
import AccordianBankDetail from './components/AccordianBankDetail'
import AccordianContact from './components/AccordianContact'
import AccordianDocument from './components/AccordianDocument'
import AccordianGeneralInformation from './components/AccordianGeneralInformation'
import VendorGeneralInformationTab from './VendorGeneralInformationTab'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

// |-- Types --|
type Props = {}

export type AccordianType = {
    summary: React.ReactNode
    component: any
}

const VendorGeneralInformationTabWrapper = (props: Props) => {
    const params = useParams()
    const Id = params.vendorId
    const { items: selectedItem } = useGetDataByIdCustomQuery({
        useEndPointHook: useGetVendorByIdQuery(Id),
    })

    const accordians: AccordianType[] = [
        {
            summary: 'General Information',
            component: (
                <AccordianGeneralInformation data={selectedItem || {}} />
            ),
        },
        {
            summary: 'Regd./Billing Address',
            component: <AccordianAddress data={selectedItem || {}} />,
        },
        {
            summary: 'Contact',
            component: <AccordianContact data={selectedItem || {}} />,
        },
        {
            summary: 'Documents',
            component: <AccordianDocument data={selectedItem || {}} />,
        },
        {
            summary: 'Bank Details',
            component: <AccordianBankDetail data={selectedItem || {}} />,
        },
    ]

    return selectedItem ? (
        <VendorGeneralInformationTab accordians={accordians} />
    ) : (
        <div className="flex justify-center  items-center w-full h-full">
            <CircularProgress />
        </div>
    )
}

export default VendorGeneralInformationTabWrapper
