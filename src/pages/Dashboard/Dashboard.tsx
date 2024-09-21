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
import PieChart from './admin/PieChart'
import SplineChart from './admin/SplineChart'
import MultiseriesChart from './admin/MultiseriesChart'
import StackedAreaChart from './admin/StackedAreaChart'

const Dashboard = () => {

    const { userData } = useGetLocalStorage() || null

    return (
        <div className=" h-[calc(100vh-55px)] bg-white p-5">

            {/* Admin Dashboard */}
            {userData?.userRole === "ADMIN" ? (
                <div className='grid grid-cols-2 gap-6'>
                    <div className='shadow-md border-t-[1px] border-r-[1px] border-slate-300'>
                        <PieChart />
                    </div>
                    <div className='shadow-md border-t-[1px] border-r-[1px] border-slate-300'>
                        <SplineChart />
                    </div>
                    <div className='shadow-md border-t-[1px] border-r-[1px] border-slate-300'>
                        <MultiseriesChart />
                    </div>
                    <div className='shadow-md border-t-[1px] border-r-[1px] border-slate-300'>
                        <StackedAreaChart />
                    </div>
                </div>
            ) : null}

            {showTheDashboardGraphToDeparment(userData?.userDepartment) && (
                <CustomerDashboard />
            )}

            {userData?.userDepartment === 'DISTRIBUTION_DEPARTMENT' && (
                <div className="grid grid-cols-2 gap-2 pb-10 h-full ">
                    <div >
                        <OrderSummary />
                    </div>
                    <div>
                        <ZMDealerStatus />
                    </div>
                    <div >
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
