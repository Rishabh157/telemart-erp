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
  houseArrestData: any
}

const StatusDialog = ({ isShow, onClose, houseArrestData }: AddressDialogTypes) => {

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
    }
  ];

  const rows: any[] = [
    {
      state: 'CC Approval',
      district: <>{houseArrestData.ccApproval ? <FaCheckCircle color='green' /> : <ImCross color='red' />
      } </>,
      remark: `${houseArrestData.ccRemark ? houseArrestData?.ccRemark : "-"}`,
      date: <div className=''>
        {houseArrestData.ccApprovalDate !== "" ?
          <div className='flex flex-col'>
            <span>
              {moment(houseArrestData.ccApprovalDate).format(
                'DD-MM-YYYY'
              )}
            </span>
            <span>
              {' '}
              {moment(houseArrestData.ccApprovalDate).format(
                'hh:mm:ss A'
              )}
            </span>
          </div>
          : '-'}
      </div>,
    },
    {
      state: 'Manager First',
      district: <>{houseArrestData.managerFirstApproval ? <FaCheckCircle color='green' /> : <ImCross color='red' />
      } </>,
      remark: `${houseArrestData.managerFirstRemark ? houseArrestData?.managerFirstRemark : "-"}`,
      date: <div >
        {houseArrestData.managerFirstApprovalDate ?
          <div>
            <span>
              {moment(houseArrestData.managerFirstApprovalDate).format(
                'DD-MM-YYYY'
              )}
            </span>
            <span>
              {' '}
              {moment(houseArrestData.managerFirstApprovalDate).format(
                'hh:mm:ss A'
              )}
            </span>
          </div>
          : '-'
        }
      </div>,
    },
    {
      state: 'Dealer',
      district: <>{houseArrestData.dealerApproval ? <FaCheckCircle color='green' /> : <ImCross color='red' />
      } </>,
      remark: `${houseArrestData.dealerRemark ? houseArrestData?.dealerRemark : "-"}`,
      date: <div className=''>
        {houseArrestData.dealerApprovalDate !== "" ?
          <div className='flex flex-col'>
            <span>
              {moment(houseArrestData.dealerApprovalDate).format(
                'DD-MM-YYYY'
              )}
            </span>
            <span>
              {' '}
              {moment(houseArrestData.dealerApprovalDate).format(
                'hh:mm:ss A'
              )}
            </span>
          </div>
          : '-'}
      </div>,
    },
    {
      state: 'Manager Second',
      district: <>{houseArrestData.managerSecondApproval ? <FaCheckCircle color='green' /> : <ImCross color='red' />
      } </>,
      remark: `${houseArrestData.managerSecondRemark ? houseArrestData?.managerSecondRemark : "-"}`,
      date: <div className=''>
        {houseArrestData.managerSecondApprovalDate !== "" ?
          <div className='flex flex-col'>
            <span>
              {moment(houseArrestData.managerSecondApprovalDate).format(
                'DD-MM-YYYY'
              )}
            </span>
            <span>
              {' '}
              {moment(houseArrestData.managerSecondApprovalDate).format(
                'hh:mm:ss A'
              )}
            </span>
          </div>
          : '-'}
      </div>
    },
    {
      state: 'Account Approval',
      district: <>{houseArrestData.accountApproval ? <FaCheckCircle color='green' /> : <ImCross color='red' />
      } </>,
      remark: `${houseArrestData.accountRemark ? houseArrestData?.accountRemark : "-"}`,
      date: <div className=''>
        {houseArrestData.accountApprovalDate !== "" ?
          <div className='flex flex-col'>
            <span>
              {moment(houseArrestData.accountApprovalDate).format(
                'DD-MM-YYYY'
              )}
            </span>
            <span>
              {' '}
              {moment(houseArrestData.accountApprovalDate).format(
                'hh:mm:ss A'
              )}
            </span>
          </div>
          : '-'}
      </div>
    },
  ];


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
              <ATMTable
                columns={columns}
                rows={rows}
              />
            </div>
          </div>
        }
      />
    </>
  )
}

export default StatusDialog
