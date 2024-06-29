// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useGetPaginationWebLeadsQuery } from 'src/services/websites/WebLeadsServices'
import WebLeadsListing from './WebLeadsListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
// import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

type WebLeadsListResponseType = {
    _id: string
    order_id: string | null
    name: string
    phone: string
    email: string
    address: string
    address1: string
    landmark: string
    city: string
    state: string
    country: string
    zip_code: string
    quantity: string
    remark: string
    sdate: string
    status: string
    idtag: string
    product_name: string
    mode: string
    paymeny_mode: string
    url: string
    price: string
    leadStatus: string
    isDeleted: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    __v: number
}

const WebLeadsListingWrapper = () => {
    useUnmountCleanup()
    // const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate()
    // const [currentId, setCurrentId] = useState('')
    // const [showDropdown, setShowDropdown] = useState(false)
    const WebsiteState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue } = WebsiteState

    // pagination api
    const { items } = useGetCustomListingData<WebLeadsListResponseType[]>({
        useEndPointHook: useGetPaginationWebLeadsQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['phone', 'email', 'product_name', 'leadStatus'],
            page: page,
            filterBy: [],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const columns: columnTypes[] = [
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     flex: 'flex-[1_1_0%]',
        //     renderCell: (row: any) => (
        //         <ActionPopup
        //             isEdit={isAuthorized(
        //                 UserModuleNameTypes.ACTION_WEBSITES_ONE_EDIT
        //             )}

        //             handleOnAction={() => {
        //                 setShowDropdown(!showDropdown)
        //                 setCurrentId(row?._id)
        //             }}
        //             handleEditActionButton={() => {
        //                 navigate(`/all-websites/website/${currentId}`)
        //             }}

        //         >

        //         </ActionPopup>
        //     ),
        // },
        {
            field: 'name',
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LIST_WEBSITES_NAME,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.name} </span>
            ),
        },
        {
            field: 'phone',
            headerName: 'Mobile No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LIST_WEBSITES_NAME,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.phone} </span>
            ),
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LIST_WEBSITES_NAME,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.email || '-'} </span>
            ),
        },
        {
            field: 'productName',
            headerName: 'Product Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LIST_WEBSITES_NAME,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.product_name} </span>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LIST_URL,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.price || '-'} </span>
            ),
        },
        {
            field: 'city',
            headerName: 'City',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LIST_URL,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.city || '-'} </span>
            ),
        },
        {
            field: 'state',
            headerName: 'State',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_LIST_URL,
            renderCell: (row: WebLeadsListResponseType) => (
                <span> {row.state || '-'} </span>
            ),
        },
    ]

    return <WebLeadsListing columns={columns} rows={items} />
}

export default WebLeadsListingWrapper
