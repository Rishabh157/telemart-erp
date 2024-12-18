// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CgDetailsMore } from "react-icons/cg";

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import { BatchesListResponseTypes } from 'src/models/Batches.model'
import { format } from 'date-fns';

// |-- Redux --|
import {
    setFilterValue,
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { ATMFullScreenLoader } from 'src/components/UI/atoms/ATMDisplay/ATMLoader';

// |-- Types --|
type Props = {
    rows: any[]
}

interface InfoCardPropTypes {
    batchNumber: number
    bucketOders: number
    batchCreatedBy: string
    createdAt: string
    isCompleted: any
    onClick: () => void
}

function BatchInfoCard({ batchNumber, bucketOders, batchCreatedBy, createdAt, isCompleted, onClick }: InfoCardPropTypes) {
    return (
        <div className="p-6 bg-gradient-to-r from-white via-gray-50 to-gray-100 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300 ease-in-out">

            {/* Batch Number */}
            <div className="text-sm text-gray-600 mb-4 flex items-center justify-between">
                <span className="font-medium">Batch Number:</span>
                <span className="text-sm text-primary-main font-bold"># {batchNumber}</span>
            </div>

            {/* Created By */}
            <div className="text-sm text-gray-600 mb-4 flex items-center justify-between">
                <span className="font-medium">Created By:</span>
                <span className="bg-primary-light text-primary-main font-semibold rounded-full text-xs">
                    {batchCreatedBy}
                </span>
            </div>

            {/* Orders Buckets */}
            <div className="text-sm text-gray-600 mb-4 flex items-center justify-between">
                <span className="font-medium">Order Buckets:</span>
                <span className="px-3 py-1 bg-gray-100 text-black font-semibold rounded-full text-xs">
                    {bucketOders}
                </span>
            </div>

            {/* Orders Buckets */}
            <div className="text-sm text-gray-600 mb-4 flex items-center justify-between">
                <span className="font-medium">Status:</span>

                <span className={`px-3 py-1 text-xs font-medium rounded-md ${isCompleted ? 'bg-green-500 text-green-100' : 'bg-primary-main text-white'}  `}>
                    {isCompleted ? 'Complete' : 'Pending'}
                </span>

            </div>

            {/* Created Date */}
            <div className="text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                    <span className="font-medium">Created Date:</span>
                    <div className="text-right">
                        <div className="text-xs text-slate-700 font-medium">
                            {format(new Date(createdAt), 'dd MMM yyyy')}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                            {format(new Date(createdAt), 'hh:mm a')}
                        </div>
                    </div>
                </div>
            </div>

            {/* View Button */}
            <button
                onClick={onClick}
                className="w-full py-2 flex justify-center items-center gap-x-2 text-white bg-primary-main hover:bg-primary-dark rounded-md shadow-md focus:ring-2 focus:ring-primary-light focus:ring-offset-2 transition-all duration-200"
            >
                <CgDetailsMore className="text-lg" />
                <span>View Orders</span>
            </button>
        </div>
    );
}


// making HOC
// const withCompltedBatchCard = (BatchInfoCard: any) => {
//     return (props: InfoCardPropTypes) => {
//         return (
//             <div className="relative group">
//                 <BatchInfoCard {...props} />
//                 <div className="absolute top-8 -left-2 transform -rotate-45 bg-red-500 text-white px-4 py-1 text-[12px] font-bold shadow-md rounded">
//                     <span>Batch completed</span>
//                 </div>
//             </div>
//         )
//     }
// }

const AssignBatchesListing = ({ rows }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const createBatchState: any = useSelector((state: RootState) => state.listingPagination)
    const navigate = useNavigate()
    const { page, rowsPerPage, searchValue, isTableLoading, totalItems } = createBatchState


    // Higher order component with additoanl UI
    // const BatchCompletedWithRemark = withCompltedBatchCard(BatchInfoCard);

    return (
        <div className="px-4 h-[calc(100vh-110px)]">

            {isTableLoading && <ATMFullScreenLoader />}

            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Batches </ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-45px)] rounded bg-white">
                <ATMTableHeader
                    searchValue={searchValue}
                    placeholder="Batch No..."
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    onFilterDispatch={() => dispatch(setFilterValue([]))}
                />

                {/* Table */}
                <div className="h-[calc(100%-110px)] overflow-auto ">
                    <div className="grid grid-cols-4 gap-4 p-4">
                        {rows?.map((batch: BatchesListResponseTypes) =>
                            <BatchInfoCard
                                key={batch?._id}
                                batchNumber={batch?.batchNumber}
                                bucketOders={batch?.orders?.length}
                                batchCreatedBy={capitalizeFirstLetter(batch?.batchCreatedByLabel)}
                                createdAt={batch?.createdAt}
                                isCompleted={batch?.isCompleted}
                                onClick={() => navigate(`${batch?._id}`)}
                            />
                        )}
                        {/* {rows?.map((batch: BatchesListResponseTypes) =>
                            !batch?.isCompleted ? <BatchInfoCard
                                key={batch?._id}
                                batchNumber={batch?.batchNumber}
                                bucketOders={batch?.orders?.length}
                                batchCreatedBy={capitalizeFirstLetter(batch?.batchCreatedByLabel)}
                                createdAt={batch?.createdAt}
                                isCompleted={batch?.isCompleted}
                                onClick={() => navigate(`${batch?._id}`)}
                            /> : <BatchCompletedWithRemark
                                key={batch?._id}
                                batchNumber={batch?.batchNumber}
                                bucketOders={batch?.orders?.length}
                                batchCreatedBy={capitalizeFirstLetter(batch?.batchCreatedByLabel)}
                                createdAt={batch?.createdAt}
                                isCompleted={batch?.isCompleted}
                                onClick={() => navigate(`${batch?._id}`)}
                            />
                        )} */}
                    </div>
                </div>

                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default AssignBatchesListing
