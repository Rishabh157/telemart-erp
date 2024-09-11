// |-- External Dependencies --|
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import ViewWarehouse from './ViewWarehouse'
//import { showToast } from "src/utils";
import { useGetWareHouseByIdQuery } from 'src/services/WareHouseService'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { WarehousesListResponse } from 'src/models'

const ViewWarehouseWrapper = () => {
    const params = useParams()
    const id: any = params.id
    const { items } = useGetDataByIdCustomQuery({
        useEndPointHook: useGetWareHouseByIdQuery(id),
    })

    return <ViewWarehouse items={items as WarehousesListResponse} />
}

export default ViewWarehouseWrapper
