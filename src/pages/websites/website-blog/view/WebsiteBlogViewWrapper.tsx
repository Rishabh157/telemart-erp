/// ==============================================
// Filename:WebsiteBlogViewWrapper.tsx
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
import WebsiteBlogView from './WebsiteBlogView'
import { useGetWebsiteBlogByIdQuery } from 'src/services/websites/WebsiteBlogServices'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedWebsiteBlog } from 'src/redux/slices/website/websiteBlogSlice'

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

    return <WebsiteBlogView items={selectedItem} />
}

export default WebsiteBlogViewWrapper
