// import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import CustomerDashboard from './CustomerDashboard'
import OrderSummary from './OrderSummary'
import { showTheDashboardGraphToDeparment } from 'src/utils/constants/customeTypes'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import ZMDealerStatus from './ZMDealerStatus'
import ZMStockStatus from './ZMStockStatus'
import WHInventory from './WHInventory'
import WHInwardStock from './WHInwardStock'
import WHOutwardStock from './WHOutwardStock'
import SaleDepartmentDashboard from './SaleDepartmentDashboard'

type Props = {
    columns: columnTypes[]
    rows: any
    columns2: columnTypes[]
    rows2: any
    // dataPoints: { y: number; label: string }[]
}

const Dashboard = ({ columns, rows, columns2, rows2 }: Props) => {
    const { userData } = useGetLocalStorage() || null

    return (
        <div className=" h-[calc(100vh-55px)] p-5 ">
            {showTheDashboardGraphToDeparment(userData?.userDepartment) && (
                <CustomerDashboard />
            )}
            {userData?.userDepartment === 'DISTRIBUTION_DEPARTMENT' && (
                <div className="grid grid-cols-2 gap-2 pb-10 h-full ">
                    <div className="">
                        <OrderSummary />
                    </div>
                    <div className="">
                        <ZMDealerStatus />
                    </div>
                    <div className="">
                        <ZMStockStatus />
                    </div>
                </div>
            )}
            {userData?.userDepartment === 'LOGISTIC_DEPARTMENT' && (
                <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
                    <div className="row-span-2 col-span-1">
                        <WHInventory />
                    </div>
                    <div className="col-span-1">
                        <WHInwardStock />
                    </div>
                    <div className="col-span-1">
                        <WHOutwardStock />
                    </div>
                </div>
            )}
            {userData?.userDepartment === 'SALES_DEPARTMENT' && (
                <div className="grid grid-cols-1 h-full">
                    <SaleDepartmentDashboard />
                </div>
            )}
        </div>
    )
}

export default Dashboard
