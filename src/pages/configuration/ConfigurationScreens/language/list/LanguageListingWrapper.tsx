/// ==============================================
// Filename:LanguageListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { LanguageListResponse } from 'src/models/Language.model'

import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/languageSlice'
import {
    useDeleteLanguageMutation,
    useGetLanguageQuery,
} from 'src/services/LanguageService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import LanguageListing from './LanguageListing'
// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const LanguageListingWrapper = () => {
    const navigate = useNavigate()
    const languageState: any = useSelector((state: RootState) => state.language)
    const { page, rowsPerPage, items, searchValue } = languageState
    const [deleteLanguage] = useDeleteLanguageMutation()
    const dispatch = useDispatch<AppDispatch>()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)

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
    const { data, isFetching, isLoading } = useGetLanguageQuery({
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

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data])

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
