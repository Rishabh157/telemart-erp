
// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { useGetDealerByIdQuery } from 'src/services/DealerServices'
import AccordianAddress from './components/AccordianAddress'
import AccordianContact from './components/AccordianContact'
import AccordianDocument from './components/AccordianDocument'
import AccordianGeneralInformation from './components/AccordianGeneralInformation'
import DealerGeneralInformationTab from './DealerGeneralInformationTab'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

// |-- Types --|
type Props = {}

export type AccordianType = {
    summary: React.ReactNode
    component: any
}

const DealerGeneralInformationTabWrapper = (props: Props) => {
    const params = useParams()
    const Id = params.dealerId
    const { items: selectedItem } = useGetDataByIdCustomQuery({
        useEndPointHook: useGetDealerByIdQuery(Id),
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
    ]

    return selectedItem ? (
        <DealerGeneralInformationTab accordians={accordians} />
    ) : (
        <div className="px-80 py-200 flex justify-center  items-center w-full h-full">
            <CircularProgress />
        </div>
    )
}

export default DealerGeneralInformationTabWrapper
