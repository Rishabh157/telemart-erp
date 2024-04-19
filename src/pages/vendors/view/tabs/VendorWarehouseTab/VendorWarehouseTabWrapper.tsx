// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { HiDotsHorizontal } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { VendorWarehousesListResponse } from 'src/models'
import {
    useDeleteVendorWarehouseMutation,
    useGetVendorWarehouseQuery,
} from 'src/services/VendorWarehouseService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import VendorWarehouseListing from './VendorWarehouseListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

const VendorWarehouseTabWrapper = (props: Props) => {
    useUnmountCleanup()
    const navigate = useNavigate()
    const params = useParams()
    const vendorId = params.vendorId
    const [deleteVendorWarehouse] = useDeleteVendorWarehouseMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const vendorWarehouseState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { userData } = useSelector((state: RootState) => state?.auth)

    const columns: columnTypes[] = [
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
                            setCurrentId(row?._id)
                        }}
                        className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full"
                    >
                        {' '}
                        <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{' '}
                    </button>
                    {showDropdown && currentId === row?._id && (
                        <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <button
                                onClick={() => {
                                    navigate(`${currentId}`, {
                                        state: { params },
                                    })
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Delete warehouse',
                                        text: 'Do you want to delete',
                                        showCancelButton: true,
                                        next: (res: any) => {
                                            return res.isConfirmed
                                                ? handleDelete()
                                                : setShowDropdown(false)
                                        },
                                    })
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ),
        },
        {
            field: 'warehouseCode',
            headerName: 'Warehouse Code',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: VendorWarehousesListResponse) => (
                <span> {row.wareHouseCode} </span>
            ),
        },
        {
            field: 'warehouseName',
            headerName: 'Warehouse Name',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: VendorWarehousesListResponse) => {
                return <span>{row.wareHouseName}</span>
            },
        },
        {
            field: 'country',
            headerName: 'Country',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: VendorWarehousesListResponse) => (
                <span> {row.wareHouseCountryName} </span>
            ),
        },
        {
            field: 'state',
            headerName: 'State',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: VendorWarehousesListResponse) => {
                return <span> {row.registrationStateName} </span>
            },
        },
        {
            field: 'district',
            headerName: 'District',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: VendorWarehousesListResponse) => {
                return <span> {row.registrationDistrictName} </span>
            },
        },
        {
            field: 'pincode',
            headerName: 'Pincode',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: VendorWarehousesListResponse) => {
                return <span> {row.registrationPincodeName} </span>
            },
        },
    ]

    const { page, rowsPerPage, searchValue } = vendorWarehouseState

    const { items } = useGetCustomListingData<VendorWarehousesListResponse>({
        useEndPointHook: useGetVendorWarehouseQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['wareHouseName', 'country'],
            page: page,
            filterBy: [
                {
                    fieldName: 'vendorId',
                    value: vendorId,
                },
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
        deleteVendorWarehouse(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Warehouse deleted successfully!')
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
        <div className="px-2 h-full  ">
            <VendorWarehouseListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
                AddpathName={`add`}
            />
        </div>
    )
}

export default VendorWarehouseTabWrapper
