// |-- External Dependencies --|
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { useGetWebsiteTagsByIdQuery } from 'src/services/websites/WebsiteTagsServices'
import WebsiteTagsView from './WebsiteTagsView'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

const ViewWebsiteTagsWrapper = () => {
    // Form Initial Values
    const params = useParams()
    const Id = params.id

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetWebsiteTagsByIdQuery(Id),
    })

    return <WebsiteTagsView items={selectedItem} />
}

export default ViewWebsiteTagsWrapper
