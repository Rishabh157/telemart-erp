// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'

import CourierPreferenceListing from './CourierPreferenceListing'
// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import {
    useGetCourierPreferenceQuery,
    useUpdateCourierPrefernceMutation,
} from 'src/services/CourierPreferenceService'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { CircularProgress } from '@mui/material'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import { showToast } from 'src/utils'

const CourierPreferenceListingWrapper = () => {
    useUnmountCleanup()
    const attributeState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = attributeState
    const [updateCourierPreference, updateCourierInfo] =
        useUpdateCourierPrefernceMutation()

    const columns: columnTypes[] = [
        {
            field: 'courierName',
            headerName: 'Courier Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.COURIER_MASTER_LIST_COURIER_NAME,
            renderCell: (row: any) => (
                <span className="capitalize"> {row.courierName} </span>
            ),
        },
        {
            field: 'priority',
            headerName: 'Priority',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.COURIER_MASTER_LIST_COURIER_NAME,
            renderCell: (row: any) => (
                <span className="capitalize"> {row.priority} </span>
            ),
        },
    ]

    const { userData } = useGetLocalStorage()
    const { items } = useGetCustomListingData<any>({
        useEndPointHook: useGetCourierPreferenceQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['courierName'],
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

    const handleUpdatePriority = (rows: any) => {
        let updateCourier = rows.map((items: any) => {
            return {
                courierName: items.courierName,
                priority: items.priority,
                companyId: userData?.companyId,
            }
        })
        updateCourierPreference({ body: updateCourier }).then((res: any) => {
            showToast('success', res?.data?.message)
        })
    }

    if (updateCourierInfo.isLoading) {
        return (
            <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                <CircularProgress />
            </div>
        )
    }

    return (
        <>
            <CourierPreferenceListing
                columns={columns}
                rows={items}
                handleUpdatePriority={handleUpdatePriority}
            />
        </>
    )
}

export default CourierPreferenceListingWrapper
