import React, { useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
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
//import { showToast } from "src/utils";
import { useParams } from 'react-router-dom'
//import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { useGetDealerSupervisorQuery } from 'src/services/DealerSupervisorServices'
import { RootState } from 'src/redux/store'

const ListDealerSupervisorTabWrapper = () => {
    const params = useParams()
    const dealerId: any = params.dealerId
    const dealerSupervisorState: any = useSelector(
        (state: RootState) => state.dealerSupervisor
    )
    const { page, rowsPerPage, items, searchValue } = dealerSupervisorState
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId

    const dispatch = useDispatch<AppDispatch>()
    //const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetDealerSupervisorQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['dealerId', 'zonalManager'],
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

    // console.log(data)

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
                <div className="relative">
                    <button
                        onClick={() => {
                            //setShowDropdown(!showDropdown);
                            //setCurrentId(row?._id);
                        }}
                        className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full"
                    >
                        <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />
                    </button>
                    {/* {showDropdown && currentId === row?._id && (
            <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={() => {
                  navigate(`/scheme/${currentId}`);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  showConfirmationDialog({
                    title: "Delete Scheme",
                    text: "Do you want to delete",
                    showCancelButton: true,
                    next: (res) => {
                      return res.isConfirmed
                        ? handleDelete()
                        : setShowDropdown(false);
                    },
                  });
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )} */}
                </div>
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

    //   const handleDelete = () => {
    //     setShowDropdown(false);
    //     deleteScheme(currentId).then((res: any) => {
    //       if ("data" in res) {
    //         if (res?.data?.status) {
    //           showToast("success", "Scheme deleted successfully!");
    //         } else {
    //           showToast("error", res?.data?.message);
    //         }
    //       } else {
    //         showToast("error", "Something went wrong, Please try again later");
    //       }
    //     });
    //   };

    return (
        <>
            <DealerSupervisorListing columns={columns} rows={items} />
        </>
    )
}

export default ListDealerSupervisorTabWrapper
