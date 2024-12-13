import { useState, useEffect } from 'react'
// import moment from 'moment'
import BarGraph from 'src/components/UI/atoms/ATMBarGraph/ATMBarGraph'
import { ATMFullScreenLoader } from 'src/components/UI/atoms/ATMDisplay/ATMLoader'
// import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetOrderDashboardDataQuery } from 'src/services/OrderService'
import ATMDateFilterChip from 'src/components/UI/atoms/ATMDateFilterChip/ATMDateFilterChip'
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { addMonths, endOfDay, isBefore } from 'date-fns';


const OrderOverviewDashboardWrapper = () => {

    const keyName = {
        dateFilterKey: "dateFilterKey",
        startDate: "startDate",
        endDate: "endDate",
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const [dateFilter, setDateFilter] = useState<any>({
        start_date: searchParams.get(keyName.startDate) || format(new Date(), 'yyyy-MM-dd'),
        end_date: searchParams.get(keyName.endDate) || format(new Date(), 'yyyy-MM-dd'),
    })

    useEffect(() => {
        // Update search params whenever the date filter state changes
        searchParams.set(keyName.startDate, dateFilter.start_date);
        searchParams.set(keyName.endDate, dateFilter.end_date);
        setSearchParams(searchParams);
    }, [dateFilter, keyName.startDate, keyName.endDate, searchParams, setSearchParams]);


    // API
    const { items, isFetching } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetOrderDashboardDataQuery({
            dateFilter: {
                startDate: dateFilter.start_date,
                endDate: dateFilter.end_date,
            },
        }),
    })

    const getData = (items: any) => {
        return [
            { y: items?.allOrders || 0, label: 'All Orders' },
            { y: items?.freshOrders || 0, label: 'Fresh' },
            { y: items?.holdOrders || 0, label: 'Hold' },
            { y: items?.inquiryOrders || 0, label: 'Inquiry' },
            { y: items?.prepaidOrders || 0, label: 'Prepaid' },
            { y: items?.deliveredOrders || 0, label: 'Delivered' },
            { y: items?.pscOrders || 0, label: 'PSC' },
            { y: items?.unaOrders || 0, label: 'UNA' },
            { y: items?.urgentOrders || 0, label: 'Urgent' },
            { y: items?.rtoOrders || 0, label: 'RTO' },
            { y: items?.reattemptOrders || 0, label: 'Reattempt' },
            { y: items?.intransitOrders || 0, label: 'Intransit' },
            { y: items?.ndrOrders || 0, label: 'NDR' },
            { y: items?.pndOrders || 0, label: 'PND' },
            { y: items?.nonActionOrders || 0, label: 'Non-Action' },
            { y: items?.doorCancelledOrders || 0, label: 'Door Cancelled' },
            { y: items?.deliveryOutOfNetworkOrders, label: 'Delivery Out Of Network' },
        ]
    }

    const handleStartDateChange = (newDate: any) => {
        if (!newDate) return;

        const maxEndDate = endOfDay(addMonths(newDate, 3));
        const updatedEndDate = isBefore(new Date(dateFilter.end_date), maxEndDate)
            ? dateFilter.end_date
            : format(maxEndDate, 'yyyy-MM-dd');

        setDateFilter({
            start_date: format(newDate, 'yyyy-MM-dd'),
            end_date: updatedEndDate,
        });
    };

    const handleEndDateChange = (newDate: any) => {
        if (!newDate) return;

        const minEndDate = endOfDay(addMonths(new Date(dateFilter.start_date), 3));

        if (isBefore(newDate, minEndDate)) {
            setDateFilter((prev: any) => ({
                ...prev,
                end_date: format(newDate, 'yyyy-MM-dd'),
            }));
        }
    };

    const handleClear = () => {
        setDateFilter({
            start_date: format(new Date(), 'yyyy-MM-dd'),
            end_date: format(new Date(), 'yyyy-MM-dd'),
        });
    };

    return (
        <div className="flex flex-col border border-slate-400 rounded p-2 h-auto">
            {isFetching && <ATMFullScreenLoader />}

            <div className="flex gap-2 items-center justify-center">
                <ATMDateFilterChip
                    startDate={searchParams.get(keyName?.startDate) || null}
                    endDate={searchParams.get(keyName?.endDate) || null}
                    onSelectStartDate={handleStartDateChange}
                    onSelectEndDate={handleEndDateChange}
                    onClear={handleClear}
                />
            </div>

            <div className="relative flex-1 h-0">
                <div className="h-full ">
                    <BarGraph
                        dataPoints={getData(items)}
                        label={'Orders'}
                        verticalLabel={'Quantity'}
                    />
                </div>
            </div>
        </div>
    )
}

export default OrderOverviewDashboardWrapper
