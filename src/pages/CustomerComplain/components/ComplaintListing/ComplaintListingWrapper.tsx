/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import ComplaintListing from './ComplaintListing'
import { useGetComplaintByMobileNoQuery } from 'src/services/CustomerComplainServices'

type Props = {
    contactNumber: string
}

const ComplaintListingWrapper = ({ contactNumber }: Props) => {
    const [complaintListing, setComplaintListing] = React.useState<any[]>([])
    const { data, isFetching, isLoading, refetch } =
        useGetComplaintByMobileNoQuery<any>(contactNumber, {
            skip: !contactNumber || contactNumber.length !== 10,
            refetchOnMountOrArgChange: true, // Refetch on mount and whenever the argument (contactNumber) changes
        })

    React.useEffect(() => {
        if (!isFetching && !isLoading) {
            setComplaintListing(data?.data)
        }
    }, [isLoading, isFetching, data])

    // Trigger a manual refetch whenever contactNumber changes
    React.useEffect(() => {
        if (contactNumber && contactNumber.length === 10) {
            refetch()
        }
    }, [contactNumber, refetch])

    return <ComplaintListing rows={complaintListing} />
}

export default ComplaintListingWrapper
