// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'

import PrefrenceCourierListing from './PrefrenceCourierListing'
// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { useGetPrefernceCourierQuery } from 'src/services/PreferenceService'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
// import ActionPopup from 'src/components/utilsComponent/ActionPopup'
// import { useNavigate } from 'react-router-dom'

const PreferenceCourierListingWrapper = () => {
    useUnmountCleanup()
    // const navigate = useNavigate()
    const attributeState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = attributeState

    const columns: columnTypes[] = [
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     flex: 'flex-[0.5_0.5_0%]',
        //     renderCell: (row: any) => (
        //         <ActionPopup
        //             isEdit
        //             handleEditActionButton={() => {
        //                 navigate(`/configurations/attributes/${row._id}`)
        //             }}
        //             handleOnAction={() => {}}
        //         />
        //     ),
        // },

        {
            field: 'courierName',
            headerName: 'Courier Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ATTRIBUTE_LIST_ATTRIBUTE_NAME,
            renderCell: (row: any) => (
                <span className="capitalize"> {row.courierName} </span>
            ),
        },
        {
            field: 'priority',
            headerName: 'Priority',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ATTRIBUTE_LIST_ATTRIBUTE_NAME,
            renderCell: (row: any) => (
                <span className="capitalize"> {row.priority} </span>
            ),
        },
    ]
    const { items } = useGetCustomListingData<any>({
        useEndPointHook: useGetPrefernceCourierQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['courierName'],
            page: page,
            filterBy: [
                // {
                //     fieldName: 'companyId',
                //     value: userData?.companyId,
                // },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    return (
        <>
            <PrefrenceCourierListing columns={columns} rows={items} />
        </>
    )
}

export default PreferenceCourierListingWrapper
