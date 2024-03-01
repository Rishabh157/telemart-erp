/// ==============================================
// Filename:ViewWebsiteTagsWrapper.tsx
// Type: View Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import WebsiteTagsView from './WebsiteTagsView'
import { useGetWebsiteTagsByIdQuery } from 'src/services/websites/WebsiteTagsServices'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedTags } from 'src/redux/slices/website/websiteTagsSlice'

const ViewWebsiteTagsWrapper = () => {
    // Form Initial Values
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id

    const { selectedItem }: any = useSelector(
        (state: RootState) => state.websiteTags
    )
    const { isLoading, isFetching, data } = useGetWebsiteTagsByIdQuery(Id)

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedTags(data?.data || []))
        }
    }, [isLoading, isFetching, data, dispatch])

    return <WebsiteTagsView items={selectedItem} />
}

export default ViewWebsiteTagsWrapper
