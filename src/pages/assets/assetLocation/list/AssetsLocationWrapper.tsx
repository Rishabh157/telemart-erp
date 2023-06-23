/// ==============================================
// Filename:AssertLocationWrapper.tsx
// Type: List Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import AsstesLayout from '../../AssetsLayout'
import AssetsLocationListing from './AssetsLocationListing'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import {
    useDeleteAssetsLocationMutation,
    useGetAssetsLocationQuery,
} from 'src/services/assets/AssetsLocationService'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/assets/assetsLocationSlice'
import { AssetsLocationListResponse } from 'src/models'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'

const AssetsLocationWrapper = () => {
    const navigate = useNavigate()
    const [deleteAssetLocation] = useDeleteAssetsLocationMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const { userData } = useSelector((state: RootState) => state?.auth)

    const columns: columnTypes[] = [
        {
            field: 'locationName',
            headerName: 'Location Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: AssetsLocationListResponse) => (
                <span className="capitalize"> {row.locationName} </span>
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isDelete
                    isEdit
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/assets/assets-location/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Asset Location',
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
            align: 'end',
        },
    ]
    const assetLocationState: any = useSelector(
        (state: RootState) => state.assetLocation
    )

    const { page, rowsPerPage, items, searchValue } = assetLocationState

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetAssetsLocationQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['locationName'],
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
        deleteAssetLocation(currentId).then((res) => {
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
            <AsstesLayout>
                <AssetsLocationListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </AsstesLayout>
        </>
    )
}

export default AssetsLocationWrapper
