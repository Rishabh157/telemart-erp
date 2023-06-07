import React, { useEffect } from 'react'
import WebsiteBlogView from './WebsiteBlogView'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useGetWebsiteBlogByIdQuery } from 'src/services/websites/WebsiteBlogServices'
import { setSelectedWebsiteBlog } from 'src/redux/slices/website/websiteBlogSlice'
import WebsiteLayout from '../../WebsiteLayout'

const WebsiteBlogViewWrapper = () => {
    // Form Initial Values
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id

    const { selectedItem }: any = useSelector(
        (state: RootState) => state.websiteBlog
    )
    const { isLoading, isFetching, data } = useGetWebsiteBlogByIdQuery(Id)

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedWebsiteBlog(data?.data || []))
        }
    }, [isLoading, isFetching, data, dispatch])

    //console.log(selectedItem)

    return (
        <WebsiteLayout>
            <WebsiteBlogView items={selectedItem} />
        </WebsiteLayout>
    )
}

export default WebsiteBlogViewWrapper
