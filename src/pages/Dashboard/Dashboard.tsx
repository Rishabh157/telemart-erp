import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import CustomerDashboard from './CustomerDashboard'
import OrderSummary from './OrderSummary'
import { showTheDashboardGraphToDeparment } from 'src/utils/constants/customeTypes'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import ZMDealerStatus from './ZMDealerStatus'

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
        <div className="px-4 h-[calc(100vh-55px)] bg-white">
            <div className="p-4 bg-white h-[calc(100vh-55px)] ">
                <ATMPageHeading> Dashboard </ATMPageHeading>
                <div>
                    {showTheDashboardGraphToDeparment(
                        userData?.userDepartment
                    ) && <CustomerDashboard />}
                    {userData?.userDepartment === 'DISTRIBUTION_DEPARTMENT' && (
                        <div className="flex  gap-2 w-full h-full">
                            <div className="w-1/2">
                                <OrderSummary />
                            </div>
                            <div className="w-1/2">
                                <ZMDealerStatus />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
