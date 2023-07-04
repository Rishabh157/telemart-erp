/// ==============================================
// Filename:VendorGeneralInformationTabWrapper.tsx
// Type: View-Tab Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'

// |-- Internal Dependencies --|
import AccordianAddress from './components/AccordianAddress'
import AccordianBankDetail from './components/AccordianBankDetail'
import AccordianContact from './components/AccordianContact'
import AccordianDocument from './components/AccordianDocument'
import AccordianGeneralInformation from './components/AccordianGeneralInformation'
import VendorGeneralInformationTab from './VendorGeneralInformationTab'
import { useGetVendorByIdQuery } from 'src/services/VendorServices'

// |-- Redux --|
import { setSelectedItem } from 'src/redux/slices/vendorSlice'
import { RootState, AppDispatch } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type AccordianType = {
    summary: React.ReactNode
    component: any
}

const VendorGeneralInformationTabWrapper = (props: Props) => {
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const Id = params.vendorId
    const { data, isLoading, isFetching } = useGetVendorByIdQuery(Id)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.vendor
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
