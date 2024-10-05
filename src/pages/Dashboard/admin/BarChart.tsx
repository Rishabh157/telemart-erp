import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { useGetBasicAdminDashboardDataQuery } from 'src/services/DashboardServices';
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery';
import { CircularProgress } from '@mui/material';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const CanvasJS = CanvasJSReact.CanvasJS;

type BasicAdminDashboardData = {
  totalActiveDealer: number,
  totalActiveVendor: number
  totalActiveWarehouse: number
  totalActiveProducts: number
  totalActiveSchemes: number
}

const BarChart = () => {

  const { items, isFetching } = useGetDataByIdCustomQuery<BasicAdminDashboardData>({
    useEndPointHook: useGetBasicAdminDashboardDataQuery(''),
  })

  const addSymbols = (e: any) => {
    const suffixes = ["", "K", "M", "B"];
    let order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1) order = suffixes.length - 1;
    const suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  };

  const options = {
    animationEnabled: true,
    theme: "light2",
    title: { text: "Active Numbers Of" },
    axisX: {
      title: "",
      reversed: true,
    },
    axisY: {
      title: "Active Numbers",
      labelFormatter: addSymbols,
    },
    data: [
      {
        type: "bar",
        dataPoints: [
          { y: items?.totalActiveDealer, label: "Dealers" },
          { y: items?.totalActiveSchemes, label: "Schemes" },
          { y: items?.totalActiveProducts, label: "Products" },
          { y: items?.totalActiveVendor, label: "Vendors" },
          { y: items?.totalActiveWarehouse, label: "Warehouses" },
        ],
      },
    ],
  };

  return (
    <div>
      {isFetching && (
        <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
          <CircularProgress />
        </div>
      )}
      <CanvasJSChart options={options} />
    </div>
  );
};

export default BarChart;
