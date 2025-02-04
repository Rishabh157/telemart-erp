// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Chip, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showToast } from 'src/utils'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { AttributesGroupListResponse } from 'src/models/AttrbutesGroup.model'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

import {
    useDeleteattributeGroupMutation,
    useGetAttributeGroupQuery,
} from 'src/services/AttributeGroup'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import AttributesGroupListing from './AttributesGroupListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'

const AttributesGroupListingWrapper = () => {
    useUnmountCleanup()
    const navigate = useNavigate()
    const [deleteAttGroup] = useDeleteattributeGroupMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const { userData } = useSelector((state: RootState) => state?.auth)

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_ATTRIBUTE_GROUP_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_ATTRIBUTE_GROUP_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(
                            `/configurations/attributes-group/${currentId}`
                        )
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Attribute',
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
            field: 'groupName',
            headerName: 'Group Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ATTRIBUTE_GROUP_LIST_ATTRIBUTE_GROUP_NAME,
            renderCell: (row: AttributesGroupListResponse) => (
                <span className="capitalize"> {row.groupName} </span>
            ),
        },
        {
            field: 'attributes',
            headerName: 'Attributes ',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.ATTRIBUTE_GROUP_LIST_ATTRIBUTES,
            renderCell: (row: AttributesGroupListResponse) => {
                const attribute = row.attributes?.map((ele) => {
                    return ele.label
                })
                return (
                    <span className="capitalize">
                        <Stack direction="row" spacing={1}>
                            {attribute.map((ele, index) => {
                                if (index < 9) {
                                    return (
                                        <Chip
                                            key={index}
                                            label={ele}
                                            color="primary"
                                            variant="outlined"
                                            size="small"
                                        />
                                    )
                                }
                                if (index === 10) {
                                    return (
                                        <Chip
                                            key={index}
                                            label={'...'}
                                            color="primary"
                                            variant="outlined"
                                            size="small"
                                        />
                                    )
                                } else {
                                    return null
                                }
                            })}
                        </Stack>
                    </span>
                )
            },
        },
    ]
    const attributeGroupState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue } = attributeGroupState

    const { items } = useGetCustomListingData({
        useEndPointHook: useGetAttributeGroupQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['groupName', 'attributes'],
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
        deleteAttGroup(currentId).then((res) => {
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
            {/*  */}
            <AttributesGroupListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
            {/* */}
        </>
    )
}

export default AttributesGroupListingWrapper
