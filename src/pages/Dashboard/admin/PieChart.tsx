import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = () => {
  const options = {
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: "Website Traffic Sources"
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 15, label: "Amazon Orders" },
          { y: 20, label: "Flipkart Orders" },
          { y: 10, label: "Meesho Orders" },
          { y: 5, label: "Others" },
          { y: 12, label: "Channels" },
          { y: 8, label: "Direct Orders" },
          { y: 10, label: "Dealers Orders" },
          { y: 7, label: "Social Media Orders" },
          { y: 8, label: "Prepaid Orders" },
          { y: 5, label: "Postpaid Orders" }
        ]
      }
    ]
  }

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default PieChart;
