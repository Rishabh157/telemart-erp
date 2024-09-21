import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const MultiseriesChart = () => {

  const options = {
    animationEnabled: true,
    title: {
      text: "Number of Punch & Delivered Orders"
    },
    axisY: {
      title: "Number of Punch & Delivered Orders",
      includeZero: false
    },
    toolTip: {
      shared: true
    },
    data: [{
      type: "spline",
      name: "2023",
      showInLegend: true,
      dataPoints: [
        { y: 150050, label: "Jan" },
        { y: 150000, label: "Feb" },
        { y: 150020, label: "Mar" },
        { y: 140080, label: "Apr" },
        { y: 140020, label: "May" },
        { y: 150000, label: "Jun" },
        { y: 130560, label: "Jul" },
        { y: 130290, label: "Aug" },
        { y: 150030, label: "Sept" },
        { y: 150080, label: "Oct" },
        { y: 150040, label: "Nov" },
        { y: 150000, label: "Dec" }
      ]
    },
    {
      type: "spline",
      name: "2024",
      showInLegend: true,
      dataPoints: [
        { y: 172023, label: "Jan" },
        { y: 173023, label: "Feb" },
        { y: 175023, label: "Mar" },
        { y: 172023, label: "Apr" },
        { y: 162023, label: "May" },
        { y: 165023, label: "Jun" },
        { y: 172023, label: "Jul" },
        { y: 168023, label: "Aug" },
        { y: 175023, label: "Sept" },
        { y: 170023, label: "Oct" },
        { y: 165023, label: "Nov" },
        { y: 169023, label: "Dec" }
      ]
    }]
  }

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  )
}

export default MultiseriesChart