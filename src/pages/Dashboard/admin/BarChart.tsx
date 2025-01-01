import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { useGetBasicAdminDashboardDataQuery, useGetCallCenterPerformaceQuery } from 'src/services/DashboardServices';
// import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery';
import { CircularProgress } from '@mui/material';
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
// const CanvasJS = CanvasJSReact.CanvasJS;

// type BasicAdminDashboardData = {
//   totalActiveDealer: number,
//   totalActiveVendor: number
//   totalActiveWarehouse: number
//   totalActiveProducts: number
//   totalActiveSchemes: number
// }

const BarChart = () => {


  const [selectedOption, setSelectedOption] = useState('BASIC_OVERVIEW');
  const [chartData, setChartData] = useState<any>([]);

  // const { items, isFetching } = useGetDataByIdCustomQuery<BasicAdminDashboardData>({
  //   useEndPointHook: useGetBasicAdminDashboardDataQuery(''),
  // })

  // Fetch data using hooks for each API
  const { data: basicData, isFetching: isFetchingBasic } = useGetBasicAdminDashboardDataQuery<any>('');
  const { data: otherData, isFetching: isFetchingOther } = useGetCallCenterPerformaceQuery<any>('', { skip: selectedOption !== 'CALL_CENTER_PERFORMANCE' });
  console.log('basicData: ', basicData);
  console.log('otherData: ', otherData);

  const isLoading = isFetchingBasic || isFetchingOther;

  const mapDataToChart = (data:any) => {
    if (!data) return [];
    return [
      { y: data.totalActiveDealer, label: 'Dealers' },
      { y: data.totalActiveSchemes, label: 'Schemes' },
      { y: data.totalActiveProducts, label: 'Products' },
      { y: data.totalActiveVendor, label: 'Vendors' },
      { y: data.totalActiveWarehouse, label: 'Warehouses' },
    ];
  };


  useEffect(() => {
    if (selectedOption === 'BASIC_OVERVIEW') {
      setChartData(mapDataToChart(basicData?.data));
    } else if (selectedOption === 'CALL_CENTER_PERFORMANCE') {
      setChartData(mapDataToChart(otherData?.data));
    }
  }, [selectedOption, basicData, otherData]);



  const options = {
    animationEnabled: true,
    theme: 'light2',
    title: { text: 'Active Numbers Of' },
    axisX: { title: '', reversed: true },
    axisY: { title: 'Active Numbers' },
    data: [
      {
        type: 'bar',
        dataPoints: chartData,
      },
    ],
  };


  // const addSymbols = (e: any) => {
  //   const suffixes = ["", "K", "M", "B"];
  //   let order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
  //   if (order > suffixes.length - 1) order = suffixes.length - 1;
  //   const suffix = suffixes[order];
  //   return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  // };


  // const options = {
  //   animationEnabled: true,
  //   theme: 'light2',
  //   title: { text: 'Active Numbers Of' },
  //   axisX: { title: '', reversed: true },
  //   axisY: { title: 'Active Numbers' },
  //   data: [
  //     {
  //       type: 'bar',
  //       dataPoints: chartData,
  //     },
  //   ],
  // };

  // const options = {
  //   animationEnabled: true,
  //   theme: "light2",
  //   title: { text: "Active Numbers Of" },
  //   axisX: {
  //     title: "",
  //     reversed: true,
  //   },
  //   axisY: {
  //     title: "Active Numbers",
  //     labelFormatter: addSymbols,
  //   },
  //   data: [
  //     {
  //       type: "bar",
  //       dataPoints: [
  //         { y: items?.totalActiveDealer, label: "Dealers" },
  //         { y: items?.totalActiveSchemes, label: "Schemes" },
  //         { y: items?.totalActiveProducts, label: "Products" },
  //         { y: items?.totalActiveVendor, label: "Vendors" },
  //         { y: items?.totalActiveWarehouse, label: "Warehouses" },
  //       ],
  //     },
  //   ],
  // };

  return (
    <div>
      {isLoading && (
        <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
          <CircularProgress />
        </div>
      )}

      <ATMSelectSearchable
        name=""
        fontSizeOptionsClass="13px"
        minHeight="25px"
        size="xxs"
        fontSizePlaceHolder="14px"
        componentClass="mt-0"
        selectLabel="Comapny Name"
        isClearable={false}
        value={''}
        options={[
          { label: 'Basic Overview', value: 'BASIC_OVERVIEW' },
          { label: 'Call Center Performance', value: 'CALL_CENTER_PERFORMANCE' },
        ]}
        onChange={(newValue) => {
          setSelectedOption(newValue || '');
        }}
      />

      <CanvasJSChart options={options} />
    </div>
  );
};

export default BarChart;
