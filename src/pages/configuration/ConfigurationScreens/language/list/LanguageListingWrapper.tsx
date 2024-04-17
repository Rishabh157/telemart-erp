// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { LanguageListResponse } from 'src/models/Language.model'

import {
    useDeleteLanguageMutation,
    useGetLanguageQuery,
} from 'src/services/LanguageService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import LanguageListing from './LanguageListing'
// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const LanguageListingWrapper = () => {
    const navigate = useNavigate()
    const languageState: any = useSelector((state: RootState) => state.listingPagination)
    const { page, rowsPerPage, searchValue } = languageState
    const [deleteLanguage] = useDeleteLanguageMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)

    const { items } = useGetCustomListingData<LanguageListResponse>({
        useEndPointHook: useGetLanguageQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['languageName'],
            page: page,
            filterBy: [
                {
                    fieldName: '',
                    value: [],
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        })
    })

    const handleDelete = () => {
        setShowDropdown(false)
        deleteLanguage(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Deleted successfully!')
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
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_LANGUAGE_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/configurations/language/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Language',
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
            field: 'languageName',
            headerName: 'Language',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.LANGUAGE_LIST_LANGUAGE,
            renderCell: (row: LanguageListResponse) => (
                <span> {row.languageName} </span>
            ),
        },
    ]
    return (
        <>
            <LanguageListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </>
    )
}

export default LanguageListingWrapper
