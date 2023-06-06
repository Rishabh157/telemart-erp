import React, { useEffect } from 'react'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useParams } from 'react-router-dom'
import { useGetInquiryByIdQuery } from 'src/services/InquiryService'
import { setSelectedItem } from 'src/redux/slices/inquirySlice'
import InquiryView from './InquiryView'

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
