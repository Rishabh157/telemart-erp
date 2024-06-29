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
import moment from 'moment'

// |-- Redux --|

import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import { FaCheckCircle } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'

type AddressDialogTypes = {
    isShow: boolean
    onClose: () => void
    moneyBackData: any
}

const StatusDialog = ({
    isShow,
    onClose,
    moneyBackData,
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
                    {moneyBackData.managerFirstApproval ? (
                        <FaCheckCircle color="green" />
                    ) : (
                        <ImCross color="red" />
                    )}{' '}
                </>
            ),
            remark: `${
                moneyBackData.managerFirstRemark
                    ? moneyBackData?.managerFirstRemark
                    : '-'
            }`,
            date: (
                <div className="flex flex-col">
                    <span>
                        {moment(moneyBackData.managerFirstApprovalDate).format(
                            'DD-MM-YYYY'
                        )}
                    </span>
                    <span>
                        {' '}
                        {moment(moneyBackData.managerFirstApprovalDate).format(
                            'hh:mm:ss A'
                        )}
                    </span>
                </div>
            ),
        },
        {
            state: 'CC Approval',
            district: (
                <>
                    {moneyBackData.ccApproval ? (
                        <FaCheckCircle color="green" />
                    ) : (
                        <ImCross color="red" />
                    )}{' '}
                </>
            ),
            remark: `${moneyBackData.ccRemark ? moneyBackData?.ccRemark : '-'}`,
            date: (
                <div >
                    {moneyBackData.ccApprovalDate !== '' ? (
                        <div className="flex flex-col">
                            <span>
                                {moment(moneyBackData.ccApprovalDate).format(
                                    'DD-MM-YYYY'
                                )}
                            </span>
                            <span>
                                {' '}
                                {moment(moneyBackData.ccApprovalDate).format(
                                    'hh:mm:ss A'
                                )}
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
                    {moneyBackData.managerSecondApproval ? (
                        <FaCheckCircle color="green" />
                    ) : (
                        <ImCross color="red" />
                    )}{' '}
                </>
            ),
            remark: `${
                moneyBackData.managerSecondRemark
                    ? moneyBackData?.managerSecondRemark
                    : '-'
            }`,
            date: (
                <div >
                    {moneyBackData.managerSecondApprovalDate !== '' ? (
                        <div className="flex flex-col">
                            <span>
                                {moment(
                                    moneyBackData.managerSecondApprovalDate
                                ).format('DD-MM-YYYY')}
                            </span>
                            <span>
                                {' '}
                                {moment(
                                    moneyBackData.managerSecondApprovalDate
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
                    {moneyBackData.accountApproval ? (
                        <FaCheckCircle color="green" />
                    ) : (
                        <ImCross color="red" />
                    )}{' '}
                </>
            ),
            remark: `${
                moneyBackData.accountRemark ? moneyBackData?.accountRemark : '-'
            }`,
            date: (
                <div >
                    {moneyBackData.accountApprovalDate !== '' ? (
                        <div className="flex flex-col">
                            <span>
                                {moment(
                                    moneyBackData.accountApprovalDate
                                ).format('DD-MM-YYYY')}
                            </span>
                            <span>
                                {' '}
                                {moment(
                                    moneyBackData.accountApprovalDate
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
