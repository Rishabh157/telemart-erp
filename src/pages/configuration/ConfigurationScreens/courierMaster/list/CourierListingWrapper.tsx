// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { CourierMasterListResponse } from 'src/models/CourierMaster.model'
import CourierListing from './CourierListing'
// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { useGetCourierMasterQuery } from 'src/services/CourierMasterService'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import { FaCheck } from 'react-icons/fa'

const CourierListingWrapper = () => {
    const navigate = useNavigate()
    const languageState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { userData } = useGetLocalStorage()
    const { page, rowsPerPage, searchValue } = languageState
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)

    const { items } = useGetCustomListingData<CourierMasterListResponse>({
        useEndPointHook: useGetCourierMasterQuery({
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

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_LANGUAGE_EDIT
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/configurations/courier/edit/${currentId}`)
                    }}
                    // handleDeleteActionButton={() => {
                    //     showConfirmationDialog({
                    //         title: 'Delete Language',
                    //         text: 'Do you want to delete',
                    //         showCancelButton: true,
                    //         next: (res) => {
                    //             return res.isConfirmed
                    //                 ? handleDelete()
                    //                 : setShowDropdown(false)
                    //         },
                    //     })
                    // }}
                />
            ),
        },
        {
            field: 'courierName',
            headerName: 'Courier Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.LANGUAGE_LIST_LANGUAGE,
        },
        {
            field: 'courierCode',
            headerName: 'Courier Code',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.LANGUAGE_LIST_LANGUAGE,
        },
        {
            field: 'courierType',
            headerName: 'Courier Type',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.LANGUAGE_LIST_LANGUAGE,
        },
        {
            field: 'transportType',
            headerName: 'Transport Type',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.LANGUAGE_LIST_LANGUAGE,
        },
        {
            field: 'isApiAvailable',
            headerName: 'Api Available',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.LANGUAGE_LIST_LANGUAGE,
            renderCell: (row: CourierMasterListResponse) => {
                return row?.isApiAvailable ? <FaCheck color="#438a47" /> : null
            },
        },
    ]

    return (
        <CourierListing
            columns={columns}
            rows={items}
            setShowDropdown={setShowDropdown}
        />
    )
}

export default CourierListingWrapper
