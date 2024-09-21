import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SplineChart = () => {
  const options = {
    animationEnabled: true,
    title: {
      text: "Monthly Sales - 2024"
    },
    axisX: {
      valueFormatString: "MMM"
    },
    axisY: {
      title: "Sales (in INR)",
      prefix: "₹",
      includeZero: false
    },
    data: [
      {
        yValueFormatString: "₹#,###",
        xValueFormatString: "MMMM",
        type: "spline",
        dataPoints: [
          { x: new Date(2017, 0), y: 205060 },
          { x: new Date(2017, 1), y: 207980 },
          { x: new Date(2017, 2), y: 402800 },
          { x: new Date(2017, 3), y: 3002400 },
          { x: new Date(2017, 4), y: 305260 },
          { x: new Date(2017, 5), y: 303900 },
          { x: new Date(2017, 6), y: 1000000 },
          { x: new Date(2017, 7), y: 502500 },
          { x: new Date(2017, 8), y: 3332300 },
          { x: new Date(2017, 9), y: 402000 },
          { x: new Date(2017, 10), y: 307160 },
          { x: new Date(2017, 11), y: 308400 }
        ]
      }
    ]
  };

  return (
    <div>
      <CanvasJSChart options={options}
      // onRef={(ref:any) => console.log(ref)} 
      />
    </div>
  );
};

export default SplineChart;
