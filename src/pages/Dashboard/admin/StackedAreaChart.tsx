import React, { useRef } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const StackedAreaChart = () => {
  const chartRef = useRef<any>(null);

  const toggleDataSeries = (e: any) => {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chartRef.current.render();
  };

  const options = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: false,
    title: {
      text: "Top State wise Sales"
    },
    axisY: {
      title: "Top State whise sales"
    },
    toolTip: {
      shared: true
    },
    legend: {
      verticalAlign: "center",
      horizontalAlign: "right",
      reversed: true,
      cursor: "pointer",
      itemclick: toggleDataSeries
    },
    data: [
      {
        type: "stackedArea",
        name: "Tamil Nadu - TN",
        showInLegend: true,
        xValueFormatString: "YYYY",
        dataPoints: [
          { x: new Date(2017, 0), y: 339000 },
          { x: new Date(2018, 0), y: 448000 },
          { x: new Date(2019, 0), y: 588000 },
          { x: new Date(2020, 0), y: 616000 },
          { x: new Date(2021, 0), y: 700000 },
          { x: new Date(2022, 0), y: 750000 },
          { x: new Date(2023, 0), y: 800000 },
          { x: new Date(2024, 0), y: 850000 }
        ]
      },
      {
        type: "stackedArea",
        name: "Rajasthan - RJ",
        showInLegend: true,
        xValueFormatString: "YYYY",
        dataPoints: [
          { x: new Date(2017, 0), y: 63000 },
          { x: new Date(2018, 0), y: 100000 },
          { x: new Date(2019, 0), y: 149000 },
          { x: new Date(2020, 0), y: 152000 },
          { x: new Date(2021, 0), y: 160000 },
          { x: new Date(2022, 0), y: 170000 },
          { x: new Date(2023, 0), y: 180000 },
          { x: new Date(2024, 0), y: 190000 }
        ]
      },
      {
        type: "stackedArea",
        name: "Uttar Pradesh - UP",
        showInLegend: true,
        xValueFormatString: "YYYY",
        dataPoints: [
          { x: new Date(2017, 0), y: 48000 },
          { x: new Date(2018, 0), y: 100000 },
          { x: new Date(2019, 0), y: 119000 },
          { x: new Date(2020, 0), y: 107000 },
          { x: new Date(2021, 0), y: 125000 },
          { x: new Date(2022, 0), y: 135000 },
          { x: new Date(2023, 0), y: 145000 },
          { x: new Date(2024, 0), y: 155000 }
        ]
      },
      {
        type: "stackedArea",
        name: "Maharashtra - MH",
        showInLegend: true,
        xValueFormatString: "YYYY",
        dataPoints: [
          { x: new Date(2017, 0), y: 70000 },
          { x: new Date(2018, 0), y: 450000 },
          { x: new Date(2019, 0), y: 2430000 },
          { x: new Date(2020, 0), y: 2500000 },
          { x: new Date(2021, 0), y: 3000000 },
          { x: new Date(2022, 0), y: 3500000 },
          { x: new Date(2023, 0), y: 4000000 },
          { x: new Date(2024, 0), y: 4500000 }
        ]
      },
      {
        type: "stackedArea",
        name: "Madhya Pradesh - MP",
        showInLegend: true,
        xValueFormatString: "YYYY",
        dataPoints: [
          { x: new Date(2017, 0), y: 120000 },
          { x: new Date(2018, 0), y: 220000 },
          { x: new Date(2019, 0), y: 490000 },
          { x: new Date(2020, 0), y: 510000 },
          { x: new Date(2021, 0), y: 600000 },
          { x: new Date(2022, 0), y: 700000 },
          { x: new Date(2023, 0), y: 800000 },
          { x: new Date(2024, 0), y: 900000 }
        ]
      }
    ]
  };

  return (
    <div>
      <CanvasJSChart options={options} onRef={(ref: any) => (chartRef.current = ref)} />
    </div>
  );
};

export default StackedAreaChart;
