// |-- External Dependencies --|
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useGetInquiryUnAuthQuery } from 'src/services/InquiryService'

// |-- Redux --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { DealersRatioListResponse } from 'src/models'
import { RootState } from 'src/redux/store'
import CallerButton from './CallerButton'

type AddressDialogTypes = {
    isShow: boolean
    onClose: () => void
}

const AddressDialog = ({ isShow, onClose }: AddressDialogTypes) => {
    const inquiryState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { userData }: any = useSelector((state: RootState) => state.auth)

    const { page, rowsPerPage, searchValue, filterValue } = inquiryState

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { items } = useGetCustomListingData<DealersRatioListResponse>({
        useEndPointHook: useGetInquiryUnAuthQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['inquiryNumber'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
                },
                {
                    fieldName: 'dispositionLevelThreeId',
                    value: filterValue,
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
            field: 'state',
            headerName: 'State',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersRatioListResponse) => (
                <span className="text-primary-main ">{row.pincode}</span>
            ),
        },
        {
            field: 'district',
            headerName: 'District',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersRatioListResponse) => (
                <span className="text-primary-main ">{row.pincode}</span>
            ),
        },
        {
            field: 'taluk',
            headerName: 'Taluk',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersRatioListResponse) => (
                <span className="text-primary-main ">{row.pincode}</span>
            ),
        },
        {
            field: 'post',
            headerName: 'Post',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersRatioListResponse) => (
                <span className="text-primary-main ">{row.pincode}</span>
            ),
        },
        {
            field: 'pincode',
            headerName: 'Pincode',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersRatioListResponse) => (
                <span className="text-primary-main ">{row.pincode}</span>
            ),
        },
        // {
        //     field: 'action',
        //     headerName: 'Action',
        //     flex: 'flex-[1_5_0%]',
        //     renderCell: (row: DealersRatioListResponse) => (
        //         // <span> {row.mobileNo} </span>
        //     ),
        // },
    ]

    const rows: any = [
        {
            pincode: '452009',
            dealerCount: '3',
        },
        {
            pincode: '452002',
            dealerCount: '3',
        },
        {
            pincode: '452001',
            dealerCount: '3',
        },
        {
            pincode: '452008',
            dealerCount: '3',
        },
    ]

    return (
        <>
            <DialogLogBox
                isOpen={isShow}
                buttonClass="cursor-pointer"
                maxWidth="sm"
                handleClose={onClose}
                component={
                    <div className="p-4">
                        <div className="grid grid-cols-12 gap-x-4">
                            <div className="col-span-6">
                                <ATMTextField
                                    label="State"
                                    placeholder="Enter State"
                                    size="xxs"
                                    labelSize="xxs"
                                    name="state"
                                    value={''}
                                    onChange={(e) => {
                                        // setPinCodeSearch(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-span-6">
                                <ATMTextField
                                    label="District"
                                    placeholder="Enter City"
                                    size="xxs"
                                    labelSize="xxs"
                                    name="district"
                                    value={''}
                                    onChange={(e) => {
                                        // setPinCodeSearch(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-span-6">
                                <ATMTextField
                                    label="Taluk/Tehsil"
                                    placeholder="Enter Taluk"
                                    size="xxs"
                                    labelSize="xxs"
                                    name="taluk"
                                    value={''}
                                    onChange={(e) => {
                                        // setPinCodeSearch(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-span-6">
                                <ATMTextField
                                    label="Area"
                                    placeholder="Enter Area"
                                    size="xxs"
                                    labelSize="xxs"
                                    name="area"
                                    value={''}
                                    onChange={(e) => {
                                        // setPinCodeSearch(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-span-6">
                                <ATMTextField
                                    label="Pincode"
                                    placeholder="Enter Pincode"
                                    size="xxs"
                                    labelSize="xxs"
                                    name="pincode"
                                    value={''}
                                    onChange={(e) => {
                                        // setPinCodeSearch(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-span-2 pt-2 flex justify-center items-end">
                                <CallerButton
                                    text="Search"
                                    type="button"
                                    className="text-[12px] py-[9px]"
                                    onClick={onClose}
                                />
                            </div>
                        </div>
                        <div className="grow overflow-auto mt-4 border-[1px] border-slate-200">
                            <ATMTable
                                columns={columns}
                                rows={rows}
                                
                                // selectedRows={selectedRows}
                                // onRowSelect={(selectedRows) =>
                                //     setSelectedRows(selectedRows)
                                // }
                                // setShowDropdown={setShowDropdown}
                            />
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default AddressDialog
