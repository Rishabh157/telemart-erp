import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetWHInventoryByWarehouseIdQuery } from 'src/services/DashboardServices'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'

const WHInventory = () => {
    const [warehouseId, setWarehouseId] = useState<string>()

    const { items, isFetching } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetWHInventoryByWarehouseIdQuery(
            {
                warehousId: warehouseId,
            },
            { skip: !warehouseId }
        ),
    })
    const { options } = useCustomOptions({
        useEndPointHook: useGetWareHousesQuery(''),
        keyName: 'wareHouseName',
        value: '_id',
    })

    const columns: columnTypes[] = [
        {
            field: 'productGroupLabel',
            headerName: 'Product Name',
            flex: 'flex-[1.5_1.5_0%]',
        },
        {
            field: 'count',
            headerName: 'Total Quantity',
            flex: 'flex-[1.5_1.5_0%]',
        },
    ]
    useEffect(() => {
        if (options?.length) {
            setWarehouseId(options[0]?.value as string)
        }
    }, [options])
    return (
        <div className="border-[1px] border-slate-400 rounded p-2 w-full h-fit">
            <div className="text-start flex justify-between w-full">
                {/* Heading */}
                <div className="w-1/2">
                    <ATMPageHeading> Warehouse Inventory </ATMPageHeading>
                </div>
                <div className="w-1/2 pb-6">
                    <ATMSelectSearchable
                        componentClass="z-[10001]"
                        name=""
                        value={warehouseId}
                        onChange={(e) => setWarehouseId(e)}
                        options={options || []}
                        label="Wareouse"
                    />
                </div>

                {/* Date Filter */}
            </div>
            <div className="relative">
                {isFetching && (
                    <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                        <CircularProgress />
                    </div>
                )}
                <div className="grow overflow-auto  ">
                    <ATMTable
                        isLoading={isFetching}
                        columns={columns || []}
                        rows={items || []}
                        extraClasses="max-h-full overflow-auto"
                    />
                </div>
            </div>
        </div>
    )
}

export default WHInventory
