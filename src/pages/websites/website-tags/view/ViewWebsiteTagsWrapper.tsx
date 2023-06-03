import React, { useEffect } from 'react'
import WebsiteTagsView from './WebsiteTagsView'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useGetWebsiteTagsByIdQuery } from 'src/services/websites/WebsiteTagsServices'
import { setSelectedTags } from 'src/redux/slices/website/websiteTagsSlice'
import WebsiteLayout from '../../WebsiteLayout'

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

    //console.log(selectedItem)

    return (
        <WebsiteLayout>
            <WebsiteTagsView items={selectedItem} />
        </WebsiteLayout>
    )
}

export default ViewWebsiteTagsWrapper
