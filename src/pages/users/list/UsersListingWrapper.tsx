import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetNewUsersQuery } from 'src/services/UserServices'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/NewUserSlice'
import UsersListing from './UsersListing'

const UsersListingWrapper = () => {
    const userState: any = useSelector((state: RootState) => state.newUser)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { items, page, rowsPerPage, searchValue } = userState
    const [showDropdown, setShowDropdown] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const { data, isFetching, isLoading } = useGetNewUsersQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['firstName', 'mobile', 'lastName'],
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
    })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItems || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data])

    const columns: columnTypes[] = [
        {
            field: 'UserName',
            headerName: 'User Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => (
                <span>
                    {' '}
                    {row.firstName} {row.lastName}{' '}
                </span>
            ),
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: any) => {
                return <span> {row.email} </span>
            },
        },
        {
            field: 'mobile',
            headerName: 'Mobile no.',
            flex: 'flex-[1_1_0%]',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowDropdown(!showDropdown)
                            //setCurrentId(row?._id)
                        }}
                        className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full"
                    >
                        {' '}
                        <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{' '}
                    </button>
                </div>
            ),
            align: 'end',
        },
    ]

    return (
        <SideNavLayout>
            <UsersListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </SideNavLayout>
    )
}

export default UsersListingWrapper
