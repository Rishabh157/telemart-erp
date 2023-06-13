import React, { useEffect } from 'react'

import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { DealersSupervisorListResponse } from 'src/models/DealerSupervisor.model'
import DealerSupervisorListing from './DealerSupervisorListing'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/DealerSupervisorSlice'
import { AppDispatch } from 'src/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetDealerSupervisorQuery } from 'src/services/DealerSupervisorServices'
import { RootState } from 'src/redux/store'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

const ListDealerSupervisorTabWrapper = () => {
    // const [showDropdown, setShowDropdown] = useState(false)
    // const [currentId, setCurrentId] = useState('')
    const params = useParams()
    const dealerId: any = params.dealerId
    const dealerSupervisorState: any = useSelector(
        (state: RootState) => state.dealerSupervisor
    )
    const { page, rowsPerPage, items, searchValue } = dealerSupervisorState
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId

    const dispatch = useDispatch<AppDispatch>()
    const { data, isFetching, isLoading } = useGetDealerSupervisorQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['dealerId', 'zonalManagerName'],
        page: page,
        filterBy: [
            {
                fieldName: 'dealerId',
                value: dealerId,
            },
            {
                fieldName: 'companyId',
                value: companyId,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    const columns: columnTypes[] = [
        {
            field: 'schemeName',
            headerName: 'Supervisor Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DealersSupervisorListResponse) => (
                <span> {row.zonalManagerName} </span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    handleOnAction={() => {
                        // setShowDropdown(!showDropdown)
                        // setCurrentId(row?._id)
                    }}
                >
                    <></>
                </ActionPopup>
            ),
            align: 'end',
        },
    ]

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data, dispatch])

    return (
        <>
            <DealerSupervisorListing columns={columns} rows={items} />
        </>
    )
}

export default ListDealerSupervisorTabWrapper
