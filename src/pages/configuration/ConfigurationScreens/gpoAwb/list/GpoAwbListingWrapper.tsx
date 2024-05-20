// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useGetGpoAwbQuery } from 'src/services/GpoAwbServices'
import GpoAwbListing from './GpoAwbListing'
import { FaCheck } from 'react-icons/fa6'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import { GpoAwbListResponse } from 'src/models/GpoAwb.model'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'

const GpoAwbListingWrapper = () => {
    useUnmountCleanup()
    const Transporttate: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = Transporttate
    const { userData } = useGetLocalStorage()

    const columns: columnTypes[] = [
        {
            field: 'awbNumber',
            headerName: 'AWB Number',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.GPO_AWB_NUMBER_LIST_AWB_NUMBER,
            renderCell: (row: GpoAwbListResponse) => row?.awbNumber,
        },
        {
            field: 'isUsed',
            headerName: 'Used',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.GPO_AWB_NUMBER_LIST_IS_USED,
            renderCell: (row: GpoAwbListResponse) =>
                row?.isUsed && <FaCheck color="#059669" size={20} />,
        },
        {
            field: 'orderNumber',
            headerName: 'Order Number',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.GPO_AWB_NUMBER_LIST_ORDER_NUMBER,
            renderCell: (row: GpoAwbListResponse) =>
                row.orderNumber ? (
                    <span className="text-primary-main ">
                        # {row.orderNumber}
                    </span>
                ) : null,
        },
        {
            field: 'createdAt',
            headerName: 'Created Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.GPO_AWB_NUMBER_LIST_CREATED_DATE,
            renderCell: (row: GpoAwbListResponse) =>
                formatedDateTimeIntoIst(row?.createdAt),
        },
    ]

    const { items } = useGetCustomListingData<GpoAwbListResponse>({
        useEndPointHook: useGetGpoAwbQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['awbNumber'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    return <GpoAwbListing columns={columns} rows={items} />
}

export default GpoAwbListingWrapper
