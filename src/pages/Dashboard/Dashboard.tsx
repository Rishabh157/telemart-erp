import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import CustomerDashboard from './CustomerDashboard'
import OrderSummary from './OrderSummary'
import { showTheDashboardGraphToDeparment } from 'src/utils/constants/customeTypes'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import ZMDealerStatus from './ZMDealerStatus'
import ZMStockStatus from './ZMStockStatus'

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
        <div className="px-4 h-[calc(100vh-55px)] ">
            <div className="p-4 bg-white h-[calc(100vh-55px)] ">
                <ATMPageHeading> Dashboard </ATMPageHeading>
                <div>
                    {showTheDashboardGraphToDeparment(
                        userData?.userDepartment
                    ) && <CustomerDashboard />}
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
                </div>
            </div>
        </div>
    )
}

export default Dashboard
