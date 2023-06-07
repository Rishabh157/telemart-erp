import React, { useEffect } from 'react'
import ViewWebsitePage from './ViewWebsitePage'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useGetWebsitePageByIdQuery } from 'src/services/websites/WebsitePageServices'
import { setSelectedWebsite } from 'src/redux/slices/website/websitePageSlice'
import WebsiteLayout from '../../WebsiteLayout'

const ViewWebsitePageWrapper = () => {
    // Form Initial Values
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id

    const { selectedItem }: any = useSelector(
        (state: RootState) => state.websitePage
    )
    const { isLoading, isFetching, data } = useGetWebsitePageByIdQuery(Id)

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedWebsite(data?.data || []))
        }
    }, [isLoading, isFetching, data, dispatch])

    //console.log(selectedItem)

    return (
        <WebsiteLayout>
            <ViewWebsitePage items={selectedItem} />
        </WebsiteLayout>
    )
}

export default ViewWebsitePageWrapper
