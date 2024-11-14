// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { BarcodeListResponseType } from 'src/models'
import BarcodeDetailsCard from './components/BarcodeDetailsCard/BarcodeDetailsCard'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

// |-- Types --|
type Props = {
    rows: any[]
    selectedBarcodes: BarcodeListResponseType[]
    onBarcodeSelect: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        barcode: BarcodeListResponseType,
        isBarcodeSeleted: boolean
    ) => void
    onBarcodeClick: (barcode: BarcodeListResponseType) => void
}

const BarcodeListing = ({
    rows,
    selectedBarcodes,
    onBarcodeSelect,
    onBarcodeClick,
}: Props) => {
    // Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const barcodeState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, totalItems, searchValue } = barcodeState

    return (
        <div className="px-4 h-[calc(100%-55px)] flex flex-col gap-3">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Barcode </ATMPageHeading>
                {isAuthorized(UserModuleNameTypes.ACTION_BARCODE_ADD) && (
                    <button
                        onClick={() => navigate('add')}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + Add Barcode
                    </button>
                )}
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
                {/* Header */}
                <ATMTableHeader
                    searchValue={searchValue}
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    // isFilter
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                />

                {/* Barcode Detail Cards */}
                <div className="grow overflow-auto">
                    <BarcodeDetailsCard barcodeList={rows} />
                </div>

                {/* Pagination */}
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

export default BarcodeListing
