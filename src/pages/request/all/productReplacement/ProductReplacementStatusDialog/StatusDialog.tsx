/// ==============================================
// Filename:AddressDialog.tsx
// Type: List Component
// Last Updated: SEPTEMBER 25, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|

// |-- External Dependencies --|

// |-- Internal Dependencies --|
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'

// |-- Redux --|

import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import { FaCheckCircle } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import moment from 'moment'

type AddressDialogTypes = {
    isShow: boolean
    onClose: () => void
    productReplacementData: any
}

const StatusDialog = ({
    isShow,
    onClose,
    productReplacementData,
}: AddressDialogTypes) => {
    const columns: columnTypes[] = [
        {
            field: 'state',
            headerName: 'Stage',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: any) => (
                <span className="text-primary-main">{row.state}</span>
            ),
        },
        {
            field: 'district',
            headerName: 'Approval',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: any) => (
                <span className="text-primary-main">{row.district}</span>
            ),
        },
        {
            field: 'remark',
            headerName: 'Remark',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: any) => (
                <span className="text-primary-main">{row.remark}</span>
            ),
        },

        {
            field: 'date',
            headerName: 'Date',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: any) => (
                <span className="text-primary-main">{row.date}</span>
            ),
        },
    ]

    const rows: any[] = [
        {
            state: 'Manager First',
            district: (
                <>
                    {productReplacementData.managerFirstApproval ? (
                        <FaCheckCircle color="green" />
                    ) : (
                        <ImCross color="red" />
                    )}{' '}
                </>
            ),
            remark: `${
                productReplacementData.managerFirstRemark
                    ? productReplacementData?.managerFirstRemark
                    : '-'
            }`,
            date: (
                <div className="">
                    {productReplacementData.managerFirstApprovalDate !== '' ? (
                        <div className="flex flex-col">
                            <span>
                                {moment(
                                    productReplacementData.managerFirstApprovalDate
                                ).format('DD-MM-YYYY')}
                            </span>
                            <span>
                                {' '}
                                {moment(
                                    productReplacementData.managerFirstApprovalDate
                                ).format('hh:mm:ss A')}
                            </span>
                        </div>
                    ) : (
                        '-'
                    )}
                </div>
            ),
        },
        {
            state: 'CC Approval',
            district: (
                <>
                    {productReplacementData.ccApproval ? (
                        <FaCheckCircle color="green" />
                    ) : (
                        <ImCross color="red" />
                    )}{' '}
                </>
            ),
            remark: `${
                productReplacementData.ccRemark
                    ? productReplacementData?.ccRemark
                    : '-'
            }`,
            date: (
                <div className="">
                    {productReplacementData.ccApprovalDate !== '' ? (
                        <div className="flex flex-col">
                            <span>
                                {moment(
                                    productReplacementData.ccApprovalDate
                                ).format('DD-MM-YYYY')}
                            </span>
                            <span>
                                {' '}
                                {moment(
                                    productReplacementData.ccApprovalDate
                                ).format('hh:mm:ss A')}
                            </span>
                        </div>
                    ) : (
                        '-'
                    )}
                </div>
            ),
        },
        {
            state: 'Manager Second',
            district: (
                <>
                    {productReplacementData.managerSecondApproval ? (
                        <FaCheckCircle color="green" />
                    ) : (
                        <ImCross color="red" />
                    )}{' '}
                </>
            ),
            remark: `${
                productReplacementData.managerSecondRemark
                    ? productReplacementData?.managerSecondRemark
                    : '-'
            }`,
            date: (
                <div className="">
                    {productReplacementData.managerSecondApprovalDate !== '' ? (
                        <div className="flex flex-col">
                            <span>
                                {moment(
                                    productReplacementData.managerSecondApprovalDate
                                ).format('DD-MM-YYYY')}
                            </span>
                            <span>
                                {' '}
                                {moment(
                                    productReplacementData.managerSecondApprovalDate
                                ).format('hh:mm:ss A')}
                            </span>
                        </div>
                    ) : (
                        '-'
                    )}
                </div>
            ),
        },
        {
            state: 'Account Approval',
            district: (
                <>
                    {productReplacementData.accountApproval ? (
                        <FaCheckCircle color="green" />
                    ) : (
                        <ImCross color="red" />
                    )}{' '}
                </>
            ),
            remark: `${
                productReplacementData.accountRemark
                    ? productReplacementData?.accountRemark
                    : '-'
            }`,
            date: (
                <div className="">
                    {productReplacementData.accountApprovalDate !== '' ? (
                        <div className="flex flex-col">
                            <span>
                                {moment(
                                    productReplacementData.accountApprovalDate
                                ).format('DD-MM-YYYY')}
                            </span>
                            <span>
                                {' '}
                                {moment(
                                    productReplacementData.accountApprovalDate
                                ).format('hh:mm:ss A')}
                            </span>
                        </div>
                    ) : (
                        '-'
                    )}
                </div>
            ),
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
                        <div className="grow overflow-auto mt-4 border-[1px] border-slate-200">
                            <ATMTable columns={columns} rows={rows} />
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default StatusDialog
