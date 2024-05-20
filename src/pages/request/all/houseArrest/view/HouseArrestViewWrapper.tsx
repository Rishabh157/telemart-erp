// |-- External Dependencies --|
import { useParams } from 'react-router-dom'
import { useGetHouseArrestByIdQuery } from 'src/services/HouseArrestServices'

// |-- Internal Dependencies --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import HouseArrestView from './HouseArrestView'

const HouseArrestViewWrapper = () => {
    const params = useParams()
    const id: any = params.id

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetHouseArrestByIdQuery(id, {
            skip: !id,
        }),
    })
    return <HouseArrestView items={selectedItem} />
}

export default HouseArrestViewWrapper
