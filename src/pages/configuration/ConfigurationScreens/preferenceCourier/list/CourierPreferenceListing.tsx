// |-- Built-in Dependencies --|

// |-- External Dependencies --|

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'

// |-- Redux --|
import CourierPreferenceDragListing, {
    CourierProps,
} from './CourierPreferenceDragListing'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { useNavigate } from 'react-router-dom'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    handleUpdatePriority: (rows: CourierProps[]) => void
}

const CourierPreferenceListing = ({
    columns,
    rows,
    handleUpdatePriority,
}: Props) => {
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Configuration',
            path: '/dashboard',
        },
        {
            label: ' Courier Preference ',
        },
    ]
const navigate=useNavigate()
    return (
        <div className="px-4 h-full pt-3">
            {/* Breadcrumbs */}
            <div className="h-[30px]">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Courier Preference </ATMPageHeading>
                {isAuthorized(
                    UserModuleNameTypes.ACTION_COURIER_PREFERENCE_ADD
                ) && (
                    <button
                        onClick={() =>
                            navigate('/configurations/courier-preference/add')
                        }
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + Add
                    </button>
                )}
            </div>

            <CourierPreferenceDragListing
                rows={rows}
                handleUpdatePriority={handleUpdatePriority}
            />

            {/* <div className="border flex flex-col h-[calc(100%-85px)] rounded bg-white">
                <ATMTableHeader
                    searchValue={searchValue}
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                />

                <div className="grow overflow-auto">
                    <ATMTable
                        isLoading={isTableLoading}
                        columns={columns}
                        rows={rows}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        extraClasses="h-full overflow-auto"
                    />
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
            </div> */}
        </div>
    )
}

export default CourierPreferenceListing
