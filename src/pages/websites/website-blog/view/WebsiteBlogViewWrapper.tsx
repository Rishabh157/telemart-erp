// |-- External Dependencies --|
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { useGetWebsiteBlogByIdQuery } from 'src/services/websites/WebsiteBlogServices'
import WebsiteBlogView from './WebsiteBlogView'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

const WebsiteBlogViewWrapper = () => {
    const params = useParams()
    const Id = params.id

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetWebsiteBlogByIdQuery(Id),
    })

    return <WebsiteBlogView items={selectedItem} />
}

export default WebsiteBlogViewWrapper
