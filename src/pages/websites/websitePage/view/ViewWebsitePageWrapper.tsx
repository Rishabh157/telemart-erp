// |-- External Dependencies --|
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetWebsitePageByIdQuery } from 'src/services/websites/WebsitePageServices'
import ViewWebsitePage from './ViewWebsitePage'

const ViewWebsitePageWrapper = () => {

    const params = useParams()
    const Id = params.id

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetWebsitePageByIdQuery(Id),
    })

    return <ViewWebsitePage items={selectedItem} />
}

export default ViewWebsitePageWrapper
