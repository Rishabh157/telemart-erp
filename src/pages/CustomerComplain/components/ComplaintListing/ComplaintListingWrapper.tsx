import React from 'react'
import ComplaintListing from './ComplaintListing'
import { useGetComplaintByMobileNoQuery } from 'src/services/CustomerComplainServices'

type Props = {
    contactNumber: string
}

const ComplaintListingWrapper = ({ contactNumber }: Props) => {
    const [complaintListing, setComplaintListing] = React.useState<any[]>([])

    const { data, isFetching, isLoading } = useGetComplaintByMobileNoQuery<any>(
        contactNumber,
        {
            skip: !contactNumber || contactNumber.length !== 10,
        }
    )

    React.useEffect(() => {
        if (!isFetching && !isLoading) {
            setComplaintListing(data?.data)
        }
    }, [isLoading, isFetching, data])

    return <ComplaintListing rows={complaintListing} />
}

export default ComplaintListingWrapper
