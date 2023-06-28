/// ==============================================
// Filename:InquiryViewWrapper.tsx
// Type: View Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect} from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetInquiryByIdQuery } from 'src/services/InquiryService'
import { setSelectedItem } from 'src/redux/slices/inquirySlice'
import InquiryView from './InquiryView'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'

const InquiryViewWrapper = () => {
    const params = useParams()
    const id: any = params.id
    const dispatch = useDispatch<AppDispatch>()

    const { data, isLoading, isFetching } = useGetInquiryByIdQuery(id)

    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [data, isLoading, isFetching, dispatch])

    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.inquiry
    )

    return (
        <SideNavLayout>
            <InquiryView items={selectedItem} />
        </SideNavLayout>
    )
}

export default InquiryViewWrapper
