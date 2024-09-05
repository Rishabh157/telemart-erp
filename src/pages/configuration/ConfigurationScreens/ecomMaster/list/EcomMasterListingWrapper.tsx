// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { EcomMasterListResponse } from 'src/models/EcomMaster.model'

import {
    useDeleteEcomMasterMutation,
    useGetEcomMasterQuery,
} from 'src/services/EcomMasterService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import EcomMasterListing from './EcomMasterListing'
// |-- Redux --|
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const EcomMasterListingWrapper = () => {
    useUnmountCleanup()
    const attributeState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [deleteEcomMaster] = useDeleteEcomMasterMutation()
    const navigate = useNavigate()
    const { page, rowsPerPage, searchValue } = attributeState
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: EcomMasterListResponse) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_ATTRIBUTE_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_ATTRIBUTE_DELETE
                    )}
                    handleOnAction={() => {
                        // e.stopPropagation()
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/configurations/ecom-master/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Ecom',
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
            field: 'ecomDisplayName',
            headerName: 'Ecom Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ATTRIBUTE_LIST_ATTRIBUTE_NAME,
            renderCell: (row: EcomMasterListResponse) => (
                <span className="capitalize"> {row?.ecomDisplayName} </span>
            ),
        },
    ]

    const { items } = useGetCustomListingData<EcomMasterListResponse>({
        useEndPointHook: useGetEcomMasterQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['ecomDisplayName'],
            page: page,
            filterBy: [],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const handleDelete = () => {
        setShowDropdown(false)
        deleteEcomMaster(currentId).then((res:any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Ecom deleted successfully!')
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
        <EcomMasterListing
            columns={columns}
            rows={items}
            setShowDropdown={setShowDropdown}
        />
    )
}

export default EcomMasterListingWrapper
