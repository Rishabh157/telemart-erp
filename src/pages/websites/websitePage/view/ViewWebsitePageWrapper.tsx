/// ==============================================
// Filename:ViewWebsitePageWrapper.tsx
// Type: View Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect }  from 'react'

// |-- External Dependencies --|
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'

// |-- Internal Dependencies --|
import ViewWebsitePage from './ViewWebsitePage'
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
