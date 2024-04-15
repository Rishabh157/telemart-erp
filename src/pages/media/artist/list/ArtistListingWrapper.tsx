// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { ArtistListResponse } from 'src/models/Artist.model'
import {
    useDeletegetArtistMutation,
    useGetPaginationArtistQuery,
} from 'src/services/media/ArtistServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import ArtistListing from './ArtistListing'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const ArtistListingWrapper = () => {
    useUnmountCleanup()

    // state
    const [currentId, setCurrentId] = useState('')
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = listingPaginationState
    const { userData } = useSelector((state: RootState) => state?.auth)

    // initiate method
    const navigate = useNavigate()
    const [deleteCompetitor] = useDeletegetArtistMutation()

    // pagination api
    const { items } = useGetCustomListingData<any[]>({
        useEndPointHook: useGetPaginationArtistQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['artistName'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
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
                        UserModuleNameTypes.ACTION_ARTIST_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_ARTIST_DELETE
                    )}
                    handleOnAction={() => {
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/media/artist/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Artist',
                            text: 'Do you want to delete',
                            showCancelButton: true,
                            next: (res: any) => {
                                return res.isConfirmed ? handleDelete() : null
                            },
                        })
                    }}
                />
            ),
        },
        {
            field: 'artistName',
            headerName: 'Artist Name',
            flex: 'flex-[1_1_0%]',

            name: UserModuleNameTypes.ARTIST_LIST_ARTIST_NAME,
            renderCell: (row: ArtistListResponse) => (
                <span> {row.artistName} </span>
            ),
        },
    ]

    const handleDelete = () => {
        deleteCompetitor(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Artist deleted successfully!')
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
    return <ArtistListing columns={columns} rows={items} />
}

export default ArtistListingWrapper
