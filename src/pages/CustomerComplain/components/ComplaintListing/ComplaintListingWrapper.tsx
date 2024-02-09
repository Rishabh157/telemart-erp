import React from 'react'
import ComplaintListing from './ComplaintListing'
import { useGetComplaintQuery } from 'src/services/CustomerComplainServices'
// import { useNavigate } from 'react-router-dom'

const ComplaintListingWrapper = () => {
    const [complaintListing, setComplaintListing] = React.useState<any[]>([])
    // const navigate = useNavigate()

    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetComplaintQuery<any>({
        limit: 100,
        searchValue: '',
        params: ['callType'],
        page: 1,
        filterBy: [],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    React.useEffect(() => {
        if (!isFetching && !isLoading) {
            setComplaintListing(data?.data)
        }
    }, [isLoading, isFetching, data])

    return <ComplaintListing rows={complaintListing} />
}

export default ComplaintListingWrapper
