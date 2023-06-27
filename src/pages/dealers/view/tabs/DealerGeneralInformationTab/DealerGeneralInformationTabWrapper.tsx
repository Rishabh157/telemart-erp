/// ==============================================
// Filename:AddDealerLedgerModelWrapper.tsx
// Type: Tab Add Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect }  from 'react'

// |-- External Dependencies --|
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'


// |-- Internal Dependencies --|
import AccordianAddress from './components/AccordianAddress'
import AccordianContact from './components/AccordianContact'
import AccordianDocument from './components/AccordianDocument'
import AccordianGeneralInformation from './components/AccordianGeneralInformation'
import DealerGeneralInformationTab from './DealerGeneralInformationTab'
import { useGetDealerByIdQuery } from 'src/services/DealerServices'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedItem } from 'src/redux/slices/dealerSlice'


// |-- Types --|
type Props = {}

export type AccordianType = {
    summary: React.ReactNode
    component: any
}

const DealerGeneralInformationTabWrapper = (props: Props) => {
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const Id = params.dealerId
    const { data, isLoading, isFetching } = useGetDealerByIdQuery(Id)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.dealer
    )
    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [dispatch, data, isLoading, isFetching])

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
