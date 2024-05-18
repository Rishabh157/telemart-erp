// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { TransportListResponse } from 'src/models/Transport.model'

import {
    useDeleteTransportMutation,
    useGetTransportQuery,
} from 'src/services/TransportServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import TransportListing from './TransportListing'
// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

const TransportListingWrapper = () => {
    useUnmountCleanup()
    const Transporttate: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [deleteTransport] = useDeleteTransportMutation()
    const navigate = useNavigate()
    const { page, rowsPerPage, searchValue } = Transporttate
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const { userData } = useGetLocalStorage()

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: TransportListResponse) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_TRANSPORT_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_TRANSPORT_DELETE
                    )}
                    handleOnAction={() => {
                        // e.stopPropagation()
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/configurations/transport/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Transport',
                            text: 'Do you want to delete',
                            showCancelButton: true,
                            next: (res) => {
                                return res.isConfirmed
                                    ? handleDelete()
                                    : setShowDropdown(false)
                            },
                        })
                    }}
                />
            ),
        },
        {
            field: 'TransportName',
            headerName: 'Transport Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TRANSPORT_LIST_TRANSPORT_NAME,
            renderCell: (row: TransportListResponse) => (
                <span className="capitalize"> {row.transportName} </span>
            ),
        },
        {
            field: 'gst',
            headerName: 'GST',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TRANSPORT_LIST_GST,
            renderCell: (row: TransportListResponse) => (
                <span className="capitalize"> {row.gst} </span>
            ),
        },
    ]
    const { items } = useGetCustomListingData<TransportListResponse>({
        useEndPointHook: useGetTransportQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['transportName'],
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

    const handleDelete = () => {
        setShowDropdown(false)
        deleteTransport(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Transport deleted successfully!')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast(
                    'error',
                    'Something went wrong, Please try again later'
                )
            }
        })
    }
    return (
        <TransportListing
            columns={columns}
            rows={items}
            setShowDropdown={setShowDropdown}
        />
    )
}

export default TransportListingWrapper
